/* ============================================
   Supermarket Admin — Dashboard + CRUD
   ============================================ */

// ── Table Definitions ──
const tables = {
  nhanvien: {
    label: 'Nhan Vien',
    api: '/api/nhanvien',
    pk: ['MaNV'],
    columns: [
      { key: 'MaNV', label: 'Ma NV', type: 'text' },
      { key: 'HoTen', label: 'Ho Ten', type: 'text' },
      { key: 'ChucVu', label: 'Chuc Vu', type: 'text' },
      { key: 'SDT', label: 'SDT', type: 'text' },
      { key: 'NgayVaoLam', label: 'Ngay Vao Lam', type: 'date' }
    ]
  },
  khachhang: {
    label: 'Khach Hang',
    api: '/api/khachhang',
    pk: ['MaKH'],
    columns: [
      { key: 'MaKH', label: 'Ma KH', type: 'text' },
      { key: 'HoTen', label: 'Ho Ten', type: 'text' },
      { key: 'SDT', label: 'SDT', type: 'text' },
      { key: 'DiemTichLuy', label: 'Diem Tich Luy', type: 'number' },
      { key: 'HangThanhVien', label: 'Hang Thanh Vien', type: 'text' }
    ]
  },
  nhomhang: {
    label: 'Nhom Hang',
    api: '/api/nhomhang',
    pk: ['MaNhom'],
    columns: [
      { key: 'MaNhom', label: 'Ma Nhom', type: 'text' },
      { key: 'TenNhom', label: 'Ten Nhom', type: 'text' },
      { key: 'GhiChu', label: 'Ghi Chu', type: 'text' }
    ]
  },
  sanpham: {
    label: 'San Pham',
    api: '/api/sanpham',
    pk: ['MaSP'],
    columns: [
      { key: 'MaSP', label: 'Ma SP', type: 'text' },
      { key: 'TenSP', label: 'Ten SP', type: 'text' },
      { key: 'DonViTinh', label: 'Don Vi Tinh', type: 'text' },
      { key: 'GiaBan', label: 'Gia Ban', type: 'number' },
      { key: 'SoLuongTon', label: 'So Luong Ton', type: 'number' },
      { key: 'HSD', label: 'Han Su Dung', type: 'date' },
      { key: 'MaNhom', label: 'Ma Nhom', type: 'fk', fkTable: 'nhomhang', fkKey: 'MaNhom', fkDisplay: 'TenNhom' }
    ]
  },
  nhacungcap: {
    label: 'Nha Cung Cap',
    api: '/api/nhacungcap',
    pk: ['MaNCC'],
    columns: [
      { key: 'MaNCC', label: 'Ma NCC', type: 'text' },
      { key: 'TenNCC', label: 'Ten NCC', type: 'text' },
      { key: 'DiaChi', label: 'Dia Chi', type: 'text' },
      { key: 'SDT', label: 'SDT', type: 'text' },
      { key: 'Email', label: 'Email', type: 'text' }
    ]
  },
  phuongthuctt: {
    label: 'Phuong Thuc TT',
    api: '/api/phuongthuctt',
    pk: ['MaPT'],
    columns: [
      { key: 'MaPT', label: 'Ma PT', type: 'text' },
      { key: 'TenPT', label: 'Ten PT', type: 'text' },
      { key: 'MoTa', label: 'Mo Ta', type: 'text' }
    ]
  },
  khuyenmai: {
    label: 'Khuyen Mai',
    api: '/api/khuyenmai',
    pk: ['MaKM'],
    columns: [
      { key: 'MaKM', label: 'Ma KM', type: 'text' },
      { key: 'TenKM', label: 'Ten KM', type: 'text' },
      { key: 'NgayBatDau', label: 'Ngay Bat Dau', type: 'date' },
      { key: 'NgayKetThuc', label: 'Ngay Ket Thuc', type: 'date' }
    ]
  },
  hoadon: {
    label: 'Hoa Don',
    api: '/api/hoadon',
    pk: ['MaHD'],
    columns: [
      { key: 'MaHD', label: 'Ma HD', type: 'text' },
      { key: 'NgayLap', label: 'Ngay Lap', type: 'date' },
      { key: 'TongTien', label: 'Tong Tien', type: 'number' },
      { key: 'MaNV', label: 'Ma NV', type: 'fk', fkTable: 'nhanvien', fkKey: 'MaNV', fkDisplay: 'HoTen' },
      { key: 'MaKH', label: 'Ma KH', type: 'fk', fkTable: 'khachhang', fkKey: 'MaKH', fkDisplay: 'HoTen' },
      { key: 'MaPT', label: 'Ma PT', type: 'fk', fkTable: 'phuongthuctt', fkKey: 'MaPT', fkDisplay: 'TenPT' }
    ]
  },
  chitiethoadon: {
    label: 'Chi Tiet Hoa Don',
    api: '/api/chitiethoadon',
    pk: ['MaHD', 'MaSP'],
    columns: [
      { key: 'MaHD', label: 'Ma HD', type: 'fk', fkTable: 'hoadon', fkKey: 'MaHD', fkDisplay: 'MaHD' },
      { key: 'MaSP', label: 'Ma SP', type: 'fk', fkTable: 'sanpham', fkKey: 'MaSP', fkDisplay: 'TenSP' },
      { key: 'SoLuong', label: 'So Luong', type: 'number' },
      { key: 'DonGia', label: 'Don Gia', type: 'number' }
    ]
  },
  phieunhap: {
    label: 'Phieu Nhap',
    api: '/api/phieunhap',
    pk: ['MaPN'],
    columns: [
      { key: 'MaPN', label: 'Ma PN', type: 'text' },
      { key: 'NgayNhap', label: 'Ngay Nhap', type: 'date' },
      { key: 'TongGiaTri', label: 'Tong Gia Tri', type: 'number' },
      { key: 'MaNCC', label: 'Ma NCC', type: 'fk', fkTable: 'nhacungcap', fkKey: 'MaNCC', fkDisplay: 'TenNCC' },
      { key: 'MaNV', label: 'Ma NV', type: 'fk', fkTable: 'nhanvien', fkKey: 'MaNV', fkDisplay: 'HoTen' }
    ]
  },
  chitietphieunhap: {
    label: 'Chi Tiet Phieu Nhap',
    api: '/api/chitietphieunhap',
    pk: ['MaPN', 'MaSP'],
    columns: [
      { key: 'MaPN', label: 'Ma PN', type: 'fk', fkTable: 'phieunhap', fkKey: 'MaPN', fkDisplay: 'MaPN' },
      { key: 'MaSP', label: 'Ma SP', type: 'fk', fkTable: 'sanpham', fkKey: 'MaSP', fkDisplay: 'TenSP' },
      { key: 'SoLuongNhap', label: 'So Luong Nhap', type: 'number' },
      { key: 'DonGiaNhap', label: 'Don Gia Nhap', type: 'number' },
      { key: 'GhiChu', label: 'Ghi Chu', type: 'text' }
    ]
  },
  apdungkm: {
    label: 'Ap Dung KM',
    api: '/api/apdungkm',
    pk: ['MaKM', 'MaSP'],
    columns: [
      { key: 'MaKM', label: 'Ma KM', type: 'fk', fkTable: 'khuyenmai', fkKey: 'MaKM', fkDisplay: 'TenKM' },
      { key: 'MaSP', label: 'Ma SP', type: 'fk', fkTable: 'sanpham', fkKey: 'MaSP', fkDisplay: 'TenSP' },
      { key: 'MucGiam', label: 'Muc Giam (%)', type: 'number' }
    ]
  },
  lichsudiem: {
    label: 'Lich Su Diem',
    api: '/api/lichsudiem',
    pk: ['MaGD'],
    columns: [
      { key: 'MaGD', label: 'Ma GD', type: 'number' },
      { key: 'MaKH', label: 'Ma KH', type: 'fk', fkTable: 'khachhang', fkKey: 'MaKH', fkDisplay: 'HoTen' },
      { key: 'NgayGD', label: 'Ngay GD', type: 'date' },
      { key: 'SoDiemThayDoi', label: 'So Diem Thay Doi', type: 'number' }
    ]
  }
};

