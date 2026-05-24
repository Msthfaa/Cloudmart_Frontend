<template>
  <div>
    <!-- Header Section -->
    <div class="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
      <div>
        <h1 class="text-3xl font-black text-gray-800 tracking-tight">Voucher Diskon</h1>
        <p class="text-gray-500 mt-1">Buat dan kelola voucher promo untuk toko Anda</p>
      </div>
      <button @click="openCreateModal" class="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-2xl font-bold shadow-lg shadow-blue-200 transition-all hover:-translate-y-1 flex items-center gap-2">
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path></svg>
        Buat Voucher Baru
      </button>
    </div>

    <!-- Data Table -->
    <div class="bg-white rounded-3xl shadow-sm border border-blue-50 overflow-hidden">
      <div class="overflow-x-auto">
        <table class="w-full text-left border-collapse">
          <thead>
            <tr class="bg-slate-50/50 border-b border-gray-100">
              <th class="p-5 font-bold text-gray-600 text-sm">Kode Voucher</th>
              <th class="p-5 font-bold text-gray-600 text-sm">Tipe Diskon</th>
              <th class="p-5 font-bold text-gray-600 text-sm">Besar Diskon</th>
              <th class="p-5 font-bold text-gray-600 text-sm">Batas Maksimal</th>
              <th class="p-5 font-bold text-gray-600 text-sm">Masa Berlaku</th>
              <th class="p-5 font-bold text-gray-600 text-sm text-right">Aksi</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-50">
            <tr v-if="loading" class="animate-pulse">
              <td colspan="6" class="p-5 text-center text-gray-400">Memuat data...</td>
            </tr>
            <tr v-else-if="vouchers.length === 0">
              <td colspan="6" class="p-10 text-center text-gray-400">
                <span class="text-4xl mb-3 block">🎫</span>
                Belum ada voucher yang dibuat.
              </td>
            </tr>
            <tr v-else v-for="voucher in vouchers" :key="voucher.id" class="hover:bg-blue-50/20 transition-colors">
              <td class="p-5 text-sm">
                <span class="px-3 py-1.5 bg-yellow-100 text-yellow-800 font-black tracking-widest rounded-lg border border-yellow-200 uppercase">
                  {{ voucher.name }}
                </span>
              </td>
              <td class="p-5 text-sm text-gray-600 capitalize">
                {{ voucher.type === 'percentage' ? 'Persentase (%)' : 'Nominal (Rp)' }}
              </td>
              <td class="p-5 text-sm text-gray-800 font-bold">
                {{ voucher.type === 'percentage' ? voucher.amount + '%' : formatPrice(voucher.amount) }}
              </td>
              <td class="p-5 text-sm text-gray-600">
                {{ voucher.max ? formatPrice(voucher.max) : 'Tanpa Batas' }}
              </td>
              <td class="p-5 text-sm text-gray-600">
                <div class="flex flex-col">
                  <span>{{ formatDate(voucher.expired_at) }}</span>
                  <span v-if="isExpired(voucher.expired_at)" class="text-[10px] font-bold text-red-500 mt-1 uppercase">Kedaluwarsa</span>
                  <span v-else class="text-[10px] font-bold text-emerald-500 mt-1 uppercase">Aktif</span>
                </div>
              </td>
              <td class="p-5 text-right space-x-2">
                <button @click="openEditModal(voucher)" class="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" title="Edit">
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path></svg>
                </button>
                <button @click="confirmDelete(voucher.id)" class="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors" title="Hapus">
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
      <div class="bg-white rounded-3xl w-full max-w-lg shadow-2xl overflow-hidden transform transition-all flex flex-col max-h-[90vh]">
        <div class="px-6 py-4 border-b border-gray-100 flex items-center justify-between sticky top-0 bg-white z-10">
          <h3 class="font-bold text-gray-800 text-lg">{{ isEdit ? 'Edit Voucher' : 'Buat Voucher Baru' }}</h3>
          <button @click="showModal = false" class="text-gray-400 hover:text-red-500 transition-colors">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
          </button>
        </div>
        
        <div class="p-6 overflow-y-auto">
          <form @submit.prevent="submitForm" class="space-y-4">
            <div>
              <label class="block text-sm font-bold text-gray-700 mb-1">Kode Voucher</label>
              <input v-model="form.name" type="text" required class="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition uppercase" placeholder="Contoh: PROMO100" />
            </div>

            <div class="grid grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-bold text-gray-700 mb-1">Tipe Diskon</label>
                <select v-model="form.type" required class="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition bg-white">
                  <option value="price">Nominal (Rp)</option>
                  <option value="percentage">Persentase (%)</option>
                </select>
              </div>
              <div>
                <label class="block text-sm font-bold text-gray-700 mb-1">Besar Diskon</label>
                <input v-model="form.amount" type="number" required min="1" class="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition" :placeholder="form.type === 'percentage' ? 'Contoh: 10' : 'Contoh: 50000'" />
              </div>
            </div>

            <div class="grid grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-bold text-gray-700 mb-1">Batas Diskon (Opsional)</label>
                <input v-model="form.max" type="number" min="0" class="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition" placeholder="Contoh: 20000" />
                <span class="text-[10px] text-gray-400 mt-1 block">Hanya untuk tipe persentase</span>
              </div>
              <div>
                <label class="block text-sm font-bold text-gray-700 mb-1">Tanggal Kedaluwarsa</label>
                <input v-model="form.expired_at" type="date" required class="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition" />
              </div>
            </div>

            <div class="pt-4 mt-4 border-t border-gray-100 flex justify-end gap-3">
              <button type="button" @click="showModal = false" class="px-5 py-2.5 text-sm font-bold text-gray-600 bg-gray-100 rounded-xl hover:bg-gray-200 transition-colors">Batal</button>
              <button type="submit" :disabled="submitting" class="px-5 py-2.5 text-sm font-bold text-white bg-blue-600 rounded-xl hover:bg-blue-700 transition-colors shadow-lg shadow-blue-200 disabled:opacity-50">
                {{ submitting ? 'Menyimpan...' : 'Simpan Voucher' }}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>

  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { sellerFeaturesService } from '../../services/sellerFeatures';
