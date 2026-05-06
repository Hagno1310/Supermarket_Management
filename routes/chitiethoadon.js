const router = require('express').Router();
const db = require('../config/db');
const wrap = require('./_wrap');

router.get('/', wrap(async (req, res) => {
  const [rows] = await db.query('SELECT * FROM CHITIETHOADON');
  res.json(rows);
}));

router.get('/:maHD/:maSP', wrap(async (req, res) => {
  const [rows] = await db.query('SELECT * FROM CHITIETHOADON WHERE MaHD = ? AND MaSP = ?',
    [req.params.maHD, req.params.maSP]);
  res.json(rows[0] || null);
}));

router.post('/', wrap(async (req, res) => {
  const { MaHD, MaSP, SoLuong, DonGia } = req.body;
  await db.query('INSERT INTO CHITIETHOADON (MaHD, MaSP, SoLuong, DonGia) VALUES (?, ?, ?, ?)',
    [MaHD, MaSP, SoLuong, DonGia]);
  res.json({ message: 'Created' });
}));

router.put('/:maHD/:maSP', wrap(async (req, res) => {
  const { SoLuong, DonGia } = req.body;
  await db.query('UPDATE CHITIETHOADON SET SoLuong=?, DonGia=? WHERE MaHD=? AND MaSP=?',
    [SoLuong, DonGia, req.params.maHD, req.params.maSP]);
  res.json({ message: 'Updated' });
}));

router.delete('/:maHD/:maSP', wrap(async (req, res) => {
  await db.query('DELETE FROM CHITIETHOADON WHERE MaHD = ? AND MaSP = ?',
    [req.params.maHD, req.params.maSP]);
  res.json({ message: 'Deleted' });
}));

module.exports = router;