let currentTable = null;
let editingRow = null;
const fkCache = {};

// ── Chart instances (for cleanup) ──
let chartInstances = {};

// ── Chart.js global defaults (Claymorphism style) ──
Chart.defaults.font.family = "'DM Sans', sans-serif";
Chart.defaults.font.size = 13;
Chart.defaults.color = '#635F69';
Chart.defaults.plugins.legend.labels.usePointStyle = true;
Chart.defaults.plugins.legend.labels.padding = 16;
Chart.defaults.elements.bar.borderRadius = 12;
Chart.defaults.elements.bar.borderSkipped = false;
Chart.defaults.responsive = true;
Chart.defaults.maintainAspectRatio = true;

// ── Sidebar Toggle ──
const layout = document.querySelector('.layout');
const sidebarToggle = document.getElementById('sidebarToggle');
const sidebarOpenBtn = document.getElementById('sidebarOpenBtn');

sidebarToggle.addEventListener('click', () => {
  const isMobile = window.innerWidth <= 768;
  if (isMobile) {
    layout.classList.remove('sidebar-open');
  } else {
    layout.classList.add('sidebar-collapsed');
  }
});

sidebarOpenBtn.addEventListener('click', () => {
  const isMobile = window.innerWidth <= 768;
  if (isMobile) {
    layout.classList.add('sidebar-open');
  } else {
    layout.classList.remove('sidebar-collapsed');
  }
});

