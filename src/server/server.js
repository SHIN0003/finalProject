import express from 'express';
import cors from 'cors';
import path from 'path';
import PouchDB from 'pouchdb';
import bodyParser from 'body-parser';

const app = express();
app.use(bodyParser.json());
app.use(cors());
const db = new PouchDB('habits');

app.get('/', (req, res) => {
  res.sendFile(path.join(process.cwd(), 'public', 'index.html'));
});

app.post('/save-habit', (req, res) => {
  const habit = req.body;

  // Ensure there is an _id field for the document
  if (!habit._id) {
    habit._id = new Date().toISOString(); // Using timestamp as an example _id
  }

  db.put(habit)
    .then(response => {
      console.log("saved")
      res.status(201).json(response); // Send a 201 status for created resource
    })
    .catch(error => {
      console.error('Error saving habit:', error);
      res.status(500).json({ error: 'Internal server error' }); // Handle errors
    });
});

app.put('/complete-habit/:id', (req, res) => {
  const id = req.params.id;

  db.get(id)
    .then(doc => {
      doc.completed = true;
      return db.put(doc);
    })
    .then(response => {
      res.json(response);
    })
    .catch(error => {
      console.error('Error completing habit:', error);
      res.status(500).json({ error: 'Internal server error' });
    });
});

app.delete('/delete-habit/:id', (req, res) => {
  const id = req.params.id;

  db.get(id)
    .then(doc => {
      return db.remove(doc);
    })
    .then(response => {
      res.json(response);
    })
    .catch(error => {
      console.error('Error deleting habit:', error);
      res.status(500).json({ error: 'Internal server error' });
    });
});

app.get('/get-habits', (req, res) => {
  db.allDocs({ include_docs: true })
    .then(response => {
      const habits = response.rows.map(row => row.doc);
      res.json(habits);
    })
    .catch(error => {
      console.error('Error getting habits:', error);
      res.status(500).json({ error: 'Internal server error' });
    });
});

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});

