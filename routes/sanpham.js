const router = require('express').Router();
const db = require('../config/db');
const wrap = require('./_wrap');

router.get('/', wrap(async (req, res) => {
  const [rows] = await db.query('SELECT * FROM SANPHAM');
  res.json(rows);
}));

router.get('/:id', wrap(async (req, res) => {
  const [rows] = await db.query('SELECT * FROM SANPHAM WHERE MaSP = ?', [req.params.id]);
  res.json(rows[0] || null);
}));

router.post('/', wrap(async (req, res) => {
  const { MaSP, TenSP, DonViTinh, GiaBan, SoLuongTon, HSD, MaNhom } = req.body;
  await db.query('INSERT INTO SANPHAM (MaSP, TenSP, DonViTinh, GiaBan, SoLuongTon, HSD, MaNhom) VALUES (?, ?, ?, ?, ?, ?, ?)',
    [MaSP, TenSP, DonViTinh, GiaBan, SoLuongTon, HSD, MaNhom]);
  res.json({ message: 'Created' });
}));

router.put('/:id', wrap(async (req, res) => {
  const { TenSP, DonViTinh, GiaBan, SoLuongTon, HSD, MaNhom } = req.body;
  await db.query('UPDATE SANPHAM SET TenSP=?, DonViTinh=?, GiaBan=?, SoLuongTon=?, HSD=?, MaNhom=? WHERE MaSP=?',
    [TenSP, DonViTinh, GiaBan, SoLuongTon, HSD, MaNhom, req.params.id]);
  res.json({ message: 'Updated' });
}));

router.delete('/:id', wrap(async (req, res) => {
  await db.query('DELETE FROM SANPHAM WHERE MaSP = ?', [req.params.id]);
  res.json({ message: 'Deleted' });
}));

module.exports = router;
