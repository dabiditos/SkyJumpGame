// routes/scores.js
const express = require('express');
const router = express.Router();
const db = require('../db');

// GET todos os scores
router.get('/', (req, res) => {
  db.query('SELECT * FROM scores', (err, results) => {
    if (err) return res.status(500).json(err);
    res.json(results);
  });
});

// GET scores por id
router.get('/:id', (req, res) => {
  db.query('SELECT * FROM scores WHERE id = ?', [req.params.id], (err, results) => {
    if (err) return res.status(500).json(err);
    res.json(results[0]);
  });
});

// GET scores por game
router.get('/bygame/:game', (req, res) => {
  const game = req.params.game;

  db.query(
    'SELECT * FROM scores WHERE game = ? ORDER BY score DESC LIMIT 10',
    [game],
    (err, results) => {
      if (err) return res.status(500).json(err);
      res.json(results); // devolve todos, não apenas [0]
    }
  );
});


// POST criar score
router.post('/', (req, res) => {
  const {id, datascore, nickname, score, game} = req.body;
  db.query('INSERT INTO scores (datascore, nickname, score, game) VALUES (?, ?, ?, ?)',
    [datascore, nickname, score, game], (err, result) => {
    if (err) return res.status(500).json(err);
    res.json({ id: result.insertId});
  });
});


// PUT atualizar score
router.put('/:id', (req, res) => {
  const {id, datascore, nickname, score, game} = req.body;
  db.query('UPDATE scores SET datascore = ?, nickname = ?, score = ?, game = ? WHERE id = ?',
    [datascore, nickname, score, game, req.params.id], (err) => {
    if (err) return res.status(500).json(err);
    res.json({ id: req.params.id, datascore, nickname, score, game});
  });
});

// DELETE score por id
router.delete('/:id', (req, res) => {
  db.query('DELETE FROM scores WHERE id = ?', [req.params.id], (err) => {
    if (err) return res.status(500).json(err);
    res.json({ status: 'score removido' });
  });
});

// DELETE scores por game
router.get('/deletebygame/:game', (req, res) => {
  db.query('DELETE * FROM scores WHERE game = ?', [req.params.game], (err, results) => {
    if (err) return res.status(500).json(err);
    res.json({ status: 'scores removidos' });
  });
});

module.exports = router;