// ── Navigation ──
const nav = document.getElementById('nav');

// Dashboard link
document.getElementById('navDashboard').addEventListener('click', (e) => {
  e.preventDefault();
  document.querySelectorAll('.sidebar a').forEach(el => el.classList.remove('active'));
  e.currentTarget.classList.add('active');
  showDashboard();
});

// Table links
for (const [key, t] of Object.entries(tables)) {
  const a = document.createElement('a');
  a.href = '#';
  a.innerHTML = `<span class="nav-icon"><i class="fas fa-table"></i></span> ${t.label}`;
  a.dataset.table = key;
  a.addEventListener('click', (e) => {
    e.preventDefault();
    document.querySelectorAll('.sidebar a').forEach(el => el.classList.remove('active'));
    a.classList.add('active');
    showTableView();
    loadTable(key);
  });
  nav.appendChild(a);
}

// ── View Switching ──
function showDashboard() {
  document.getElementById('dashboardView').style.display = '';
  document.getElementById('tableView').style.display = 'none';
  loadDashboard();
}

function showTableView() {
  document.getElementById('dashboardView').style.display = 'none';
  document.getElementById('tableView').style.display = '';
}

// ── Toast Notification ──
function showToast(message, type = 'error') {
  // Remove existing toast
  const existing = document.querySelector('.toast');
  if (existing) existing.remove();

  const toast = document.createElement('div');
  toast.className = 'toast toast-' + type;

  const iconMap = {
    error: 'fa-circle-exclamation',
    success: 'fa-circle-check',
    warning: 'fa-triangle-exclamation'
  };

  toast.innerHTML = `
    <i class="fas ${iconMap[type] || iconMap.error}"></i>
    <span class="toast-msg">${message}</span>
    <button class="toast-close"><i class="fas fa-xmark"></i></button>
  `;

  document.body.appendChild(toast);

  // Trigger animation
  requestAnimationFrame(() => toast.classList.add('show'));

  // Close button
  toast.querySelector('.toast-close').addEventListener('click', () => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 300);
  });

  // Auto dismiss
  setTimeout(() => {
    if (toast.parentNode) {
      toast.classList.remove('show');
      setTimeout(() => toast.remove(), 300);
    }
  }, 5000);
}

// ── Helpers ──
async function fetchJSON(url, opts) {
  const res = await fetch(url, opts);
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.error || 'Đã xảy ra lỗi');
  }
  return data;
}

async function getFkOptions(tableName) {
  if (fkCache[tableName]) return fkCache[tableName];
  const t = tables[tableName];
  const data = await fetchJSON(t.api);
  fkCache[tableName] = data;
  return data;
}

function formatDate(val) {
  if (!val) return '';
  return val.substring(0, 10);
}

function formatCurrency(val) {
  if (val == null) return '--';
  return Number(val).toLocaleString('vi-VN') + ' d';
}

