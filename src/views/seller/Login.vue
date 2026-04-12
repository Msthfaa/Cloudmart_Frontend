<template>
  <div class="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600 p-4">
    <div class="w-full max-w-md">
      <!-- Card Login -->
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
        <h2 class="text-2xl font-bold text-center text-gray-700 mb-2">Masuk ke Akun</h2>
        <p class="text-center text-gray-500 text-sm mb-6">Akses panel admin Anda</p>

        <!-- Form Login -->
        <form @submit.prevent="handleLogin" class="space-y-4">
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

          <!-- Opsi Remember Me (optional) -->
          <div class="flex items-center justify-between">
            <label class="flex items-center text-sm text-gray-600">
              <input type="checkbox" class="rounded border-gray-300 text-blue-600 focus:ring-blue-500 mr-2">
              Ingat saya
            </label>
            <a href="#" class="text-sm text-blue-600 hover:underline">Lupa password?</a>
          </div>

          <button 
            type="submit" 
            class="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg shadow-md transition duration-200 transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Masuk
          </button>
        </form>

        <!-- Link ke Register -->
        <p class="text-center text-gray-600 text-sm mt-6">
          Belum punya akun? 
          <router-link to="/register" class="text-blue-600 font-semibold hover:underline">Daftar di sini</router-link>
        </p>
      </div>

      <!-- Footer -->
      <p class="text-center text-white/70 text-xs mt-6">© 2025 Cloudmart - Platform Admin</p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router'; 
import { authService } from '../../services/auth';

const router = useRouter(); 
const form = ref({ email: '', password: '' });

const handleLogin = async () => {
  try {
    const response = await authService.login(form.value);
    
    localStorage.setItem('token', response.data.access_token);
    
    router.push('/admin/dashboard'); 
    
  } catch (err) {
    alert('Login Gagal! Periksa email & password.');
    console.error(err);
  }
};
</script>

<style scoped>
input:focus {
  box-shadow: 0 0 0 3px rgba(59,130,246,0.2);
}
</style>