import { showToastSuccess, showToastError } from '../../services/api';
import Swal from 'sweetalert2';

const vouchers = ref([]);
const loading = ref(true);
const showModal = ref(false);
const submitting = ref(false);
const isEdit = ref(false);
const editId = ref(null);

const form = ref({
  name: '',
  type: 'price',
  amount: 0,
  max: 0,
  expired_at: ''
});

const formatPrice = (price) => {
  return 'Rp' + new Intl.NumberFormat('id-ID').format(price);
};

const formatDate = (dateString) => {
  if (!dateString) return '-';
  const d = new Date(dateString);
  return new Intl.DateTimeFormat('id-ID', { day: '2-digit', month: 'long', year: 'numeric' }).format(d);
};

const isExpired = (dateString) => {
  if (!dateString) return false;
  return new Date(dateString) < new Date();
};

const fetchVouchers = async () => {
  loading.value = true;
  try {
    vouchers.value = await sellerFeaturesService.getVouchers();
  } catch (error) {
    showToastError('Gagal memuat voucher');
  } finally {
    loading.value = false;
  }
};

const openCreateModal = () => {
  isEdit.value = false;
  form.value = { name: '', type: 'price', amount: 0, max: 0, expired_at: '' };
  showModal.value = true;
};

const openEditModal = (voucher) => {
  isEdit.value = true;
  editId.value = voucher.id;
  // Format the date to YYYY-MM-DD for the date input
  let formattedDate = '';
  if (voucher.expired_at) {
    const d = new Date(voucher.expired_at);
    formattedDate = d.toISOString().split('T')[0];
  }
  form.value = { ...voucher, expired_at: formattedDate };
  showModal.value = true;
};

const submitForm = async () => {
  submitting.value = true;
  try {
    const payload = { ...form.value };
    if (!payload.max) payload.max = 0; // Ensure max is present
    
    if (isEdit.value) {
      await sellerFeaturesService.updateVoucher(editId.value, payload);
      showToastSuccess('Voucher berhasil diperbarui');
    } else {
      await sellerFeaturesService.createVoucher(payload);
      showToastSuccess('Voucher berhasil ditambahkan');
    }
    showModal.value = false;
    fetchVouchers();
  } catch (error) {
    showToastError(error.message || 'Gagal menyimpan voucher');
  } finally {
    submitting.value = false;
  }
};

const confirmDelete = (id) => {
  Swal.fire({
    title: 'Hapus Voucher?',
    text: "Voucher yang dihapus tidak dapat digunakan lagi!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#ef4444',
    cancelButtonColor: '#9ca3af',
    confirmButtonText: 'Ya, Hapus!',
    cancelButtonText: 'Batal'
  }).then(async (result) => {
    if (result.isConfirmed) {
      try {
        await sellerFeaturesService.deleteVoucher(id);
        showToastSuccess('Voucher berhasil dihapus');
        fetchVouchers();
      } catch (error) {
        showToastError(error.message || 'Gagal menghapus voucher');
      }
    }
  });
};

onMounted(() => {
  fetchVouchers();
});
</script>