// ── Set date display ──
const now = new Date();
const dateStr = now.toLocaleDateString('vi-VN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
document.getElementById('dashboardDate').textContent = dateStr;

// ══════════════════════════════════════════
//  DASHBOARD
// ══════════════════════════════════════════

async function loadDashboard() {
  try {
    const [stats, revenueByMonth, topProducts, salesByCategory, lowStock, recentInvoices, paymentMethods] = await Promise.all([
      fetchJSON('/api/dashboard/stats'),
      fetchJSON('/api/dashboard/revenue-by-month'),
      fetchJSON('/api/dashboard/top-products'),
      fetchJSON('/api/dashboard/sales-by-category'),
      fetchJSON('/api/dashboard/low-stock'),
      fetchJSON('/api/dashboard/recent-invoices'),
      fetchJSON('/api/dashboard/payment-methods')
    ]);

    // Stats
    document.getElementById('statRevenue').textContent = formatCurrency(stats.totalRevenue);
    document.getElementById('statProducts').textContent = stats.totalProducts;
    document.getElementById('statCustomers').textContent = stats.totalCustomers;
    document.getElementById('statInvoices').textContent = stats.totalInvoices;
    document.getElementById('statSuppliers').textContent = stats.totalSuppliers;
    document.getElementById('statEmployees').textContent = stats.totalEmployees;

    // Charts
    renderRevenueChart(revenueByMonth);
    renderTopProductsChart(topProducts);
    renderCategoryChart(salesByCategory);
    renderPaymentChart(paymentMethods);
    renderLowStock(lowStock);
    renderRecentInvoices(recentInvoices);

  } catch (err) {
    console.error('Dashboard load error:', err);
  }
}

// ── Candy-colored gradients for Chart.js ──
function createGradient(ctx, color1, color2, height) {
  const gradient = ctx.createLinearGradient(0, 0, 0, height || 280);
  gradient.addColorStop(0, color1);
  gradient.addColorStop(1, color2);
  return gradient;
}

const candyColors = [
  '#7C3AED', '#DB2777', '#0EA5E9', '#10B981', '#F59E0B',
  '#EF4444', '#8B5CF6', '#EC4899', '#06B6D4', '#14B8A6'
];

const candyColorsBg = [
  'rgba(124,58,237,0.18)', 'rgba(219,39,119,0.18)', 'rgba(14,165,233,0.18)',
  'rgba(16,185,129,0.18)', 'rgba(245,158,11,0.18)', 'rgba(239,68,68,0.18)',
  'rgba(139,92,246,0.18)', 'rgba(236,72,153,0.18)', 'rgba(6,182,212,0.18)',
  'rgba(20,184,166,0.18)'
];

function destroyChart(id) {
  if (chartInstances[id]) {
    chartInstances[id].destroy();
    delete chartInstances[id];
  }
}

// ── Revenue Chart (Bar + Line area) ──
function renderRevenueChart(data) {
  destroyChart('revenue');
  const canvas = document.getElementById('revenueChart');
  const ctx = canvas.getContext('2d');

  const gradient = createGradient(ctx, 'rgba(124,58,237,0.35)', 'rgba(124,58,237,0.02)', 300);

  chartInstances.revenue = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: data.map(d => d.month),
      datasets: [{
        label: 'Doanh Thu',
        data: data.map(d => d.revenue),
        backgroundColor: gradient,
        borderColor: '#7C3AED',
        borderWidth: 2,
        borderRadius: 16,
        borderSkipped: false,
        hoverBackgroundColor: 'rgba(124,58,237,0.5)'
      }]
    },
    options: {
      plugins: {
        legend: { display: false },
        tooltip: {
          backgroundColor: 'rgba(51,47,58,0.92)',
          titleFont: { family: "'Nunito', sans-serif", weight: '800' },
          bodyFont: { family: "'DM Sans', sans-serif" },
          padding: 14,
          cornerRadius: 16,
          callbacks: {
            label: (ctx) => ' ' + formatCurrency(ctx.parsed.y)
          }
        }
      },
      scales: {
        x: {
          grid: { display: false },
          ticks: { font: { weight: '600' } }
        },
        y: {
          grid: { color: 'rgba(139,92,246,0.06)' },
          ticks: {
            callback: (v) => (v / 1000) + 'k'
          }
        }
      }
    }
  });
}

