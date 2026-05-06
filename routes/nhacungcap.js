const router = require('express').Router();
const db = require('../config/db');
const wrap = require('./_wrap');

router.get('/', wrap(async (req, res) => {
  const [rows] = await db.query('SELECT * FROM NHACUNGCAP');
  res.json(rows);
}));

router.get('/:id', wrap(async (req, res) => {
  const [rows] = await db.query('SELECT * FROM NHACUNGCAP WHERE MaNCC = ?', [req.params.id]);
  res.json(rows[0] || null);
}));

router.post('/', wrap(async (req, res) => {
  const { MaNCC, TenNCC, DiaChi, SDT, Email } = req.body;
  await db.query('INSERT INTO NHACUNGCAP (MaNCC, TenNCC, DiaChi, SDT, Email) VALUES (?, ?, ?, ?, ?)',
    [MaNCC, TenNCC, DiaChi, SDT, Email]);
  res.json({ message: 'Created' });
}));

router.put('/:id', wrap(async (req, res) => {
  const { TenNCC, DiaChi, SDT, Email } = req.body;
  await db.query('UPDATE NHACUNGCAP SET TenNCC=?, DiaChi=?, SDT=?, Email=? WHERE MaNCC=?',
    [TenNCC, DiaChi, SDT, Email, req.params.id]);
  res.json({ message: 'Updated' });
}));

router.delete('/:id', wrap(async (req, res) => {
  await db.query('DELETE FROM NHACUNGCAP WHERE MaNCC = ?', [req.params.id]);
  res.json({ message: 'Deleted' });
}));

module.exports = router;
