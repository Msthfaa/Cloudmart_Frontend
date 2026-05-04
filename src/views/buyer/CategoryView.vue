<template>
  <div class="min-h-screen" style="background-color: #f5f4f0;">
    <div class="max-w-[1280px] mx-auto px-6 py-6">

      <!-- Breadcrumb -->
      <div class="flex items-center gap-2 text-sm text-gray-500 mb-6">
        <router-link to="/" class="hover:text-blue-500 transition-colors">Home</router-link>
        <span class="text-gray-300">/</span>
        <span class="text-gray-700 font-semibold capitalize">{{ pageTitle }}</span>
      </div>

      <div class="flex gap-6 items-start">

        <!-- ============================================================
             SIDEBAR FILTERS
        ============================================================ -->
        <aside class="w-56 shrink-0">
          <div class="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm">

            <div
              v-for="filter in filterSections"
              :key="filter.key"
              class="border-b border-gray-100 last:border-b-0"
            >
              <!-- Filter Header -->
              <button
                @click="toggleFilter(filter.key)"
                class="w-full flex items-center justify-between px-4 py-3.5 hover:bg-gray-50 transition-colors"
              >
                <span class="text-[11px] font-black text-gray-800 uppercase tracking-[0.15em]">{{ filter.label }}</span>
                <svg
                  class="w-4 h-4 text-gray-400 transition-transform duration-200"
                  :class="{ 'rotate-180': openFilters.includes(filter.key) }"
                  fill="none" stroke="currentColor" viewBox="0 0 24 24"
                >
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M19 9l-7 7-7-7"/>
                </svg>
              </button>

              <!-- Filter Body -->
              <transition name="accordion">
                <div v-show="openFilters.includes(filter.key)" class="px-4 pb-4 space-y-1">

                  <!-- BRAND -->
                  <template v-if="filter.key === 'brand'">
                    <label
                      v-for="brand in brandOptions"
                      :key="brand.name"
                      class="flex items-center gap-2.5 py-1 cursor-pointer group"
                    >
                      <input type="checkbox" v-model="selectedBrands" :value="brand.name"
                        class="w-3.5 h-3.5 rounded border-gray-300 text-blue-600 focus:ring-blue-400" />
                      <span class="text-sm text-gray-600 group-hover:text-gray-900 transition-colors flex-1">{{ brand.name }}</span>
                      <span class="text-[11px] text-gray-400">({{ brand.count }})</span>
                    </label>
                  </template>

                  <!-- KATEGORI -->
                  <template v-if="filter.key === 'category'">
                    <input
                      v-model="categorySearch"
                      type="text"
                      placeholder="CARI KATEGORI"
                      class="w-full border border-gray-200 rounded-lg px-3 py-2 text-[11px] text-gray-600 mb-2 focus:outline-none focus:ring-1 focus:ring-blue-300 placeholder:text-gray-400 uppercase tracking-wide"
                    />
                    <label
                      v-for="cat in filteredCategories"
                      :key="cat.name"
                      class="flex items-center gap-2.5 py-1 cursor-pointer group"
                    >
                      <input type="checkbox" v-model="selectedCategories" :value="cat.name"
                        class="w-3.5 h-3.5 rounded border-gray-300 text-blue-600 focus:ring-blue-400" />
                      <span class="text-sm text-gray-600 group-hover:text-gray-900 transition-colors flex-1">{{ cat.name }}</span>
                      <span class="text-[11px] text-gray-400">({{ cat.count }})</span>
                    </label>
                  </template>

                  <!-- SUB KATEGORI -->
                  <template v-if="filter.key === 'subcategory'">
                    <label
                      v-for="sub in subCategoryOptions"
                      :key="sub.name"
                      class="flex items-center gap-2.5 py-1 cursor-pointer group"
                    >
                      <input type="checkbox" v-model="selectedSubCategories" :value="sub.name"
                        class="w-3.5 h-3.5 rounded border-gray-300 text-blue-600 focus:ring-blue-400" />
                      <span class="text-sm text-gray-600 group-hover:text-gray-900 transition-colors flex-1">{{ sub.name }}</span>
                      <span class="text-[11px] text-gray-400">({{ sub.count }})</span>
                    </label>
                  </template>

                  <!-- UKURAN -->
                  <template v-if="filter.key === 'size'">
                    <div class="flex flex-wrap gap-2 pt-1">
                      <button
                        v-for="size in sizeOptions"
                        :key="size"
                        @click="toggleSize(size)"
                        class="px-3 py-1.5 border rounded-lg text-xs font-semibold transition-all"
                        :class="selectedSizes.includes(size)
                          ? 'bg-gray-900 text-white border-gray-900'
                          : 'border-gray-200 text-gray-600 hover:border-gray-400 hover:text-gray-800'"
                      >{{ size }}</button>
                    </div>
                  </template>

                  <!-- WARNA -->
                  <template v-if="filter.key === 'color'">
                    <div class="flex flex-wrap gap-2 pt-1">
                      <button
                        v-for="color in colorOptions"
                        :key="color.name"
                        @click="toggleColor(color.name)"
                        :title="color.name"
                        class="w-7 h-7 rounded-full transition-all border-2"
                        :style="{ backgroundColor: color.hex }"
                        :class="selectedColors.includes(color.name)
                          ? 'border-gray-800 scale-110 shadow-md'
                          : 'border-white hover:border-gray-300 hover:scale-105 shadow-sm'"
                      ></button>
                    </div>
                  </template>

                  <!-- HARGA -->
                  <template v-if="filter.key === 'price'">
                    <div class="space-y-2 pt-1">
                      <div class="flex items-center gap-2">
                        <input v-model="priceMin" type="number" placeholder="Min"
                          class="w-full border border-gray-200 rounded-lg px-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-blue-300" />
                        <span class="text-gray-400 shrink-0">–</span>
                        <input v-model="priceMax" type="number" placeholder="Max"
                          class="w-full border border-gray-200 rounded-lg px-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-blue-300" />
                      </div>
                      <button class="w-full py-2 bg-blue-600 text-white text-xs font-bold rounded-lg hover:bg-blue-700 transition-colors">
                        Terapkan
                      </button>
                    </div>
                  </template>

                  <!-- DISKON -->
                  <template v-if="filter.key === 'discount'">
                    <label
                      v-for="disc in discountOptions"
                      :key="disc.label"
                      class="flex items-center gap-2.5 py-1 cursor-pointer group"
                    >
                      <input type="checkbox" v-model="selectedDiscounts" :value="disc.value"
                        class="w-3.5 h-3.5 rounded border-gray-300 text-blue-600 focus:ring-blue-400" />
                      <span class="text-sm text-gray-600 group-hover:text-gray-900 transition-colors">{{ disc.label }}</span>
                    </label>
                  </template>

                </div>
              </transition>
            </div>

          </div>

          <!-- Reset Filters -->
          <button
            @click="resetFilters"
            class="w-full mt-3 py-2.5 border border-gray-300 rounded-xl text-xs font-bold text-gray-600 hover:bg-white hover:border-gray-400 transition-all"
          >
            Reset Semua Filter
          </button>
        </aside>

        <!-- ============================================================
             PRODUCT AREA
        ============================================================ -->
        <div class="flex-1 min-w-0">

          <!-- Toolbar -->
          <div class="flex items-center justify-between mb-5">
            <p class="text-sm text-gray-500">
              Menampilkan <strong class="text-gray-700">{{ products.length }}</strong> produk
            </p>
            <div class="flex items-center gap-3">
              <!-- Active filters chips -->
              <div class="flex items-center gap-2 flex-wrap">
                <span
                  v-for="brand in selectedBrands"
                  :key="brand"
                  class="inline-flex items-center gap-1 bg-blue-50 text-blue-700 text-[11px] font-bold px-2.5 py-1 rounded-full border border-blue-200"
                >
                  {{ brand }}
                  <button @click="selectedBrands = selectedBrands.filter(b => b !== brand)" class="ml-0.5 hover:text-blue-900">×</button>
                </span>
              </div>
              <!-- Sort -->
              <select
                v-model="sortBy"
                class="border border-gray-200 rounded-xl px-3 py-2 text-sm text-gray-700 bg-white focus:outline-none focus:ring-1 focus:ring-blue-300 cursor-pointer"
              >
                <option value="newest">Terbaru</option>
                <option value="price_asc">Harga Terendah</option>
                <option value="price_desc">Harga Tertinggi</option>
                <option value="popular">Terlaris</option>
                <option value="rating">Rating Tertinggi</option>
              </select>
            </div>
          </div>

          <!-- Product Grid -->
          <div v-if="loading" class="grid grid-cols-4 gap-4">
            <div v-for="i in 8" :key="i" class="bg-white rounded-2xl overflow-hidden border border-gray-100 animate-pulse">
              <div class="aspect-square bg-gray-200"></div>
              <div class="p-3 space-y-2">
                <div class="h-2.5 bg-gray-200 rounded w-1/3"></div>
                <div class="h-3.5 bg-gray-200 rounded w-2/3"></div>
                <div class="h-4 bg-gray-200 rounded w-1/2 mt-3"></div>
              </div>
            </div>
          </div>
          <div v-else class="grid grid-cols-4 gap-4">
            <div
              v-for="product in products"
              :key="product.id"
              class="bg-white rounded-2xl overflow-hidden border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer group"
              @click="goToProduct(product.id)"
            >
              <!-- Image Area -->
              <div
                class="relative overflow-hidden flex items-center justify-center"
                style="aspect-ratio: 1/1.1;"
                :class="product.bgColor"
              >
                <!-- Emoji placeholder — replace with <img> on BE integration -->
                <span class="text-7xl select-none transform group-hover:scale-110 transition-transform duration-500">
                  {{ product.emoji }}
                </span>

                <!-- NEW badge -->
                <span
                  v-if="product.isNew"
                  class="absolute top-2.5 left-2.5 bg-blue-600 text-white text-[9px] font-black px-2.5 py-0.5 rounded uppercase tracking-wide"
                >NEW</span>

                <!-- Wishlist button -->
                <button
                  class="absolute top-2.5 right-2.5 w-7 h-7 bg-white rounded-full flex items-center justify-center shadow-md opacity-0 group-hover:opacity-100 transition-all hover:scale-110"
                  :class="wishlist.includes(product.id) ? 'text-red-500' : 'text-gray-400 hover:text-red-400'"
                  @click.stop="toggleWishlist(product.id)"
                >
                  <svg class="w-4 h-4" :fill="wishlist.includes(product.id) ? 'currentColor' : 'none'" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
                  </svg>
                </button>

                <!-- Overlay add to cart on hover -->
                <div class="absolute bottom-0 left-0 right-0 bg-white/95 py-2 text-center text-[11px] font-bold text-blue-600 translate-y-full group-hover:translate-y-0 transition-transform duration-200">
                  Lihat Detail
                </div>
              </div>

              <!-- Product Info -->
              <div class="p-3">
                <p class="text-[11px] text-gray-400 uppercase tracking-widest font-medium mb-0.5">{{ product.brand }}</p>
                <p class="text-sm font-semibold text-gray-800 leading-snug mb-2 line-clamp-2">{{ product.name }}</p>
                <div class="flex items-end justify-between gap-2">
                  <div>
                    <p class="text-[10px] text-gray-400 leading-none mb-0.5">Harga</p>
                    <p class="text-sm font-black text-gray-900">{{ product.price }}</p>
                    <p v-if="product.originalPrice" class="text-[11px] text-gray-400 line-through">{{ product.originalPrice }}</p>
                  </div>
                  <button
                    class="w-8 h-8 bg-blue-800 text-white rounded-xl flex items-center justify-center hover:bg-blue-900 active:scale-95 transition-all shrink-0 shadow-md"
                    @click.stop="addToCart(product)"
                  >
                    <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2.5">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"/>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>

          <!-- Empty State -->
          <div v-if="products.length === 0" class="text-center py-20">
            <span class="text-6xl">🔍</span>
            <p class="text-gray-500 font-medium mt-4">Tidak ada produk yang cocok dengan filter kamu.</p>
            <button @click="resetFilters" class="mt-4 px-6 py-2.5 bg-blue-600 text-white text-sm font-bold rounded-full hover:bg-blue-700 transition">
              Reset Filter
            </button>
          </div>

          <!-- Pagination -->
          <div v-if="products.length > 0" class="flex items-center justify-center gap-2 mt-10">
            <button
              class="w-9 h-9 flex items-center justify-center rounded-xl border border-gray-200 text-gray-500 hover:border-blue-400 hover:text-blue-600 transition"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M15 19l-7-7 7-7"/></svg>
            </button>
            <button
              v-for="page in totalPages"
              :key="page"
              @click="currentPage = page"
              class="w-9 h-9 flex items-center justify-center rounded-xl text-sm font-bold transition"
              :class="currentPage === page
                ? 'bg-blue-600 text-white shadow-md shadow-blue-200'
                : 'border border-gray-200 text-gray-600 hover:border-blue-400 hover:text-blue-600'"
            >{{ page }}</button>
            <button
              class="w-9 h-9 flex items-center justify-center rounded-xl border border-gray-200 text-gray-500 hover:border-blue-400 hover:text-blue-600 transition"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M9 5l7 7-7 7"/></svg>
            </button>
          </div>

        </div>
      </div>
    </div>

    <!-- Add to Cart Toast -->
    <transition name="toast">
      <div
        v-if="showToast"
        class="fixed bottom-6 right-6 bg-gray-900 text-white text-sm font-medium px-5 py-3 rounded-2xl shadow-2xl flex items-center gap-3 z-50"
      >
        <span class="text-green-400">✓</span>
        Produk ditambahkan ke keranjang
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { productService } from '../../services/product';
import { cartService } from '../../services/cart';
import { showToastSuccess, showToastError } from '../../services/api';

