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
          <button @click="viewDetail(order)" class="text-slate-400 hover:text-blue-600 font-black">⋮</button>
        </td>
      </tr>
    </DataTable>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { sellerOrdersService } from '../../services/sellerOrders';
import { showToastError } from '../../services/api';
import DataTable from '../../components/admin/DataTable.vue';
import Swal from 'sweetalert2';

const activeTab = ref('Semua Pesanan');
const ordersData = ref([]);
const loading = ref(true);

const fetchOrders = async () => {
  loading.value = true;
  try {
    ordersData.value = await sellerOrdersService.getOrders();
  } catch (error) {
    showToastError('Gagal memuat pesanan');
  } finally {
    loading.value = false;
  }
};

const orders = computed(() => {
  let filtered = ordersData.value;
  // TODO: filter by activeTab if needed, though status might be pending/processing/etc.
  return filtered.map(o => {
    const d = new Date(o.created_at);
    return {
      id: o.id,
      orderId: `#ORD-${o.id}`,
      date: d.toLocaleDateString('id-ID'),
      time: d.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }),
      customer: `User ID: ${o.user_id}`,
      total: 'Rp ' + Number(o.grand_total).toLocaleString('id-ID'),
      paymentStatus: o.payment_status === 'settlement' || o.payment_status === 'paid' ? 'Dibayar' : 'Menunggu',
      fulfillment: o.payment_status || 'Menunggu'
    };
  });
});

const summary = computed(() => [
  { label: 'Total Pesanan', value: ordersData.value.length, icon: '💼' },
  { label: 'Menunggu Pengiriman', value: ordersData.value.filter(o => o.payment_status === 'paid' || o.payment_status === 'settlement').length, icon: '⏰' },
  { label: 'Dalam Perjalanan', value: ordersData.value.filter(o => o.payment_status === 'shipped').length, icon: '🚚' },
  { label: 'Pendapatan', value: 'Lihat Dashboard', icon: '💳' }
]);



const getStatusClass = (status) => {
  switch (status) {
    case 'Terkirim': return 'bg-green-100 text-green-600';
    case 'Diproses': return 'bg-blue-100 text-blue-600';
    case 'Menunggu': return 'bg-yellow-100 text-yellow-600';
    case 'Dibatalkan': return 'bg-red-100 text-red-600';
    default: return 'bg-gray-100 text-gray-600';
  }
};

const viewDetail = (order) => {
  Swal.fire({
    title: `Detail Pesanan ${order.orderId}`,
    html: `<div class="text-left text-sm">Customer: ${order.customer} <br> Total: ${order.total} <br> Pembayaran: ${order.paymentStatus}</div>`,
    icon: 'info',
    confirmButtonColor: '#2563eb'
  });
};

onMounted(() => {
  fetchOrders();
});
</script>