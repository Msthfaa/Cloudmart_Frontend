<template>
  <div class="bg-white">

    <!-- ======================== HERO BANNER ======================== -->
    <section class="relative overflow-hidden" style="height: 480px;">
      <!-- Slides container -->
      <div
        class="flex h-full transition-transform duration-700 ease-in-out"
        :style="`transform: translateX(-${currentSlide * 100}%)`"
      >
        <div
          v-for="(slide, i) in heroSlides"
          :key="i"
          class="w-full h-full shrink-0 relative flex items-center"
          :class="slide.bg"
        >
          <div class="max-w-[1280px] mx-auto px-12 w-full flex items-center justify-between">
            <!-- Text Content -->
            <div class="max-w-lg">
              <p class="text-blue-600 text-2xl italic font-light mb-2" style="font-family: 'Georgia', serif;">{{ slide.subTitle }}</p>
              <h1 class="text-5xl font-black text-gray-900 leading-tight mb-3 uppercase tracking-tight">{{ slide.title }}</h1>
              <p class="text-gray-500 text-sm mb-8 font-medium">{{ slide.desc }}</p>
              <div class="flex gap-4">
                <button class="px-7 py-2.5 bg-gray-900 text-white text-sm font-bold tracking-widest uppercase hover:bg-gray-700 transition-colors rounded">
                  Shop Now
                </button>
                <button class="px-7 py-2.5 border-2 border-gray-900 text-gray-900 text-sm font-bold tracking-widest uppercase hover:bg-gray-900 hover:text-white transition-all rounded">
                  Read More
                </button>
              </div>
            </div>
            <!-- Hero Image/Emoji -->
            <div class="text-[9rem] select-none opacity-80 hidden md:block">{{ slide.emoji }}</div>
          </div>
        </div>
      </div>

      <!-- Dots -->
      <div class="absolute bottom-5 left-1/2 -translate-x-1/2 flex items-center gap-2">
        <button
          v-for="(_, i) in heroSlides"
          :key="i"
          @click="currentSlide = i"
          class="h-2 rounded-full transition-all duration-300"
          :class="i === currentSlide ? 'w-6 bg-gray-800' : 'w-2 bg-gray-400'"
        ></button>
      </div>

      <!-- Arrows -->
      <button
        @click="prevSlide"
        class="absolute left-4 top-1/2 -translate-y-1/2 w-9 h-9 bg-white/70 backdrop-blur-sm rounded-full flex items-center justify-center text-gray-700 hover:bg-white transition shadow"
      >
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M15 19l-7-7 7-7"/></svg>
      </button>
      <button
        @click="nextSlide"
        class="absolute right-4 top-1/2 -translate-y-1/2 w-9 h-9 bg-white/70 backdrop-blur-sm rounded-full flex items-center justify-center text-gray-700 hover:bg-white transition shadow"
      >
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M9 5l7 7-7 7"/></svg>
      </button>
    </section>

    <!-- ======================== PROMO GRID ======================== -->
    <section class="max-w-[1280px] mx-auto px-6 py-10">
      <div class="flex gap-4" style="height: 320px;">

        <!-- Large Left Promo -->
        <div class="relative flex-1 rounded-2xl overflow-hidden flex flex-col justify-end p-7 bg-gradient-to-br from-gray-800 to-gray-950 cursor-pointer group">
          <div class="absolute inset-0 transition-transform duration-500 group-hover:scale-105 flex items-center justify-end pr-8">
            <span class="text-[7rem] opacity-20 select-none">👗</span>
          </div>
          <div class="relative z-10">
            <span class="inline-block bg-green-400/20 text-green-300 text-xs font-bold px-2.5 py-1 rounded-full mb-2 border border-green-400/30">New Arrivals</span>
            <h3 class="text-white text-3xl font-black leading-tight mb-1">Women's Style</h3>
            <p class="text-gray-400 text-sm mb-5">Up to 70% Off!</p>
            <button class="px-5 py-2 border border-white/50 text-white text-sm font-medium rounded-full hover:bg-white hover:text-gray-900 transition-all">
              Shop now
            </button>
          </div>
        </div>

        <!-- 2x2 Right Promos -->
        <div class="grid grid-cols-2 gap-4" style="width: 55%;">
          <div
            v-for="promo in promoCards"
            :key="promo.title"
            class="rounded-2xl p-5 relative overflow-hidden cursor-pointer group hover:shadow-lg transition-shadow flex flex-col justify-between"
            :class="promo.bg"
          >
            <div>
              <span v-if="promo.discount" class="inline-block bg-orange-500 text-white text-[10px] font-black px-2.5 py-1 rounded-full mb-2">{{ promo.discount }}</span>
              <h4 class="font-black text-gray-800 text-base leading-tight">{{ promo.category }}</h4>
              <p class="text-sm font-bold text-gray-700 mt-0.5">{{ promo.title }}</p>
              <p class="text-xs text-gray-500">{{ promo.sub }}</p>
            </div>
            <a href="#" class="text-xs font-bold text-blue-500 hover:text-blue-700 transition-colors">Shop now →</a>
            <div class="absolute right-3 bottom-3 text-5xl opacity-20 group-hover:opacity-30 group-hover:scale-110 transition-all select-none">{{ promo.emoji }}</div>
          </div>
        </div>

      </div>
    </section>

    <!-- ======================== FEATURED PRODUCTS ======================== -->
    <section class="max-w-[1280px] mx-auto px-6 py-10 border-t border-gray-100">

      <!-- Section Header -->
      <div class="text-center mb-8">
        <h2 class="text-2xl font-black text-gray-900">Featured Products</h2>
        <div class="flex items-center justify-center gap-10 mt-5">
          <button
            v-for="tab in productTabs"
            :key="tab"
            @click="activeTab = tab"
            class="text-sm font-semibold pb-2 transition-all"
            :class="activeTab === tab
              ? 'text-gray-900 border-b-2 border-gray-900'
              : 'text-gray-400 hover:text-gray-600 border-b-2 border-transparent'"
          >
            {{ tab }}
          </button>
        </div>
      </div>

      <!-- Products Grid -->
      <div class="grid grid-cols-5 gap-5">
        <div
          v-for="product in filteredProducts.slice(0, 5)"
          :key="product.id"
          class="group cursor-pointer"
        >
          <div class="aspect-square rounded-2xl mb-3 overflow-hidden flex items-center justify-center text-5xl transition-shadow group-hover:shadow-xl"
               :class="product.bgColor">
            {{ product.emoji }}
          </div>
          <p class="text-[10px] text-gray-400 uppercase tracking-widest font-medium">{{ product.brand }}</p>
          <p class="text-sm text-gray-800 font-medium leading-snug mt-0.5 line-clamp-2">{{ product.name }}</p>
          <div class="flex items-center gap-1 my-1.5">
            <span class="text-yellow-400 text-xs">{{ '★'.repeat(Math.floor(product.rating)) }}{{ product.rating % 1 ? '☆' : '' }}</span>
            <span class="text-[11px] text-gray-400">({{ product.reviews }})</span>
          </div>
          <div class="flex items-center gap-2">
            <span class="text-sm font-black text-gray-900">{{ product.price }}</span>
            <span v-if="product.originalPrice" class="text-xs text-gray-400 line-through">{{ product.originalPrice }}</span>
          </div>
        </div>
      </div>

      <!-- See More -->
      <div class="text-center mt-10">
        <button class="px-12 py-3 bg-blue-600 text-white text-sm font-bold rounded-full hover:bg-blue-700 transition-colors shadow-md shadow-blue-200">
          SEE MORE
        </button>
      </div>
    </section>

    <!-- ======================== BRANDS ======================== -->
    <section class="max-w-[1280px] mx-auto px-6 py-10 border-t border-gray-100">
      <h2 class="text-2xl font-black text-gray-900 mb-1">Brands</h2>
      <div class="w-10 h-1 bg-blue-500 mb-7 rounded-full"></div>
      <div class="grid grid-cols-8 gap-3">
        <div
          v-for="brand in brands"
          :key="brand.id"
          class="border border-gray-200 rounded-full px-3 py-2 flex items-center gap-2 cursor-pointer hover:border-blue-400 hover:bg-blue-50 transition-all group"
        >
          <div class="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center text-white text-[9px] font-black shrink-0 group-hover:bg-blue-700 transition-colors">
            {{ brand.initial }}
          </div>
          <span class="text-xs font-bold text-gray-700 uppercase tracking-wide truncate">{{ brand.name }}</span>
        </div>
      </div>
    </section>

    <!-- ======================== FLASH SALE ======================== -->
    <section class="max-w-[1280px] mx-auto px-6 py-10">
      <div class="flex items-center justify-between mb-7">
        <div>
          <h2 class="text-2xl font-black text-gray-900">Flash Sale</h2>
          <div class="w-10 h-1 bg-red-500 mt-1 rounded-full"></div>
        </div>
        <!-- Countdown Timer -->
        <div class="flex items-center gap-3">
          <span class="text-sm text-gray-500 font-medium">Berakhir dalam:</span>
          <div class="flex items-center gap-1.5">
            <div v-for="(unit, i) in countdownUnits" :key="i" class="flex items-center gap-1.5">
              <div class="bg-red-500 text-white font-black text-sm px-3 py-1.5 rounded-lg min-w-[42px] text-center tabular-nums shadow-sm">
                {{ unit.value }}
              </div>
              <span v-if="i < countdownUnits.length - 1" class="text-red-500 font-black text-lg">:</span>
            </div>
          </div>
        </div>
      </div>

      <div class="grid grid-cols-5 gap-5">
        <div
          v-for="product in flashProducts"
          :key="product.id"
          class="group cursor-pointer"
        >
          <div class="relative aspect-square rounded-2xl mb-3 overflow-hidden flex items-center justify-center text-5xl transition-shadow group-hover:shadow-xl"
               :class="product.bgColor">
            {{ product.emoji }}
            <div class="absolute top-2.5 left-2.5 bg-red-500 text-white text-[10px] font-black px-2 py-0.5 rounded-full shadow">
              -{{ product.discount }}%
            </div>
          </div>
          <p class="text-[10px] text-gray-400 uppercase tracking-widest font-medium">{{ product.brand }}</p>
          <p class="text-sm text-gray-800 font-medium leading-snug mt-0.5 line-clamp-2">{{ product.name }}</p>
          <div class="flex items-center gap-1 my-1.5">
            <span class="text-yellow-400 text-xs">{{ '★'.repeat(Math.floor(product.rating)) }}</span>
            <span class="text-[11px] text-gray-400">({{ product.reviews }})</span>
          </div>
          <div class="flex items-center gap-2">
            <span class="text-sm font-black text-red-600">{{ product.price }}</span>
            <span class="text-xs text-gray-400 line-through">{{ product.originalPrice }}</span>
          </div>
        </div>
      </div>
    </section>

    <!-- ======================== BEST CHOICE ======================== -->
    <section class="max-w-[1280px] mx-auto px-6 py-10 border-t border-gray-100">
      <h2 class="text-2xl font-black text-gray-900 mb-7">Best choice</h2>
      <div class="grid grid-cols-4 gap-5">
        <div
          v-for="item in bestChoices"
          :key="item.id"
          class="group relative rounded-2xl overflow-hidden cursor-pointer aspect-[3/4] flex items-center justify-center"
          :class="item.bg"
        >
          <span class="text-[5rem] select-none">{{ item.emoji }}</span>
          <!-- Overlay on hover -->
          <div class="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300"></div>
          <div class="absolute bottom-0 left-0 right-0 bg-white/95 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
            <p class="font-black text-gray-900 text-sm">{{ item.title }}</p>
            <p class="text-xs text-gray-500 mt-0.5">{{ item.sub }}</p>
          </div>
        </div>
      </div>
    </section>

  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue';

