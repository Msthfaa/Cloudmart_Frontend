<template>
  <div class="min-h-screen" style="background-color: #f5f4f0;">
    <div class="max-w-[1280px] mx-auto px-6 py-8">

      <h1 class="text-2xl font-black text-gray-900 mb-7">Keranjang Belanja</h1>

      <!-- ============================================================
           LOADING STATE
      ============================================================ -->
      <div v-if="loading" class="space-y-4">
        <div class="bg-white rounded-2xl p-6 shadow-sm animate-pulse">
          <div class="flex items-center gap-4">
            <div class="w-20 h-20 bg-gray-200 rounded-xl"></div>
            <div class="flex-1 space-y-3">
              <div class="h-3 bg-gray-200 rounded w-1/3"></div>
              <div class="h-4 bg-gray-200 rounded w-2/3"></div>
              <div class="h-3 bg-gray-200 rounded w-1/4"></div>
            </div>
            <div class="h-6 bg-gray-200 rounded w-24"></div>
          </div>
        </div>
        <div class="bg-white rounded-2xl p-6 shadow-sm animate-pulse">
          <div class="flex items-center gap-4">
            <div class="w-20 h-20 bg-gray-200 rounded-xl"></div>
            <div class="flex-1 space-y-3">
              <div class="h-3 bg-gray-200 rounded w-1/4"></div>
              <div class="h-4 bg-gray-200 rounded w-1/2"></div>
              <div class="h-3 bg-gray-200 rounded w-1/5"></div>
            </div>
            <div class="h-6 bg-gray-200 rounded w-24"></div>
          </div>
        </div>
      </div>

      <!-- ============================================================
           EMPTY CART STATE
      ============================================================ -->
      <div v-else-if="!loading && cartItems.length === 0" class="flex flex-col items-center justify-center py-24 bg-white rounded-3xl shadow-sm">
        <span class="text-7xl mb-5">🛒</span>
        <h2 class="text-xl font-black text-gray-800 mb-2">Keranjang kamu masih kosong</h2>
        <p class="text-sm text-gray-400 mb-8">Yuk mulai belanja dan temukan produk favoritmu!</p>
        <router-link
          to="/"
          class="px-10 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm rounded-full transition-all shadow-md shadow-blue-200"
        >
          Mulai Belanja
        </router-link>
      </div>

      <!-- ============================================================
           CART WITH ITEMS
      ============================================================ -->
      <div v-else class="flex gap-6 items-start">

        <!-- ===================== CART ITEMS (LEFT) ===================== -->
        <div class="flex-1 min-w-0 space-y-4">

          <!-- Select All bar -->
          <div class="bg-white rounded-2xl px-5 py-3.5 flex items-center justify-between shadow-sm">
            <label class="flex items-center gap-3 cursor-pointer select-none">
              <input
                type="checkbox"
                :checked="allSelected"
                :indeterminate.prop="someSelected && !allSelected"
                @change="toggleSelectAll"
                class="w-4 h-4 rounded border-gray-300 accent-blue-600 cursor-pointer"
              />
              <span class="text-sm font-bold text-gray-700">Pilih Semua ({{ cartItems.length }} produk)</span>
            </label>
            <button
              v-if="selectedItems.length > 0"
              @click="removeSelected"
              class="text-xs text-red-500 font-semibold hover:text-red-700 transition-colors flex items-center gap-1"
            >
              <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
              Hapus yang dipilih
            </button>
          </div>

          <!-- Toko / Seller Group -->
          <div class="bg-white rounded-2xl overflow-hidden shadow-sm">

            <!-- Seller header -->
            <div class="flex items-center gap-2 px-5 py-3.5 border-b border-gray-100">
              <span class="text-base">🏪</span>
              <span class="text-sm font-bold text-gray-700">Cloudmart Official Store</span>
              <span class="ml-auto text-[11px] text-blue-500 font-semibold cursor-pointer hover:underline">Kunjungi Toko →</span>
            </div>

            <!-- Cart Item rows -->
            <div
              v-for="item in cartItems"
              :key="item.id"
              class="flex items-start gap-4 px-5 py-5 border-b border-gray-100 last:border-b-0 group hover:bg-gray-50/50 transition-colors"
            >
              <!-- Checkbox -->
              <input
                type="checkbox"
                :value="item.id"
                v-model="selectedItems"
                class="mt-1 w-4 h-4 rounded border-gray-300 accent-blue-600 cursor-pointer shrink-0"
              />

              <!-- Product Image -->
              <router-link :to="`/product/${item.productId}`" class="shrink-0">
                <div
                  class="w-20 h-20 rounded-xl flex items-center justify-center text-3xl border border-gray-100"
                  :class="item.bgColor"
                >
                  {{ item.emoji }}
                </div>
              </router-link>

              <!-- Product Info -->
              <div class="flex-1 min-w-0">
                <p class="text-[11px] text-blue-500 font-bold uppercase tracking-wider mb-0.5">{{ item.brand }}</p>
                <router-link :to="`/product/${item.productId}`" class="text-sm font-semibold text-gray-800 hover:text-blue-600 transition-colors leading-snug line-clamp-2">
                  {{ item.name }}
                </router-link>
                <div class="flex items-center gap-2 mt-1.5">
                  <span class="text-xs text-gray-400 bg-gray-100 px-2 py-0.5 rounded-md font-medium">{{ item.size }}</span>
                  <span class="text-xs text-gray-400 bg-gray-100 px-2 py-0.5 rounded-md font-medium">{{ item.color }}</span>
                </div>

                <!-- Price + Qty row -->
                <div class="flex items-center justify-between mt-3">
                  <!-- Price -->
                  <div>
                    <p class="text-base font-black text-gray-900">{{ formatPrice(item.price * item.qty) }}</p>
                    <p v-if="item.originalPrice" class="text-[11px] text-gray-400 line-through">{{ formatPrice(item.originalPrice * item.qty) }}</p>
                  </div>

                  <!-- Qty Controls -->
                  <div class="flex items-center gap-0 border-2 border-gray-200 rounded-xl overflow-hidden">
                    <button
                      @click="decreaseQty(item)"
                      class="w-8 h-8 flex items-center justify-center text-gray-500 hover:bg-gray-100 transition-colors font-black text-lg"
                    >−</button>
                    <span class="w-10 h-8 flex items-center justify-center text-sm font-black text-gray-900 border-x border-gray-200">{{ item.qty }}</span>
                    <button
                      @click="increaseQty(item)"
                      class="w-8 h-8 flex items-center justify-center text-gray-500 hover:bg-gray-100 transition-colors font-black text-lg"
                    >+</button>
                  </div>
                </div>
              </div>

              <!-- Delete button -->
              <button
                @click="removeItem(item.id)"
                class="opacity-0 group-hover:opacity-100 transition-opacity p-1.5 text-gray-300 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors shrink-0 mt-1"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
              </button>
            </div>

          </div>

          <!-- Continue shopping link -->
          <router-link to="/" class="flex items-center gap-2 text-sm text-blue-500 font-semibold hover:underline px-1">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M15 19l-7-7 7-7"/></svg>
            Lanjutkan Belanja
          </router-link>
        </div>

        <!-- ===================== ORDER SUMMARY (RIGHT) ===================== -->
        <div class="w-80 shrink-0 space-y-4">

          <!-- Voucher card -->
          <div class="bg-white rounded-2xl p-5 shadow-sm">
            <p class="text-sm font-bold text-gray-700 mb-3 flex items-center gap-2">
              <span>🎟️</span> Voucher & Promo
            </p>
            <div class="flex gap-2">
              <input
                v-model="voucherCode"
                type="text"
                placeholder="Kode voucher"
                class="flex-1 border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300 bg-gray-50"
              />
              <button
                @click="applyVoucher"
                class="px-4 py-2 bg-gray-800 text-white text-sm font-bold rounded-xl hover:bg-gray-900 transition active:scale-95"
              >
                Pakai
              </button>
            </div>
            <p v-if="voucherApplied" class="text-xs text-green-600 font-semibold mt-2 flex items-center gap-1">
              <span>✓</span> Voucher berhasil diterapkan!
            </p>
          </div>

          <!-- Summary card -->
          <div class="bg-white rounded-2xl p-5 shadow-sm">
            <p class="text-sm font-black text-gray-800 mb-4">Ringkasan Belanja</p>

            <div class="space-y-2.5 text-sm">
              <div class="flex justify-between">
                <span class="text-gray-500">Total Harga ({{ selectedItems.length || cartItems.length }} produk)</span>
                <span class="font-semibold text-gray-800">{{ formatPrice(subtotal) }}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-500">Total Pengiriman</span>
                <span class="font-semibold text-gray-800">Rp 50.000</span>
              </div>
              <div v-if="voucherApplied" class="flex justify-between text-green-600">
                <span class="font-medium">Diskon Voucher</span>
                <span class="font-bold">− Rp 20.000</span>
              </div>
            </div>

            <div class="flex justify-between mt-4 pt-4 border-t border-dashed border-gray-200">
              <span class="font-black text-gray-900">Total Belanja</span>
              <span class="font-black text-blue-600 text-lg">{{ formatPrice(grandTotal) }}</span>
            </div>

            <!-- Savings badge -->
            <div v-if="savings > 0" class="mt-3 flex items-center gap-2 bg-green-50 border border-green-200 rounded-xl px-3 py-2">
              <span class="text-green-500 text-sm">🎉</span>
              <p class="text-xs text-green-700 font-semibold">Hemat <strong>{{ formatPrice(savings) }}</strong> dari pembelian ini!</p>
            </div>

            <!-- Checkout button -->
            <button
              @click="goToCheckout"
              :disabled="selectedItems.length === 0 && cartItems.length === 0"
              class="w-full mt-5 py-3.5 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-black text-sm rounded-2xl transition-all active:scale-95 shadow-lg shadow-blue-200"
            >
              Beli Sekarang ({{ selectedItems.length || cartItems.length }} produk)
            </button>

            <p class="text-center text-[11px] text-gray-400 mt-3 flex items-center justify-center gap-1">
              <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/></svg>
              Pembayaran 100% aman & terenkripsi
            </p>
          </div>

          <!-- Shipping info -->
          <div class="bg-white rounded-2xl p-4 shadow-sm space-y-3">
            <div class="flex items-center gap-3 text-sm">
              <span class="text-lg shrink-0">🚚</span>
              <div>
                <p class="font-semibold text-gray-700">Pengiriman ke seluruh Indonesia</p>
                <p class="text-xs text-gray-400">Estimasi tiba 2–5 hari kerja</p>
              </div>
            </div>
            <div class="flex items-center gap-3 text-sm">
              <span class="text-lg shrink-0">🔄</span>
              <div>
                <p class="font-semibold text-gray-700">Gratis retur 30 hari</p>
                <p class="text-xs text-gray-400">Produk tidak sesuai? Kembalikan gratis</p>
              </div>
            </div>
          </div>

        </div>
      </div>

      <!-- ============================================================
           RECOMMENDED PRODUCTS
      ============================================================ -->
      <div class="mt-12">
        <h2 class="text-lg font-black text-gray-900 mb-5">Produk yang Mungkin Kamu Suka</h2>
        <div class="grid grid-cols-5 gap-4">
          <div
            v-for="p in recommended"
            :key="p.id"
            class="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-pointer group"
            @click="$router.push(`/product/${p.id}`)"
          >
            <div class="aspect-square flex items-center justify-center text-4xl" :class="p.bg">{{ p.emoji }}</div>
            <div class="p-3">
              <p class="text-[10px] text-gray-400 uppercase tracking-widest font-medium">{{ p.brand }}</p>
              <p class="text-sm font-semibold text-gray-800 leading-snug mt-0.5 line-clamp-2">{{ p.name }}</p>
              <div class="flex items-center justify-between mt-2">
                <p class="text-sm font-black text-gray-900">{{ p.price }}</p>
                <button
                  @click.stop="addToCart(p)"
                  class="w-7 h-7 bg-blue-600 text-white rounded-lg flex items-center justify-center hover:bg-blue-700 transition text-xs"
                >
                  <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4"/></svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { cartService } from '../../services/cart';