// ── Top Products Chart (Horizontal Bar) ──
function renderTopProductsChart(data) {
  destroyChart('topProducts');
  const canvas = document.getElementById('topProductsChart');
  const ctx = canvas.getContext('2d');

  chartInstances.topProducts = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: data.map(d => d.TenSP),
      datasets: [{
        label: 'So Luong Ban',
        data: data.map(d => d.totalSold),
        backgroundColor: data.map((_, i) => candyColors[i % candyColors.length]),
        borderRadius: 12,
        borderSkipped: false
      }]
    },
    options: {
      indexAxis: 'y',
      plugins: {
        legend: { display: false },
        tooltip: {
          backgroundColor: 'rgba(51,47,58,0.92)',
          cornerRadius: 16,
          padding: 14,
          titleFont: { family: "'Nunito', sans-serif", weight: '800' }
        }
      },
      scales: {
        x: { grid: { color: 'rgba(139,92,246,0.06)' } },
        y: {
          grid: { display: false },
          ticks: { font: { weight: '600', size: 12 } }
        }
      }
    }
  });
}

// ── Category Chart (Doughnut) ──
function renderCategoryChart(data) {
  destroyChart('category');
  const canvas = document.getElementById('categoryChart');
  const ctx = canvas.getContext('2d');

  chartInstances.category = new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: data.map(d => d.TenNhom),
      datasets: [{
        data: data.map(d => d.totalAmount),
        backgroundColor: candyColors.slice(0, data.length),
        borderWidth: 4,
        borderColor: '#F4F1FA',
        hoverBorderColor: '#ffffff',
        hoverOffset: 8
      }]
    },
    options: {
      cutout: '62%',
      plugins: {
        legend: {
          position: 'bottom',
          labels: {
            padding: 16,
            font: { size: 12, weight: '600' }
          }
        },
        tooltip: {
          backgroundColor: 'rgba(51,47,58,0.92)',
          cornerRadius: 16,
          padding: 14,
          titleFont: { family: "'Nunito', sans-serif", weight: '800' },
          callbacks: {
            label: (ctx) => ' ' + ctx.label + ': ' + formatCurrency(ctx.parsed)
          }
        }
      }
    }
  });
}

// ── Payment Chart (Polar Area) ──
function renderPaymentChart(data) {
  destroyChart('payment');
  const canvas = document.getElementById('paymentChart');
  const ctx = canvas.getContext('2d');

  chartInstances.payment = new Chart(ctx, {
    type: 'polarArea',
    data: {
      labels: data.map(d => d.TenPT),
      datasets: [{
        data: data.map(d => d.count),
        backgroundColor: candyColorsBg.slice(0, data.length),
        borderColor: candyColors.slice(0, data.length),
        borderWidth: 2
      }]
    },
    options: {
      plugins: {
        legend: {
          position: 'bottom',
          labels: {
            padding: 16,
            font: { size: 12, weight: '600' }
          }
        },
        tooltip: {
          backgroundColor: 'rgba(51,47,58,0.92)',
          cornerRadius: 16,
          padding: 14,
          titleFont: { family: "'Nunito', sans-serif", weight: '800' },
          callbacks: {
            label: (ctx) => ' ' + ctx.label + ': ' + ctx.parsed + ' hóa đơn'
          }
        }
      },
      scales: {
        r: {
          grid: { color: 'rgba(139,92,246,0.06)' },
          ticks: { display: false }
        }
      }
    }
  });
}

// ── Low Stock ──
function renderLowStock(data) {
  const el = document.getElementById('lowStockList');
  if (!data.length) {
    el.innerHTML = '<div class="low-stock-empty">Tất cả sản phẩm còn đủ hàng!</div>';
    return;
  }
  el.innerHTML = data.map(item => {
    const level = item.SoLuongTon <= 50 ? 'danger' : 'warning';
    return `
      <div class="low-stock-item ${level}">
        <span class="low-stock-name">${item.TenSP}</span>
        <span class="low-stock-qty">${item.SoLuongTon} ${item.DonViTinh}</span>
      </div>`;
  }).join('');
}

// ── Recent Invoices ──
function renderRecentInvoices(data) {
  document.getElementById('recentInvoices').innerHTML = data.map(inv => `
    <tr>
      <td><strong>${inv.MaHD}</strong></td>
      <td>${formatDate(inv.NgayLap)}</td>
      <td>${inv.KhachHang}</td>
      <td>${inv.NhanVien}</td>
      <td>${inv.TenPT}</td>
      <td><span class="amount">${formatCurrency(inv.TongTien)}</span></td>
    </tr>
  `).join('');
}