// ======================== HERO CAROUSEL ========================
const currentSlide = ref(0);
const heroSlides = [
  {
    subTitle: 'Season Sale',
    title: "Man's Fashion",
    desc: 'Min. 35–70% Off — Koleksi terbaik pria pilihan editor',
    bg: 'bg-gradient-to-r from-stone-100 to-stone-200',
    emoji: '🧥',
  },
  {
    subTitle: 'New Arrivals',
    title: "Women's Style",
    desc: 'Up to 70% Off — Tren terkini untuk wanita modern',
    bg: 'bg-gradient-to-r from-rose-50 to-pink-100',
    emoji: '👗',
  },
  {
    subTitle: 'Flash Deals',
    title: 'Kids Collection',
    desc: 'Mulai dari Rp 49.000 — Nyaman & lucu untuk si kecil',
    bg: 'bg-gradient-to-r from-sky-50 to-blue-100',
    emoji: '🎒',
  },
];

const nextSlide = () => { currentSlide.value = (currentSlide.value + 1) % heroSlides.length; };
const prevSlide = () => { currentSlide.value = (currentSlide.value - 1 + heroSlides.length) % heroSlides.length; };

let slideInterval;
onMounted(() => { slideInterval = setInterval(nextSlide, 4000); });
onUnmounted(() => clearInterval(slideInterval));

