const router = require('express').Router();
const db = require('../config/db');
const wrap = require('./_wrap');

router.get('/', wrap(async (req, res) => {
  const [rows] = await db.query('SELECT * FROM PHUONGTHUCTT');
  res.json(rows);
}));

router.get('/:id', wrap(async (req, res) => {
  const [rows] = await db.query('SELECT * FROM PHUONGTHUCTT WHERE MaPT = ?', [req.params.id]);
  res.json(rows[0] || null);
}));

router.post('/', wrap(async (req, res) => {
  const { MaPT, TenPT, MoTa } = req.body;
  await db.query('INSERT INTO PHUONGTHUCTT (MaPT, TenPT, MoTa) VALUES (?, ?, ?)',
    [MaPT, TenPT, MoTa]);
  res.json({ message: 'Created' });
}));

router.put('/:id', wrap(async (req, res) => {
  const { TenPT, MoTa } = req.body;
  await db.query('UPDATE PHUONGTHUCTT SET TenPT=?, MoTa=? WHERE MaPT=?',
    [TenPT, MoTa, req.params.id]);
  res.json({ message: 'Updated' });
}));

router.delete('/:id', wrap(async (req, res) => {
  await db.query('DELETE FROM PHUONGTHUCTT WHERE MaPT = ?', [req.params.id]);
  res.json({ message: 'Deleted' });
}));

module.exports = router;
