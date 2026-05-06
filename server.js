const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/dashboard', require('./routes/dashboard'));
app.use('/api/nhanvien', require('./routes/nhanvien'));
app.use('/api/khachhang', require('./routes/khachhang'));
app.use('/api/sanpham', require('./routes/sanpham'));
app.use('/api/nhomhang', require('./routes/nhomhang'));
app.use('/api/nhacungcap', require('./routes/nhacungcap'));
app.use('/api/hoadon', require('./routes/hoadon'));
app.use('/api/chitiethoadon', require('./routes/chitiethoadon'));
app.use('/api/phieunhap', require('./routes/phieunhap'));
app.use('/api/chitietphieunhap', require('./routes/chitietphieunhap'));
app.use('/api/khuyenmai', require('./routes/khuyenmai'));
app.use('/api/apdungkm', require('./routes/apdungkm'));
app.use('/api/phuongthuctt', require('./routes/phuongthuctt'));
app.use('/api/lichsudiem', require('./routes/lichsudiem'));

// Friendly table name map
const tableNames = {
  nhanvien: 'Nhân Viên', khachhang: 'Khách Hàng', sanpham: 'Sản Phẩm',
  nhomhang: 'Nhóm Hàng', nhacungcap: 'Nhà Cung Cấp', hoadon: 'Hóa Đơn',
  chitiethoadon: 'Chi Tiết Hóa Đơn', phieunhap: 'Phiếu Nhập',
  chitietphieunhap: 'Chi Tiết Phiếu Nhập', khuyenmai: 'Khuyến Mãi',
  ap_dung_km: 'Áp Dụng KM', phuongthuctt: 'Phương Thức TT',
  lichsudiem: 'Lịch Sử Điểm'
};

function friendlyError(err) {
  const msg = err.sqlMessage || err.message || '';
  const code = err.code || '';

  // Foreign key constraint — cannot delete parent
  if (code === 'ER_ROW_IS_REFERENCED_2') {
    const match = msg.match(/`(\w+)`\.`(\w+)`/);
    const child = match ? (tableNames[match[2].toLowerCase()] || match[2]) : 'bảng khác';
    return `Không thể xóa vì dữ liệu đang được sử dụng trong "${child}"`;
  }

  // Foreign key constraint — invalid reference
  if (code === 'ER_NO_REFERENCED_ROW_2') {
    const match = msg.match(/REFERENCES `(\w+)`/);
    const parent = match ? (tableNames[match[1].toLowerCase()] || match[1]) : 'bảng liên quan';
    return `Giá trị tham chiếu không tồn tại trong "${parent}"`;
  }

  // Not null violation
  if (code === 'ER_BAD_NULL_ERROR') {
    const match = msg.match(/Column '(\w+)'/);
    const col = match ? match[1] : 'trường';
    return `"${col}" không được để trống`;
  }

  // Duplicate entry
  if (code === 'ER_DUP_ENTRY') {
    const match = msg.match(/Duplicate entry '([^']+)'/);
    const val = match ? match[1] : '';
    return `Giá trị "${val}" đã tồn tại`;
  }

  // Data too long
  if (code === 'ER_DATA_TOO_LONG') {
    const match = msg.match(/column '(\w+)'/);
    const col = match ? match[1] : 'trường';
    return `Dữ liệu quá dài cho "${col}"`;
  }

  // Check constraint
  if (code === 'ER_CHECK_CONSTRAINT_VIOLATED' || msg.includes('Check constraint')) {
    return 'Giá trị không hợp lệ (vi phạm ràng buộc dữ liệu)';
  }

  return msg || 'Đã xảy ra lỗi không xác định';
}

// Global error handler
app.use((err, req, res, next) => {
  console.error('API Error:', err.message);
  res.status(500).json({ error: friendlyError(err) });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
