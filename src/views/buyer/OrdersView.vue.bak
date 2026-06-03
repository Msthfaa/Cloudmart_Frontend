<template>
  <div class="min-h-screen bg-gray-50 py-10">
    <div class="max-w-[1000px] mx-auto px-6">
      
      <h1 class="text-2xl font-black text-gray-900 mb-6">Pesanan Saya</h1>

      <!-- Tabs -->
      <div class="bg-white rounded-2xl shadow-sm mb-6 flex overflow-hidden">
        <button 
          v-for="tab in tabs" 
          :key="tab.id"
          @click="activeTab = tab.id"
          class="flex-1 py-4 text-sm font-bold transition-all border-b-2"
          :class="activeTab === tab.id 
            ? 'border-blue-600 text-blue-600 bg-blue-50/50' 
            : 'border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-50'"
        >
          {{ tab.label }}
          <span v-if="getTabCount(tab.id)" class="ml-1.5 bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full text-[10px]">
            {{ getTabCount(tab.id) }}
          </span>
        </button>
      </div>

      <!-- Orders List -->
      <div class="space-y-4">
        <!-- Loading State -->
        <template v-if="loading">
          <div v-for="i in 3" :key="i" class="bg-white rounded-2xl p-6 shadow-sm animate-pulse">
            <div class="flex items-center gap-4">
              <div class="w-20 h-20 bg-gray-200 rounded-xl"></div>
              <div class="flex-1 space-y-3">
                <div class="h-3 bg-gray-200 rounded w-1/4"></div>
                <div class="h-4 bg-gray-200 rounded w-1/2"></div>
                <div class="h-3 bg-gray-200 rounded w-1/3"></div>
              </div>
              <div class="h-6 bg-gray-200 rounded w-24"></div>
            </div>
          </div>
        </template>
        <!-- Empty State -->
        <div v-else-if="!loading && filteredOrders.length === 0" class="bg-white rounded-2xl p-16 text-center shadow-sm">
          <span class="text-7xl mb-5 block">📦</span>
          <h3 class="text-xl font-black text-gray-800 mb-2">Belum ada pesanan</h3>
          <p class="text-gray-500 text-sm mb-8">Kamu belum memiliki pesanan dengan status ini.</p>
          <router-link to="/" class="px-8 py-3.5 bg-blue-600 text-white rounded-xl font-bold text-sm hover:bg-blue-700 transition shadow-lg shadow-blue-200">
            Mulai Belanja
          </router-link>
        </div>

        <!-- Order Card -->
        <div 
          v-for="order in filteredOrders" 
          :key="order.id"
          class="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow"
        >
          <!-- Header -->
          <div class="px-6 py-4 border-b border-gray-100 flex items-center justify-between bg-white">
            <div class="flex items-center gap-3">
              <span class="text-lg">🏪</span>
              <span class="text-sm font-bold text-gray-800">Cloudmart Official Store</span>
              <span class="text-gray-300">|</span>
              <span class="text-xs text-gray-500">{{ order.date }}</span>
              <span class="text-gray-300">|</span>
              <span class="text-xs font-black text-gray-500 uppercase tracking-wider">{{ order.id }}</span>
            </div>
            <div 
              class="px-3 py-1.5 rounded-lg text-[11px] font-black uppercase tracking-wide"
              :class="statusColors[order.status]"
            >
              {{ order.statusLabel }}
            </div>
          </div>

          <!-- Body (Items) -->
          <div class="p-6 cursor-pointer group" @click="$router.push(`/orders/${order.id}`)">
            <div class="flex items-start gap-5">
              <div 
                class="w-20 h-20 rounded-xl flex items-center justify-center text-3xl shrink-0 border border-gray-100 transition-transform group-hover:scale-105"
                :class="order.items[0].bg"
              >
                {{ order.items[0].emoji }}
              </div>
              <div class="flex-1 min-w-0">
                <p class="text-[10px] text-gray-400 uppercase tracking-widest font-bold mb-1">{{ order.items[0].brand }}</p>
                <p class="text-sm font-bold text-gray-800 mb-1 leading-snug truncate">{{ order.items[0].name }}</p>
                <p class="text-xs text-gray-500 mb-3">{{ order.items[0].variant }} · {{ order.items[0].qty }} barang</p>
                
                <div v-if="order.items.length > 1" class="text-xs font-bold text-blue-600 bg-blue-50 inline-block px-3 py-1.5 rounded-lg">
                  + {{ order.items.length - 1 }} produk lainnya
                </div>
              </div>
              <div class="text-right shrink-0 border-l border-gray-100 pl-6 ml-4">
                <p class="text-xs text-gray-400 mb-1 font-medium">Total Belanja</p>
                <p class="text-lg font-black text-gray-900">{{ order.totalAmount }}</p>
              </div>
            </div>
          </div>

          <!-- Footer (Actions) -->
          <div class="px-6 py-4 border-t border-gray-100 flex items-center justify-end gap-3 bg-gray-50/50">
            <p v-if="order.status === 'shipping'" class="mr-auto text-xs text-gray-500 font-medium">Estimasi tiba: <strong class="text-gray-800">Besok</strong></p>
            
            <button v-if="order.status === 'unpaid'" @click="payNow(order)" class="px-6 py-2.5 bg-blue-600 text-white font-bold text-sm rounded-xl hover:bg-blue-700 transition shadow-md shadow-blue-200">
              Bayar Sekarang
            </button>
            <button v-if="order.status === 'shipping'" class="px-6 py-2.5 bg-slate-800 text-white font-bold text-sm rounded-xl hover:bg-slate-900 transition shadow-md">
              Lacak Pesanan
            </button>
            <button v-if="order.status === 'completed'" class="px-6 py-2.5 bg-white border border-gray-300 text-gray-700 font-bold text-sm rounded-xl hover:bg-gray-50 transition">
              Beli Lagi
            </button>
            <button v-if="order.status === 'completed'" class="px-6 py-2.5 bg-blue-600 text-white font-bold text-sm rounded-xl hover:bg-blue-700 transition shadow-md shadow-blue-200">
              Beri Ulasan
            </button>
            
            <router-link
              :to="`/orders/${order.id}`"
              class="px-6 py-2.5 bg-white border border-gray-300 text-gray-700 font-bold text-sm rounded-xl hover:bg-gray-50 transition"
              v-if="order.status !== 'completed'"
            >
              Detail
            </router-link>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { orderService } from '../../services/order';
