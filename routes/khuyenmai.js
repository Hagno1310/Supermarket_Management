const router = require('express').Router();
const db = require('../config/db');
const wrap = require('./_wrap');

router.get('/', wrap(async (req, res) => {
  const [rows] = await db.query('SELECT * FROM KHUYENMAI');
  res.json(rows);
}));

router.get('/:id', wrap(async (req, res) => {
  const [rows] = await db.query('SELECT * FROM KHUYENMAI WHERE MaKM = ?', [req.params.id]);
  res.json(rows[0] || null);
}));

router.post('/', wrap(async (req, res) => {
  const { MaKM, TenKM, NgayBatDau, NgayKetThuc } = req.body;
  await db.query('INSERT INTO KHUYENMAI (MaKM, TenKM, NgayBatDau, NgayKetThuc) VALUES (?, ?, ?, ?)',
    [MaKM, TenKM, NgayBatDau, NgayKetThuc]);
  res.json({ message: 'Created' });
}));

router.put('/:id', wrap(async (req, res) => {
  const { TenKM, NgayBatDau, NgayKetThuc } = req.body;
  await db.query('UPDATE KHUYENMAI SET TenKM=?, NgayBatDau=?, NgayKetThuc=? WHERE MaKM=?',
    [TenKM, NgayBatDau, NgayKetThuc, req.params.id]);
  res.json({ message: 'Updated' });
}));

router.delete('/:id', wrap(async (req, res) => {
  await db.query('DELETE FROM KHUYENMAI WHERE MaKM = ?', [req.params.id]);
  res.json({ message: 'Deleted' });
}));

module.exports = router;
