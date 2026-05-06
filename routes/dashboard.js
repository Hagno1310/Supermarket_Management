const router = require('express').Router();
const db = require('../config/db');

router.get('/stats', async (req, res) => {
  try {
    const [[{totalRevenue}]] = await db.query('SELECT COALESCE(SUM(TongTien), 0) AS totalRevenue FROM HOADON');
    const [[{totalProducts}]] = await db.query('SELECT COUNT(*) AS totalProducts FROM SANPHAM');
    const [[{totalCustomers}]] = await db.query('SELECT COUNT(*) AS totalCustomers FROM KHACHHANG');
    const [[{totalInvoices}]] = await db.query('SELECT COUNT(*) AS totalInvoices FROM HOADON');
    const [[{totalSuppliers}]] = await db.query('SELECT COUNT(*) AS totalSuppliers FROM NHACUNGCAP');
    const [[{totalEmployees}]] = await db.query('SELECT COUNT(*) AS totalEmployees FROM NHANVIEN');
    res.json({ totalRevenue, totalProducts, totalCustomers, totalInvoices, totalSuppliers, totalEmployees });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/revenue-by-month', async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT DATE_FORMAT(NgayLap, '%Y-%m') AS month, SUM(TongTien) AS revenue
      FROM HOADON
      GROUP BY DATE_FORMAT(NgayLap, '%Y-%m')
      ORDER BY month
    `);
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/top-products', async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT s.TenSP, SUM(c.SoLuong) AS totalSold, SUM(c.SoLuong * c.DonGia) AS totalAmount
      FROM CHITIETHOADON c
      JOIN SANPHAM s ON c.MaSP = s.MaSP
      GROUP BY c.MaSP, s.TenSP
      ORDER BY totalSold DESC
      LIMIT 10
    `);
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/sales-by-category', async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT n.TenNhom, SUM(c.SoLuong * c.DonGia) AS totalAmount
      FROM CHITIETHOADON c
      JOIN SANPHAM s ON c.MaSP = s.MaSP
      JOIN NHOMHANG n ON s.MaNhom = n.MaNhom
      GROUP BY n.MaNhom, n.TenNhom
      ORDER BY totalAmount DESC
    `);
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/low-stock', async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT MaSP, TenSP, SoLuongTon, DonViTinh
      FROM SANPHAM
      WHERE SoLuongTon <= 100
      ORDER BY SoLuongTon ASC
      LIMIT 10
    `);
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/recent-invoices', async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT h.MaHD, h.NgayLap, h.TongTien, nv.HoTen AS NhanVien, kh.HoTen AS KhachHang, pt.TenPT
      FROM HOADON h
      JOIN NHANVIEN nv ON h.MaNV = nv.MaNV
      JOIN KHACHHANG kh ON h.MaKH = kh.MaKH
      JOIN PHUONGTHUCTT pt ON h.MaPT = pt.MaPT
      ORDER BY h.NgayLap DESC
      LIMIT 5
    `);
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/payment-methods', async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT pt.TenPT, COUNT(*) AS count, SUM(h.TongTien) AS total
      FROM HOADON h
      JOIN PHUONGTHUCTT pt ON h.MaPT = pt.MaPT
      GROUP BY h.MaPT, pt.TenPT
      ORDER BY count DESC
    `);
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
