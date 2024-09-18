const express = require('express')
const axios =  require('axios')
const app = express();
const port = 5000;
const cors = require('cors')
const mysql = require('mysql2')

app.use(express.json())

app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true,
  optionsSuccessStatus: 200
}))

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Moestove-21',
  database: 'flash_card'
})

app.post('/post', (req, res) => {
    const {word, answer } = req.body;
    const sql = 'INSERT INTO users (word, answer) VALUES (?, ?)';
    db.query(sql, [word, answer], (err, result) => {
      if (err) {
        console.error('データ挿入中にエラーが発生しました:', err);
        res.status(500).send('サーバーエラー');
      } else {
        res.json({ id: result.insertId, word, answer});
      }
    });
  });

  app.post('/delete',(req,res) => {
    const{ id } = req.body;
    const sql = 'DELETE FROM users WHERE id = ?';
    db.query(sql, [id], (err, result) => {
      if (err) {
        console.error('データ削除中にエラーが発生しました:', err);
        res.status(500).send('サーバーエラー');
      } else {
        res.json({id});
      }
    });
  })


app.post('/',(req,res) => {
 const sql = 'SELECT * FROM users'
 

db.query(sql, (err, results) => {
  if(err){
    console.error('データ取得中にエラーが発生しました',err)
    res.status(500).send('サーバーエラー')
  }else{
    res.json(results)
  }
})
}) 

app.listen(port,() => {
    console.log(`Server is running on http://localhost:${port}`)
})