import { productService } from '../../services/product';
import { getErrorMessage, showToastError } from '../../services/api';
import Swal from 'sweetalert2';

const router = useRouter();

// ===================== STATE =====================
const loading = ref(true);
const cartItems = ref([]);
const cartGrandTotal = ref(0);

// ===================== FETCH CART =====================
const fetchCart = async () => {
  loading.value = true;
  try {
    const data = await cartService.getCart();
    cartGrandTotal.value = data.grand_total || 0;
    cartItems.value = (data.items || []).map(item => ({
      id: item.id,
      variantId: item.variant_id,
      productId: item.product_id || null,
      name: item.variant_name || item.name || 'Produk',
      brand: item.brand || '',
      size: item.size || '',
      color: item.color || '',
      price: item.price || 0,
      originalPrice: item.original_price || null,
      qty: item.quantity || 1,
      subtotal: item.subtotal || 0,
      emoji: '📦',
      bgColor: 'bg-gray-100',
    }));
    // Default: select all
    selectedItems.value = cartItems.value.map(i => i.id);
  } catch (error) {
    cartItems.value = [];
  } finally {
    loading.value = false;
  }
};

// ===================== SELECTION =====================
const selectedItems = ref([]);

const allSelected = computed(() => cartItems.value.length > 0 && selectedItems.value.length === cartItems.value.length);
const someSelected = computed(() => selectedItems.value.length > 0);

