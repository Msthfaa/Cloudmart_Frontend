<template>
  <div>
      <div class="mb-8">
        <h2 class="text-3xl font-extrabold text-slate-800 tracking-tight">Ringkasan Toko</h2>
        <p class="text-blue-600/70 font-medium">Pantau performa toko Cloudmart kamu hari ini.</p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div v-for="stat in stats" :key="stat.label" 
             class="group bg-white/80 backdrop-blur-sm p-6 rounded-3xl shadow-sm border border-blue-100 hover:border-blue-400 hover:shadow-blue-100 transition-all duration-300">
          <div class="flex items-center justify-between mb-4">
            <span class="p-3 rounded-2xl bg-blue-100 text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300 text-2xl">
              {{ stat.icon }}
            </span>
            <span class="text-blue-500 text-xs font-bold bg-blue-50 px-3 py-1 rounded-full border border-blue-100">+12%</span>
          </div>
          <p class="text-slate-500 text-sm font-semibold uppercase tracking-wider">{{ stat.label }}</p>
          <h3 class="text-2xl font-black text-slate-800 mt-1">{{ stat.value }}</h3>
        </div>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div class="lg:col-span-2 bg-white/90 backdrop-blur-sm p-8 rounded-3xl shadow-sm border border-blue-100">
          <div class="flex justify-between items-center mb-6">
            <h3 class="font-bold text-lg text-slate-800">Performa Penjualan</h3>
            <button @click="showAlert" class="px-4 py-2 bg-blue-50 text-blue-600 rounded-xl text-sm font-bold hover:bg-blue-600 hover:text-white transition-all">
              Filter Minggu Ini
            </button>
          </div>
          <div class="h-72 bg-gradient-to-b from-blue-50/50 to-transparent rounded-2xl border-2 border-dashed border-blue-200 flex items-center justify-center">
            <p class="text-blue-400 font-medium animate-pulse">Grafik sedang disiapkan...</p>
          </div>
        </div>

        <div class="bg-white/90 backdrop-blur-sm p-6 rounded-3xl shadow-sm border border-blue-100">
          <h3 class="font-bold text-lg mb-4 text-slate-800">Pesanan Terbaru</h3>
          <div class="space-y-3">
            <div v-for="order in recentOrders" :key="order.id" 
                 class="flex items-center justify-between p-4 bg-blue-50/30 hover:bg-blue-50 rounded-2xl transition border border-transparent hover:border-blue-100">
              <div class="flex items-center space-x-3">
                <div class="w-11 h-11 bg-white shadow-sm rounded-xl flex items-center justify-center text-xl border border-blue-50">
                  {{ order.icon || '📦' }}
                </div>
                <div>
                  <p class="text-sm font-bold text-slate-700">{{ order.buyer }}</p>
                  <p class="text-[10px] uppercase font-bold tracking-widest text-blue-400">{{ order.status }}</p>
                </div>
              </div>
              <p class="text-sm font-black text-slate-800">{{ order.total }}</p>
            </div>
          </div>
        </div>
      </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import Swal from 'sweetalert2';
import { sellerDashboardService } from '../../services/sellerDashboard';
import { sellerOrdersService } from '../../services/sellerOrders';

const stats = ref([
  { label: 'Total Penjualan', value: 'Rp 0', icon: '💰' },
  { label: 'Total Pesanan', value: '0', icon: '🛒' },
  { label: 'Total Produk', value: '0', icon: '📦' },
]);

const recentOrders = ref([]);

const fetchData = async () => {
  try {
    const summary = await sellerDashboardService.getSummary();
    stats.value = [
      { label: 'Total Penjualan', value: 'Rp ' + Number(summary.total_revenue).toLocaleString('id-ID'), icon: '💰' },
      { label: 'Total Pesanan', value: summary.total_orders, icon: '🛒' },
      { label: 'Total Produk', value: summary.total_products, icon: '📦' },
    ];
    
    // Fetch orders for the recent list
    const orders = await sellerOrdersService.getOrders();
    // Sort desc (newest first), take top 3
    const sorted = orders.sort((a, b) => new Date(b.created_at) - new Date(a.created_at)).slice(0, 3);
    
    recentOrders.value = sorted.map(o => ({
      id: o.id,
      buyer: `User ${o.user_id}`,
      total: 'Rp ' + Number(o.grand_total).toLocaleString('id-ID'),
      status: o.payment_status === 'settlement' || o.payment_status === 'paid' ? 'Dibayar' : 'Menunggu',
      icon: '🛒'
    }));
  } catch (error) {
    console.error("Gagal memuat dashboard:", error);
  }
};

onMounted(() => {
  fetchData();
});



const showAlert = () => {
  Swal.fire({
    title: 'Ganti Periode?',
    text: "Fitur ini masih dalam pengembangan, kawan!",
    icon: 'info',
    confirmButtonText: 'Gaskeun!',
    confirmButtonColor: '#1e293b', // Warna slate-800
    borderRadius: '20px'
  });
};
</script>