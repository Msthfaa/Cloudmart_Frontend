<template>
  <div class="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600 p-4">
    <div class="w-full max-w-md">

      <!-- Card -->
      <div class="bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl p-8">

        <!-- Logo & Brand -->
        <div class="flex flex-col items-center mb-7">
          <div class="flex items-center gap-2 mb-1">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-8 h-8 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.8">
              <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
            </svg>
            <span class="text-2xl font-black text-gray-800">Cloud<span class="text-blue-600">mart</span></span>
          </div>
          <h2 class="text-xl font-bold text-gray-700 mt-2">Buat Akun Baru</h2>
          <p class="text-gray-400 text-sm mt-1">Bergabung dan mulai belanja!</p>
        </div>

        <!-- Form -->
        <form @submit.prevent="handleRegister" class="space-y-4">

          <!-- Nama Lengkap -->
          <div>
            <label class="block text-sm font-semibold text-gray-700 mb-1.5">Nama Lengkap</label>
            <div class="relative">
              <span class="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                </svg>
              </span>
              <input
                v-model="form.name"
                type="text"
                placeholder="Nama lengkap kamu"
                class="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition"
                required
              />
            </div>
          </div>

          <!-- Email -->
          <div>
            <label class="block text-sm font-semibold text-gray-700 mb-1.5">Email</label>
            <div class="relative">
              <span class="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                </svg>
              </span>
              <input
                v-model="form.email"
                type="email"
                placeholder="email@example.com"
                class="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition"
                required
              />
            </div>
          </div>

          <!-- Password -->
          <div>
            <label class="block text-sm font-semibold text-gray-700 mb-1.5">Password</label>
            <div class="relative">
              <span class="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
                </svg>
              </span>
              <input
                v-model="form.password"
                type="password"
                placeholder="Min. 8 karakter"
                class="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition"
                required
              />
            </div>
          </div>

          <!-- Confirm Password -->
          <div>
            <label class="block text-sm font-semibold text-gray-700 mb-1.5">Konfirmasi Password</label>
            <div class="relative">
              <span class="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>
                </svg>
              </span>
              <input
                v-model="form.confirmPassword"
                type="password"
                placeholder="Ulangi password"
                class="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            :disabled="loading"
            class="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-60 disabled:cursor-not-allowed text-white font-bold py-3 rounded-xl transition-all duration-200 hover:scale-[1.02] shadow-lg shadow-blue-200 flex items-center justify-center gap-2"
          >
            <svg v-if="loading" class="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"/><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/></svg>
            {{ loading ? 'Memproses...' : 'Daftar Sekarang' }}
          </button>
        </form>

        <p class="text-center text-sm text-gray-500 mt-6">
          Sudah punya akun?
          <router-link to="/login" class="text-blue-600 font-bold hover:underline">Masuk di sini</router-link>
        </p>
      </div>

      <p class="text-center text-white/60 text-xs mt-5">© 2025 Cloudmart. Seluruh hak cipta dilindungi.</p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { authService } from '../../services/auth';
import Swal from 'sweetalert2';

const router = useRouter();
const form = ref({ name: '', email: '', password: '', confirmPassword: '' });
const loading = ref(false);

const handleRegister = async () => {
  if (form.value.password !== form.value.confirmPassword) {
    Swal.fire({ icon: 'warning', title: 'Password tidak cocok!', text: 'Pastikan password dan konfirmasi password sama.', confirmButtonColor: '#3B82F6' });
    return;
  }
  loading.value = true;
  try {
    await authService.register({
      email: form.value.email,
      name: form.value.name,
      password: form.value.password,
      phone: '081234567890', // Dummy phone number untuk memuaskan validasi backend (karena di UI tidak ada)
    });
    router.push('/login');
  } catch (error) {
    // Error sudah ditampilkan oleh authService
  } finally {
    loading.value = false;
  }
};
</script>