const toggleSelectAll = () => {
  if (allSelected.value) {
    selectedItems.value = [];
  } else {
    selectedItems.value = cartItems.value.map(i => i.id);
  }
};

// ===================== CART ACTIONS =====================
const increaseQty = async (item) => {
  const newQty = item.qty + 1;
  try {
    await cartService.updateCartItem(item.id, newQty);
    item.qty = newQty;
    item.subtotal = item.price * newQty;
  } catch (error) {
    // Error ditampilkan oleh service
  }
};

const decreaseQty = async (item) => {
  if (item.qty <= 1) {
    removeItem(item.id);
    return;
  }
  const newQty = item.qty - 1;
  try {
    await cartService.updateCartItem(item.id, newQty);
    item.qty = newQty;
    item.subtotal = item.price * newQty;
  } catch (error) {
    // Error ditampilkan oleh service
  }
};

const removeItem = async (id) => {
  const result = await Swal.fire({
    title: 'Hapus item?',
    text: 'Item ini akan dihapus dari keranjang.',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#EF4444',
    cancelButtonColor: '#6B7280',
    confirmButtonText: 'Ya, hapus',
    cancelButtonText: 'Batal',
  });
  if (!result.isConfirmed) return;

  try {
    await cartService.removeCartItem(id);
    selectedItems.value = selectedItems.value.filter(s => s !== id);
    cartItems.value = cartItems.value.filter(i => i.id !== id);
  } catch (error) {
    // Error ditampilkan oleh service
  }
};

