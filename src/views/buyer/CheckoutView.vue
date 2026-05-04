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
          Pengiriman + Biaya Layanan (Rp 50.000)
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
          <p class="text-xs text-gray-400 mb-4">Alamat ini juga akan digunakan sebagai alamat penagihan untuk pesanan ini.</p>

          <!-- Saved address dropdown -->
          <div class="relative mb-3">
            <label class="absolute top-2 left-4 text-[10px] text-gray-400 font-medium uppercase tracking-wide">Alamat tersimpan</label>
            <select v-model="form.savedAddress" class="w-full border border-gray-300 rounded-xl pt-6 pb-2.5 px-4 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-300 appearance-none bg-white">
              <option value="new">Pakai alamat baru</option>
              <option value="saved1">Jl. Raya Surabaya No.10</option>
            </select>
            <svg class="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/></svg>
          </div>

          <!-- Country -->
          <div class="relative mb-3">
            <label class="absolute top-2 left-4 text-[10px] text-gray-400 font-medium uppercase tracking-wide">Negara/Wilayah</label>
            <select v-model="form.country" class="w-full border border-gray-300 rounded-xl pt-6 pb-2.5 px-4 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-300 appearance-none bg-white">
              <option>Indonesia</option>
              <option>Malaysia</option>
              <option>Singapore</option>
            </select>
            <svg class="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/></svg>
          </div>

          <!-- First & Last name -->
          <div class="flex gap-3 mb-3">
            <div class="flex-1 relative">
              <label class="absolute top-2 left-4 text-[10px] text-gray-400 font-medium uppercase tracking-wide">Nama depan (opsional)</label>
              <input v-model="form.firstName" class="w-full border border-gray-300 rounded-xl pt-6 pb-2.5 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300" />
            </div>
            <div class="flex-1 relative">
              <label class="absolute top-2 left-4 text-[10px] text-gray-400 font-medium uppercase tracking-wide">Nama belakang</label>
              <input v-model="form.lastName" class="w-full border border-gray-300 rounded-xl pt-6 pb-2.5 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300" />
            </div>
          </div>

          <!-- Address -->
          <div class="relative mb-3">
            <label class="absolute top-2 left-4 text-[10px] text-gray-400 font-medium uppercase tracking-wide">Alamat</label>
            <input v-model="form.address" class="w-full border border-gray-300 rounded-xl pt-6 pb-2.5 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300" />
          </div>

          <!-- District & Code -->
          <div class="flex gap-3 mb-3">
            <div class="flex-1 relative">
              <label class="absolute top-2 left-4 text-[10px] text-gray-400 font-medium uppercase tracking-wide">Daerah</label>
              <select v-model="form.district" class="w-full border border-gray-300 rounded-xl pt-6 pb-2.5 px-4 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-300 appearance-none bg-white">
                <option>Indonesia</option><option>Surabaya</option><option>Sidoarjo</option>
              </select>
              <svg class="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/></svg>
            </div>
            <div class="flex-1 relative">
              <label class="absolute top-2 left-4 text-[10px] text-gray-400 font-medium uppercase tracking-wide">Kode</label>
              <select v-model="form.kode" class="w-full border border-gray-300 rounded-xl pt-6 pb-2.5 px-4 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-300 appearance-none bg-white">
                <option>Indonesia</option><option>60111</option>
              </select>
              <svg class="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/></svg>
            </div>
          </div>

          <!-- Province & Postal -->
          <div class="flex gap-3">
            <div class="flex-1 relative">
              <label class="absolute top-2 left-4 text-[10px] text-gray-400 font-medium uppercase tracking-wide">Provinsi</label>
              <select v-model="form.province" class="w-full border border-gray-300 rounded-xl pt-6 pb-2.5 px-4 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-300 appearance-none bg-white">
                <option>Jawa Timur</option><option>Jawa Barat</option><option>DKI Jakarta</option>
              </select>
              <svg class="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/></svg>
            </div>
            <div class="flex-1 relative">
              <label class="absolute top-2 left-4 text-[10px] text-gray-400 font-medium uppercase tracking-wide">Kode pos</label>
              <input v-model="form.postalCode" type="text" class="w-full border border-gray-300 rounded-xl pt-6 pb-2.5 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300" />
            </div>
          </div>
        </div>

        <!-- Action -->
        <div class="flex justify-end pt-2">
          <button @click="goToStep(2)" class="px-8 py-3 bg-slate-800 hover:bg-slate-900 text-white font-semibold text-sm rounded-xl transition-all active:scale-95 shadow-md">
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
              class="border-2 rounded-xl overflow-hidden transition-all"
              :class="form.paymentMethod === 'midtrans' ? 'border-slate-800' : 'border-gray-200'"
            >
              <label class="flex items-center justify-between px-4 py-3.5 cursor-pointer">
                <div class="flex items-center gap-3">
                  <input type="radio" value="midtrans" v-model="form.paymentMethod" class="accent-slate-800" />
                  <span class="text-sm font-medium text-gray-700">Payment via Midtrans</span>
                </div>
                <!-- Bank logos -->
                <div class="flex items-center gap-1.5">
                  <div class="px-2 py-1 bg-blue-700 text-white text-[9px] font-black rounded">BCA</div>
                  <div class="px-2 py-1 bg-yellow-500 text-white text-[9px] font-black rounded">MANDIRI</div>
                  <div class="text-[10px] text-gray-500 font-bold">+22</div>
                </div>
              </label>
              <div v-if="form.paymentMethod === 'midtrans'" class="bg-gray-50 border-t border-gray-200 px-4 py-3 text-center">
                <p class="text-xs text-gray-500">Mengalihkan Anda ke Payments via Midtrans untuk menyelesaikan pembelian.</p>
              </div>
            </div>

            <!-- Atome -->
            <label
              class="flex items-center justify-between border-2 rounded-xl px-4 py-3.5 cursor-pointer transition-all"
              :class="form.paymentMethod === 'atome' ? 'border-slate-800 bg-slate-50' : 'border-gray-200 hover:border-gray-300'"
            >
              <div class="flex items-center gap-3">
                <input type="radio" value="atome" v-model="form.paymentMethod" class="accent-slate-800" />
                <span class="text-sm font-medium text-gray-700">Atome PayLater – 3 easy payments, 0% interest</span>
              </div>
            </label>

            <!-- COD -->
            <label
              class="flex items-center justify-between border-2 rounded-xl px-4 py-3.5 cursor-pointer transition-all"
              :class="form.paymentMethod === 'cod' ? 'border-slate-800 bg-slate-50' : 'border-gray-200 hover:border-gray-300'"
            >
              <div class="flex items-center gap-3">
                <input type="radio" value="cod" v-model="form.paymentMethod" class="accent-slate-800" />
                <span class="text-sm font-medium text-gray-700">Bayar di Tempat (COD)</span>
              </div>
            </label>
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

      <!-- Product -->
      <div class="flex items-center gap-4 mb-6">
        <div class="relative w-16 h-16 rounded-xl bg-white flex items-center justify-center text-3xl border border-gray-200 shadow-sm shrink-0">
          🎒
          <span class="absolute -top-2 -right-2 w-5 h-5 bg-gray-500 text-white text-[10px] font-black rounded-full flex items-center justify-center">1</span>
        </div>
        <div class="flex-1 min-w-0">
          <p class="text-sm font-bold text-gray-800 leading-snug">Nevada Ransel Backpack Elegan</p>
          <p class="text-xs text-gray-500 mt-0.5">Brown / 18 INCH</p>
        </div>
        <p class="text-sm font-bold text-gray-800 shrink-0">Rp. 450.000,00</p>
      </div>

      <!-- Voucher -->
      <div class="flex gap-2 mb-6">
        <input
          v-model="voucherCode"
          type="text"
          placeholder="Kode diskon atau voucher"
          class="flex-1 border border-gray-300 rounded-xl px-4 py-2.5 text-sm bg-white focus:outline-none focus:ring-1 focus:ring-gray-400"
        />
        <button class="px-5 py-2.5 border border-gray-300 bg-white text-sm font-semibold text-gray-700 rounded-xl hover:bg-gray-50 transition">
          pakai
        </button>
      </div>

      <!-- Price Breakdown -->
      <div class="space-y-3 pt-4 border-t border-gray-300">
        <div class="flex items-center justify-between text-sm">
          <span class="text-gray-600">Subtotal</span>
          <span class="font-semibold text-gray-800">Rp. 450.000,00</span>
        </div>
        <div class="flex items-center justify-between text-sm">
          <span class="text-gray-600">Pengiriman + Biaya Layanan</span>
          <span :class="currentStep >= 2 ? 'font-semibold text-gray-800' : 'text-gray-400 italic text-xs'">
            {{ currentStep >= 2 ? 'Rp. 50.000,00' : 'Dihitung pada tahap berikutnya' }}
          </span>
        </div>
      </div>
      <div class="flex items-center justify-between mt-4 pt-4 border-t border-gray-300">
        <span class="font-bold text-gray-800">Jumlah</span>
        <div class="text-right">
          <span class="text-xs text-gray-400 mr-1">IDR</span>
          <span class="text-xl font-black text-gray-900">
            {{ currentStep >= 2 ? 'Rp 500.000,00' : 'Rp 450.000,00' }}
          </span>
        </div>
      </div>

    </div>

  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { authService } from '../../services/auth';
