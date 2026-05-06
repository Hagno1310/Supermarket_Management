const router = require('express').Router();
const db = require('../config/db');
const wrap = require('./_wrap');

router.get('/', wrap(async (req, res) => {
  const [rows] = await db.query('SELECT * FROM PHIEUNHAP');
  res.json(rows);
}));

router.get('/:id', wrap(async (req, res) => {
  const [rows] = await db.query('SELECT * FROM PHIEUNHAP WHERE MaPN = ?', [req.params.id]);
  res.json(rows[0] || null);
}));

router.post('/', wrap(async (req, res) => {
  const { MaPN, NgayNhap, TongGiaTri, MaNCC, MaNV } = req.body;
  await db.query('INSERT INTO PHIEUNHAP (MaPN, NgayNhap, TongGiaTri, MaNCC, MaNV) VALUES (?, ?, ?, ?, ?)',
    [MaPN, NgayNhap, TongGiaTri, MaNCC, MaNV]);
  res.json({ message: 'Created' });
}));

router.put('/:id', wrap(async (req, res) => {
  const { NgayNhap, TongGiaTri, MaNCC, MaNV } = req.body;
  await db.query('UPDATE PHIEUNHAP SET NgayNhap=?, TongGiaTri=?, MaNCC=?, MaNV=? WHERE MaPN=?',
    [NgayNhap, TongGiaTri, MaNCC, MaNV, req.params.id]);
  res.json({ message: 'Updated' });
}));

router.delete('/:id', wrap(async (req, res) => {
  await db.query('DELETE FROM PHIEUNHAP WHERE MaPN = ?', [req.params.id]);
  res.json({ message: 'Deleted' });
}));

module.exports = router;