// ======================== PROMO CARDS ========================
const promoCards = [
  { category: 'Accessories', title: 'Handbag', sub: 'Min. 15% off', discount: '15% OFF', bg: 'bg-amber-50', emoji: '👜' },
  { category: 'Accessories', title: 'Handbag', sub: 'Koleksi terbaru', discount: '20% OFF', bg: 'bg-stone-100', emoji: '👛' },
  { category: 'Accessories', title: 'Backpack', sub: 'Min. 30–55% off', discount: null, bg: 'bg-amber-100', emoji: '🎒' },
  { category: 'Accessories', title: 'Watches', sub: 'Min. 25% off', discount: null, bg: 'bg-stone-200', emoji: '⌚' },
];

// ======================== FEATURED PRODUCTS ========================
const productTabs = ['New Arrival', 'Best Selling', 'Top Rated'];
const activeTab = ref('New Arrival');

const allProducts = [
  { id: 1, brand: 'Backpack', name: 'Rattan Vintage Canvas Leather Premium', price: 'Rp 299.000', rating: 5, reviews: 124, emoji: '🎒', bgColor: 'bg-stone-100', tab: 'New Arrival' },
  { id: 2, brand: 'Backpack', name: 'Rattan Vintage Canvas Leather', price: 'Rp 299.000', rating: 4, reviews: 89, emoji: '🎒', bgColor: 'bg-amber-50', tab: 'New Arrival' },
  { id: 3, brand: 'Backpack', name: 'Rattan Canvas Outdoor Edition', price: 'Rp 285.000', originalPrice: 'Rp 350.000', rating: 5, reviews: 210, emoji: '🧳', bgColor: 'bg-stone-100', tab: 'New Arrival' },
  { id: 4, brand: 'Backpack', name: 'Rattan Vintage Slim Backpack', price: 'Rp 315.000', rating: 4, reviews: 67, emoji: '🎒', bgColor: 'bg-amber-50', tab: 'New Arrival' },
  { id: 5, brand: 'Longco', name: 'Rattan Ridge Canvas Men Edition', price: 'Rp 289.000', rating: 5, reviews: 340, emoji: '🎒', bgColor: 'bg-stone-50', tab: 'New Arrival' },
  { id: 6, brand: 'Nevada', name: 'Men Polo Shirt Premium Cotton', price: 'Rp 189.000', originalPrice: 'Rp 249.000', rating: 5, reviews: 512, emoji: '👕', bgColor: 'bg-blue-50', tab: 'Best Selling' },
  { id: 7, brand: 'Nevada', name: 'Slim Fit Chino Pants Modern', price: 'Rp 229.000', rating: 4, reviews: 391, emoji: '👖', bgColor: 'bg-stone-100', tab: 'Best Selling' },
  { id: 8, brand: 'Cole', name: 'Kemeja Flanel Premium Check', price: 'Rp 279.000', rating: 5, reviews: 445, emoji: '👔', bgColor: 'bg-red-50', tab: 'Best Selling' },
  { id: 9, brand: 'Suko', name: 'Classic Denim Jacket Washed', price: 'Rp 399.000', originalPrice: 'Rp 499.000', rating: 4, reviews: 278, emoji: '🧥', bgColor: 'bg-sky-50', tab: 'Best Selling' },
  { id: 10, brand: 'Walrus', name: 'Casual Linen Shirt Relaxed Fit', price: 'Rp 199.000', rating: 5, reviews: 602, emoji: '👕', bgColor: 'bg-amber-50', tab: 'Best Selling' },
  { id: 11, brand: 'Eiger', name: 'Trail Hiking Backpack 45L', price: 'Rp 549.000', rating: 5, reviews: 713, emoji: '🎒', bgColor: 'bg-green-50', tab: 'Top Rated' },
  { id: 12, brand: "Gab's", name: 'Leather Wallet Bifold Premium', price: 'Rp 149.000', rating: 5, reviews: 892, emoji: '👜', bgColor: 'bg-amber-100', tab: 'Top Rated' },
  { id: 13, brand: 'TZone', name: 'Chronograph Sports Watch Steel', price: 'Rp 679.000', rating: 5, reviews: 534, emoji: '⌚', bgColor: 'bg-gray-100', tab: 'Top Rated' },
  { id: 14, brand: 'Lois', name: 'Slim Straight Jeans Dark Wash', price: 'Rp 319.000', originalPrice: 'Rp 399.000', rating: 5, reviews: 448, emoji: '👖', bgColor: 'bg-blue-50', tab: 'Top Rated' },
  { id: 15, brand: 'Nevada', name: 'Batik Modern Long Sleeve Shirt', price: 'Rp 259.000', rating: 5, reviews: 675, emoji: '👔', bgColor: 'bg-orange-50', tab: 'Top Rated' },
];

