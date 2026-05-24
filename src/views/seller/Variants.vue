<template>
  <div>
    <!-- Header Section -->
    <div class="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
      <div>
        <div class="flex items-center gap-3 mb-1">
          <router-link to="/admin/products" class="text-blue-500 hover:text-blue-700 transition-colors">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
          </router-link>
          <h1 class="text-3xl font-black text-gray-800 tracking-tight">Varian Produk</h1>
        </div>
        <p class="text-gray-500 mt-1 ml-9">Kelola SKU, ukuran, warna, dan stok varian produk</p>
      </div>
      <button @click="openCreateModal" class="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-2xl font-bold shadow-lg shadow-blue-200 transition-all hover:-translate-y-1 flex items-center gap-2">
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path></svg>
        Tambah Varian
      </button>
    </div>

    <!-- Data Table -->
    <div class="bg-white rounded-3xl shadow-sm border border-blue-50 overflow-hidden">
      <div class="overflow-x-auto">
        <table class="w-full text-left border-collapse">
          <thead>
            <tr class="bg-slate-50/50 border-b border-gray-100">
              <th class="p-5 font-bold text-gray-600 text-sm">SKU</th>
              <th class="p-5 font-bold text-gray-600 text-sm">Ukuran</th>
              <th class="p-5 font-bold text-gray-600 text-sm">Warna</th>
              <th class="p-5 font-bold text-gray-600 text-sm">Harga (Rp)</th>
              <th class="p-5 font-bold text-gray-600 text-sm">Stok</th>
              <th class="p-5 font-bold text-gray-600 text-sm text-right">Aksi</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-50">
            <tr v-if="loading" class="animate-pulse">
              <td colspan="6" class="p-5 text-center text-gray-400">Memuat data...</td>
            </tr>
            <tr v-else-if="variants.length === 0">
              <td colspan="6" class="p-10 text-center text-gray-400">
                <span class="text-4xl mb-3 block">👕</span>
                Belum ada varian untuk produk ini.
              </td>
            </tr>
            <tr v-else v-for="variant in variants" :key="variant.id" class="hover:bg-blue-50/20 transition-colors">
              <td class="p-5 text-sm text-gray-800 font-bold">{{ variant.sku }}</td>
              <td class="p-5 text-sm text-gray-600">{{ variant.size }}</td>
              <td class="p-5 text-sm">
                <div class="flex items-center gap-2">
                  <span class="w-4 h-4 rounded-full border border-gray-200" :style="{ backgroundColor: variant.color }"></span>
                  <span class="text-gray-600 capitalize">{{ variant.color }}</span>
                </div>
              </td>
              <td class="p-5 text-sm text-gray-800 font-bold">{{ formatPrice(variant.price) }}</td>
              <td class="p-5 text-sm">
                <span :class="variant.stock > 0 ? 'text-green-600 bg-green-50' : 'text-red-600 bg-red-50'" class="px-3 py-1 rounded-full font-bold text-xs">
                  {{ variant.stock > 0 ? variant.stock : 'Habis' }}
                </span>
              </td>
              <td class="p-5 text-right space-x-2">
                <button @click="openEditModal(variant)" class="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" title="Edit">
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path></svg>
                </button>
                <button @click="confirmDelete(variant.id)" class="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors" title="Hapus">
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Modal Form -->
    <div v-if="showModal" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/50 backdrop-blur-sm">
      <div class="bg-white rounded-3xl w-full max-w-lg shadow-2xl overflow-hidden transform transition-all">
        <div class="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
          <h3 class="font-bold text-gray-800 text-lg">{{ isEdit ? 'Edit Varian' : 'Tambah Varian' }}</h3>
          <button @click="showModal = false" class="text-gray-400 hover:text-red-500 transition-colors">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
          </button>
        </div>
        
        <form @submit.prevent="submitForm" class="p-6 space-y-4">
          <div>
            <label class="block text-sm font-bold text-gray-700 mb-1">SKU</label>
            <input v-model="form.sku" type="text" required class="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition uppercase" placeholder="Contoh: TS-BL-M" />
          </div>

          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-bold text-gray-700 mb-1">Ukuran</label>
              <input v-model="form.size" type="text" required class="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition uppercase" placeholder="S, M, L, XL" />
            </div>
            <div>
              <label class="block text-sm font-bold text-gray-700 mb-1">Warna</label>
              <input v-model="form.color" type="text" required class="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition" placeholder="Hitam, Putih, dll" />
            </div>
          </div>

          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-bold text-gray-700 mb-1">Harga</label>
              <input v-model="form.price" type="number" required min="0" class="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition" placeholder="100000" />
            </div>
            <div>
              <label class="block text-sm font-bold text-gray-700 mb-1">Stok</label>
              <input v-model="form.stock" type="number" required min="0" class="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition" placeholder="50" />
            </div>
          </div>

          <div class="pt-4 mt-2 border-t border-gray-100 flex justify-end gap-3">
            <button type="button" @click="showModal = false" class="px-5 py-2.5 text-sm font-bold text-gray-600 bg-gray-100 rounded-xl hover:bg-gray-200 transition-colors">Batal</button>
            <button type="submit" :disabled="submitting" class="px-5 py-2.5 text-sm font-bold text-white bg-blue-600 rounded-xl hover:bg-blue-700 transition-colors shadow-lg shadow-blue-200 disabled:opacity-50">
              {{ submitting ? 'Menyimpan...' : 'Simpan' }}
            </button>
          </div>
        </form>
      </div>
    </div>

  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { sellerFeaturesService } from '../../services/sellerFeatures';
