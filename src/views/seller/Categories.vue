<template>
  <div>
    <!-- Header Section -->
    <div class="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
      <div>
        <h1 class="text-3xl font-black text-gray-800 tracking-tight">Kategori Produk</h1>
        <p class="text-gray-500 mt-1">Kelola kategori untuk produk yang Anda jual</p>
      </div>
      <button @click="openCreateModal" class="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-2xl font-bold shadow-lg shadow-blue-200 transition-all hover:-translate-y-1 flex items-center gap-2">
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path></svg>
        Tambah Kategori
      </button>
    </div>

    <!-- Data Table -->
    <div class="bg-white rounded-3xl shadow-sm border border-blue-50 overflow-hidden">
      <div class="overflow-x-auto">
        <table class="w-full text-left border-collapse">
          <thead>
            <tr class="bg-slate-50/50 border-b border-gray-100">
              <th class="p-5 font-bold text-gray-600 text-sm">ID</th>
              <th class="p-5 font-bold text-gray-600 text-sm">Nama Kategori</th>
              <th class="p-5 font-bold text-gray-600 text-sm text-center">Status Default</th>
              <th class="p-5 font-bold text-gray-600 text-sm text-right">Aksi</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-50">
            <tr v-if="loading" class="animate-pulse">
              <td colspan="4" class="p-5 text-center text-gray-400">Memuat data...</td>
            </tr>
            <tr v-else-if="categories.length === 0">
              <td colspan="4" class="p-10 text-center text-gray-400">
                <span class="text-4xl mb-3 block">🗂️</span>
                Belum ada kategori yang ditambahkan.
              </td>
            </tr>
            <tr v-else v-for="category in categories" :key="category.id" class="hover:bg-blue-50/20 transition-colors">
              <td class="p-5 text-sm text-gray-600 font-medium">#{{ category.id }}</td>
              <td class="p-5 text-sm text-gray-800 font-bold">{{ category.name }}</td>
              <td class="p-5 text-center">
                <span v-if="category.is_default" class="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-bold">Ya</span>
                <span v-else class="px-3 py-1 bg-gray-100 text-gray-500 rounded-full text-xs font-bold">Tidak</span>
              </td>
              <td class="p-5 text-right space-x-2">
                <button @click="openEditModal(category)" class="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" title="Edit">
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path></svg>
                </button>
                <button @click="confirmDelete(category.id)" class="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors" title="Hapus">
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
      <div class="bg-white rounded-3xl w-full max-w-md shadow-2xl overflow-hidden transform transition-all">
        <div class="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
          <h3 class="font-bold text-gray-800 text-lg">{{ isEdit ? 'Edit Kategori' : 'Tambah Kategori' }}</h3>
          <button @click="showModal = false" class="text-gray-400 hover:text-red-500 transition-colors">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
          </button>
        </div>
        
        <form @submit.prevent="submitForm" class="p-6 space-y-4">
          <div>
            <label class="block text-sm font-bold text-gray-700 mb-1">Nama Kategori</label>
            <input v-model="form.name" type="text" required class="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition" placeholder="Contoh: Pakaian Pria" />
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
import { sellerFeaturesService } from '../../services/sellerFeatures';
import { showToastSuccess, showToastError } from '../../services/api';
import Swal from 'sweetalert2';

const categories = ref([]);
const loading = ref(true);
const showModal = ref(false);
const submitting = ref(false);
const isEdit = ref(false);
const editId = ref(null);

const form = ref({
  name: ''
});

const fetchCategories = async () => {
  loading.value = true;
  try {
    categories.value = await sellerFeaturesService.getCategories();
  } catch (error) {
    showToastError('Gagal memuat kategori');
  } finally {
    loading.value = false;
  }
};

const openCreateModal = () => {
  isEdit.value = false;
  form.value.name = '';
  showModal.value = true;
};

const openEditModal = (category) => {
  isEdit.value = true;
  editId.value = category.id;
  form.value.name = category.name;
  showModal.value = true;
};

const submitForm = async () => {
  submitting.value = true;
  try {
    if (isEdit.value) {
      await sellerFeaturesService.updateCategory(editId.value, form.value);
      showToastSuccess('Kategori berhasil diperbarui');
    } else {
      await sellerFeaturesService.createCategory(form.value);
      showToastSuccess('Kategori berhasil ditambahkan');
    }
    showModal.value = false;
    fetchCategories();
  } catch (error) {
    showToastError(error.message || 'Gagal menyimpan kategori');
  } finally {
    submitting.value = false;
  }
};

const confirmDelete = (id) => {
  Swal.fire({
    title: 'Hapus Kategori?',
    text: "Kategori yang dihapus tidak dapat dikembalikan!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#ef4444',
    cancelButtonColor: '#9ca3af',
    confirmButtonText: 'Ya, Hapus!',
    cancelButtonText: 'Batal'
  }).then(async (result) => {
    if (result.isConfirmed) {
      try {
        await sellerFeaturesService.deleteCategory(id);
        showToastSuccess('Kategori berhasil dihapus');
        fetchCategories();
      } catch (error) {
        showToastError(error.message || 'Gagal menghapus kategori');
      }
    }
  });
};

onMounted(() => {
  fetchCategories();
});
</script>