import { cartService } from '../../services/cart';
import { orderService } from '../../services/order';
import { showToastError } from '../../services/api';
import Swal from 'sweetalert2';

const router = useRouter();

const currentStep = ref(1);
const showEmailEdit = ref(false);
const voucherCode = ref('');
const loading = ref(true);
const placingOrder = ref(false);

// ===================== CART DATA =====================
const cartItems = ref([]);
const cartSubtotal = ref(0);

// ===================== ADDRESSES =====================
const savedAddresses = ref([]);

// ===================== FORM DATA =====================
const form = ref({
  email: '',
  savedAddress: 'new',
  country: 'Indonesia',
  firstName: '',
  lastName: '',
  address: '',
  district: 'Indonesia',
  kode: 'Indonesia',
  province: 'Jawa Timur',
  postalCode: '',
  shippingMethod: 'reguler',
  paymentMethod: 'midtrans',
});

// ===================== FETCH DATA =====================
const fetchData = async () => {
  loading.value = true;
  try {
    // Fetch profile
    const profile = await authService.getProfile();
    form.value.email = profile.email || '';
    form.value.firstName = profile.name?.split(' ')[0] || '';
    form.value.lastName = profile.name?.split(' ').slice(1).join(' ') || '';

    // Fetch addresses
    try {
      const addresses = await authService.getAddresses();
      savedAddresses.value = Array.isArray(addresses) ? addresses : [];
    } catch {
      savedAddresses.value = [];
    }

    // Fetch cart
    try {
      const cart = await cartService.getCart();
      cartSubtotal.value = cart.grand_total || 0;
      cartItems.value = cart.items || [];
    } catch {
      cartItems.value = [];
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

// ===================== SHIPPING OPTIONS =====================
const shippingMethods = [
  { id: 'reguler',  name: 'Pengiriman + Biaya Layanan',     price: 'Rp 21.500,00' },
  { id: 'express',  name: 'Pengiriman Express (1-2 hari)',   price: 'Rp 50.000,00' },
  { id: 'sameday',  name: 'Same Day Delivery',               price: 'Rp 75.000,00' },
];

const selectedShippingName = computed(() =>
  shippingMethods.find(m => m.id === form.value.shippingMethod)?.name || '-'
);
const selectedShippingPrice = computed(() =>
  shippingMethods.find(m => m.id === form.value.shippingMethod)?.price || '-'
);

// ===================== COMPUTED =====================
const fullAddress = computed(() => {
  const { address, district, province, country } = form.value;
  const parts = [address, district, province, country].filter(Boolean);
  return parts.length ? parts.join(', ') : 'Belum diisi';
});

const formatRupiah = (amount) => {
  return `Rp ${Number(amount).toLocaleString('id-ID')},00`;
};

const totalAmount = computed(() => {
  if (currentStep.value >= 2) {
    return cartSubtotal.value + 50000;
  }
  return cartSubtotal.value;
});

// ===================== PLACE ORDER =====================
const placeOrder = async () => {
  placingOrder.value = true;
  try {
    const addressPayload = {
      recipient: `${form.value.firstName} ${form.value.lastName}`.trim(),
      phone: '',
      address: form.value.address,
      city: form.value.district,
      state: form.value.province,
      country: form.value.country,
      postal_code: form.value.postalCode,
      type: 'home',
    };

    const response = await orderService.checkout(addressPayload);

    // Jika ada payment_url dari midtrans, redirect
    if (response.payment_url) {
      window.location.href = response.payment_url;
      return;
    }

    // Jika ada snap_token, bisa digunakan untuk Midtrans Snap
    if (response.snap_token && window.snap) {
      window.snap.pay(response.snap_token, {
        onSuccess: () => router.push('/payment-success'),
        onPending: () => router.push('/orders'),
        onError: () => showToastError('Pembayaran gagal.'),
        onClose: () => {},
      });
      return;
    }

    // Default: redirect ke payment success
    router.push('/payment-success');
  } catch (error) {
    // Error ditampilkan oleh service
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
