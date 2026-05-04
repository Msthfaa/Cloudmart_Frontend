<template>
  <div class="max-w-7xl mx-auto pb-20">
    <div class="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 gap-4">
      <div>
        <p class="text-[10px] font-black text-blue-400 uppercase tracking-[0.3em] mb-2 italic">Inventory Management</p>
        <h2 class="text-4xl font-black text-slate-800 tracking-tighter uppercase italic">Katalog Produk</h2>
        <p class="text-slate-500 text-sm font-medium mt-1">Pantau dan kelola stok produk Cloudmart kamu secara real-time.</p>
      </div>
      <button>
      <router-link 
        to="/admin/products/add" 
        class="px-8 py-4 bg-blue-600 text-white rounded-[1.5rem] font-black shadow-xl shadow-blue-200 hover:bg-blue-700 hover:-translate-y-1 transition-all active:scale-95 text-sm tracking-widest"
      >
        + TAMBAH PRODUK BARU
        </router-link>
      </button>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
      <div class="bg-white p-6 rounded-[2rem] border border-blue-50 shadow-sm flex items-center space-x-4">
        <div class="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center text-xl shadow-inner">📦</div>
        <div>
          <p class="text-[10px] font-black text-slate-400 uppercase tracking-widest">Total Produk</p>
          <h4 class="text-xl font-black text-slate-800">{{ products.length }}</h4>
        </div>
      </div>
      <div class="bg-white p-6 rounded-[2rem] border border-blue-50 shadow-sm flex items-center space-x-4">
        <div class="w-12 h-12 bg-green-50 text-green-600 rounded-2xl flex items-center justify-center text-xl shadow-inner">✅</div>
        <div>
          <p class="text-[10px] font-black text-slate-400 uppercase tracking-widest">Status Aktif</p>
          <h4 class="text-xl font-black text-slate-800">{{ activeCount }}</h4>
        </div>
      </div>
      <div class="bg-white p-6 rounded-[2rem] border border-blue-50 shadow-sm flex items-center space-x-4">
        <div class="w-12 h-12 bg-orange-50 text-orange-600 rounded-2xl flex items-center justify-center text-xl shadow-inner">⚠️</div>
        <div>
          <p class="text-[10px] font-black text-slate-400 uppercase tracking-widest">Stok Menipis</p>
          <h4 class="text-xl font-black text-slate-800">{{ lowStockCount }}</h4>
        </div>
      </div>
    </div>

    <DataTable 
      :headers="['Produk', 'Info Koleksi', 'Harga Satuan', 'Total Stok', 'Status', 'Aksi']"
      :total="products.length"
      :perPage="pagination.perPage"
      :currentPage="pagination.currentPage"
      @page-change="handlePageChange"
    >
      <tr v-if="loading">
        <td colspan="6" class="px-8 py-20 text-center">
          <div class="flex flex-col items-center">
            <div class="w-10 h-10 border-4 border-blue-100 border-t-blue-600 rounded-full animate-spin mb-4"></div>
            <p class="text-xs font-black text-slate-400 uppercase tracking-widest">Menghubungkan ke Database...</p>
          </div>
        </td>
      </tr>

      <tr v-else-if="products.length === 0">
        <td colspan="6" class="px-8 py-20 text-center">
          <div class="flex flex-col items-center">
            <p class="text-4xl mb-4">🏜️</p>
            <p class="text-sm font-bold text-slate-500 italic">Belum ada produk yang terdaftar.</p>
            <router-link to="/admin/products/add" class="mt-4 text-blue-600 font-black text-xs underline">Mulai Tambah Produk Sekarang</router-link>
          </div>
        </td>
      </tr>

      <tr v-else v-for="p in products" :key="p.id" class="group hover:bg-blue-50/30 transition-all duration-300">
        <td class="px-8 py-5">
          <div class="flex items-center space-x-4">
            <div class="w-12 h-12 bg-slate-100 rounded-2xl flex items-center justify-center text-xl overflow-hidden border border-slate-200">
              <img v-if="p.images?.length" :src="p.images[0].imageUrl" class="w-full h-full object-cover">
              <span v-else>📦</span>
            </div>
            <div>
              <p class="font-black text-slate-800 text-sm uppercase leading-tight">{{ p.name }}</p>
              <p class="text-[10px] font-bold text-slate-400 italic">ID: {{ p.id.substring(0, 8) }}...</p>
            </div>
          </div>
        </td>
        <td class="px-8 py-5">
          <p class="text-[10px] font-black text-blue-600 uppercase tracking-widest">{{ p.brand?.name || 'No Brand' }}</p>
          <p class="text-xs font-bold text-slate-500 mt-1">{{ p.category?.name || 'Uncategorized' }}</p>
        </td>
        <td class="px-8 py-5">
          <p class="text-sm font-black text-slate-800">Rp {{ Number(p.basePrice).toLocaleString('id-ID') }}</p>
        </td>
        <td class="px-8 py-5">
          <div class="flex items-center space-x-2">
            <span class="text-sm font-bold" :class="getTotalStock(p) < 10 ? 'text-red-500' : 'text-slate-600'">
              {{ getTotalStock(p) }}
            </span>
            <span class="text-[9px] font-black text-slate-300 uppercase">Unit</span>
          </div>
        </td>
        <td class="px-8 py-5">
          <span :class="getStatusStyles(p.status)" class="px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-tighter">
            {{ p.status }}
          </span>
        </td>
        <td class="px-8 py-5 text-center">
          <div class="flex items-center justify-center space-x-2">
            <button @click="handleEdit(p.id)" class="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all">✏️</button>
            <button @click="handleDelete(p.id)" class="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all">🗑️</button>
          </div>
        </td>
      </tr>
    </DataTable>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import axios from 'axios';
