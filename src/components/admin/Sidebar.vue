<template>
  <aside class="w-64 bg-white h-screen border-r border-blue-100 flex flex-col fixed left-0 top-0 z-20">
    <div class="p-6">
      <div class="flex items-center space-x-2 mb-10 px-2 text-blue-600">
        <span class="text-2xl font-black tracking-tighter italic">CLOUDMART</span>
      </div>
      
      <nav class="space-y-3">
        <router-link 
          to="/admin/dashboard" 
          class="flex items-center space-x-3 p-4 rounded-2xl transition-all duration-300 text-slate-500 hover:bg-blue-50"
          exact-active-class="bg-blue-600 text-white shadow-lg shadow-blue-200 font-bold"
        >
          <span class="text-xl">📊</span> 
          <span>Dashboard</span>
        </router-link>

        <router-link 
          to="/admin/products" 
          class="flex items-center space-x-3 p-4 rounded-2xl transition-all duration-300 text-slate-500 hover:bg-blue-50"
          exact-active-class="bg-blue-600 text-white shadow-lg shadow-blue-200 font-bold"
        >
          <span class="text-xl">📦</span> 
          <span>Produk</span>
        </router-link>

        <router-link 
          to="/admin/orders" 
          class="flex items-center space-x-3 p-4 rounded-2xl transition-all duration-300 text-slate-500 hover:bg-blue-50"
          exact-active-class="bg-blue-600 text-white shadow-lg shadow-blue-200 font-bold"
        >
          <span class="text-xl">🛒</span> 
          <span>Pesanan</span>
        </router-link>
      </nav>
    </div>

    <div class="p-4 border-t border-blue-50 bg-blue-50/20">
      <router-link to="/admin/setting" 
        class="flex items-center space-x-3 p-3 rounded-2xl transition-all duration-300 border border-transparent"
        active-class="bg-white border-blue-200 text-blue-600 shadow-sm font-bold">
        <span>⚙️</span> <span>Pengaturan Toko</span>
      </router-link>
    </div>
  </aside>
</template>

<script setup>
import Swal from 'sweetalert2';

const showAddProductAlert = () => {
  Swal.fire({
    title: 'Tambah Produk?',
    text: 'Kamu akan diarahkan ke form input produk.',
    icon: 'info',
    confirmButtonColor: '#2563eb'
  });
}
</script>