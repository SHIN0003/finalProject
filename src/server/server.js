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

app.post('/save-habit', (req, res) => {
  const habit = req.body;
  db.put(habit).then((response) => {
    res.json(response);
  });
});