const route = useRoute();
const router = useRouter();

// ===================== PAGE TITLE =====================
const pageTitle = computed(() => {
  const slug = route.params.slug || 'men';
  const titles = {
    men: 'Men',
    women: 'Woman',
    kids: 'Kids',
    shoes: 'Shoes',
    beauty: 'Beauty',
    bags: 'Bag & Accessories',
    brands: 'Brands',
  };
  return titles[slug] || slug;
});

// ===================== STATE =====================
const loading = ref(true);
const productsTotal = ref(0);

// ===================== FILTER STATE =====================
const openFilters = ref(['category']); // open by default
const selectedBrands = ref([]);
const selectedCategories = ref([]);
const selectedSubCategories = ref([]);
const selectedSizes = ref([]);
const selectedColors = ref([]);
const selectedDiscounts = ref([]);
const priceMin = ref('');
const priceMax = ref('');
const categorySearch = ref('');
const sortBy = ref('newest');
const currentPage = ref(1);
const perPage = 12;
const totalPages = computed(() => Math.max(1, Math.ceil(productsTotal.value / perPage)));

const toggleFilter = (key) => {
  const idx = openFilters.value.indexOf(key);
  if (idx === -1) openFilters.value.push(key);
  else openFilters.value.splice(idx, 1);
};

