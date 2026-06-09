<template>
  <div class="min-h-screen flex bg-white">

    <!-- ============================================================
         LEFT PANEL
    ============================================================ -->
    <div class="flex-1 flex flex-col px-14 py-10 max-w-[580px]">

      <!-- Logo -->
      <router-link to="/" class="flex flex-col items-start mb-8 w-fit">
        <div class="flex items-center gap-2 text-blue-500">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-9 h-9" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"/>
          </svg>
          <span class="text-xl font-black text-blue-600 tracking-tight">Cloudmart</span>
        </div>
      </router-link>

      <!-- Breadcrumb -->
      <div class="flex items-center gap-1.5 text-xs mb-8">
        <button @click="currentStep > 1 && goToStep(1)"
          :class="currentStep === 1 ? 'text-gray-700 font-semibold' : 'text-blue-500 hover:underline'">
          Informasi
        </button>
        <span class="text-gray-300 text-sm">›</span>
        <button @click="currentStep > 2 && goToStep(2)"
          :class="currentStep === 2 ? 'text-gray-700 font-semibold' : currentStep > 2 ? 'text-blue-500 hover:underline' : 'text-gray-400 cursor-default'">
          Pengiriman + Biaya Layanan
        </button>
        <span class="text-gray-300 text-sm">›</span>
        <span :class="currentStep === 3 ? 'text-gray-700 font-semibold' : 'text-gray-400'">Pembayaran</span>
      </div>

      <!-- ==================== STEP 1: INFORMASI ==================== -->
      <transition name="step-fade" mode="out-in">
      <div v-if="currentStep === 1" key="step1" class="space-y-6">

        <!-- Contact -->
        <div>
          <h3 class="text-base font-bold text-gray-800 mb-3">Kontak</h3>
          <div class="bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 flex items-center justify-between">
            <p class="text-sm text-gray-700">{{ form.email }}</p>
            <button @click="showEmailEdit = !showEmailEdit" class="text-xs text-blue-500 font-medium hover:underline">Ubah</button>
          </div>
          <div v-if="showEmailEdit" class="mt-2">
            <input v-model="form.email" type="email" class="w-full border border-gray-300 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300" />
          </div>
        </div>

        <!-- Address -->
        <div>
          <h3 class="text-base font-bold text-gray-800 mb-1">Alamat Pengiriman</h3>
          <p class="text-xs text-gray-400 mb-4">Pilih alamat pengiriman untuk pesanan ini.</p>

          <div v-if="savedAddresses.length === 0 && !loading" class="text-center py-8 bg-gray-50 border border-dashed border-gray-300 rounded-xl">
            <p class="text-sm text-gray-500 mb-3">Anda belum memiliki alamat tersimpan.</p>
            <button @click="router.push('/profile')" class="text-sm font-bold text-blue-600 bg-blue-50 px-4 py-2 rounded-lg hover:bg-blue-100 transition-colors">Tambah Alamat di Profil</button>
          </div>

          <div v-else class="space-y-3">
            <label v-for="addr in savedAddresses" :key="addr.id" 
              class="flex items-start gap-3 p-4 border rounded-xl cursor-pointer transition-all"
              :class="form.savedAddress === addr.id ? 'border-slate-800 bg-slate-50' : 'border-gray-200 hover:border-gray-300'">
              <input type="radio" :value="addr.id" v-model="form.savedAddress" class="mt-1 accent-slate-800" />
              <div>
                <p class="font-bold text-sm text-gray-800">{{ addr.recipient }} <span class="text-xs font-normal text-gray-500 ml-1">({{ addr.phone }})</span></p>
                <p class="text-xs text-gray-600 mt-1 leading-relaxed">{{ addr.address }}, {{ addr.city }}, {{ addr.state }}, {{ addr.country }} {{ addr.postal_code }}</p>
              </div>
            </label>
          </div>
        </div>

        <!-- Action -->
        <div class="flex justify-end pt-2">
          <button @click="goToStep(2)" :disabled="savedAddresses.length === 0 || !form.savedAddress" class="px-8 py-3 bg-slate-800 hover:bg-slate-900 text-white font-semibold text-sm rounded-xl transition-all disabled:opacity-50 active:scale-95 shadow-md">
            Lanjutkan ke pengiriman
          </button>
        </div>
      </div>
      </transition>

      <!-- ==================== STEP 2: PENGIRIMAN ==================== -->
      <transition name="step-fade" mode="out-in">
      <div v-if="currentStep === 2" key="step2" class="space-y-6">

        <!-- Summary info -->
        <div class="border border-gray-200 rounded-xl overflow-hidden text-sm">
          <div class="flex items-start justify-between px-4 py-3 border-b border-gray-100">
            <span class="text-gray-400 w-24 shrink-0">Hubungi</span>
            <span class="text-gray-700 flex-1 px-2">{{ form.email }}</span>
            <button @click="goToStep(1)" class="text-blue-500 text-xs hover:underline shrink-0">Ubah</button>
          </div>
          <div class="flex items-start justify-between px-4 py-3">
            <span class="text-gray-400 w-24 shrink-0">Dikirim ke</span>
            <span class="text-gray-700 flex-1 px-2">{{ fullAddress }}</span>
            <button @click="goToStep(1)" class="text-blue-500 text-xs hover:underline shrink-0">Ubah</button>
          </div>
        </div>

        <!-- Shipping method -->
        <div>
          <h3 class="text-base font-bold text-gray-800 mb-4">Metode Pengiriman</h3>
          <div class="space-y-3">
            <label
              v-for="method in shippingMethods"
              :key="method.id"
              class="flex items-center justify-between border-2 rounded-xl px-4 py-3.5 cursor-pointer transition-all"
              :class="form.shippingMethod === method.id
                ? 'border-slate-800 bg-slate-50'
                : 'border-gray-200 hover:border-gray-300'"
            >
              <div class="flex items-center gap-3">
                <input type="radio" :value="method.id" v-model="form.shippingMethod" class="accent-slate-800" />
                <span class="text-sm font-medium text-gray-700">{{ method.name }}</span>
              </div>
              <span class="text-sm font-bold text-gray-800">{{ method.price }}</span>
            </label>
          </div>
        </div>

        <!-- Actions -->
        <div class="flex items-center justify-between pt-2">
          <button @click="goToStep(1)" class="flex items-center gap-1 text-sm text-blue-500 hover:underline font-medium">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M15 19l-7-7 7-7"/></svg>
            Kembali ke informasi
          </button>
          <button @click="goToStep(3)" class="px-8 py-3 bg-slate-800 hover:bg-slate-900 text-white font-semibold text-sm rounded-xl transition-all active:scale-95 shadow-md">
            Lanjutkan ke pembayaran
          </button>
        </div>
      </div>
      </transition>

      <!-- ==================== STEP 3: PEMBAYARAN ==================== -->
      <transition name="step-fade" mode="out-in">
      <div v-if="currentStep === 3" key="step3" class="space-y-6">

        <!-- Summary info -->
        <div class="border border-gray-200 rounded-xl overflow-hidden text-sm">
          <div class="flex items-start justify-between px-4 py-3 border-b border-gray-100">
            <span class="text-gray-400 w-24 shrink-0">Hubungi</span>
            <span class="text-gray-700 flex-1 px-2">{{ form.email }}</span>
            <button @click="goToStep(1)" class="text-blue-500 text-xs hover:underline shrink-0">Ubah</button>
          </div>
          <div class="flex items-start justify-between px-4 py-3 border-b border-gray-100">
            <span class="text-gray-400 w-24 shrink-0">Dikirim ke</span>
            <span class="text-gray-700 flex-1 px-2">{{ fullAddress }}</span>
            <button @click="goToStep(1)" class="text-blue-500 text-xs hover:underline shrink-0">Ubah</button>
          </div>
          <div class="flex items-start justify-between px-4 py-3">
            <span class="text-gray-400 w-24 shrink-0">Metode pengiriman</span>
            <span class="text-gray-700 flex-1 px-2 font-medium">
              {{ selectedShippingName }} · <strong>{{ selectedShippingPrice }}</strong>
            </span>
          </div>
        </div>

        <!-- Payment Methods -->
        <div>
          <h3 class="text-base font-bold text-gray-800 mb-1">Pembayaran</h3>
          <p class="text-xs text-gray-400 mb-4">Alamat penagihan dari metode pembayaran Anda harus sesuai dengan alamat pengiriman. Semua transaksi sudah diamankan dan dienkripsi.</p>

          <div class="space-y-3">
            <!-- Midtrans -->
            <div
              class="border-2 rounded-xl overflow-hidden transition-all border-slate-800"
            >
              <label class="flex items-center justify-between px-4 py-3.5 cursor-pointer">
                <div class="flex items-center gap-3">
                  <input type="radio" value="midtrans" v-model="form.paymentMethod" class="accent-slate-800" checked />
                  <span class="text-sm font-medium text-gray-700">Pembayaran Online (Midtrans)</span>
                </div>
                <!-- Bank/E-wallet logos -->
                <div class="flex items-center gap-1.5">
                  <div class="px-2 py-1 bg-blue-500 text-white text-[9px] font-black rounded">BCA</div>
                  <div class="px-2 py-1 bg-green-500 text-white text-[9px] font-black rounded">GoPay</div>
                  <div class="px-2 py-1 bg-orange-500 text-white text-[9px] font-black rounded">ShopeePay</div>
                  <div class="text-[10px] text-gray-500 font-bold">+ lainnya</div>
                </div>
              </label>
              <div class="bg-gray-50 border-t border-gray-200 px-4 py-3 text-center">
                <p class="text-xs text-gray-500">Mendukung transfer bank (Virtual Account), e-Wallet (GoPay, ShopeePay, DANA), QRIS, Alfamart/Indomaret, dan Kartu Kredit.</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Legal -->
        <p class="text-[11px] text-gray-400">
          Dengan berbelanja, saya setuju dengan
          <a href="#" class="underline text-gray-600">Syarat &amp; Ketentuan</a> dan
          <a href="#" class="underline text-gray-600">Kebijakan Privasi</a> dari Cloudmart.
        </p>

        <!-- Actions -->
        <div class="flex items-center justify-between pt-2">
          <button @click="goToStep(2)" class="flex items-center gap-1 text-sm text-blue-500 hover:underline font-medium">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M15 19l-7-7 7-7"/></svg>
            Kembali ke pengiriman
          </button>
          <button
            @click="placeOrder"
            :disabled="!form.paymentMethod || placingOrder"
            class="px-8 py-3 bg-slate-800 hover:bg-slate-900 disabled:opacity-50 text-white font-semibold text-sm rounded-xl transition-all active:scale-95 shadow-md flex items-center gap-2"
          >
            <svg v-if="placingOrder" class="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"/><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/></svg>
            {{ placingOrder ? 'Memproses...' : 'Bayar Sekarang' }}
          </button>
        </div>
      </div>
      </transition>

    </div>

    <!-- ============================================================
         RIGHT PANEL — Order Summary
    ============================================================ -->
    <div class="flex-1 bg-[#f5f4f0] border-l border-gray-200 px-10 py-10">

      <!-- Products -->
      <div v-for="item in cartItems" :key="item.id" class="flex items-center gap-4 mb-6">
        <div class="relative w-16 h-16 rounded-xl bg-white flex items-center justify-center overflow-hidden border border-gray-200 shadow-sm shrink-0">
          <img v-if="item.variant_image" :src="item.variant_image" class="w-full h-full object-cover" />
          <span v-else class="text-3xl">📦</span>
          <span class="absolute -top-2 -right-2 w-5 h-5 bg-gray-500 text-white text-[10px] font-black rounded-full flex items-center justify-center z-10">{{ item.quantity }}</span>
        </div>
        <div class="flex-1 min-w-0">
          <p class="text-sm font-bold text-gray-800 leading-snug">{{ item.variant_name || 'Produk' }}</p>
          <p class="text-xs text-gray-500 mt-0.5">{{ item.variant_color }} / {{ item.variant_size }}</p>
        </div>
        <p class="text-sm font-bold text-gray-800 shrink-0">{{ formatRupiah(item.price * item.quantity) }}</p>
      </div>

      <!-- Voucher -->
      <div class="flex gap-2 mb-6">
        <input
          v-model="voucherCode"
          type="text"
          placeholder="Kode diskon atau voucher"
          :disabled="voucherApplied"
          class="flex-1 border border-gray-300 rounded-xl px-4 py-2.5 text-sm bg-white focus:outline-none focus:ring-1 focus:ring-gray-400 disabled:bg-gray-100"
        />
        <button 
          @click="applyVoucher"
          :disabled="voucherApplied || !voucherCode"
          class="px-5 py-2.5 border border-gray-300 bg-white text-sm font-semibold text-gray-700 rounded-xl hover:bg-gray-50 transition disabled:opacity-50">
          {{ voucherApplied ? 'Dipakai' : 'Pakai' }}
        </button>
      </div>

      <!-- Price Breakdown -->
      <div class="space-y-3 pt-4 border-t border-gray-300">
        <div class="flex items-center justify-between text-sm">
          <span class="text-gray-600">Subtotal</span>
          <span class="font-semibold text-gray-800">{{ formatRupiah(cartSubtotal) }}</span>
        </div>
        <div class="flex items-center justify-between text-sm">
          <span class="text-gray-600">Pengiriman + Biaya Layanan</span>
          <span :class="(currentStep >= 2 || estimateData) ? 'font-semibold text-gray-800' : 'text-gray-400 italic text-xs'">
            {{ (currentStep >= 2 || estimateData) ? (estimateData ? formatRupiah(estimateData.shipping_fee) : selectedShippingPrice) : 'Dihitung pada tahap berikutnya' }}
          </span>
        </div>
        <div v-if="estimateData && estimateData.discount > 0" class="flex items-center justify-between text-sm text-green-600">
          <span>Diskon ({{ estimateData.voucher_name || voucherCode }})</span>
          <span class="font-semibold">-{{ formatRupiah(estimateData.discount) }}</span>
        </div>
      </div>
      <div class="flex items-center justify-between mt-4 pt-4 border-t border-gray-300">
        <span class="font-bold text-gray-800">Jumlah</span>
        <div class="text-right">
          <span class="text-xs text-gray-400 mr-1">IDR</span>
          <span class="text-xl font-black text-gray-900">
            {{ formatRupiah(estimateData ? estimateData.grand_total : totalAmount) }}

          </span>
        </div>
      </div>

    </div>

  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { authService } from '../../services/auth';
