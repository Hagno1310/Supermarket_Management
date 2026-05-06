CREATE DATABASE IF NOT EXISTS QuanLyBanHang;
USE QuanLyBanHang;

-- NHACUNGCAP
CREATE TABLE NHACUNGCAP (
    MaNCC VARCHAR(10) PRIMARY KEY,
    TenNCC VARCHAR(100) NOT NULL,
    DiaChi VARCHAR(200),
    SDT VARCHAR(15) UNIQUE,
    Email VARCHAR(100) UNIQUE
);

-- NHANVIEN
CREATE TABLE NHANVIEN (
    MaNV VARCHAR(10) PRIMARY KEY,
    HoTen VARCHAR(100) NOT NULL,
    ChucVu VARCHAR(50),
    SDT VARCHAR(15) UNIQUE,
    NgayVaoLam DATE NOT NULL
);

-- NHOMHANG
CREATE TABLE NHOMHANG (
    MaNhom VARCHAR(10) PRIMARY KEY,
    TenNhom VARCHAR(100) NOT NULL,
    GhiChu VARCHAR(200)
);

-- KHACHHANG
CREATE TABLE KHACHHANG (
    MaKH VARCHAR(10) PRIMARY KEY,
    HoTen VARCHAR(100) NOT NULL,
    SDT VARCHAR(15) UNIQUE,
    DiemTichLuy INT DEFAULT 0,
    HangThanhVien VARCHAR(50)
);

-- PHUONGTHUCTT
CREATE TABLE PHUONGTHUCTT (
    MaPT VARCHAR(10) PRIMARY KEY,
    TenPT VARCHAR(50) NOT NULL,
    MoTa VARCHAR(200)
);

-- SANPHAM
CREATE TABLE SANPHAM (
    MaSP VARCHAR(10) PRIMARY KEY,
    TenSP VARCHAR(100) NOT NULL,
    DonViTinh VARCHAR(20),
    GiaBan FLOAT CHECK (GiaBan >= 0),
    SoLuongTon INT CHECK (SoLuongTon >= 0),
    HSD DATE,
    MaNhom VARCHAR(10) NOT NULL,
    FOREIGN KEY (MaNhom) REFERENCES NHOMHANG(MaNhom)
);

-- PHIEUNHAP
CREATE TABLE PHIEUNHAP (
    MaPN VARCHAR(10) PRIMARY KEY,
    NgayNhap DATE NOT NULL,
    TongGiaTri FLOAT CHECK (TongGiaTri >= 0),
    MaNCC VARCHAR(10) NOT NULL,
    MaNV VARCHAR(10) NOT NULL,
    FOREIGN KEY (MaNCC) REFERENCES NHACUNGCAP(MaNCC),
    FOREIGN KEY (MaNV) REFERENCES NHANVIEN(MaNV)
);

-- CHITIETPHIEUNHAP
CREATE TABLE CHITIETPHIEUNHAP (
    MaPN VARCHAR(10),
    MaSP VARCHAR(10),
    SoLuongNhap INT CHECK (SoLuongNhap > 0),
    DonGiaNhap FLOAT CHECK (DonGiaNhap >= 0),
    GhiChu VARCHAR(200),
    PRIMARY KEY (MaPN, MaSP),
    FOREIGN KEY (MaPN) REFERENCES PHIEUNHAP(MaPN),
    FOREIGN KEY (MaSP) REFERENCES SANPHAM(MaSP)
);

-- KHUYENMAI
CREATE TABLE KHUYENMAI (
    MaKM VARCHAR(10) PRIMARY KEY,
    TenKM VARCHAR(100) NOT NULL,
    NgayBatDau DATE NOT NULL,
    NgayKetThuc DATE NOT NULL,
    CHECK (NgayKetThuc >= NgayBatDau)
);

-- HOADON
CREATE TABLE HOADON (
    MaHD VARCHAR(10) PRIMARY KEY,
    NgayLap DATE NOT NULL,
    TongTien FLOAT CHECK (TongTien >= 0),
    MaNV VARCHAR(10) NOT NULL,
    MaKH VARCHAR(10) NOT NULL,
    MaPT VARCHAR(10) NOT NULL,
    FOREIGN KEY (MaNV) REFERENCES NHANVIEN(MaNV),
    FOREIGN KEY (MaKH) REFERENCES KHACHHANG(MaKH),
    FOREIGN KEY (MaPT) REFERENCES PHUONGTHUCTT(MaPT)
);