const toggleSize = (size) => {
  const idx = selectedSizes.value.indexOf(size);
  if (idx === -1) selectedSizes.value.push(size);
  else selectedSizes.value.splice(idx, 1);
};

const toggleColor = (color) => {
  const idx = selectedColors.value.indexOf(color);
  if (idx === -1) selectedColors.value.push(color);
  else selectedColors.value.splice(idx, 1);
};

const resetFilters = () => {
  selectedBrands.value = [];
  selectedCategories.value = [];
  selectedSubCategories.value = [];
  selectedSizes.value = [];
  selectedColors.value = [];
  selectedDiscounts.value = [];
  priceMin.value = '';
  priceMax.value = '';
  currentPage.value = 1;
  fetchProducts();
};

// ===================== FILTER OPTIONS =====================
const filterSections = [
  { key: 'brand',       label: 'Merek' },
  { key: 'category',    label: 'Kategori' },
  { key: 'subcategory', label: 'Sub Kategori' },
  { key: 'size',        label: 'Ukuran' },
  { key: 'color',       label: 'Warna' },
  { key: 'price',       label: 'Harga' },
  { key: 'discount',    label: 'Diskon' },
];

const brandOptions = [
  { name: 'Nevada',  count: 32 },
  { name: 'Cole',    count: 18 },
  { name: 'Suko',    count: 15 },
  { name: "Gab's",   count: 11 },
  { name: 'Lois',    count: 9  },
  { name: 'Walrus',  count: 7  },
  { name: 'TZone',   count: 5  },
];

