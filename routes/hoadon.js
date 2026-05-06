const router = require('express').Router();
const db = require('../config/db');
const wrap = require('./_wrap');

router.get('/', wrap(async (req, res) => {
  const [rows] = await db.query('SELECT * FROM HOADON');
  res.json(rows);
}));

router.get('/:id', wrap(async (req, res) => {
  const [rows] = await db.query('SELECT * FROM HOADON WHERE MaHD = ?', [req.params.id]);
  res.json(rows[0] || null);
}));

router.post('/', wrap(async (req, res) => {
  const { MaHD, NgayLap, TongTien, MaNV, MaKH, MaPT } = req.body;
  await db.query('INSERT INTO HOADON (MaHD, NgayLap, TongTien, MaNV, MaKH, MaPT) VALUES (?, ?, ?, ?, ?, ?)',
    [MaHD, NgayLap, TongTien, MaNV, MaKH, MaPT]);
  res.json({ message: 'Created' });
}));

router.put('/:id', wrap(async (req, res) => {
  const { NgayLap, TongTien, MaNV, MaKH, MaPT } = req.body;
  await db.query('UPDATE HOADON SET NgayLap=?, TongTien=?, MaNV=?, MaKH=?, MaPT=? WHERE MaHD=?',
    [NgayLap, TongTien, MaNV, MaKH, MaPT, req.params.id]);
  res.json({ message: 'Updated' });
}));

router.delete('/:id', wrap(async (req, res) => {
  await db.query('DELETE FROM HOADON WHERE MaHD = ?', [req.params.id]);
  res.json({ message: 'Deleted' });
}));

module.exports = router;