// ══════════════════════════════════════════
//  CRUD TABLE VIEW
// ══════════════════════════════════════════

async function loadTable(key) {
  currentTable = key;
  const t = tables[key];
  document.getElementById('pageTitle').textContent = t.label;
  document.getElementById('btnAdd').style.display = '';

  delete fkCache[key];
  const data = await fetchJSON(t.api);

  // Head
  const thead = document.getElementById('tableHead');
  thead.innerHTML = '<tr>' +
    t.columns.map(c => `<th>${c.label}</th>`).join('') +
    '<th>Thao Tac</th></tr>';

  // Body
  const tbody = document.getElementById('tableBody');
  tbody.innerHTML = data.map(row => {
    const cells = t.columns.map(c => {
      let val = row[c.key];
      if (c.type === 'date') val = formatDate(val);
      if (c.type === 'number' && c.key.toLowerCase().includes('gia') || c.key === 'TongTien' || c.key === 'TongGiaTri') {
        return `<td><span class="amount">${val != null ? formatCurrency(val) : ''}</span></td>`;
      }
      return `<td>${val != null ? val : ''}</td>`;
    }).join('');

    const pkVal = t.pk.map(k => row[k]).join('/');
    return `<tr>
      ${cells}
      <td class="actions">
        <button class="btn btn-sm btn-edit" onclick="editRow('${pkVal}')">Sửa</button>
        <button class="btn btn-sm btn-danger" onclick="deleteRow('${pkVal}')">Xóa</button>
      </td>
    </tr>`;
  }).join('');
}

// ── Custom Styled Dropdown ──
function buildCustomSelect(name, options, fkKey, fkDisplay, currentVal, isDisabled) {
  const wrapper = document.createElement('div');
  wrapper.className = 'custom-select' + (isDisabled ? ' disabled' : '');
  wrapper.dataset.name = name;
  wrapper.dataset.value = currentVal;

  // Hidden native select for form data
  const hidden = document.createElement('input');
  hidden.type = 'hidden';
  hidden.name = name;
  hidden.value = currentVal;
  wrapper.appendChild(hidden);

  // Trigger
  const trigger = document.createElement('div');
  trigger.className = 'custom-select-trigger';
  trigger.tabIndex = 0;
  const selectedOpt = options.find(o => String(o[fkKey]) === String(currentVal));
  if (selectedOpt) {
    trigger.innerHTML = `<span class="option-key">${selectedOpt[fkKey]}</span><span class="option-hint">${selectedOpt[fkDisplay]}</span>`;
  } else {
    trigger.innerHTML = '<span class="placeholder">-- Chọn --</span>';
  }
  wrapper.appendChild(trigger);

  // Dropdown
  const dropdown = document.createElement('div');
  dropdown.className = 'custom-select-dropdown';

  // Search input
  const search = document.createElement('input');
  search.className = 'custom-select-search';
  search.type = 'text';
  search.placeholder = 'Tìm kiếm...';
  dropdown.appendChild(search);

  // Options container
  const optionsContainer = document.createElement('div');
  optionsContainer.className = 'custom-select-options';

  function renderOptions(filter) {
    const filtered = filter
      ? options.filter(o => {
          const text = (o[fkKey] + ' ' + o[fkDisplay]).toLowerCase();
          return text.includes(filter.toLowerCase());
        })
      : options;

    optionsContainer.innerHTML = '';

    if (!filtered.length) {
      optionsContainer.innerHTML = '<div class="custom-select-empty">Không tìm thấy</div>';
      return;
    }

    filtered.forEach(o => {
      const opt = document.createElement('div');
      opt.className = 'custom-select-option' + (String(o[fkKey]) === String(hidden.value) ? ' selected' : '');
      opt.innerHTML = `<span class="option-key">${o[fkKey]}</span><span class="option-label">${o[fkDisplay]}</span>`;
      opt.addEventListener('click', () => {
        hidden.value = o[fkKey];
        wrapper.dataset.value = o[fkKey];
        trigger.innerHTML = `<span class="option-key">${o[fkKey]}</span><span class="option-hint">${o[fkDisplay]}</span>`;
        wrapper.classList.remove('open');
        search.value = '';
        renderOptions('');
      });
      optionsContainer.appendChild(opt);
    });
  }

  renderOptions('');
  dropdown.appendChild(optionsContainer);
  wrapper.appendChild(dropdown);

  // Search filtering
  search.addEventListener('input', () => renderOptions(search.value));
  search.addEventListener('click', (e) => e.stopPropagation());

  // Toggle open/close
  if (!isDisabled) {
    trigger.addEventListener('click', (e) => {
      e.stopPropagation();
      // Close any other open dropdowns
      document.querySelectorAll('.custom-select.open').forEach(el => {
        if (el !== wrapper) el.classList.remove('open');
      });
      wrapper.classList.toggle('open');
      if (wrapper.classList.contains('open')) {
        setTimeout(() => search.focus(), 50);
      }
    });
  }

  return wrapper;
}