const categoryOptions = [
  { name: 'Atasan', count: 20 },
  { name: 'Pria',   count: 20 },
  { name: 'Kemeja', count: 14 },
  { name: 'Jeans',  count: 10 },
  { name: 'Batik',  count: 8  },
  { name: 'Outwear',count: 6  },
];

const filteredCategories = computed(() =>
  categoryOptions.filter(c =>
    c.name.toLowerCase().includes(categorySearch.value.toLowerCase())
  )
);

const subCategoryOptions = [
  { name: 'Polo Shirt',  count: 12 },
  { name: 'T-Shirt',     count: 10 },
  { name: 'Henley',      count: 7  },
  { name: 'Slim Fit',    count: 9  },
];

const sizeOptions = ['XS', 'S', 'M', 'L', 'XL', 'XXL', '3XL'];

const colorOptions = [
  { name: 'Putih',   hex: '#FFFFFF' },
  { name: 'Hitam',   hex: '#1F2937' },
  { name: 'Abu-abu', hex: '#9CA3AF' },
  { name: 'Biru',    hex: '#3B82F6' },
  { name: 'Merah',   hex: '#EF4444' },
  { name: 'Cokelat', hex: '#92400E' },
  { name: 'Hijau',   hex: '#10B981' },
  { name: 'Krem',    hex: '#E5D5B7' },
];

