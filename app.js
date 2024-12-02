const express = require('express');
const bodyParser = require('body-parser');
const db = require('./db');
const moment = require('moment-timezone'); 

const app = express();
app.use(bodyParser.json());

app.post('/notes', (req, res) => {
  const { title, note } = req.body;

  const currentDatetime = moment().tz("Asia/Jakarta").format("YYYY-MM-DD HH:mm:ss");

  const query = 'INSERT INTO notes (title, note, datetime) VALUES (?, ?, ?)';
  db.query(query, [title, note, currentDatetime], (err, result) => {
    if (err) {
      res.status(500).json({ message: 'Error creating note', error: err });
    } else {
      res.status(201).json({
        id: result.insertId,
        title,
        note,
        datetime: currentDatetime,  
      });
    }
  });
});

const PORT = process.env.APP_PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
