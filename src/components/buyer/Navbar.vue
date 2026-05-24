<template>
  <nav class="sticky top-0 z-50 bg-white shadow-sm">
    <!-- ===================== TOP BAR ===================== -->
    <div class="border-b border-gray-100">
      <div class="max-w-[1280px] mx-auto px-6 h-16 flex items-center gap-6">

        <!-- Logo -->
        <router-link to="/" class="flex flex-col items-center text-blue-500 shrink-0 group">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-7 h-7 group-hover:scale-110 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.8">
            <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
          </svg>
          <span class="text-[11px] font-extrabold tracking-tight leading-none text-blue-600">Cloudmart</span>
        </router-link>

        <!-- Search Bar -->
        <div class="flex-1 max-w-lg mx-auto">
          <div class="flex items-center border border-gray-300 rounded-full bg-white h-10 px-4 focus-within:border-blue-400 focus-within:ring-2 focus-within:ring-blue-100 transition">
            <input
              v-model="searchQuery"
              type="text"
              placeholder="Search"
              class="flex-1 text-sm outline-none bg-transparent text-gray-700 placeholder-gray-400"
            />
            <button class="text-gray-500 hover:text-blue-500 transition-colors ml-2">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2.5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"/>
              </svg>
            </button>
          </div>
        </div>

        <!-- Right Icons -->
        <div class="flex items-center gap-2 ml-auto">
          <!-- Cart -->
          <router-link to="/cart" class="relative p-2.5 text-gray-600 hover:text-blue-500 transition-colors group">
            <svg class="w-6 h-6 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="1.8">
              <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007z"/>
            </svg>
            <span v-if="cartCount > 0" class="absolute top-1 right-1 w-4 h-4 bg-blue-500 text-white text-[9px] font-bold rounded-full flex items-center justify-center">{{ cartCount }}</span>
          </router-link>

          <!-- User Dropdown -->
          <div class="relative group p-2.5">
            <button class="text-gray-600 group-hover:text-blue-500 transition-colors">
              <svg class="w-6 h-6 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="1.8">
                <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"/>
              </svg>
            </button>
            
            <!-- Auth / User Menu Dropdown -->
            <div class="absolute right-0 top-full mt-1 w-48 bg-white border border-gray-100 shadow-xl rounded-2xl p-2 opacity-0 invisible translate-y-1 group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 transition-all duration-200 z-50">
              <!-- Sudah login -->
              <template v-if="isLoggedIn">
                <div class="px-4 py-2.5">
                  <p class="text-sm font-bold text-gray-800 truncate">{{ userName }}</p>
                  <p class="text-[11px] text-gray-400">Buyer</p>
                </div>
                <div class="border-t border-gray-100 my-1"></div>
                <router-link to="/profile" class="block px-4 py-2.5 text-sm font-medium text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                  👤 Profil Saya
                </router-link>
                <router-link to="/orders" class="block px-4 py-2.5 text-sm font-medium text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                  📦 Pesanan Saya
                </router-link>
                <router-link to="/admin/login" class="block px-4 py-2.5 text-sm font-medium text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                  👨‍💼 Seller Center
                </router-link>
                <div class="border-t border-gray-100 my-1"></div>
                <button @click="handleLogout" class="w-full text-left px-4 py-2.5 text-sm font-medium text-red-500 hover:bg-red-50 rounded-lg transition-colors">
                  🚪 Keluar
                </button>
              </template>
              <!-- Belum login -->
              <template v-else>
                <router-link to="/login" class="block px-4 py-2.5 text-sm font-bold text-gray-800 hover:bg-gray-50 rounded-lg transition-colors">
                  Masuk / Daftar
                </router-link>
                <div class="border-t border-gray-100 my-1"></div>
                <router-link to="/profile" class="block px-4 py-2.5 text-sm font-medium text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                  👤 Profil Saya
                </router-link>
                <router-link to="/orders" class="block px-4 py-2.5 text-sm font-medium text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                  📦 Pesanan Saya
                </router-link>
                <router-link to="/admin/login" class="block px-4 py-2.5 text-sm font-medium text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                  👨‍💼 Seller Center
                </router-link>
              </template>
            </div>
          </div>
        </div>

      </div>
    </div>

    <!-- ===================== CATEGORY NAV ===================== -->
    <div class="border-b border-gray-100">
      <div class="max-w-[1280px] mx-auto px-6 flex items-center">
        <div
          v-for="item in navItems"
          :key="item.label"
          class="relative group"
        >
          <!-- Nav Label — klik label/chevron → masuk ke halaman kategori -->
          <router-link
            :to="`/category/${item.slug}`"
            class="flex items-center gap-1 px-4 py-3 text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors whitespace-nowrap"
            active-class="text-blue-600"
          >
            {{ item.label }}
            <svg
              class="w-3 h-3 transition-transform duration-200 group-hover:rotate-180"
              fill="currentColor" viewBox="0 0 20 20"
            >
              <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd"/>
            </svg>
          </router-link>

          <!-- Mega Dropdown — muncul saat hover item -->
          <div
            v-if="item.columns"
            class="absolute left-0 top-full bg-white border-t-2 border-blue-500 shadow-2xl rounded-b-2xl
                   invisible opacity-0 translate-y-1 pointer-events-none
                   group-hover:visible group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto
                   transition-all duration-200 ease-out z-50
                   flex gap-6 p-6"
            style="min-width: 680px;"
          >
            <!-- Preview Emoji -->
            <div
              class="w-36 h-44 rounded-xl overflow-hidden shrink-0 flex items-center justify-center text-6xl"
              :class="item.previewBg"
            >
              {{ item.previewEmoji }}
            </div>

            <!-- Category Columns -->
            <div class="flex gap-8 flex-1">
              <div v-for="col in item.columns" :key="col.title" class="min-w-[120px]">
                <h4 class="text-[10px] font-black text-gray-900 mb-3 uppercase tracking-widest">{{ col.title }}</h4>
                <ul class="space-y-2">
                  <li v-for="link in col.links" :key="link">
                    <router-link
                      :to="`/category/${item.slug}?q=${encodeURIComponent(link)}`"
                      class="text-sm text-gray-500 hover:text-blue-600 transition-colors"
                    >
                      {{ link }}
                    </router-link>
                  </li>
                </ul>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>

  </nav>

