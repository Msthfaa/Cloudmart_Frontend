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
          <h2 class="text-xl font-bold text-gray-700 mt-2">Masuk ke Akun</h2>
          <p class="text-gray-400 text-sm mt-1">Selamat datang kembali!</p>
        </div>

        <!-- Form -->
        <form @submit.prevent="handleLogin" class="space-y-4">

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
                :type="showPwd ? 'text' : 'password'"
                placeholder="••••••••"
                class="w-full pl-10 pr-12 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition"
                required
              />
              <button type="button" @click="showPwd = !showPwd" class="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600 transition">
                <svg v-if="!showPwd" class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
                </svg>
                <svg v-else class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"/>
                </svg>
              </button>
            </div>
          </div>

          <!-- Remember & Forgot -->
          <div class="flex items-center justify-between">
            <label class="flex items-center gap-2 text-sm text-gray-600 cursor-pointer">
              <input type="checkbox" class="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
              Ingat saya
            </label>
            <a href="#" class="text-sm text-blue-500 hover:underline font-medium">Lupa password?</a>
          </div>

          <button
            type="submit"
            :disabled="loading"
            class="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-60 disabled:cursor-not-allowed text-white font-bold py-3 rounded-xl transition-all duration-200 hover:scale-[1.02] shadow-lg shadow-blue-200 flex items-center justify-center gap-2"
          >
            <svg v-if="loading" class="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"/><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/></svg>
            {{ loading ? 'Memproses...' : 'Masuk' }}
          </button>
        </form>

        <!-- Register Link -->
        <p class="text-center text-sm text-gray-500 mt-6">
          Belum punya akun?
          <router-link to="/register" class="text-blue-600 font-bold hover:underline">Daftar sekarang</router-link>
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
const form = ref({ email: '', password: '' });
const showPwd = ref(false);
const loading = ref(false);

const handleLogin = async () => {
  loading.value = true;
  try {
    await authService.login({
      email: form.value.email,
      password: form.value.password,
    });
    router.push('/');
  } catch (error) {
    // Error sudah ditampilkan oleh authService
  } finally {
    loading.value = false;
  }
};
</script>