// Close dropdowns on outside click
document.addEventListener('click', () => {
  document.querySelectorAll('.custom-select.open').forEach(el => el.classList.remove('open'));
});

async function openModal(title, row) {
  const t = tables[currentTable];
  document.getElementById('modalTitle').textContent = title;
  const form = document.getElementById('modalForm');
  form.innerHTML = '';

  for (const col of t.columns) {
    const label = document.createElement('label');
    label.textContent = col.label;
    form.appendChild(label);

    if (col.type === 'fk') {
      const isDisabled = row && t.pk.includes(col.key);
      const currentVal = row ? (row[col.key] || '') : '';
      const options = await getFkOptions(col.fkTable);
      const wrapper = buildCustomSelect(col.key, options, col.fkKey, col.fkDisplay, currentVal, isDisabled);
      form.appendChild(wrapper);
    } else {
      const input = document.createElement('input');
      input.type = col.type === 'number' ? 'number' : col.type === 'date' ? 'date' : 'text';
      input.name = col.key;
      if (col.type === 'number') input.step = 'any';
      if (row) {
        input.value = col.type === 'date' ? formatDate(row[col.key]) : (row[col.key] != null ? row[col.key] : '');
      }
      if (row && t.pk.includes(col.key)) input.readOnly = true;
      form.appendChild(input);
    }
  }

  document.getElementById('modal').classList.remove('hidden');
}

function closeModal() {
  document.getElementById('modal').classList.add('hidden');
  editingRow = null;
}

function getFormData() {
  const form = document.getElementById('modalForm');
  const data = {};
  const t = tables[currentTable];
  for (const col of t.columns) {
    const el = form.querySelector(`[name="${col.key}"]`);
    let val = el.value;
    if (col.type === 'number' && val !== '') val = Number(val);
    data[col.key] = val === '' ? null : val;
  }
  return data;
}

async function saveRecord() {
  const t = tables[currentTable];
  const data = getFormData();

  try {
    if (editingRow) {
      const pkVal = t.pk.map(k => editingRow[k]).join('/');
      await fetchJSON(`${t.api}/${pkVal}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
    } else {
      await fetchJSON(t.api, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
    }
    closeModal();
    delete fkCache[currentTable];
    loadTable(currentTable);
    showToast(editingRow ? 'Cập nhật thành công!' : 'Thêm mới thành công!', 'success');
  } catch (err) {
    showToast(err.message, 'error');
  }
}

window.editRow = async function(pkVal) {
  const t = tables[currentTable];
  const row = await fetchJSON(`${t.api}/${pkVal}`);
  if (!row) return showToast('Không tìm thấy bản ghi', 'warning');
  editingRow = row;
  await openModal('Sửa ' + t.label, row);
};

window.deleteRow = async function(pkVal) {
  if (!confirm('Bạn có chắc chắn muốn xóa?')) return;
  const t = tables[currentTable];
  try {
    await fetchJSON(`${t.api}/${pkVal}`, { method: 'DELETE' });
    delete fkCache[currentTable];
    loadTable(currentTable);
    showToast('Xóa thành công!', 'success');
  } catch (err) {
    showToast(err.message, 'error');
  }
};

// ── Event Listeners ──
document.getElementById('btnAdd').addEventListener('click', () => {
  editingRow = null;
  openModal('Thêm ' + tables[currentTable].label, null);
});

document.getElementById('btnSave').addEventListener('click', saveRecord);
document.getElementById('btnCancel').addEventListener('click', closeModal);
document.getElementById('modalClose').addEventListener('click', closeModal);

// ── Load Dashboard on start ──
showDashboard();