</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { cartService } from '../../services/cart';
import { authService } from '../../services/auth';

const router = useRouter();
const searchQuery = ref('');
const cartCount = ref(0);
const isLoggedIn = ref(false);
const userName = ref('');

// ===================== FETCH CART COUNT =====================
const fetchCartCount = async () => {
  if (!authService.isAuthenticated()) return;
  try {
    const data = await cartService.getCart();
    cartCount.value = data.items ? data.items.length : 0;
  } catch (error) {
    cartCount.value = 0;
  }
};

// ===================== FETCH PROFILE =====================
const fetchProfile = async () => {
  if (!authService.isAuthenticated()) {
    isLoggedIn.value = false;
    return;
  }
  try {
    const data = await authService.getProfile();
    isLoggedIn.value = true;
    userName.value = data.name || data.email || 'User';
  } catch (error) {
    isLoggedIn.value = false;
  }
};

// ===================== LOGOUT =====================
const handleLogout = () => {
  authService.logout();
  isLoggedIn.value = false;
  cartCount.value = 0;
  userName.value = '';
  router.push('/');
};

onMounted(() => {
  fetchProfile();
  fetchCartCount();
});

const navItems = [
  {
    label: 'Men',
    slug: 'men',
    previewEmoji: '👔',
    previewBg: 'bg-stone-100',
    columns: [
      { title: 'CLOTHES', links: ['Kaos & Polo Shirt', 'Kemeja', 'Celana Panjang', 'Celana Pendek', 'Jeans', 'Outwear', 'Batik'] },
      { title: 'TAS & AKSESORIS', links: ['Topi', 'Ikat Pinggang', 'Jam Tangan', 'Kacamata', 'Dompet', 'Backpack', 'Hand Bags'] },
      { title: 'PAKAIAN MUSLIM', links: ['Baju Koko', 'Gamis & Kurta & Jubah', 'Pria'] },
      { title: 'BRANDS', links: ['Nevada', 'Cole', 'Suko', "Gab's", 'Lois', 'Walrus', 'TZone'] },
    ]
  },
  {
    label: 'Woman',
    slug: 'women',
    previewEmoji: '👗',
    previewBg: 'bg-rose-50',
    columns: [
      { title: 'CLOTHES', links: ['Dress', 'Blouse', 'Rok & Skirt', 'Celana Wanita', 'Outer', 'Jumpsuit', 'Kimono'] },
      { title: 'TAS & AKSESORIS', links: ['Tas Tangan', 'Jam Tangan', 'Dompet', 'Kacamata', 'Topi', 'Perhiasan'] },
      { title: 'PAKAIAN MUSLIM', links: ['Hijab', 'Gamis', 'Mukena', 'Abaya', 'Tunik'] },
      { title: 'BRANDS', links: ['Zara', 'H&M', 'Uniqlo', 'Cole', 'Suko', 'Walrus'] },
    ]
  },
  {
    label: 'Kids',
    slug: 'kids',
    previewEmoji: '🎒',
    previewBg: 'bg-sky-50',
    columns: [
      { title: 'BOYS', links: ['Kaos', 'Celana', 'Sepatu', 'Tas Sekolah', 'Jaket', 'Seragam'] },
      { title: 'GIRLS', links: ['Dress', 'Rok', 'Sepatu', 'Tas', 'Aksesoris', 'Seragam'] },
      { title: 'BRANDS', links: ['Nevada Kids', 'Poney', 'Mothercare', 'Giordano'] },
    ]
  },
  {
    label: 'Shoes',
    slug: 'shoes',
    previewEmoji: '👟',
    previewBg: 'bg-amber-50',
    columns: [
      { title: 'PRIA', links: ['Sneakers', 'Sepatu Formal', 'Sepatu Kasual', 'Sandal', 'Boots', 'Loafers'] },
      { title: 'WANITA', links: ['High Heels', 'Flat Shoes', 'Sneakers', 'Sandal', 'Boots', 'Wedges'] },
      { title: 'BRANDS', links: ['Nike', 'Adidas', 'Vans', 'Converse', 'Skechers', 'Fila'] },
    ]
  },
  {
    label: 'Beauty',
    slug: 'beauty',
    previewEmoji: '💄',
    previewBg: 'bg-pink-50',
    columns: [
      { title: 'MAKEUP', links: ['Foundation', 'Lipstick', 'Eyeshadow', 'Maskara', 'Blush On', 'Concealer'] },
      { title: 'SKINCARE', links: ['Moisturizer', 'Serum', 'Sunscreen', 'Toner', 'Face Wash', 'Eye Cream'] },
      { title: 'BRANDS', links: ['Wardah', 'Emina', "L'Oreal", 'Maybelline', 'Pixy', 'MS Glow'] },
    ]
  },
  {
    label: 'Bag & accessories',
    slug: 'bags',
    previewEmoji: '👜',
    previewBg: 'bg-amber-50',
    columns: [
      { title: 'TAS', links: ['Backpack', 'Tote Bag', 'Sling Bag', 'Dompet', 'Hand Bag', 'Koper'] },
      { title: 'AKSESORIS', links: ['Ikat Pinggang', 'Jam Tangan', 'Kacamata', 'Topi', 'Kalung', 'Gelang'] },
      { title: 'BRANDS', links: ['Polo', 'Eiger', 'Deuter', 'Samsonite', 'Kickers'] },
    ]
  },
  {
    label: 'Brands',
    slug: 'brands',
    previewEmoji: '🏷️',
    previewBg: 'bg-blue-50',
    columns: [
      { title: 'POPULAR', links: ['Nevada', 'Cole', 'Suko', "Gab's", 'Lois', 'Walrus', 'TZone'] },
      { title: 'PREMIUM', links: ['Polo Ralph Lauren', 'Tommy Hilfiger', 'Lacoste', 'Calvin Klein'] },
      { title: 'LOKAL', links: ['Erigo', 'Cotton Ink', 'UNKL', 'Bloods', 'HMNS', 'Compass'] },
    ]
  },
];
</script>