const filteredProducts = computed(() => allProducts.filter(p => p.tab === activeTab.value));

// ======================== BRANDS ========================
const brandsList = ['Nevada', 'Cole', 'Suko', "Gab's", 'Lois', 'Walrus', 'TZone', 'Polo', 'Eiger', 'Erigo', 'Uniqlo', 'H&M', 'Adidas', 'Nike', 'Vans', 'Zara'];
const brands = brandsList.map((name, i) => ({ id: i + 1, name, initial: name[0].toUpperCase() }));

// ======================== FLASH SALE ========================
const flashProducts = [
  { id: 101, brand: 'Backpack', name: 'Rattan Vintage Canvas Leather Classic', price: 'Rp 205.000', originalPrice: 'Rp 299.000', discount: 31, rating: 4, reviews: 127, emoji: '🎒', bgColor: 'bg-stone-100' },
  { id: 102, brand: 'Nevada', name: 'Men Polo Shirt Cotton Pique', price: 'Rp 129.000', originalPrice: 'Rp 189.000', discount: 32, rating: 4, reviews: 89, emoji: '👕', bgColor: 'bg-blue-50' },
  { id: 103, brand: 'Cole', name: 'Chino Jogger Pants Relaxed', price: 'Rp 159.000', originalPrice: 'Rp 229.000', discount: 31, rating: 4, reviews: 204, emoji: '👖', bgColor: 'bg-amber-50' },
  { id: 104, brand: 'Suko', name: 'Casual Hoodie Fleece Premium', price: 'Rp 219.000', originalPrice: 'Rp 349.000', discount: 37, rating: 5, reviews: 163, emoji: '🧥', bgColor: 'bg-stone-100' },
  { id: 105, brand: 'Walrus', name: 'Canvas Sneakers Low Profile', price: 'Rp 269.000', originalPrice: 'Rp 399.000', discount: 33, rating: 4, reviews: 94, emoji: '👟', bgColor: 'bg-sky-50' },
];

