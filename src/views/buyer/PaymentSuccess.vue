<template>
  <div class="min-h-screen flex flex-col items-center justify-center py-16 px-4" style="background-color: #f5f4f0;">

    <!-- Animated Checkmark -->
    <div class="relative flex items-center justify-center mb-8">
      <!-- Outer glow ring -->
      <div class="w-52 h-52 rounded-full bg-green-100/60 flex items-center justify-center animate-pulse-slow">
        <!-- Middle ring -->
        <div class="w-36 h-36 rounded-full bg-green-200/70 flex items-center justify-center">
          <!-- Inner circle with check -->
          <div class="w-24 h-24 rounded-full bg-green-500 flex items-center justify-center shadow-xl shadow-green-300 check-pop">
            <svg class="w-11 h-11 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2.5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" class="check-draw"/>
            </svg>
          </div>
        </div>
      </div>
    </div>

    <!-- Title & Subtitle -->
    <h1 class="text-3xl font-black text-gray-900 mb-2 text-center">Payment Successful!</h1>
    <p class="text-sm text-gray-500 mb-8 text-center">
      The order confirmation has been sent to
      <strong class="text-gray-700">{{ order.email }}</strong>
    </p>

    <!-- Order Summary Card -->
    <div class="bg-white rounded-2xl shadow-sm border border-gray-200 w-full max-w-[520px] overflow-hidden mb-6">

      <!-- Product Row -->
      <div class="flex items-center gap-4 px-6 py-5 border-b border-gray-100">
        <div class="w-14 h-14 rounded-xl bg-stone-100 flex items-center justify-center text-2xl shrink-0">🎒</div>
        <div class="flex-1 min-w-0">
          <p class="text-sm font-bold text-gray-800">{{ order.productName }}</p>
          <p class="text-xs text-gray-400 mt-0.5">{{ order.variant }}</p>
        </div>
        <p class="text-sm font-bold text-gray-800 shrink-0">{{ order.productPrice }}</p>
      </div>

      <!-- Order Details -->
      <div class="px-6 py-5 space-y-3 border-b border-gray-100">
        <div class="flex items-center justify-between text-sm">
          <span class="text-gray-400">Waktu transaksi</span>
          <span class="text-gray-700 font-medium">{{ order.transactionTime }}</span>
        </div>
        <div class="flex items-center justify-between text-sm">
          <span class="text-gray-400">Metode pembayaran</span>
          <span class="text-gray-700 font-medium">{{ order.paymentMethod }}</span>
        </div>
        <div class="flex items-center justify-between text-sm">
          <span class="text-gray-400">Metode pengiriman</span>
          <span class="text-gray-700 font-medium">{{ order.shippingMethod }}</span>
        </div>
        <div class="flex items-center justify-between text-sm">
          <span class="text-gray-400">Total</span>
          <span class="text-gray-700 font-medium">{{ order.subtotal }}</span>
        </div>
        <div class="flex items-center justify-between text-sm">
          <span class="text-gray-400">Pajak</span>
          <span class="text-gray-700 font-medium">{{ order.tax }}</span>
        </div>
        <div class="flex items-center justify-between text-sm">
          <span class="text-gray-400">Pengiriman</span>
          <span class="text-green-600 font-bold">{{ order.shipping }}</span>
        </div>
      </div>

      <!-- Grand Total -->
      <div class="flex items-center justify-between px-6 py-5">
        <span class="font-black text-gray-900">Total</span>
        <span class="font-black text-gray-900 text-lg">{{ order.total }}</span>
      </div>
    </div>

    <!-- CTA -->
    <router-link
      to="/"
      class="block w-full max-w-[520px] py-4 bg-slate-800 hover:bg-slate-900 text-white text-center font-bold text-sm rounded-2xl transition-all active:scale-95 shadow-lg"
    >
      Continue Shopping
    </router-link>

  </div>
</template>

<script setup>
import { ref } from 'vue';

// ===================== ORDER DATA =====================
// TODO: Get from route state or axios.get(`/api/v1/orders/${orderId}`)
const order = ref({
  email: 'contohemail@hmail.com',
  productName: 'Nevada Ransel Backpack Elegan',
  variant: 'Brown / 18 INCH',
  productPrice: 'Rp. 450.000,00',
  transactionTime: new Date().toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }),
  paymentMethod: 'VA BCA',
  shippingMethod: 'Shopee Express',
  subtotal: 'Rp. 450.000,00',
  tax: 'Rp. 50.000,00',
  shipping: 'Free',
  total: 'Rp. 500.000,00',
});
</script>

<style scoped>
@keyframes pulse-slow {
  0%, 100% { opacity: 0.5; transform: scale(1); }
  50% { opacity: 0.8; transform: scale(1.04); }
}

@keyframes pop {
  0% { transform: scale(0); opacity: 0; }
  70% { transform: scale(1.15); }
  100% { transform: scale(1); opacity: 1; }
}

@keyframes draw {
  from { stroke-dashoffset: 40; opacity: 0; }
  to { stroke-dashoffset: 0; opacity: 1; }
}

.animate-pulse-slow {
  animation: pulse-slow 2.5s ease-in-out infinite;
}

.check-pop {
  animation: pop 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) both;
  animation-delay: 0.1s;
}

.check-draw {
  stroke-dasharray: 40;
  animation: draw 0.4s ease-out forwards;
  animation-delay: 0.4s;
  opacity: 0;
}
</style>