import { cartService } from '../../services/cart';
import { orderService } from '../../services/order';
import { logisticService } from '../../services/logistic';
import { voucherService } from '../../services/voucher';
import { showToastError, showToastSuccess } from '../../services/api';
import Swal from 'sweetalert2';

const route = useRoute();
const router = useRouter();

const currentStep = ref(1);
const showEmailEdit = ref(false);
const voucherCode = ref('');
const loading = ref(true);
const placingOrder = ref(false);

// ===================== CART DATA =====================
const cartItems = ref([]);
const cartSubtotal = ref(0);
const cartItemIDs = ref([]);

// ===================== ADDRESSES =====================
const savedAddresses = ref([]);
const voucherApplied = ref(false);
const estimateData = ref(null);

// ===================== FORM DATA =====================
const form = ref({
  email: '',
  savedAddress: '',
  shippingMethod: '',
  paymentMethod: 'midtrans',
});

// ===================== SHIPPING OPTIONS =====================
const shippingMethods = ref([]);

// ===================== FETCH DATA =====================
const fetchData = async () => {
  loading.value = true;
  try {
    // Parse cart_item_ids from query
    if (route.query.items) {
      cartItemIDs.value = route.query.items.split(',').map(id => Number(id)).filter(id => !isNaN(id));
    }

    // Fetch profile
    const profile = await authService.getProfile();
    form.value.email = profile.email || '';

    // Fetch addresses
    try {
      const addresses = await authService.getAddresses();
      savedAddresses.value = Array.isArray(addresses) ? addresses : [];
      if (savedAddresses.value.length > 0) {
        form.value.savedAddress = savedAddresses.value[0].id;
      }
    } catch {
      savedAddresses.value = [];
    }

    // Fetch cart
    try {
      const cart = await cartService.getCart();
      if (cartItemIDs.value.length > 0) {
        cartItems.value = (cart.items || []).filter(item => cartItemIDs.value.includes(item.id));
        cartSubtotal.value = cartItems.value.reduce((sum, item) => sum + (item.price * item.quantity), 0);
      } else {
        cartItems.value = cart.items || [];
        cartSubtotal.value = cart.grand_total || 0;
      }
    } catch {
      cartItems.value = [];
    }

    // Fetch logistics
    try {
      const logistics = await logisticService.getLogistics();
      const methods = [];
      logistics.forEach(log => {
        if (log.services && log.services.length > 0) {
          log.services.forEach(srv => {
            methods.push({
              id: srv.id,
              name: `${log.name} - ${srv.name}`,
              priceValue: srv.base_price,
              price: formatRupiah(srv.base_price)
            });
          });
        }
      });
      shippingMethods.value = methods;
      if (methods.length > 0 && !form.value.shippingMethod) {
        form.value.shippingMethod = methods[0].id;
      }
    } catch {
      shippingMethods.value = [];
    }
  } catch (error) {
    showToastError('Gagal memuat data checkout.');
  } finally {
    loading.value = false;
  }
};

