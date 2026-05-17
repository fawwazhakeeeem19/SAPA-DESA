export const MOCK_USERS = {
  'warga@desa.id': { id: 1, role: 'warga', name: 'Budi Santoso', email: 'warga@desa.id', avatar: 'BS', rt: '003', rw: '002', desa: 'Ds. Mangunsari', kecamatan: 'Kec. Ungaran', kabupaten: 'Kab. Semarang', provinsi: 'Jawa Tengah', dusun: 'Dusun Krajan', hp: '0812-3456-7890' },
  'admin@desa.id': { id: 2, role: 'admin', name: 'Sugiyanto, S.IP', email: 'admin@desa.id', avatar: 'SG', jabatan: 'Kasi Pembangunan', desa: 'Ds. Mangunsari' },
}

export const MOCK_ADUAN = [
  { id: 'ADU-2025-047', pelapor: 'Siti Rahayu', pelaporId: 3, kategori: 'PJU Mati', judul: '3 titik PJU mati di jalan utama RT 005', deskripsi: '3 titik lampu jalan di sepanjang jalan utama RT 005 mati total. Sudah dilaporkan ke RT tapi belum ada tindakan. Sangat rawan kriminalitas di malam hari.', lokasi: 'RT 005/001, Ds. Mangunsari', patokan: 'Depan balai RT 005', urgensi: 'Mendesak', status: 'Baru', tanggal: '2025-04-07', userId: 3 },
  { id: 'ADU-2025-046', pelapor: 'Ahmad Fauzi', pelaporId: 4, kategori: 'Jalan Rusak', judul: 'Aspal mengelupas di jalan penghubung RT 002', deskripsi: 'Aspal di jalan penghubung RT 002 mengelupas dan mulai membentuk lubang kecil. Perlu ditambal sebelum musim hujan tiba.', lokasi: 'RT 002/003, Ds. Mangunsari', patokan: 'Antara warung Pak Hasan dan pos kamling', urgensi: 'Normal', status: 'Baru', tanggal: '2025-04-06', userId: 4 },
  { id: 'ADU-2025-045', pelapor: 'Dewi Lestari', pelaporId: 5, kategori: 'Drainase', judul: 'Saluran drainase tersumbat, banjir tiap hujan', deskripsi: 'Saluran drainase tersumbat sampah, menyebabkan banjir kecil setiap hujan. Sudah merendam 3 rumah warga di RT 004.', lokasi: 'RT 004/002, Ds. Mangunsari', patokan: 'Samping mushola Al-Ikhlas', urgensi: 'Darurat', status: 'Diproses', tanggal: '2025-04-05', userId: 5 },
  { id: 'ADU-2025-042', pelapor: 'Budi Santoso', pelaporId: 1, kategori: 'Jalan Rusak', judul: 'Lubang jalan besar di depan SDN 1 Mangunsari', deskripsi: 'Terdapat lubang jalan yang cukup besar (diameter ± 50cm) di depan SDN 1 Mangunsari. Lubang ini sudah ada sejak 3 minggu lalu dan sangat membahayakan pengendara motor, terutama saat malam hari karena pencahayaan minim.', lokasi: 'RT 003/002, Ds. Mangunsari', patokan: 'Depan SDN 1 Mangunsari', urgensi: 'Normal', status: 'Diproses', tanggal: '2025-04-05', userId: 1 },
  { id: 'ADU-2025-038', pelapor: 'Budi Santoso', pelaporId: 1, kategori: 'PJU Mati', judul: 'Lampu jalan RT 003 mati sudah 2 minggu', deskripsi: 'Lampu penerangan jalan di RT 003 dekat pertigaan mati sudah 2 minggu. Jalanan gelap gulita di malam hari.', lokasi: 'RT 003/002, Ds. Mangunsari', patokan: 'Pertigaan dekat warung Bu Sari', urgensi: 'Mendesak', status: 'Selesai', tanggal: '2025-04-01', selesaiPada: '2025-04-03', userId: 1 },
  { id: 'ADU-2025-031', pelapor: 'Budi Santoso', pelaporId: 1, kategori: 'Sanitasi', judul: 'Saluran air depan masjid tersumbat', deskripsi: 'Saluran air depan masjid Ar-Rahman tersumbat dedaunan dan sampah. Air tergenang dan menimbulkan bau tidak sedap.', lokasi: 'RT 003/002, Ds. Mangunsari', patokan: 'Depan Masjid Ar-Rahman', urgensi: 'Normal', status: 'Selesai', tanggal: '2025-03-22', selesaiPada: '2025-03-28', userId: 1 },
  { id: 'ADU-2025-019', pelapor: 'Budi Santoso', pelaporId: 1, kategori: 'Fasilitas Umum', judul: 'Bangku taman rusak di lapangan desa', deskripsi: 'Beberapa bangku di taman lapangan desa sudah rusak dan berbahaya bagi anak-anak yang bermain.', lokasi: 'RT 003/002, Ds. Mangunsari', patokan: 'Lapangan desa samping kantor desa', urgensi: 'Normal', status: 'Selesai', tanggal: '2025-03-10', selesaiPada: '2025-03-18', userId: 1 },
  { id: 'ADU-2025-007', pelapor: 'Budi Santoso', pelaporId: 1, kategori: 'Jalan Rusak', judul: 'Aspal mengelupas di jalan utama dusun', deskripsi: 'Permukaan aspal di jalan utama dusun sudah banyak yang mengelupas, terutama di beberapa titik yang sering dilalui kendaraan berat.', lokasi: 'RT 003/002, Ds. Mangunsari', patokan: 'Jalan utama depan kantor dusun', urgensi: 'Normal', status: 'Ditolak', alasanTolak: 'Penanganan sudah masuk dalam program APBD 2025, tidak perlu pengaduan khusus.', tanggal: '2025-02-15', userId: 1 },
]

export const KATEGORI_ADUAN = [
  'Jalan Rusak',
  'PJU / Lampu Jalan Mati',
  'Jembatan Rusak',
  'Drainase / Saluran Air',
  'Fasilitas Umum',
  'Sanitasi & Kebersihan',
  'Pohon Tumbang / Berbahaya',
  'Lainnya',
]

export const PROVINSI_LIST = ['Jawa Tengah', 'Jawa Timur', 'Jawa Barat', 'DI Yogyakarta', 'Sumatera Utara', 'Sulawesi Selatan', 'Bali', 'Kalimantan Selatan']

export const STATUS_COLOR = {
  'Baru':      { bg: '#dbeafe', color: '#1e40af' },
  'Diproses':  { bg: '#fef3c7', color: '#92400e' },
  'Selesai':   { bg: '#d1fae5', color: '#065f46' },
  'Ditolak':   { bg: '#fee2e2', color: '#991b1b' },
}

export const URGENSI_COLOR = {
  'Normal':   { bg: '#f3f4f6', color: '#374151' },
  'Mendesak': { bg: '#fef3c7', color: '#92400e' },
  'Darurat':  { bg: '#fee2e2', color: '#991b1b' },
}
