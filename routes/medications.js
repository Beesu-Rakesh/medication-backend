const express = require('express');
const db = require('../db');
const authenticate = require('../middleware/authMiddleware');
const router = express.Router();

// Add Medication
router.post('/add', authenticate, (req, res) => {
  const { name, dosage, frequency } = req.body;

  db.run(
    `INSERT INTO medications (user_id, name, dosage, frequency) VALUES (?, ?, ?, ?)`,
    [req.user.id, name, dosage, frequency],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ message: 'Medication added', id: this.lastID });
    }
  );
});

// View Medications
router.get('/list', authenticate, (req, res) => {
  db.all(`SELECT * FROM medications WHERE user_id = ?`, [req.user.id], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ medications: rows });
  });
});

// Mark as Taken
router.post('/take/:id', authenticate, (req, res) => {
  const medId = req.params.id;

  db.run(
    `UPDATE medications SET taken_today = 1 WHERE id = ? AND user_id = ?`,
    [medId, req.user.id],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ message: 'Medication marked as taken' });
    }
  );
});

module.exports = router;
