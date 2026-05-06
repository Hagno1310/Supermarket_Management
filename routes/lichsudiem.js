const router = require('express').Router();
const db = require('../config/db');
const wrap = require('./_wrap');

router.get('/', wrap(async (req, res) => {
  const [rows] = await db.query('SELECT * FROM LICHSUDIEM');
  res.json(rows);
}));

router.get('/:id', wrap(async (req, res) => {
  const [rows] = await db.query('SELECT * FROM LICHSUDIEM WHERE MaGD = ?', [req.params.id]);
  res.json(rows[0] || null);
}));

router.post('/', wrap(async (req, res) => {
  const { MaGD, MaKH, NgayGD, SoDiemThayDoi } = req.body;
  await db.query('INSERT INTO LICHSUDIEM (MaGD, MaKH, NgayGD, SoDiemThayDoi) VALUES (?, ?, ?, ?)',
    [MaGD, MaKH, NgayGD, SoDiemThayDoi]);
  res.json({ message: 'Created' });
}));

router.put('/:id', wrap(async (req, res) => {
  const { MaKH, NgayGD, SoDiemThayDoi } = req.body;
  await db.query('UPDATE LICHSUDIEM SET MaKH=?, NgayGD=?, SoDiemThayDoi=? WHERE MaGD=?',
    [MaKH, NgayGD, SoDiemThayDoi, req.params.id]);
  res.json({ message: 'Updated' });
}));

router.delete('/:id', wrap(async (req, res) => {
  await db.query('DELETE FROM LICHSUDIEM WHERE MaGD = ?', [req.params.id]);
  res.json({ message: 'Deleted' });
}));

module.exports = router;
