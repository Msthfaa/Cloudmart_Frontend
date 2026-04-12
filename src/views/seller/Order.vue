<template>
  <div>
    <div class="flex justify-between items-end mb-8">
      <div>
        <p class="text-xs font-black text-blue-400 uppercase tracking-[0.2em] mb-1">Katalog Koleksi</p>
        <h2 class="text-3xl font-black text-slate-800 tracking-tight">Manajemen Pesanan</h2>
        <p class="text-slate-500 mt-1 font-medium italic">Kelola transaksi dan pantau pengiriman produk Anda.</p>
      </div>
      <div class="flex space-x-3">
        <button class="px-5 py-2.5 border border-blue-100 text-blue-600 rounded-2xl font-bold hover:bg-blue-50 transition text-sm">Ekspor Laporan</button>
        <button class="px-5 py-2.5 bg-slate-800 text-white rounded-2xl font-bold hover:bg-slate-900 shadow-lg transition text-sm">Tinjau Toko</button>
      </div>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
      <div v-for="s in summary" :key="s.label" class="bg-white p-6 rounded-3xl border border-blue-50 shadow-sm group hover:border-blue-400 transition-all">
        <div class="text-2xl mb-2">{{ s.icon }}</div>
        <p class="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">{{ s.label }}</p>
        <h4 class="text-2xl font-black text-slate-800">{{ s.value }}</h4>
      </div>
    </div>

    <div class="flex items-center space-x-8 mb-6 border-b border-blue-50 px-2">
      <button v-for="tab in ['Semua Pesanan', 'Baru', 'Diproses', 'Selesai', 'Dibatalkan']" 
              :key="tab"
              @click="activeTab = tab"
              :class="activeTab === tab ? 'text-blue-600 border-b-2 border-blue-600 pb-4' : 'text-slate-400 pb-4 hover:text-slate-600'"
              class="text-sm font-bold transition-all">
        {{ tab }}
      </button>
    </div>

    <DataTable :headers="['ID Pesanan', 'Tanggal', 'Nama Pelanggan', 'Total Jumlah', 'Status Pembayaran', 'Pemenuhan', 'Aksi']">
      <tr v-for="order in orders" :key="order.id" class="hover:bg-blue-50/30 transition duration-200">
        <td class="px-6 py-4 text-xs font-bold text-slate-800">
          {{ order.orderId }}
        </td>
        <td class="px-6 py-4 text-xs text-slate-500 font-medium">
          {{ order.date }}<br><span class="text-[10px] text-slate-400">{{ order.time }}</span>
        </td>
        <td class="px-6 py-4 text-sm font-bold text-slate-700">
          {{ order.customer }}
        </td>
        <td class="px-6 py-4 text-sm font-black text-slate-800">
          {{ order.total }}
        </td>
        <td class="px-6 py-4">
          <span :class="order.paymentStatus === 'Dibayar' ? 'text-green-600' : 'text-red-500'" class="text-xs font-bold">
            {{ order.paymentStatus }}
          </span>
        </td>
        <td class="px-6 py-4">
          <span :class="getStatusClass(order.fulfillment)" class="px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider">
            {{ order.fulfillment }}
          </span>
        </td>
        <td class="px-6 py-4 text-center">
          <button @click="viewDetail(order.orderId)" class="text-slate-400 hover:text-blue-600 font-black">⋮</button>
        </td>
      </tr>
    </DataTable>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import DataTable from '../../components/DataTable.vue';
import Swal from 'sweetalert2';

const activeTab = ref('Semua Pesanan');

const summary = [
  { label: 'Total Pesanan', value: '1.284', icon: '💼' },
  { label: 'Menunggu Pengiriman', value: '42', icon: '⏰' },
  { label: 'Dalam Perjalanan', value: '156', icon: '🚚' },
  { label: 'Pendapatan (Bln Ini)', value: 'Rp 99,5 jt', icon: '💳' }
];

const orders = [
  { orderId: '#ORD-2025-8976', date: '1 Jan', time: '14.20', customer: 'Mark Lee', total: 'Rp 2.500.000', paymentStatus: 'Dibayar', fulfillment: 'Diproses' },
  { orderId: '#ORD-2025-8977', date: '16 Okt', time: '14.20', customer: 'Jay', total: 'Rp 2.700.000', paymentStatus: 'Dibayar', fulfillment: 'Menunggu' },
  { orderId: '#ORD-2025-8978', date: '13 Mei', time: '14.20', customer: 'Jaehyun', total: 'Rp 8.000.000', paymentStatus: 'Dibayar', fulfillment: 'Terkirim' },
  { orderId: '#ORD-2025-8979', date: '15 Jan', time: '14.20', customer: 'Mingyu', total: 'Rp 1.800.000', paymentStatus: 'Gagal', fulfillment: 'Dibatalkan' },
];

const getStatusClass = (status) => {
  switch (status) {
    case 'Terkirim': return 'bg-green-100 text-green-600';
    case 'Diproses': return 'bg-blue-100 text-blue-600';
    case 'Menunggu': return 'bg-yellow-100 text-yellow-600';
    case 'Dibatalkan': return 'bg-red-100 text-red-600';
    default: return 'bg-gray-100 text-gray-600';
  }
};

const viewDetail = (id) => {
  Swal.fire({
    title: `Detail Pesanan ${id}`,
    html: `<div class="text-left text-sm">Customer: Mark Lee <br> Item: Adidas Adizero <br> Alamat: Surabaya, Indonesia</div>`,
    icon: 'info',
    confirmButtonColor: '#2563eb'
  });
};
</script>