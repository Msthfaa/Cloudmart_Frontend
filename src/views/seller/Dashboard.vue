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
          </div>
          <div class="h-72 w-full">
            <Line v-if="chartData.labels && chartData.labels.length" :data="chartData" :options="chartOptions" />
            <div v-else class="h-full bg-gradient-to-b from-blue-50/50 to-transparent rounded-2xl border-2 border-dashed border-blue-200 flex items-center justify-center">
              <p class="text-blue-400 font-medium animate-pulse">Memuat data grafik...</p>
            </div>
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
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { Line } from 'vue-chartjs';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const stats = ref([
  { label: 'Total Penjualan', value: 'Rp 0', icon: '💰' },
  { label: 'Total Pesanan', value: '0', icon: '🛒' },
  { label: 'Total Produk', value: '0', icon: '📦' },
]);

const recentOrders = ref([]);
const chartData = ref({ labels: [], datasets: [] });
const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { display: false }
  },
  scales: {
    y: { beginAtZero: true }
  }
};

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
    // Sort desc (newest first)
    const sorted = orders.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
    
    recentOrders.value = sorted.slice(0, 3).map(o => ({
      id: o.id,
      buyer: o.user && o.user.name ? o.user.name : `User ${o.user_id}`,
      total: 'Rp ' + Number(o.grand_total).toLocaleString('id-ID'),
      status: o.payment_status === 'settlement' || o.payment_status === 'paid' ? 'Dibayar' : 'Menunggu',
      icon: '🛒'
    }));

    // Generate chart data (last 7 days)
    const last7Days = [...Array(7)].map((_, i) => {
      const d = new Date();
      d.setDate(d.getDate() - i);
      return d.toISOString().split('T')[0];
    }).reverse();

    const salesByDate = {};
    last7Days.forEach(date => salesByDate[date] = 0);

    orders.forEach(o => {
      if (o.payment_status === 'paid' || o.payment_status === 'settlement' || ['shipped', 'delivered', 'completed'].includes(o.status)) {
        const dateStr = new Date(o.created_at).toISOString().split('T')[0];
        if (salesByDate[dateStr] !== undefined) {
          salesByDate[dateStr] += Number(o.grand_total);
        }
      }
    });

    chartData.value = {
      labels: last7Days.map(d => {
        const dateObj = new Date(d);
        return dateObj.toLocaleDateString('id-ID', { month: 'short', day: 'numeric' });
      }),
      datasets: [
        {
          label: 'Omset',
          backgroundColor: '#3b82f6',
          borderColor: '#3b82f6',
          data: Object.values(salesByDate),
          tension: 0.4
        }
      ]
    };
  } catch (error) {
    console.error("Gagal memuat dashboard:", error);
  }
};

onMounted(() => {
  fetchData();
});
</script>