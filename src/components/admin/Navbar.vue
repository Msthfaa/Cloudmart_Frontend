<template>
  <nav class="h-20 bg-white/80 backdrop-blur-md border-b border-blue-50 fixed top-0 right-0 left-64 z-10 px-8 flex items-center justify-between transition-all duration-300">
    <div class="flex items-center space-x-4">
      <h2 class="text-xl font-black text-slate-800 tracking-tight italic uppercase">
        {{ currentPageTitle }}
      </h2>
    </div>
    
    <div class="flex items-center space-x-6">
      <button class="relative p-2.5 text-slate-400 hover:text-blue-600 bg-slate-50 rounded-xl transition-all hover:scale-110">
        <span class="absolute top-2.5 right-2.5 w-2 h-2 bg-blue-500 rounded-full border-2 border-white animate-pulse"></span>
        <span class="text-xl">🔔</span>
      </button>

      <div class="flex items-center space-x-4 pl-6 border-l border-blue-50">
        <div class="text-right">
          <p class="text-sm font-black text-slate-800 leading-tight uppercase tracking-tighter">
            {{ user.name || 'Loading...' }}
          </p>
          <p class="text-[10px] font-bold text-blue-500 uppercase tracking-widest mt-0.5 italic">
            {{ user.storeName || 'Merchant Cloudmart' }}
          </p>
        </div>

        <div class="group relative cursor-pointer">
          <div class="w-11 h-11 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl flex items-center justify-center text-white font-black shadow-lg shadow-blue-200 group-hover:rotate-6 transition-transform">
            {{ userInitials }}
          </div>
          
          <div class="absolute right-0 mt-2 w-48 bg-white rounded-2xl shadow-xl border border-blue-50 p-2 opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto transition-all translate-y-2 group-hover:translate-y-0">
            <button @click="handleLogout" class="w-full text-left px-4 py-2 text-xs font-black text-red-500 hover:bg-red-50 rounded-xl transition-colors uppercase">
              🚪 Keluar Akun
            </button>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import axios from 'axios';

const route = useRoute();
const router = useRouter();

const user = ref({
  name: '',
  storeName: ''
});

const currentPageTitle = computed(() => {
  const name = route.name;
  if (name === 'AdminDashboard') return 'Ringkasan Studio';
  if (name === 'AdminProducts' || name === 'AddProduct') return 'Gudang Produk';
  if (name === 'AdminOrders') return 'Logistik Pesanan';
  return 'Cloudmart Workspace';
});

const userInitials = computed(() => {
  if (!user.value.name) return 'C';
  return user.value.name
    .split(' ')
    .map(n => n[0])
    .join('')
    .substring(0, 2)
    .toUpperCase();
});

const fetchUserProfile = async () => {
  try {
    // Tembak endpoint profil (Pastikan di NestJS ada endpoint GET /auth/profile)
    const response = await axios.get('http://localhost:3000/api/v1/auth/profile', {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    });
    
    // Sesuaikan dengan data yang dikirim NestJS + Prisma
    user.value = {
      name: response.data.name,
      storeName: response.data.store?.name // Mengambil relasi Store dari Prisma
    };
  } catch (error) {
    console.error("Gagal ambil profil:", error);
    // Jika token mati, opsional lempar ke login
    // router.push('/login');
  }
};

const handleLogout = () => {
  localStorage.removeItem('token');
  router.push('/login');
};

onMounted(fetchUserProfile);
</script>