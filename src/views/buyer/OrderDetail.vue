<template>
  <div class="min-h-screen bg-gray-50 py-10">
    <div class="max-w-[800px] mx-auto px-6">
      
      <!-- Back Button -->
      <button @click="$router.push('/orders')" class="flex items-center gap-2 text-gray-500 hover:text-blue-600 transition mb-6 font-bold text-sm">
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
        Kembali ke Pesanan
      </button>

      <div v-if="loading" class="bg-white rounded-2xl p-6 shadow-sm animate-pulse space-y-4">
        <div class="h-6 bg-gray-200 rounded w-1/3"></div>
        <div class="h-4 bg-gray-200 rounded w-1/2"></div>
        <div class="h-24 bg-gray-200 rounded w-full"></div>
      </div>

      <div v-else-if="order" class="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        
        <!-- Header -->
        <div class="px-6 py-5 border-b border-gray-100 flex items-center justify-between bg-white">
          <div>
            <h1 class="text-xl font-black text-gray-900">Detail Pesanan</h1>
            <p class="text-sm text-gray-500 mt-1">Order ID: <span class="font-black uppercase text-gray-700">{{ order.id }}</span></p>
          </div>
          <div 
            class="px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wide"
            :class="statusColors[mapStatus(order.payment_status)]"
          >
            {{ statusLabelMap[order.payment_status] || order.payment_status }}
          </div>
        </div>

        <!-- Body -->
        <div class="p-6 space-y-6">
          
          <!-- Items -->
          <div>
            <h3 class="text-sm font-bold text-gray-800 mb-4">Produk yang Dibeli</h3>
            <div class="space-y-4">
              <div 
                v-for="item in order.order_items" 
                :key="item.id"
                class="flex items-start gap-4 p-4 border border-gray-100 rounded-xl"
              >
                <div class="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center text-2xl overflow-hidden">
                  <img v-if="item.variant?.image_url || item.variant?.product?.image_url" :src="item.variant?.image_url || item.variant?.product?.image_url" class="w-full h-full object-cover" />
                  <template v-else>📦</template>
                </div>
                <div class="flex-1">
                  <p class="text-xs text-gray-400 font-bold mb-1 uppercase tracking-wider">{{ item.variant?.product?.store?.name || 'Toko' }}</p>
                  <p class="text-sm font-bold text-gray-800 mb-1">{{ item.variant?.product?.name || item.variant_details || 'Produk' }}</p>
                  <p class="text-xs text-gray-500">{{ item.variant ? `${item.variant.color} - ${item.variant.size}` : item.variant_details }}</p>
                </div>
                <div class="text-right">
                  <p class="text-sm font-black text-gray-800">Rp {{ Number(item.price).toLocaleString('id-ID') }}</p>
                  <p class="text-xs text-gray-500">x{{ item.quantity }}</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Summary -->
          <div class="border-t border-gray-100 pt-6">
            <h3 class="text-sm font-bold text-gray-800 mb-4">Ringkasan Pembayaran</h3>
            <div class="space-y-2 text-sm">
              <div class="flex justify-between text-gray-600">
                <span>Total Harga Produk</span>
                <span class="font-medium">Rp {{ Number(order.total_amount || 0).toLocaleString('id-ID') }}</span>
              </div>
              <div class="flex justify-between text-gray-600">
                <span>Ongkos Kirim</span>
                <span class="font-medium">Rp {{ Number(order.shipping_cost || 0).toLocaleString('id-ID') }}</span>
              </div>
              <div class="flex justify-between text-lg font-black text-gray-900 pt-2 border-t border-gray-100 mt-2">
                <span>Total Belanja</span>
                <span>Rp {{ Number(order.grand_total || 0).toLocaleString('id-ID') }}</span>
              </div>
            </div>
          </div>

        </div>

        <!-- Footer Actions -->
        <div class="px-6 py-5 border-t border-gray-100 bg-gray-50/50 flex justify-end gap-3">
          <button 
            v-if="['pending', 'unpaid'].includes(order.payment_status)" 
            @click="cancelOrder" 
            class="px-6 py-2.5 bg-white border border-red-200 text-red-600 font-bold text-sm rounded-xl hover:bg-red-50 transition"
          >
            Batalkan Pesanan
          </button>
          <button 
            v-if="['pending', 'unpaid'].includes(order.payment_status)" 
            @click="payNow" 
            class="px-6 py-2.5 bg-blue-600 text-white font-bold text-sm rounded-xl hover:bg-blue-700 transition shadow-md shadow-blue-200"
          >
            Bayar Sekarang
          </button>
        </div>

      </div>

    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { orderService } from '../../services/order';
import { showToastSuccess, showToastError } from '../../services/api';
import api from '../../services/api'; // direct api call for cancel

const route = useRoute();
const router = useRouter();
const order = ref(null);
const loading = ref(true);

const statusColors = {
  unpaid: 'bg-red-50 text-red-600 border border-red-100',
  packing: 'bg-amber-50 text-amber-600 border border-amber-100',
  shipping: 'bg-blue-50 text-blue-600 border border-blue-100',
  completed: 'bg-green-50 text-green-600 border border-green-100',
  cancelled: 'bg-gray-100 text-gray-500 border border-gray-200',
  cancel: 'bg-gray-100 text-gray-500 border border-gray-200',
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
  cancel: 'Dibatalkan',
  expire: 'Kedaluwarsa',
  deny: 'Ditolak',
};

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
    cancel: 'cancelled',
    expire: 'cancelled',
    deny: 'cancelled',
  };
  return map[paymentStatus] || 'unpaid';
};

const fetchOrder = async () => {
  loading.value = true;
  try {
    const data = await orderService.getOrderById(route.params.id);
    order.value = data;
  } catch (error) {
    showToastError('Gagal memuat detail pesanan');
    router.push('/orders');
  } finally {
    loading.value = false;
  }
};

const payNow = async () => {
  if (order.value?.payment_url) {
    window.location.href = order.value.payment_url;
  } else {
    try {
      const paymentInfo = await orderService.initiatePayment(order.value.id);
      if (paymentInfo.payment_url) {
        window.location.href = paymentInfo.payment_url;
      } else if (paymentInfo.snap_token && window.snap) {
        window.snap.pay(paymentInfo.snap_token, {
          onSuccess: () => { fetchOrder(); },
          onPending: () => { fetchOrder(); },
          onError: () => showToastError('Pembayaran gagal.'),
          onClose: () => { fetchOrder(); },
        });
      }
    } catch (error) {
      showToastError('Gagal menginisiasi pembayaran.');
    }
  }
};

const cancelOrder = async () => {
  if (!confirm('Apakah Anda yakin ingin membatalkan pesanan ini?')) return;
  try {
    await api.post(`/orders/${order.value.id}/cancel`);
    showToastSuccess('Pesanan berhasil dibatalkan');
    fetchOrder();
  } catch (error) {
    showToastError('Gagal membatalkan pesanan');
  }
};

onMounted(() => {
  fetchOrder();
});
</script>