-- CHITIETHOADON
CREATE TABLE CHITIETHOADON (
    MaHD VARCHAR(10),
    MaSP VARCHAR(10),
    SoLuong INT CHECK (SoLuong > 0),
    DonGia FLOAT CHECK (DonGia >= 0),
    PRIMARY KEY (MaHD, MaSP),
    FOREIGN KEY (MaHD) REFERENCES HOADON(MaHD),
    FOREIGN KEY (MaSP) REFERENCES SANPHAM(MaSP)
);

-- AP_DUNG_KM
CREATE TABLE AP_DUNG_KM (
    MaKM VARCHAR(10),
    MaSP VARCHAR(10),
    MucGiam FLOAT CHECK (MucGiam >= 0),
    PRIMARY KEY (MaKM, MaSP),
    FOREIGN KEY (MaKM) REFERENCES KHUYENMAI(MaKM),
    FOREIGN KEY (MaSP) REFERENCES SANPHAM(MaSP)
);

-- LICHSUDIEM
CREATE TABLE LICHSUDIEM (
    MaGD INT PRIMARY KEY,
    MaKH VARCHAR(10) NOT NULL,
    NgayGD DATE NOT NULL,
    SoDiemThayDoi INT,
    FOREIGN KEY (MaKH) REFERENCES KHACHHANG(MaKH)
);

-- =====================
-- SAMPLE DATA
-- =====================

INSERT INTO NHACUNGCAP VALUES
('NCC01', 'Vinamilk', '10 Tan Trao, Q7, HCM', '0281234567', 'vinamilk@vn.com'),
('NCC02', 'Masan', '12 Nguyen Hue, Q1, HCM', '0287654321', 'masan@vn.com'),
('NCC03', 'Unilever', '15 Le Loi, Q1, HCM', '0289876543', 'unilever@vn.com'),
('NCC04', 'Nestle', '20 Hai Ba Trung, Q3, HCM', '0281112233', 'nestle@vn.com'),
('NCC05', 'Pepsi', '25 CMT8, Q3, HCM', '0284445566', 'pepsi@vn.com');

INSERT INTO NHANVIEN VALUES
('NV01', 'Nguyen Van An', 'Quan ly', '0901111111', '2020-01-15'),
('NV02', 'Tran Thi Binh', 'Thu ngan', '0901111112', '2020-03-20'),
('NV03', 'Le Van Cuong', 'Kho', '0901111113', '2021-06-10'),
('NV04', 'Pham Thi Dung', 'Ban hang', '0901111114', '2021-09-01'),
('NV05', 'Hoang Van Em', 'Thu ngan', '0901111115', '2022-01-05');

INSERT INTO NHOMHANG VALUES
('NH01', 'Thuc pham tuoi song', 'Thit, ca, rau cu'),
('NH02', 'Do uong', 'Nuoc ngot, nuoc suoi, sua'),
('NH03', 'Hoa my pham', 'Dau goi, sua tam, kem danh rang'),
('NH04', 'Banh keo', 'Banh, keo, snack'),
('NH05', 'Do dong hop', 'Ca hop, thit hop, do an lien');

INSERT INTO KHACHHANG VALUES
('KH01', 'Nguyen Thi Lan', '0912345001', 150, 'Bac'),
('KH02', 'Tran Van Minh', '0912345002', 50, 'Dong'),
('KH03', 'Le Thi Ngoc', '0912345003', 300, 'Vang'),
('KH04', 'Pham Van Phuc', '0912345004', 10, 'Dong'),
('KH05', 'Hoang Thi Quynh', '0912345005', 500, 'Kim cuong');

INSERT INTO PHUONGTHUCTT VALUES
('PT01', 'Tien mat', 'Thanh toan bang tien mat'),
('PT02', 'Chuyen khoan', 'Chuyen khoan ngan hang'),
('PT03', 'Momo', 'Vi dien tu Momo'),
('PT04', 'VNPay', 'Vi dien tu VNPay'),
('PT05', 'Quet the', 'Thanh toan bang the ngan hang');

