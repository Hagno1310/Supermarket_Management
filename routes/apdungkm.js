const router = require('express').Router();
const db = require('../config/db');
const wrap = require('./_wrap');

router.get('/', wrap(async (req, res) => {
  const [rows] = await db.query('SELECT * FROM AP_DUNG_KM');
  res.json(rows);
}));

router.get('/:maKM/:maSP', wrap(async (req, res) => {
  const [rows] = await db.query('SELECT * FROM AP_DUNG_KM WHERE MaKM = ? AND MaSP = ?',
    [req.params.maKM, req.params.maSP]);
  res.json(rows[0] || null);
}));

router.post('/', wrap(async (req, res) => {
  const { MaKM, MaSP, MucGiam } = req.body;
  await db.query('INSERT INTO AP_DUNG_KM (MaKM, MaSP, MucGiam) VALUES (?, ?, ?)',
    [MaKM, MaSP, MucGiam]);
  res.json({ message: 'Created' });
}));

router.put('/:maKM/:maSP', wrap(async (req, res) => {
  const { MucGiam } = req.body;
  await db.query('UPDATE AP_DUNG_KM SET MucGiam=? WHERE MaKM=? AND MaSP=?',
    [MucGiam, req.params.maKM, req.params.maSP]);
  res.json({ message: 'Updated' });
}));

router.delete('/:maKM/:maSP', wrap(async (req, res) => {
  await db.query('DELETE FROM AP_DUNG_KM WHERE MaKM = ? AND MaSP = ?',
    [req.params.maKM, req.params.maSP]);
  res.json({ message: 'Deleted' });
}));

module.exports = router;
