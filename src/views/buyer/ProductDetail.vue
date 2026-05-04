<template>
  <div class="min-h-screen bg-white">
    <div class="max-w-[1280px] mx-auto px-6 py-8">

      <!-- Loading Skeleton -->
      <div v-if="loading" class="animate-pulse">
        <div class="flex items-center gap-2 mb-8">
          <div class="h-3 bg-gray-200 rounded w-12"></div>
          <div class="h-3 bg-gray-200 rounded w-20"></div>
          <div class="h-3 bg-gray-200 rounded w-32"></div>
        </div>
        <div class="flex gap-10">
          <div class="flex gap-4 shrink-0">
            <div class="flex flex-col gap-3">
              <div v-for="i in 4" :key="i" class="w-16 h-16 bg-gray-200 rounded-xl"></div>
            </div>
            <div class="w-[420px] h-[480px] bg-gray-200 rounded-3xl"></div>
          </div>
          <div class="flex-1 space-y-4">
            <div class="h-3 bg-gray-200 rounded w-20"></div>
            <div class="h-7 bg-gray-200 rounded w-2/3"></div>
            <div class="h-4 bg-gray-200 rounded w-1/3"></div>
            <div class="h-16 bg-gray-200 rounded-2xl w-full mt-4"></div>
            <div class="flex gap-3 mt-4">
              <div v-for="i in 5" :key="i" class="w-8 h-8 bg-gray-200 rounded-full"></div>
            </div>
            <div class="flex gap-2 mt-4">
              <div v-for="i in 6" :key="i" class="w-16 h-10 bg-gray-200 rounded-xl"></div>
            </div>
            <div class="flex gap-3 mt-6">
              <div class="flex-1 h-14 bg-gray-200 rounded-2xl"></div>
              <div class="flex-1 h-14 bg-gray-200 rounded-2xl"></div>
            </div>
          </div>
        </div>
      </div>

      <div v-else>

      <!-- Breadcrumb -->
      <div class="flex items-center gap-2 text-sm text-gray-400 mb-8">
        <router-link to="/" class="hover:text-blue-500 transition-colors">Home</router-link>
        <span>/</span>
        <router-link :to="`/category/${product.categorySlug}`" class="hover:text-blue-500 transition-colors capitalize">{{ product.category }}</router-link>
        <span>/</span>
        <span class="text-gray-700 font-medium truncate max-w-xs">{{ product.name }}</span>
      </div>

      <!-- ============================================================
           MAIN CONTENT
      ============================================================ -->
      <div class="flex gap-10">

        <!-- ===================== GALLERY (LEFT) ===================== -->
        <div class="flex gap-4 shrink-0">

          <!-- Thumbnail Column -->
          <div class="flex flex-col gap-3">
            <button
              v-for="(img, i) in product.images"
              :key="i"
              @click="activeImage = i"
              class="w-16 h-16 rounded-xl overflow-hidden border-2 transition-all flex items-center justify-center text-2xl"
              :class="activeImage === i
                ? 'border-blue-500 bg-blue-50 scale-105 shadow-md'
                : 'border-gray-200 bg-gray-50 hover:border-gray-300'"
            >
              {{ img.emoji }}
            </button>
          </div>

          <!-- Main Image -->
          <div
            class="w-[420px] h-[480px] rounded-3xl overflow-hidden flex items-center justify-center relative"
            :class="product.images[activeImage].bg"
          >
            <!-- Transition between images -->
            <transition name="img-fade" mode="out-in">
              <span :key="activeImage" class="text-[9rem] select-none">
                {{ product.images[activeImage].emoji }}
              </span>
            </transition>

            <!-- Wishlist -->
            <button
              @click="inWishlist = !inWishlist"
              class="absolute top-4 right-4 w-10 h-10 bg-white rounded-full shadow-md flex items-center justify-center transition-all hover:scale-110"
              :class="inWishlist ? 'text-red-500' : 'text-gray-400'"
            >
              <svg class="w-5 h-5" :fill="inWishlist ? 'currentColor' : 'none'" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
              </svg>
            </button>

            <!-- Badges -->
            <div class="absolute top-4 left-4 flex flex-col gap-2">
              <span v-if="product.isNew" class="bg-blue-600 text-white text-[10px] font-black px-2.5 py-1 rounded-lg uppercase tracking-wide">New</span>
              <span v-if="product.discount" class="bg-red-500 text-white text-[10px] font-black px-2.5 py-1 rounded-lg">-{{ product.discount }}%</span>
            </div>
          </div>
        </div>

        <!-- ===================== PRODUCT INFO (RIGHT) ===================== -->
        <div class="flex-1 min-w-0">

          <!-- Brand & Name -->
          <p class="text-xs font-black text-blue-500 uppercase tracking-widest mb-1">{{ product.brand }}</p>
          <h1 class="text-2xl font-black text-gray-900 leading-tight mb-3">{{ product.name }}</h1>

          <!-- Rating -->
          <div class="flex items-center gap-3 mb-5">
            <div class="flex items-center gap-1">
              <span
                v-for="i in 5"
                :key="i"
                class="text-base"
                :class="i <= Math.floor(product.rating) ? 'text-yellow-400' : 'text-gray-200'"
              >★</span>
            </div>
            <span class="text-sm font-bold text-gray-700">{{ product.rating }}</span>
            <span class="text-sm text-gray-400">({{ product.reviewCount }} ulasan)</span>
            <span class="text-sm text-gray-400">|</span>
            <span class="text-sm text-green-600 font-semibold">{{ product.sold }} terjual</span>
          </div>

          <!-- Price -->
          <div class="bg-gray-50 rounded-2xl px-5 py-4 mb-6">
            <div class="flex items-end gap-3">
              <span class="text-3xl font-black text-gray-900">{{ product.price }}</span>
              <span v-if="product.originalPrice" class="text-base text-gray-400 line-through mb-1">{{ product.originalPrice }}</span>
              <span v-if="product.discount" class="text-sm font-black text-red-500 bg-red-50 px-2.5 py-1 rounded-lg mb-1">
                Hemat {{ product.discount }}%
              </span>
            </div>
          </div>

          <!-- Color -->
          <div class="mb-5">
            <p class="text-sm font-bold text-gray-700 mb-3">
              Warna: <span class="font-black text-gray-900">{{ selectedColor }}</span>
            </p>
            <div class="flex items-center gap-2.5">
              <button
                v-for="color in product.colors"
                :key="color.name"
                @click="selectedColor = color.name"
                :title="color.name"
                class="w-8 h-8 rounded-full border-2 transition-all hover:scale-110"
                :style="{ backgroundColor: color.hex }"
                :class="selectedColor === color.name
                  ? 'border-gray-800 scale-110 shadow-md'
                  : 'border-white shadow-sm hover:border-gray-300'"
              ></button>
            </div>
          </div>

          <!-- Size -->
          <div class="mb-6">
            <div class="flex items-center justify-between mb-3">
              <p class="text-sm font-bold text-gray-700">
                Ukuran: <span class="font-black text-gray-900">{{ selectedSize }}</span>
              </p>
              <button class="text-xs text-blue-500 font-semibold hover:underline">Panduan Ukuran →</button>
            </div>
            <div class="flex flex-wrap gap-2">
              <button
                v-for="size in product.sizes"
                :key="size.label"
                @click="size.stock > 0 && (selectedSize = size.label)"
                class="px-4 py-2.5 border-2 rounded-xl text-sm font-bold transition-all"
                :class="[
                  size.stock === 0
                    ? 'border-gray-100 text-gray-300 cursor-not-allowed line-through bg-gray-50'
                    : selectedSize === size.label
                      ? 'border-gray-900 bg-gray-900 text-white shadow-md'
                      : 'border-gray-200 text-gray-700 hover:border-gray-400 hover:bg-gray-50'
                ]"
              >
                {{ size.label }}
                <span v-if="size.stock > 0 && size.stock <= 5" class="ml-1 text-[10px] text-red-500 font-black">(sisa {{ size.stock }})</span>
              </button>
            </div>
          </div>

          <!-- Quantity -->
          <div class="mb-6">
            <p class="text-sm font-bold text-gray-700 mb-3">Jumlah</p>
            <div class="flex items-center gap-0 w-fit border-2 border-gray-200 rounded-xl overflow-hidden">
              <button
                @click="qty > 1 && qty--"
                class="w-10 h-10 flex items-center justify-center text-gray-600 hover:bg-gray-100 transition-colors font-black text-lg"
              >−</button>
              <span class="w-12 h-10 flex items-center justify-center text-sm font-black text-gray-900 border-x-2 border-gray-200">{{ qty }}</span>
              <button
                @click="qty++"
                class="w-10 h-10 flex items-center justify-center text-gray-600 hover:bg-gray-100 transition-colors font-black text-lg"
              >+</button>
            </div>
            <p class="text-xs text-gray-400 mt-2">Stok: <strong class="text-gray-600">{{ product.stock }} tersedia</strong></p>
          </div>

          <!-- Action Buttons -->
          <div class="flex gap-3 mb-8">
            <button
              @click="addToCart"
              class="flex-1 flex items-center justify-center gap-2.5 py-3.5 border-2 border-gray-900 text-gray-900 font-black text-sm rounded-2xl hover:bg-gray-900 hover:text-white transition-all active:scale-95"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2.5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"/>
              </svg>
              Tambah ke Keranjang
            </button>
            <button
              @click="buyNow"
              class="flex-1 py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-black text-sm rounded-2xl transition-all active:scale-95 shadow-lg shadow-blue-200"
            >
              Beli Sekarang
            </button>
          </div>

          <!-- Info Strips -->
          <div class="space-y-2.5">
            <div v-for="info in infoStrips" :key="info.label" class="flex items-center gap-3 bg-gray-50 rounded-xl px-4 py-3">
              <span class="text-lg">{{ info.icon }}</span>
              <div>
                <p class="text-xs font-black text-gray-800">{{ info.label }}</p>
                <p class="text-xs text-gray-500">{{ info.desc }}</p>
              </div>
            </div>
          </div>

        </div>
      </div>

      <!-- ============================================================
           TABS: DESKRIPSI, SPESIFIKASI, ULASAN
      ============================================================ -->
      <div class="mt-14">

        <!-- Tab Nav -->
        <div class="flex items-center gap-8 border-b border-gray-200 mb-7">
          <button
            v-for="tab in ['Deskripsi', 'Spesifikasi', `Ulasan (${product.reviewCount})`]"
            :key="tab"
            @click="activeTab = tab.split(' ')[0]"
            class="pb-3 text-sm font-bold transition-all border-b-2 -mb-px"
            :class="activeTab === tab.split(' ')[0]
              ? 'text-gray-900 border-gray-900'
              : 'text-gray-400 border-transparent hover:text-gray-600'"
          >{{ tab }}</button>
        </div>

        <!-- Deskripsi -->
        <div v-if="activeTab === 'Deskripsi'" class="text-sm text-gray-600 leading-relaxed max-w-3xl space-y-3">
          <p v-for="(para, i) in product.description" :key="i">{{ para }}</p>
        </div>

        <!-- Spesifikasi -->
        <div v-if="activeTab === 'Spesifikasi'" class="max-w-2xl">
          <table class="w-full text-sm">
            <tbody>
              <tr v-for="(spec, i) in product.specs" :key="i" class="border-b border-gray-100">
                <td class="py-3 pr-8 text-gray-500 font-medium w-40">{{ spec.label }}</td>
                <td class="py-3 text-gray-800 font-semibold">{{ spec.value }}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Ulasan -->
        <div v-if="activeTab === 'Ulasan'" class="max-w-3xl">
          <!-- Summary -->
          <div class="flex items-center gap-8 bg-gray-50 rounded-2xl p-6 mb-6">
            <div class="text-center">
              <p class="text-5xl font-black text-gray-900">{{ product.rating }}</p>
              <div class="flex justify-center gap-0.5 my-1">
                <span v-for="i in 5" :key="i" class="text-yellow-400 text-lg">{{ i <= Math.floor(product.rating) ? '★' : '☆' }}</span>
              </div>
              <p class="text-xs text-gray-400">{{ product.reviewCount }} ulasan</p>
            </div>
            <div class="flex-1">
              <div v-for="star in [5,4,3,2,1]" :key="star" class="flex items-center gap-3 mb-1.5">
                <span class="text-xs text-gray-500 w-4 shrink-0">{{ star }}</span>
                <span class="text-yellow-400 text-xs">★</span>
                <div class="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div class="h-full bg-yellow-400 rounded-full" :style="{ width: `${ratingBars[star]}%` }"></div>
                </div>
                <span class="text-xs text-gray-400 w-6 shrink-0">{{ ratingBars[star] }}%</span>
              </div>
            </div>
          </div>

          <!-- Review cards -->
          <div class="space-y-4">
            <div
              v-for="review in reviews"
              :key="review.id"
              class="border border-gray-100 rounded-2xl p-5 hover:shadow-sm transition-shadow"
            >
              <div class="flex items-start justify-between mb-3">
                <div class="flex items-center gap-3">
                  <div class="w-9 h-9 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white text-sm font-black">
                    {{ review.user[0] }}
                  </div>
                  <div>
                    <p class="text-sm font-bold text-gray-800">{{ review.user }}</p>
                    <p class="text-[11px] text-gray-400">{{ review.date }} · Ukuran: {{ review.size }}</p>
                  </div>
                </div>
                <div class="flex text-yellow-400 text-sm">
                  <span v-for="i in review.rating" :key="i">★</span>
                </div>
              </div>
              <p class="text-sm text-gray-600 leading-relaxed">{{ review.comment }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- ============================================================
           PRODUK SERUPA
      ============================================================ -->
      <div class="mt-14">
        <h2 class="text-xl font-black text-gray-900 mb-6">Produk Serupa</h2>
        <div class="grid grid-cols-5 gap-4">
          <div
            v-for="p in relatedProducts"
            :key="p.id"
            class="bg-white border border-gray-100 rounded-2xl overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-pointer group"
            @click="$router.push(`/product/${p.id}`)"
          >
            <div class="aspect-square flex items-center justify-center text-5xl" :class="p.bg">
              {{ p.emoji }}
            </div>
            <div class="p-3">
              <p class="text-[10px] text-gray-400 uppercase tracking-widest">{{ p.brand }}</p>
              <p class="text-sm text-gray-800 font-semibold mt-0.5 line-clamp-2">{{ p.name }}</p>
              <div class="flex items-center gap-1 my-1">
                <span class="text-yellow-400 text-xs">★★★★★</span>
                <span class="text-[10px] text-gray-400">({{ p.reviews }})</span>
              </div>
              <p class="text-sm font-black text-gray-900">{{ p.price }}</p>
            </div>
          </div>
        </div>
      </div>

    </div>

      </div>

    <!-- Cart Toast -->
    <transition name="toast">
      <div v-if="showToast" class="fixed bottom-6 right-6 bg-gray-900 text-white text-sm font-medium px-5 py-3.5 rounded-2xl shadow-2xl flex items-center gap-3 z-50">
        <span class="text-green-400 text-lg">✓</span>
        <div>
          <p class="font-bold">Berhasil ditambahkan!</p>
          <p class="text-gray-400 text-xs">{{ product.name }} · {{ selectedSize }} · {{ selectedColor }}</p>
        </div>
        <router-link to="/cart" class="ml-3 text-blue-400 text-xs font-bold hover:underline whitespace-nowrap">Lihat Keranjang →</router-link>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { productService } from '../../services/product';
import { cartService } from '../../services/cart';
import { showToastError } from '../../services/api';
import Swal from 'sweetalert2';

const route = useRoute();
const router = useRouter();

// ===================== STATE =====================
const loading = ref(true);
const activeImage = ref(0);
const selectedColor = ref('');
const selectedSize = ref('');
const qty = ref(1);
const inWishlist = ref(false);
const activeTab = ref('Deskripsi');
const showToast = ref(false);
const addingToCart = ref(false);
let toastTimer;

// ===================== PRODUCT DATA =====================
const product = ref({
  id: route.params.id,
  name: '',
  brand: '',
  category: '',
  categorySlug: '',
  rating: 0,
  reviewCount: 0,
  sold: '0',
  price: 'Rp 0',
  originalPrice: null,
  discount: null,
  stock: 0,
  isNew: false,
  images: [{ emoji: '📦', bg: 'bg-gray-100' }],
  colors: [],
  sizes: [],
  variants: [],
  description: [],
  specs: [],
});

// ===================== FETCH PRODUCT =====================
const fetchProduct = async () => {
  loading.value = true;
  try {
    const data = await productService.getProductById(route.params.id);

    // Map data dari backend ke format yang digunakan template
    const variants = data.variants || [];
    const uniqueColors = [...new Set(variants.map(v => v.color).filter(Boolean))];
    const uniqueSizes = [...new Set(variants.map(v => v.size).filter(Boolean))];

    // Hitung harga terendah dan tertinggi
    const prices = variants.map(v => v.price).filter(Boolean);
    const minPrice = Math.min(...prices);
    const maxPrice = Math.max(...prices);

    product.value = {
      id: data.id,
      name: data.name || '',
      brand: data.store?.name || data.brand || '',
      category: data.category?.name || '',
      categorySlug: data.category?.slug || 'men',
      rating: data.rating || 4.5,
      reviewCount: data.review_count || 0,
      sold: data.sold || '0',
      price: formatRupiah(minPrice),
      originalPrice: null,
      discount: null,
      stock: variants.reduce((sum, v) => sum + (v.stock || 0), 0),
      isNew: true,
      images: [
        { emoji: '📦', bg: 'bg-stone-100' },
        { emoji: '🏷️', bg: 'bg-amber-50' },
        { emoji: '📋', bg: 'bg-blue-50' },
      ],
      colors: uniqueColors.map(c => ({
        name: c,
        hex: getColorHex(c),
      })),
      sizes: uniqueSizes.map(s => ({
        label: s,
        stock: variants.filter(v => v.size === s).reduce((sum, v) => sum + (v.stock || 0), 0),
      })),
      variants: variants,
      description: [data.description || 'Deskripsi produk belum tersedia.'],
      specs: [
        { label: 'Nama Produk', value: data.name || '-' },
        { label: 'Toko', value: data.store?.name || '-' },
        { label: 'Varian', value: `${variants.length} varian tersedia` },
      ],
    };

    // Default pilihan
    if (uniqueColors.length > 0) selectedColor.value = uniqueColors[0];
    if (uniqueSizes.length > 0) selectedSize.value = uniqueSizes[0];
  } catch (error) {
    showToastError('Gagal memuat detail produk.');
  } finally {
    loading.value = false;
  }
};

// ===================== HELPERS =====================
const formatRupiah = (amount) => {
  if (!amount && amount !== 0) return 'Rp 0';
  return 'Rp ' + Number(amount).toLocaleString('id-ID');
};

const getColorHex = (name) => {
  const colorMap = {
    'Putih': '#F9FAFB', 'Hitam': '#1F2937', 'Merah': '#EF4444',
    'Biru': '#3B82F6', 'Hijau': '#10B981', 'Kuning': '#F59E0B',
    'Abu-abu': '#9CA3AF', 'Krem': '#E8DCC8', 'Navy': '#1E3A5F',
    'Cokelat': '#92400E', 'Pink': '#EC4899', 'Abu': '#9CA3AF',
    'White': '#F9FAFB', 'Black': '#1F2937', 'Red': '#EF4444',
    'Blue': '#3B82F6', 'Green': '#10B981', 'Yellow': '#F59E0B',
    'Gray': '#9CA3AF', 'Brown': '#92400E',
  };
  return colorMap[name] || '#6B7280';
};

// ===================== GET SELECTED VARIANT =====================
const selectedVariant = computed(() => {
  if (!product.value.variants) return null;
  return product.value.variants.find(v =>
    v.color === selectedColor.value && v.size === selectedSize.value
  ) || product.value.variants[0] || null;
});

// ===================== RATING BAR =====================
const ratingBars = { 5: 65, 4: 22, 3: 8, 2: 3, 1: 2 };

// ===================== REVIEWS (Mock) =====================
const reviews = ref([
  { id: 1, user: 'Andi Pratama',  date: '15 Apr 2025', size: 'M', rating: 5, comment: 'Bahan halus, jahitan rapi, pas di badan. Warna krem terlihat premium banget. Udah beli 2 warna dan niat mau tambah lagi!' },
  { id: 2, user: 'Rizky Fadhil',  date: '10 Apr 2025', size: 'L', rating: 5, comment: 'Kualitas sangat memuaskan untuk harganya. Bahan adem, tidak mudah kusut. Packing juga rapih.' },
  { id: 3, user: 'Dito Wahyudi',  date: '2 Apr 2025',  size: 'M', rating: 4, comment: 'Bagus, hanya ukurannya sedikit slim. Sarankan naik satu ukuran jika badan agak berisi. Overall puas!' },
  { id: 4, user: 'Farhan K.',     date: '28 Mar 2025', size: 'XL', rating: 5, comment: 'Udah order 3 kali dari toko ini, selalu konsisten kualitasnya. Rekomendasi banget!' },
]);

// ===================== RELATED PRODUCTS (Mock) =====================
const relatedProducts = ref([
  { id: 10, brand: 'Nevada', name: 'Nevada Polo Shirt Sport Edition', price: 'Rp 215.000', reviews: 189, emoji: '🎽', bg: 'bg-blue-50' },
  { id: 11, brand: 'Cole',   name: 'Cole Polo Shirt Pique Premium', price: 'Rp 189.000', reviews: 95, emoji: '👕', bg: 'bg-stone-100' },
  { id: 12, brand: 'Suko',   name: 'Suko Casual Polo Modern Fit', price: 'Rp 175.000', reviews: 213, emoji: '👔', bg: 'bg-amber-50' },
  { id: 13, brand: 'Lois',   name: 'Lois Polo Shirt Stretch Cotton', price: 'Rp 229.000', reviews: 78, emoji: '🧥', bg: 'bg-gray-100' },
  { id: 14, brand: 'Nevada', name: 'Nevada Polo Stripe Collection', price: 'Rp 199.000', reviews: 301, emoji: '👕', bg: 'bg-rose-50' },
]);

// ===================== INFO STRIPS =====================
const infoStrips = [
  { icon: '🚚', label: 'Pengiriman Gratis',    desc: 'Untuk pembelian di atas Rp 100.000' },
  { icon: '🔄', label: 'Retur 30 Hari',        desc: 'Pengembalian mudah tanpa pertanyaan' },
  { icon: '🛡️', label: 'Garansi Keaslian',    desc: '100% produk original bergaransi' },
];

// ===================== ACTIONS =====================
const addToCart = async () => {
  if (!selectedVariant.value) {
    Swal.fire({ icon: 'warning', title: 'Pilih varian terlebih dahulu', confirmButtonColor: '#3B82F6' });
    return;
  }
  addingToCart.value = true;
  try {
    await cartService.addToCart(selectedVariant.value.id, qty.value);
    clearTimeout(toastTimer);
    showToast.value = true;
    toastTimer = setTimeout(() => { showToast.value = false; }, 3000);
  } catch (error) {
    // Error ditampilkan oleh service
  } finally {
    addingToCart.value = false;
  }
};

const buyNow = async () => {
  if (!selectedVariant.value) {
    Swal.fire({ icon: 'warning', title: 'Pilih varian terlebih dahulu', confirmButtonColor: '#3B82F6' });
    return;
  }
  addingToCart.value = true;
  try {
    await cartService.addToCart(selectedVariant.value.id, qty.value);
    router.push('/checkout');
  } catch (error) {
    // Error ditampilkan oleh service
  } finally {
    addingToCart.value = false;
  }
};

// ===================== WATCH ROUTE CHANGE =====================
watch(() => route.params.id, (newId) => {
  if (newId) {
    activeImage.value = 0;
    qty.value = 1;
    fetchProduct();
  }
});

// ===================== INIT =====================
onMounted(() => {
  fetchProduct();
});
</script>

<style scoped>
.img-fade-enter-active,
.img-fade-leave-active {
  transition: all 0.25s ease;
}
.img-fade-enter-from,
.img-fade-leave-to {
  opacity: 0;
  transform: scale(0.9);
}

.toast-enter-active,
.toast-leave-active {
  transition: all 0.35s cubic-bezier(0.34, 1.56, 0.64, 1);
}
.toast-enter-from,
.toast-leave-to {
  opacity: 0;
  transform: translateY(24px) scale(0.9);
}
</style>
