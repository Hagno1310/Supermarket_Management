const router = require('express').Router();
const db = require('../config/db');
const wrap = require('./_wrap');

router.get('/', wrap(async (req, res) => {
  const [rows] = await db.query('SELECT * FROM NHOMHANG');
  res.json(rows);
}));

router.get('/:id', wrap(async (req, res) => {
  const [rows] = await db.query('SELECT * FROM NHOMHANG WHERE MaNhom = ?', [req.params.id]);
  res.json(rows[0] || null);
}));

router.post('/', wrap(async (req, res) => {
  const { MaNhom, TenNhom, GhiChu } = req.body;
  await db.query('INSERT INTO NHOMHANG (MaNhom, TenNhom, GhiChu) VALUES (?, ?, ?)',
    [MaNhom, TenNhom, GhiChu]);
  res.json({ message: 'Created' });
}));

router.put('/:id', wrap(async (req, res) => {
  const { TenNhom, GhiChu } = req.body;
  await db.query('UPDATE NHOMHANG SET TenNhom=?, GhiChu=? WHERE MaNhom=?',
    [TenNhom, GhiChu, req.params.id]);
  res.json({ message: 'Updated' });
}));

router.delete('/:id', wrap(async (req, res) => {
  await db.query('DELETE FROM NHOMHANG WHERE MaNhom = ?', [req.params.id]);
  res.json({ message: 'Deleted' });
}));

module.exports = router;