const goToStep = (step) => {
  currentStep.value = step;
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

const selectedShippingName = computed(() =>
  shippingMethods.value.find(m => m.id === form.value.shippingMethod)?.name || '-'
);
const selectedShippingPrice = computed(() =>
  shippingMethods.value.find(m => m.id === form.value.shippingMethod)?.price || '-'
);

// ===================== COMPUTED =====================
const fullAddress = computed(() => {
  const addr = savedAddresses.value.find(a => a.id === form.value.savedAddress);
  if (!addr) return 'Belum dipilih';
  return `${addr.address}, ${addr.city}, ${addr.state}`;
});

const formatRupiah = (amount) => {
  return `Rp ${Number(amount).toLocaleString('id-ID')},00`;
};

const totalAmount = computed(() => {
  if (currentStep.value >= 2) {
    const method = shippingMethods.value.find(m => m.id === form.value.shippingMethod);
    const shippingCost = method ? method.priceValue : 0;
    return cartSubtotal.value + shippingCost;
  }
  return cartSubtotal.value;
});

// ===================== ESTIMATE ORDER =====================
const fetchEstimate = async () => {
  if (!form.value.shippingMethod) return;
  try {
    const res = await orderService.estimateOrder(form.value.shippingMethod, voucherApplied.value ? voucherCode.value : '', cartItemIDs.value);
    estimateData.value = res;
  } catch {
    estimateData.value = null;
  }
};

const applyVoucher = async () => {
  const code = voucherCode.value.trim().toUpperCase();
  if (!code) return;
  try {
    await voucherService.claimVoucher(code);
    voucherApplied.value = true;
    voucherCode.value = code; // Update back the formatted value
    await fetchEstimate();
  } catch (error) {
    voucherApplied.value = false;
  }
};

watch(() => form.value.shippingMethod, () => {
  if (currentStep.value >= 2 && form.value.shippingMethod) {
    fetchEstimate();
  }
});

watch(currentStep, (newStep) => {
  if (newStep >= 2 && form.value.shippingMethod) {
    fetchEstimate();
  }
});

// ===================== PLACE ORDER =====================
const placeOrder = async () => {
  placingOrder.value = true;
  try {
    const addr = savedAddresses.value.find(a => a.id === form.value.savedAddress);
    if (!addr) {
      showToastError('Silakan pilih alamat terlebih dahulu');
      placingOrder.value = false;
      return;
    }
    const addressString = `${addr.recipient}, ${addr.phone}, ${addr.address}, ${addr.city}, ${addr.state}, ${addr.country} ${addr.postal_code}`.trim();

    let order;
    try {
      order = await orderService.checkout(addressString, form.value.shippingMethod, voucherCode.value, cartItemIDs.value);
    } catch (error) {
      // API error shown by service, just return
      placingOrder.value = false;
      return;
    }

    if (form.value.paymentMethod === 'midtrans' && order && order.id) {
      try {
        const paymentInfo = await orderService.initiatePayment(order.id);
        
        if (paymentInfo.payment_url) {
          window.location.href = paymentInfo.payment_url;
          return;
        }

        if (paymentInfo.snap_token && window.snap) {
          window.snap.pay(paymentInfo.snap_token, {
            onSuccess: () => router.push({ path: '/payment-success', query: { order_id: order.id } }),
            onPending: () => router.push('/orders'),
            onError: () => { showToastError('Pembayaran gagal.'); router.push('/orders'); },
            onClose: () => router.push('/orders'),
          });
          return;
        }
      } catch (error) {
        showToastError('Gagal menginisiasi pembayaran. Silakan bayar melalui menu Pesanan.');
        router.push('/orders');
        return;
      }
    }

    // Default: redirect ke payment success
    router.push({ path: '/payment-success', query: { order_id: order.id } });
  } catch (error) {
    // Other errors
  } finally {
    placingOrder.value = false;
  }
};

// ===================== INIT =====================
onMounted(() => {
  fetchData();
});
</script>

<style scoped>
.step-fade-enter-active,
.step-fade-leave-active {
  transition: all 0.25s ease;
}
.step-fade-enter-from {
  opacity: 0;
  transform: translateX(20px);
}
.step-fade-leave-to {
  opacity: 0;
  transform: translateX(-20px);
}
</style>
