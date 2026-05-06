const router = require('express').Router();
const db = require('../config/db');
const wrap = require('./_wrap');

router.get('/', wrap(async (req, res) => {
  const [rows] = await db.query('SELECT * FROM NHANVIEN');
  res.json(rows);
}));

router.get('/:id', wrap(async (req, res) => {
  const [rows] = await db.query('SELECT * FROM NHANVIEN WHERE MaNV = ?', [req.params.id]);
  res.json(rows[0] || null);
}));

router.post('/', wrap(async (req, res) => {
  const { MaNV, HoTen, ChucVu, SDT, NgayVaoLam } = req.body;
  await db.query('INSERT INTO NHANVIEN (MaNV, HoTen, ChucVu, SDT, NgayVaoLam) VALUES (?, ?, ?, ?, ?)',
    [MaNV, HoTen, ChucVu, SDT, NgayVaoLam]);
  res.json({ message: 'Created' });
}));

router.put('/:id', wrap(async (req, res) => {
  const { HoTen, ChucVu, SDT, NgayVaoLam } = req.body;
  await db.query('UPDATE NHANVIEN SET HoTen=?, ChucVu=?, SDT=?, NgayVaoLam=? WHERE MaNV=?',
    [HoTen, ChucVu, SDT, NgayVaoLam, req.params.id]);
  res.json({ message: 'Updated' });
}));

router.delete('/:id', wrap(async (req, res) => {
  await db.query('DELETE FROM NHANVIEN WHERE MaNV = ?', [req.params.id]);
  res.json({ message: 'Deleted' });
}));

module.exports = router;
