<template>
  <div class="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600 p-4">
    <div class="w-full max-w-md">
      <!-- Card Register -->
      <div class="bg-white/90 backdrop-blur-sm rounded-2xl shadow-2xl p-8 transition-all duration-300 hover:shadow-blue-200/50">
        
        <!-- Logo & Brand -->
        <div class="flex justify-center mb-6">
          <div class="flex items-center gap-2">
            <!-- Icon Cloud dengan background putih/transparan -->
            <div class="p-2">
              <img src="../../assets/cloudmart-logo.png" alt="Cloudmart Logo" class="h-17 w-auto">
            </div>
            <span class="text-2xl font-bold text-gray-800">Cloud<span class="text-blue-600">mart</span></span>
          </div>
        </div>

        <!-- Title -->
        <h2 class="text-2xl font-bold text-center text-gray-700 mb-2">Buat Akun Admin</h2>
        <p class="text-center text-gray-500 text-sm mb-6">Daftar untuk mengelola toko Anda</p>

        <!-- Form Register -->
        <form @submit.prevent="handleRegister" class="space-y-4">
          <div>
            <label class="block text-gray-700 text-sm font-semibold mb-1">Nama Lengkap</label>
            <div class="relative">
              <span class="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </span>
              <input 
                v-model="form.name" 
                type="text" 
                placeholder="John Doe" 
                class="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                required
              >
            </div>
          </div>

          <div>
            <label class="block text-gray-700 text-sm font-semibold mb-1">Email</label>
            <div class="relative">
              <span class="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </span>
              <input 
                v-model="form.email" 
                type="email" 
                placeholder="admin@cloudmart.com" 
                class="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                required
              >
            </div>
          </div>

          <div>
            <label class="block text-gray-700 text-sm font-semibold mb-1">Password</label>
            <div class="relative">
              <span class="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </span>
              <input 
                v-model="form.password" 
                type="password" 
                placeholder="********" 
                class="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                required
              >
            </div>
          </div>

          <button 
            type="submit" 
            class="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg shadow-md transition duration-200 transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Daftar Sekarang
          </button>
        </form>

        <!-- Link ke Login -->
        <p class="text-center text-gray-600 text-sm mt-6">
          Sudah punya akun? 
          <router-link to="/login" class="text-blue-600 font-semibold hover:underline">Masuk di sini</router-link>
        </p>
      </div>

      <!-- Footer kecil -->
      <p class="text-center text-white/70 text-xs mt-6">© 2025 Cloudmart - Platform Admin</p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { authService } from '../../services/auth';
import { useRouter } from 'vue-router';

const router = useRouter();
// Role langsung di-set 'admin' secara default
const form = ref({ name: '', email: '', password: '', role: 'SELLER' });

const handleRegister = async () => {
  try {
    await authService.register(form.value);
    alert('Registrasi Admin Berhasil!');
    router.push('/login');
  } catch (err) {
    console.error(err);
    alert('Gagal: ' + (err.response?.data?.message || 'Server mati atau salah route'));
  }
};
</script>

<style scoped>
/* Optional: efek transisi tambahan */
input:focus {
  box-shadow: 0 0 0 3px rgba(59,130,246,0.2);
}
</style>