const discountOptions = [
  { label: '10% ke atas',  value: 10  },
  { label: '20% ke atas',  value: 20  },
  { label: '30% ke atas',  value: 30  },
  { label: '50% ke atas',  value: 50  },
];

// ===================== WISHLIST =====================
const wishlist = ref([]);
const toggleWishlist = (id) => {
  const idx = wishlist.value.indexOf(id);
  if (idx === -1) wishlist.value.push(id);
  else wishlist.value.splice(idx, 1);
};

// ===================== CART TOAST =====================
const showToast = ref(false);
let toastTimer;

const addToCart = async (product) => {
  // Ambil variant pertama yang tersedia
  const firstVariant = product.variants?.[0];
  if (!firstVariant) {
    showToastError('Produk ini belum memiliki varian.');
    return;
  }
  try {
    await cartService.addToCart(firstVariant.id, 1);
    clearTimeout(toastTimer);
    showToast.value = true;
    toastTimer = setTimeout(() => { showToast.value = false; }, 2500);
  } catch (error) {
    // Error ditampilkan oleh service
  }
};

// ===================== NAVIGATION =====================
const goToProduct = (id) => {
  router.push(`/product/${id}`);
};

// ===================== PRODUCT DATA (from API) =====================
const products = ref([]);

const fetchProducts = async () => {
  loading.value = true;
  try {
    const data = await productService.getProducts({
      page: currentPage.value,
      limit: perPage,
    });

    productsTotal.value = data.total || 0;
    products.value = (data.products || []).map((p, i) => {
      const variants = p.variants || [];
      const prices = variants.map(v => v.price).filter(Boolean);
      const minPrice = prices.length > 0 ? Math.min(...prices) : 0;

      return {
        id: p.id,
        brand: p.store?.name || p.brand || 'Unknown',
        name: p.name || 'Produk',
        price: `Rp ${Number(minPrice).toLocaleString('id-ID')}`,
        originalPrice: null,
        isNew: i < 6,
        emoji: ['👕', '👔', '👗', '🧥', '👖', '🎽'][i % 6],
        bgColor: ['bg-stone-100', 'bg-amber-50', 'bg-gray-100', 'bg-blue-50', 'bg-rose-50', 'bg-orange-50'][i % 6],
        variants: variants,
      };
    });
  } catch (error) {
    products.value = [];
    productsTotal.value = 0;
  } finally {
    loading.value = false;
  }
};

// ===================== WATCHERS =====================
watch(currentPage, () => {
  fetchProducts();
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

watch(() => route.params.slug, () => {
  currentPage.value = 1;
  fetchProducts();
});

// ===================== INIT =====================
onMounted(() => {
  fetchProducts();
});
</script>

<style scoped>
/* Accordion transition */
.accordion-enter-active,
.accordion-leave-active {
  transition: all 0.25s ease;
  overflow: hidden;
}
.accordion-enter-from,
.accordion-leave-to {
  opacity: 0;
  max-height: 0;
  transform: translateY(-4px);
}
.accordion-enter-to,
.accordion-leave-from {
  opacity: 1;
  max-height: 400px;
}

/* Toast transition */
.toast-enter-active,
.toast-leave-active {
  transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
}
.toast-enter-from,
.toast-leave-to {
  opacity: 0;
  transform: translateY(20px) scale(0.9);
}
</style>