import { showToastError } from '../../services/api';

const activeTab = ref('all');
const loading = ref(true);

const tabs = [
  { id: 'all', label: 'Semua' },
  { id: 'unpaid', label: 'Belum Bayar' },
  { id: 'packing', label: 'Dikemas' },
  { id: 'shipping', label: 'Dikirim' },
  { id: 'completed', label: 'Selesai' },
  { id: 'cancelled', label: 'Dibatalkan' },
];

const statusColors = {
  unpaid: 'bg-red-50 text-red-600 border border-red-100',
  pending: 'bg-red-50 text-red-600 border border-red-100',
  packing: 'bg-amber-50 text-amber-600 border border-amber-100',
  processing: 'bg-amber-50 text-amber-600 border border-amber-100',
  shipping: 'bg-blue-50 text-blue-600 border border-blue-100',
  shipped: 'bg-blue-50 text-blue-600 border border-blue-100',
  completed: 'bg-green-50 text-green-600 border border-green-100',
  settlement: 'bg-green-50 text-green-600 border border-green-100',
  paid: 'bg-green-50 text-green-600 border border-green-100',
  cancelled: 'bg-gray-100 text-gray-500 border border-gray-200',
  expire: 'bg-gray-100 text-gray-500 border border-gray-200',
  deny: 'bg-red-50 text-red-600 border border-red-100',
};

const statusLabelMap = {
  pending: 'Menunggu Pembayaran',
  unpaid: 'Menunggu Pembayaran',
  processing: 'Sedang Dikemas',
  packing: 'Sedang Dikemas',
  shipped: 'Sedang Dikirim',
  shipping: 'Sedang Dikirim',
  settlement: 'Selesai',
  paid: 'Selesai',
  completed: 'Selesai',
  cancelled: 'Dibatalkan',
  expire: 'Kedaluwarsa',
  deny: 'Ditolak',
};

// Map payment_status to internal tab status
const mapStatus = (paymentStatus) => {
  const map = {
    pending: 'unpaid',
    unpaid: 'unpaid',
    processing: 'packing',
    packing: 'packing',
    shipped: 'shipping',
    shipping: 'shipping',
    settlement: 'completed',
    paid: 'completed',
    completed: 'completed',
    cancelled: 'cancelled',
    expire: 'cancelled',
    deny: 'cancelled',
  };
  return map[paymentStatus] || 'unpaid';
};

// ===================== DATA =====================
const orders = ref([]);

const fetchOrders = async () => {
  loading.value = true;
  try {
    const data = await orderService.getOrders();
    orders.value = (Array.isArray(data) ? data : []).map(order => {
      const items = order.order_items || [];
      return {
        id: order.id || '-',
        date: order.created_at ? new Date(order.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' }) : '-',
        status: mapStatus(order.payment_status),
        statusLabel: statusLabelMap[order.payment_status] || order.payment_status || '-',
        totalAmount: `Rp ${Number(order.grand_total || 0).toLocaleString('id-ID')}`,
        paymentUrl: order.payment_url || null,
        items: items.length > 0
          ? items.map(item => ({
              productId: item.product_id || null,
              brand: item.brand || '',
              name: item.name || item.variant_name || 'Produk',
              variant: item.variant_name || '',
              qty: item.quantity || 1,
              emoji: '📦',
              bg: 'bg-gray-100',
            }))
          : [{ productId: null, brand: '', name: 'Order Item', variant: '-', qty: 1, emoji: '📦', bg: 'bg-gray-100' }],
      };
    });
  } catch (error) {
    orders.value = [];
  } finally {
    loading.value = false;
  }
};

const getTabCount = (tabId) => {
  if (tabId === 'all') return 0;
  return orders.value.filter(o => o.status === tabId).length;
};

const filteredOrders = computed(() => {
  if (activeTab.value === 'all') return orders.value;
  return orders.value.filter(o => o.status === activeTab.value);
});

// ===================== ACTIONS =====================
const payNow = (order) => {
  if (order.paymentUrl) {
    window.location.href = order.paymentUrl;
  }
};

// ===================== INIT =====================
onMounted(() => {
  fetchOrders();
});
</script>