// ======================== BEST CHOICE ========================
const bestChoices = [
  { id: 1, bg: 'bg-stone-200', emoji: '🕶️', title: 'Casual Outfit for Men', sub: 'Shop Collection →' },
  { id: 2, bg: 'bg-amber-100', emoji: '👗', title: 'Best Collection Women', sub: 'Shop Collection →' },
  { id: 3, bg: 'bg-sky-100', emoji: '👟', title: 'Sneakers for Kids', sub: 'Shop Collection →' },
  { id: 4, bg: 'bg-orange-100', emoji: '🧥', title: 'Best Outwear for Men', sub: 'Shop Collection →' },
];

// ======================== COUNTDOWN TIMER ========================
const countdownUnits = ref([
  { label: 'HH', value: '08' },
  { label: 'MM', value: '45' },
  { label: 'SS', value: '30' },
]);

// Set target to 9 hours from now
const targetTime = ref(Date.now() + 9 * 60 * 60 * 1000);

const updateCountdown = () => {
  const diff = Math.max(0, targetTime.value - Date.now());
  const hours = Math.floor(diff / 3600000);
  const mins = Math.floor((diff % 3600000) / 60000);
  const secs = Math.floor((diff % 60000) / 1000);
  countdownUnits.value[0].value = String(hours).padStart(2, '0');
  countdownUnits.value[1].value = String(mins).padStart(2, '0');
  countdownUnits.value[2].value = String(secs).padStart(2, '0');
};

let timer;
onMounted(() => {
  updateCountdown();
  timer = setInterval(updateCountdown, 1000);
});
onUnmounted(() => clearInterval(timer));
</script>
