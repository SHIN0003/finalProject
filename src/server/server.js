import express from 'express';
import cors from 'cors';
import path from 'path';
import PouchDB from 'pouchdb';

const app = express();
app.use(cors());
app.use(express.static(path.join(process.cwd(), 'public')));

const db = new PouchDB('habits');

app.get('/', (req, res) => {
  res.sendFile(path.join(process.cwd(), 'public', 'index.html'));
});

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});

app.post('/api/submit-week', async (req, res) => {
  try {
    const result = await db.put({
      _id: new Date().toISOString(),
      data: req.body
    });
    res.status(201).send(result);
  } catch (error) {
    res.status(500).send(error.toString());
  }
});

app.get('/api/get-weeks', async (req, res) => {
  try {
    const result = await db.allDocs({ include_docs: true });
    res.status(200).send(result.rows.map(row => row.doc));
  } catch (error) {
    res.status(500).send(error.toString());
  }
});