INSERT INTO SANPHAM VALUES
('SP01', 'Sua tuoi Vinamilk', 'Hop', 12000, 200, '2025-12-01', 'NH02'),
('SP02', 'Mi Hao Hao', 'Goi', 4000, 500, '2025-10-15', 'NH05'),
('SP03', 'Dau goi Clear', 'Chai', 85000, 100, '2026-06-01', 'NH03'),
('SP04', 'Banh Oreo', 'Hop', 25000, 150, '2025-09-20', 'NH04'),
('SP05', 'Pepsi lon', 'Lon', 10000, 300, '2025-11-30', 'NH02'),
('SP06', 'Thit heo', 'Kg', 120000, 50, '2025-07-01', 'NH01'),
('SP07', 'Ca hop Vissan', 'Hop', 30000, 80, '2026-03-15', 'NH05'),
('SP08', 'Kem danh rang PS', 'Tuyp', 35000, 120, '2026-01-01', 'NH03'),
('SP09', 'Keo Alpenliebe', 'Goi', 8000, 250, '2025-08-10', 'NH04'),
('SP10', 'Nuoc suoi Aqua', 'Chai', 5000, 400, '2026-05-01', 'NH02');

INSERT INTO PHIEUNHAP VALUES
('PN01', '2025-01-10', 2400000, 'NCC01', 'NV03'),
('PN02', '2025-01-15', 2000000, 'NCC02', 'NV03'),
('PN03', '2025-02-01', 8500000, 'NCC03', 'NV01'),
('PN04', '2025-02-10', 3750000, 'NCC04', 'NV03'),
('PN05', '2025-03-01', 3000000, 'NCC05', 'NV01');

INSERT INTO CHITIETPHIEUNHAP VALUES
('PN01', 'SP01', 200, 10000, 'Nhap sua tuoi'),
('PN02', 'SP02', 500, 3000, 'Nhap mi tom'),
('PN03', 'SP03', 100, 70000, 'Nhap dau goi'),
('PN04', 'SP04', 150, 20000, 'Nhap banh'),
('PN05', 'SP05', 300, 8000, 'Nhap nuoc ngot');

INSERT INTO KHUYENMAI VALUES
('KM01', 'Tet Nguyen Dan', '2025-01-20', '2025-02-10'),
('KM02', 'Ngay Phu Nu 8/3', '2025-03-01', '2025-03-10'),
('KM03', 'He Vui Ve', '2025-06-01', '2025-08-31'),
('KM04', 'Back to School', '2025-08-15', '2025-09-15'),
('KM05', 'Black Friday', '2025-11-25', '2025-11-30');

INSERT INTO HOADON VALUES
('HD01', '2025-01-20', 60000, 'NV02', 'KH01', 'PT01'),
('HD02', '2025-01-21', 170000, 'NV05', 'KH02', 'PT02'),
('HD03', '2025-02-05', 50000, 'NV02', 'KH03', 'PT03'),
('HD04', '2025-03-01', 35000, 'NV04', 'KH04', 'PT01'),
('HD05', '2025-03-10', 245000, 'NV05', 'KH05', 'PT05');

INSERT INTO CHITIETHOADON VALUES
('HD01', 'SP01', 5, 12000),
('HD02', 'SP03', 2, 85000),
('HD03', 'SP05', 5, 10000),
('HD04', 'SP09', 3, 8000),
('HD05', 'SP06', 1, 120000),
('HD05', 'SP04', 5, 25000);

INSERT INTO AP_DUNG_KM VALUES
('KM01', 'SP01', 10),
('KM01', 'SP02', 15),
('KM02', 'SP03', 20),
('KM03', 'SP05', 10),
('KM05', 'SP04', 25);

INSERT INTO LICHSUDIEM VALUES
(1, 'KH01', '2025-01-20', 6),
(2, 'KH02', '2025-01-21', 17),
(3, 'KH03', '2025-02-05', 5),
(4, 'KH04', '2025-03-01', 3),
(5, 'KH05', '2025-03-10', 24);
