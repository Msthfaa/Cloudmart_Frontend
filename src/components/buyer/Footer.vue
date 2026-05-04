<template>
  <footer class="bg-gray-50 border-t border-gray-100 mt-16">
    <div class="max-w-[1280px] mx-auto px-6 py-12">
      <div class="grid grid-cols-4 gap-10">

        <!-- Brand -->
        <div>
          <div class="flex items-center gap-2 mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-8 h-8 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
            </svg>
            <span class="text-xl font-black text-blue-600 tracking-tight">Cloudmart</span>
          </div>
          <p class="text-sm text-gray-500 leading-relaxed mb-5">
            Platform belanja online terpercaya dengan ribuan produk fashion, aksesoris, dan lebih banyak lagi.
          </p>
          <div class="flex items-center gap-3">
            <a href="#" class="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center hover:bg-blue-700 transition text-xs font-bold">f</a>
            <a href="#" class="w-8 h-8 bg-sky-500 text-white rounded-full flex items-center justify-center hover:bg-sky-600 transition text-xs font-bold">t</a>
            <a href="#" class="w-8 h-8 bg-pink-500 text-white rounded-full flex items-center justify-center hover:bg-pink-600 transition text-xs font-bold">ig</a>
          </div>
        </div>

        <!-- Informasi -->
        <div>
          <h4 class="text-xs font-black text-gray-900 uppercase tracking-widest mb-4">Informasi</h4>
          <ul class="space-y-2.5">
            <li v-for="link in infoLinks" :key="link">
              <a href="#" class="text-sm text-gray-500 hover:text-blue-600 transition-colors">{{ link }}</a>
            </li>
          </ul>
        </div>

        <!-- Bantuan & Dukungan -->
        <div>
          <h4 class="text-xs font-black text-gray-900 uppercase tracking-widest mb-4">Bantuan & Dukungan</h4>
          <ul class="space-y-2.5">
            <li v-for="link in helpLinks" :key="link">
              <a href="#" class="text-sm text-gray-500 hover:text-blue-600 transition-colors">{{ link }}</a>
            </li>
          </ul>
        </div>

        <!-- Hubungi Kami -->
        <div>
          <h4 class="text-xs font-black text-gray-900 uppercase tracking-widest mb-4">Hubungi Kami</h4>
          <ul class="space-y-3">
            <li class="flex items-start gap-2.5">
              <span class="text-blue-500 mt-0.5 text-sm">📧</span>
              <span class="text-sm text-gray-500">support@cloudmart.id</span>
            </li>
            <li class="flex items-start gap-2.5">
              <span class="text-blue-500 mt-0.5 text-sm">📞</span>
              <span class="text-sm text-gray-500">0800-1234-5678 (Gratis)</span>
            </li>
            <li class="flex items-start gap-2.5">
              <span class="text-blue-500 mt-0.5 text-sm">⏰</span>
              <span class="text-sm text-gray-500">Senin–Sabtu, 08.00–21.00 WIB</span>
            </li>
          </ul>
        </div>

      </div>

      <!-- Bottom bar -->
      <div class="border-t border-gray-200 mt-10 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <p class="text-xs text-gray-400">© 2025 Cloudmart. Seluruh hak cipta dilindungi.</p>
        <div class="flex items-center gap-5">
          <a href="#" class="text-xs text-gray-400 hover:text-blue-500 transition-colors">Kebijakan Privasi</a>
          <a href="#" class="text-xs text-gray-400 hover:text-blue-500 transition-colors">Syarat & Ketentuan</a>
          <a href="#" class="text-xs text-gray-400 hover:text-blue-500 transition-colors">Peta Situs</a>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
const infoLinks = ['Tentang Kami', 'Karir', 'Kontak Kami', 'Kebijakan Privasi', 'Syarat & Ketentuan'];
const helpLinks = ['Cara Berbelanja', 'Cara Pembayaran', 'Status Pesanan', 'Retur & Refund', 'Garansi Produk'];
</script>