import { showToastSuccess, showToastError } from '../../services/api';
import Swal from 'sweetalert2';

const route = useRoute();
const productId = route.params.id;

const variants = ref([]);
const loading = ref(true);
const showModal = ref(false);
const submitting = ref(false);
const isEdit = ref(false);
const editId = ref(null);

const form = ref({
  sku: '',
  size: '',
  color: '',
  price: 0,
  stock: 0
});

const formatPrice = (price) => {
  return new Intl.NumberFormat('id-ID').format(price);
};

const fetchVariants = async () => {
  loading.value = true;
  try {
    variants.value = await sellerFeaturesService.getVariants(productId);
  } catch (error) {
    showToastError('Gagal memuat varian produk');
  } finally {
    loading.value = false;
  }
};

const openCreateModal = () => {
  isEdit.value = false;
  form.value = { sku: '', size: '', color: '', price: 0, stock: 0 };
  showModal.value = true;
};

const openEditModal = (variant) => {
  isEdit.value = true;
  editId.value = variant.id;
  form.value = { ...variant };
  showModal.value = true;
};

const submitForm = async () => {
  submitting.value = true;
  try {
    if (isEdit.value) {
      await sellerFeaturesService.updateVariant(editId.value, form.value);
      showToastSuccess('Varian berhasil diperbarui');
    } else {
      await sellerFeaturesService.addVariant(productId, form.value);
      showToastSuccess('Varian berhasil ditambahkan');
    }
    showModal.value = false;
    fetchVariants();
  } catch (error) {
    showToastError(error.message || 'Gagal menyimpan varian');
  } finally {
    submitting.value = false;
  }
};

const confirmDelete = (id) => {
  Swal.fire({
    title: 'Hapus Varian?',
    text: "Data yang dihapus tidak dapat dikembalikan!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#ef4444',
    cancelButtonColor: '#9ca3af',
    confirmButtonText: 'Ya, Hapus!',
    cancelButtonText: 'Batal'
  }).then(async (result) => {
    if (result.isConfirmed) {
      try {
        await sellerFeaturesService.deleteVariant(id);
        showToastSuccess('Varian berhasil dihapus');
        fetchVariants();
      } catch (error) {
        showToastError(error.message || 'Gagal menghapus varian');
      }
    }
  });
};

onMounted(() => {
  fetchVariants();
});
</script>
