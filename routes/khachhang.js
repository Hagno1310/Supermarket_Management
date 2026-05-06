const router = require('express').Router();
const db = require('../config/db');
const wrap = require('./_wrap');

router.get('/', wrap(async (req, res) => {
  const [rows] = await db.query('SELECT * FROM KHACHHANG');
  res.json(rows);
}));

router.get('/:id', wrap(async (req, res) => {
  const [rows] = await db.query('SELECT * FROM KHACHHANG WHERE MaKH = ?', [req.params.id]);
  res.json(rows[0] || null);
}));

router.post('/', wrap(async (req, res) => {
  const { MaKH, HoTen, SDT, DiemTichLuy, HangThanhVien } = req.body;
  await db.query('INSERT INTO KHACHHANG (MaKH, HoTen, SDT, DiemTichLuy, HangThanhVien) VALUES (?, ?, ?, ?, ?)',
    [MaKH, HoTen, SDT, DiemTichLuy || 0, HangThanhVien]);
  res.json({ message: 'Created' });
}));

router.put('/:id', wrap(async (req, res) => {
  const { HoTen, SDT, DiemTichLuy, HangThanhVien } = req.body;
  await db.query('UPDATE KHACHHANG SET HoTen=?, SDT=?, DiemTichLuy=?, HangThanhVien=? WHERE MaKH=?',
    [HoTen, SDT, DiemTichLuy, HangThanhVien, req.params.id]);
  res.json({ message: 'Updated' });
}));

router.delete('/:id', wrap(async (req, res) => {
  await db.query('DELETE FROM KHACHHANG WHERE MaKH = ?', [req.params.id]);
  res.json({ message: 'Deleted' });
}));

module.exports = router;