import DataTable from '../../components/admin/DataTable.vue';
import Swal from 'sweetalert2';

const products = ref([]);
const loading = ref(true);

const pagination = ref({
  currentPage: 1,
  perPage: 10
});

// Logic Fetch Data dari API NestJS
const fetchProducts = async () => {
  loading.value = true;
  try {
    const response = await axios.get('http://localhost:3000/api/v1/products', {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    });
    // Jika datanya dibungkus pagination dari backend, sesuaikan (misal response.data.data)
    products.value = response.data;
  } catch (error) {
    console.error("Fetch error:", error);
    // Notifikasi error tetap senada
    Swal.fire({
      icon: 'error',
      title: 'Koneksi Terputus',
      text: 'Gagal mengambil data dari database Cloudmart.',
      confirmButtonColor: '#ef4444'
    });
  } finally {
    loading.value = false;
  }
};

// Computed Stats
const activeCount = computed(() => products.value.filter(p => p.status === 'ACTIVE').length);
const lowStockCount = computed(() => {
  return products.value.filter(p => getTotalStock(p) < 10 && getTotalStock(p) > 0).length;
});

// Helper: Hitung total stok dari semua varian produk (Prisma ProductVariant)
const getTotalStock = (product) => {
  if (!product.variants) return 0;
  return product.variants.reduce((acc, curr) => acc + curr.stock, 0);
};

// Helper: Badge Styles
const getStatusStyles = (status) => {
  if (status === 'ACTIVE') return 'bg-green-100 text-green-600 border border-green-200';
  if (status === 'DRAFT') return 'bg-blue-100 text-blue-600 border border-blue-200';
  return 'bg-slate-100 text-slate-400 border border-slate-200';
};

// Handlers
const handlePageChange = (page) => {
  pagination.value.currentPage = page;
  // Jika API dukung server-side pagination: fetchProducts(page);
};

const handleEdit = (id) => {
  console.log("Edit ID:", id);
  // router.push(`/admin/products/edit/${id}`);
};

const handleDelete = async (id) => {
  const result = await Swal.fire({
    title: 'Hapus Produk?',
    text: "Tindakan ini permanen dan akan menghapus semua varian terkait.",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#ef4444',
    cancelButtonColor: '#94a3b8',
    confirmButtonText: 'Ya, Hapus!',
    borderRadius: '24px'
  });

  if (result.isConfirmed) {
    try {
      await axios.delete(`http://localhost:3000/api/v1/products/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      Swal.fire('Terhapus!', 'Produk telah dihilangkan dari sistem.', 'success');
      fetchProducts(); // Refresh list
    } catch (err) {
      Swal.fire('Gagal!', 'Produk tidak bisa dihapus.', 'error');
    }
  }
};

onMounted(fetchProducts);
</script>