const removeSelected = async () => {
  const result = await Swal.fire({
    title: 'Hapus item terpilih?',
    text: `${selectedItems.value.length} item akan dihapus dari keranjang.`,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#EF4444',
    cancelButtonColor: '#6B7280',
    confirmButtonText: 'Ya, hapus semua',
    cancelButtonText: 'Batal',
  });
  if (!result.isConfirmed) return;

  try {
    for (const id of selectedItems.value) {
      await cartService.removeCartItem(id);
    }
    cartItems.value = cartItems.value.filter(i => !selectedItems.value.includes(i.id));
    selectedItems.value = [];
  } catch (error) {
    // Reload cart untuk sinkronisasi
    fetchCart();
  }
};

// ===================== VOUCHER =====================
const voucherCode = ref('');
const voucherApplied = ref(false);

const applyVoucher = () => {
  if (voucherCode.value.trim()) {
    voucherApplied.value = true;
  }
};

// ===================== PRICING =====================
const formatPrice = (amount) => {
  return 'Rp ' + Number(amount).toLocaleString('id-ID');
};

const activeCart = computed(() =>
  selectedItems.value.length > 0
    ? cartItems.value.filter(i => selectedItems.value.includes(i.id))
    : cartItems.value
);

const subtotal = computed(() =>
  activeCart.value.reduce((sum, item) => sum + item.price * item.qty, 0)
);

const savings = computed(() =>
  activeCart.value.reduce((sum, item) => {
    if (item.originalPrice) return sum + (item.originalPrice - item.price) * item.qty;
    return sum;
  }, 0)
);

const grandTotal = computed(() => {
  let total = subtotal.value + 50000; // + shipping
  if (voucherApplied.value) total -= 20000;
  return total;
});

// ===================== CHECKOUT =====================
const goToCheckout = () => {
  router.push('/checkout');
};

// ===================== ADD TO CART (recommended) =====================
const addToCart = async (product) => {
  try {
    // product recommended masih mock, jadi kita butuh variantId
    // Untuk sementara kita coba re-fetch cart saja
    showToastError('Fitur ini memerlukan variant_id dari backend.');
  } catch (error) {
    // Error ditampilkan oleh service
  }
};

// ===================== RECOMMENDED (Mock) =====================
const recommended = ref([
  { id: 6,  brand: 'Nevada', name: 'Nevada Men Polo Sport Edition',     price: 'Rp 215.000', emoji: '🎽', bg: 'bg-blue-50'   },
  { id: 7,  brand: 'Cole',   name: 'Cole Slim Fit Chino Pants Modern',  price: 'Rp 229.000', emoji: '👖', bg: 'bg-stone-100' },
  { id: 8,  brand: 'Suko',   name: 'Suko Casual Hoodie Fleece Premium', price: 'Rp 219.000', emoji: '🧥', bg: 'bg-gray-100'  },
  { id: 9,  brand: 'Lois',   name: 'Lois Classic Denim Jacket Washed',  price: 'Rp 399.000', emoji: '👔', bg: 'bg-amber-50'  },
  { id: 10, brand: 'TZone',  name: 'TZone Chronograph Sports Watch',    price: 'Rp 679.000', emoji: '⌚', bg: 'bg-stone-100' },
]);

// ===================== INIT =====================
onMounted(() => {
  fetchCart();
});
</script>
