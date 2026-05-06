const router = require('express').Router();
const db = require('../config/db');
const wrap = require('./_wrap');

router.get('/', wrap(async (req, res) => {
  const [rows] = await db.query('SELECT * FROM CHITIETPHIEUNHAP');
  res.json(rows);
}));

router.get('/:maPN/:maSP', wrap(async (req, res) => {
  const [rows] = await db.query('SELECT * FROM CHITIETPHIEUNHAP WHERE MaPN = ? AND MaSP = ?',
    [req.params.maPN, req.params.maSP]);
  res.json(rows[0] || null);
}));

router.post('/', wrap(async (req, res) => {
  const { MaPN, MaSP, SoLuongNhap, DonGiaNhap, GhiChu } = req.body;
  await db.query('INSERT INTO CHITIETPHIEUNHAP (MaPN, MaSP, SoLuongNhap, DonGiaNhap, GhiChu) VALUES (?, ?, ?, ?, ?)',
    [MaPN, MaSP, SoLuongNhap, DonGiaNhap, GhiChu]);
  res.json({ message: 'Created' });
}));

router.put('/:maPN/:maSP', wrap(async (req, res) => {
  const { SoLuongNhap, DonGiaNhap, GhiChu } = req.body;
  await db.query('UPDATE CHITIETPHIEUNHAP SET SoLuongNhap=?, DonGiaNhap=?, GhiChu=? WHERE MaPN=? AND MaSP=?',
    [SoLuongNhap, DonGiaNhap, GhiChu, req.params.maPN, req.params.maSP]);
  res.json({ message: 'Updated' });
}));

router.delete('/:maPN/:maSP', wrap(async (req, res) => {
  await db.query('DELETE FROM CHITIETPHIEUNHAP WHERE MaPN = ? AND MaSP = ?',
    [req.params.maPN, req.params.maSP]);
  res.json({ message: 'Deleted' });
}));

module.exports = router;
