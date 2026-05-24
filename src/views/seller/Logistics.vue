<template>
  <div>
    <!-- Header Section -->
    <div class="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
      <div>
        <h1 class="text-3xl font-black text-gray-800 tracking-tight">Logistik & Pengiriman</h1>
        <p class="text-gray-500 mt-1">Kelola penyedia logistik dan layanan pengiriman</p>
      </div>
      <button @click="openLogisticModal" class="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-2xl font-bold shadow-lg shadow-blue-200 transition-all hover:-translate-y-1 flex items-center gap-2">
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path></svg>
        Tambah Logistik
      </button>
    </div>

    <!-- Data Table -->
    <div class="bg-white rounded-3xl shadow-sm border border-blue-50 overflow-hidden">
      <div class="overflow-x-auto">
        <table class="w-full text-left border-collapse">
          <thead>
            <tr class="bg-slate-50/50 border-b border-gray-100">
              <th class="p-5 font-bold text-gray-600 text-sm w-16">ID</th>
              <th class="p-5 font-bold text-gray-600 text-sm">Nama Logistik</th>
              <th class="p-5 font-bold text-gray-600 text-sm">Layanan (Services)</th>
              <th class="p-5 font-bold text-gray-600 text-sm text-right">Aksi</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-50">
            <tr v-if="loading" class="animate-pulse">
              <td colspan="4" class="p-5 text-center text-gray-400">Memuat data...</td>
            </tr>
            <tr v-else-if="logistics.length === 0">
              <td colspan="4" class="p-10 text-center text-gray-400">
                <span class="text-4xl mb-3 block">🚚</span>
                Belum ada penyedia logistik.
              </td>
            </tr>
            <template v-else v-for="logistic in logistics" :key="logistic.id">
              <tr class="hover:bg-blue-50/20 transition-colors group">
                <td class="p-5 text-sm text-gray-600 font-medium">#{{ logistic.id }}</td>
                <td class="p-5 text-sm text-gray-800 font-bold uppercase tracking-wide">{{ logistic.name }}</td>
                <td class="p-5">
                  <div class="flex flex-wrap gap-2 items-center">
                    <span v-for="service in (logistic.services || [])" :key="service.id" 
                          class="px-3 py-1 bg-blue-50 text-blue-700 text-xs font-bold rounded-lg border border-blue-100 flex items-center gap-2">
                      {{ service.name }} ({{ formatPrice(service.base_price) }})
                      <button @click.stop="confirmDeleteService(service.id)" class="text-red-400 hover:text-red-600 ml-1">×</button>
                    </span>
                    <button @click="openServiceModal(logistic)" class="px-2 py-1 bg-gray-100 text-gray-600 hover:bg-gray-200 text-xs font-bold rounded-lg transition-colors">
                      + Tambah Layanan
                    </button>
                  </div>
                </td>
                <td class="p-5 text-right space-x-2">
                  <button @click="openEditLogisticModal(logistic)" class="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" title="Edit">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path></svg>
                  </button>
                  <button @click="confirmDeleteLogistic(logistic.id)" class="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors" title="Hapus">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                  </button>
                </td>
              </tr>
            </template>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Modal Logistic -->
    <div v-if="showLogisticModal" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/50 backdrop-blur-sm">
      <div class="bg-white rounded-3xl w-full max-w-md shadow-2xl overflow-hidden transform transition-all">
        <div class="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
          <h3 class="font-bold text-gray-800 text-lg">{{ isEditLogistic ? 'Edit Logistik' : 'Tambah Logistik' }}</h3>
          <button @click="showLogisticModal = false" class="text-gray-400 hover:text-red-500 transition-colors">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
          </button>
        </div>
        
        <form @submit.prevent="submitLogisticForm" class="p-6 space-y-4">
          <div>
            <label class="block text-sm font-bold text-gray-700 mb-1">Nama Logistik</label>
            <input v-model="logisticForm.name" type="text" required class="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition uppercase" placeholder="Contoh: JNE, J&T" />
          </div>

          <div class="pt-4 mt-2 border-t border-gray-100 flex justify-end gap-3">
            <button type="button" @click="showLogisticModal = false" class="px-5 py-2.5 text-sm font-bold text-gray-600 bg-gray-100 rounded-xl hover:bg-gray-200 transition-colors">Batal</button>
            <button type="submit" :disabled="submitting" class="px-5 py-2.5 text-sm font-bold text-white bg-blue-600 rounded-xl hover:bg-blue-700 transition-colors shadow-lg shadow-blue-200 disabled:opacity-50">
              {{ submitting ? 'Menyimpan...' : 'Simpan' }}
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- Modal Service -->
    <div v-if="showServiceModal" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/50 backdrop-blur-sm">
      <div class="bg-white rounded-3xl w-full max-w-md shadow-2xl overflow-hidden transform transition-all">
        <div class="px-6 py-4 border-b border-gray-100 flex items-center justify-between bg-blue-50">
          <h3 class="font-bold text-blue-900 text-lg">Tambah Layanan untuk {{ selectedLogistic?.name }}</h3>
          <button @click="showServiceModal = false" class="text-blue-400 hover:text-blue-600 transition-colors">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
          </button>
        </div>
        
        <form @submit.prevent="submitServiceForm" class="p-6 space-y-4">
          <div>
            <label class="block text-sm font-bold text-gray-700 mb-1">Nama Layanan</label>
            <input v-model="serviceForm.name" type="text" required class="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition" placeholder="Contoh: REG, YES, Ekonomis" />
          </div>

          <div>
            <label class="block text-sm font-bold text-gray-700 mb-1">Tarif Dasar (Rp)</label>
            <input v-model="serviceForm.base_price" type="number" required min="0" class="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition" placeholder="10000" />
          </div>

          <div class="pt-4 mt-2 border-t border-gray-100 flex justify-end gap-3">
            <button type="button" @click="showServiceModal = false" class="px-5 py-2.5 text-sm font-bold text-gray-600 bg-gray-100 rounded-xl hover:bg-gray-200 transition-colors">Batal</button>
            <button type="submit" :disabled="submittingService" class="px-5 py-2.5 text-sm font-bold text-white bg-blue-600 rounded-xl hover:bg-blue-700 transition-colors shadow-lg shadow-blue-200 disabled:opacity-50">
              {{ submittingService ? 'Menyimpan...' : 'Simpan Layanan' }}
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

const logistics = ref([]);
const loading = ref(true);

// Logistic Modal
const showLogisticModal = ref(false);
const submitting = ref(false);
const isEditLogistic = ref(false);
const editLogisticId = ref(null);
const logisticForm = ref({ name: '' });

// Service Modal
const showServiceModal = ref(false);
const submittingService = ref(false);
const selectedLogistic = ref(null);
const serviceForm = ref({ name: '', base_price: 0 });

const formatPrice = (price) => {
  return 'Rp' + new Intl.NumberFormat('id-ID').format(price);
};

const fetchLogistics = async () => {
  loading.value = true;
  try {
    logistics.value = await sellerFeaturesService.getLogistics();
  } catch (error) {
    showToastError('Gagal memuat logistik');
  } finally {
    loading.value = false;
  }
};

// --- LOGISTIC ACTIONS ---
const openLogisticModal = () => {
  isEditLogistic.value = false;
  logisticForm.value = { name: '' };
  showLogisticModal.value = true;
};

const openEditLogisticModal = (logistic) => {
  isEditLogistic.value = true;
  editLogisticId.value = logistic.id;
  logisticForm.value = { name: logistic.name };
  showLogisticModal.value = true;
};

const submitLogisticForm = async () => {
  submitting.value = true;
  try {
    if (isEditLogistic.value) {
      await sellerFeaturesService.updateLogistic(editLogisticId.value, logisticForm.value);
      showToastSuccess('Logistik berhasil diperbarui');
    } else {
      await sellerFeaturesService.createLogistic(logisticForm.value);
      showToastSuccess('Logistik berhasil ditambahkan');
    }
    showLogisticModal.value = false;
    fetchLogistics();
  } catch (error) {
    showToastError(error.message || 'Gagal menyimpan logistik');
  } finally {
    submitting.value = false;
  }
};

const confirmDeleteLogistic = (id) => {
  Swal.fire({
    title: 'Hapus Logistik?',
    text: "Penyedia logistik ini beserta layanannya akan dihapus!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#ef4444',
    cancelButtonColor: '#9ca3af',
    confirmButtonText: 'Ya, Hapus!',
    cancelButtonText: 'Batal'
  }).then(async (result) => {
    if (result.isConfirmed) {
      try {
        await sellerFeaturesService.deleteLogistic(id);
        showToastSuccess('Logistik berhasil dihapus');
        fetchLogistics();
      } catch (error) {
        showToastError(error.message || 'Gagal menghapus logistik');
      }
    }
  });
};

// --- SERVICE ACTIONS ---
const openServiceModal = (logistic) => {
  selectedLogistic.value = logistic;
  serviceForm.value = { name: '', base_price: 0 };
  showServiceModal.value = true;
};

const submitServiceForm = async () => {
  submittingService.value = true;
  try {
    await sellerFeaturesService.addLogisticService(selectedLogistic.value.id, serviceForm.value);
    showToastSuccess('Layanan berhasil ditambahkan');
    showServiceModal.value = false;
    fetchLogistics(); // Refresh the list
  } catch (error) {
    showToastError(error.message || 'Gagal menambahkan layanan');
  } finally {
    submittingService.value = false;
  }
};

const confirmDeleteService = (id) => {
  Swal.fire({
    title: 'Hapus Layanan?',
    text: "Layanan ini akan dihapus dari logistik!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#ef4444',
    cancelButtonColor: '#9ca3af',
    confirmButtonText: 'Ya, Hapus!',
    cancelButtonText: 'Batal'
  }).then(async (result) => {
    if (result.isConfirmed) {
      try {
        await sellerFeaturesService.deleteLogisticService(id);
        showToastSuccess('Layanan berhasil dihapus');
        fetchLogistics();
      } catch (error) {
        showToastError(error.message || 'Gagal menghapus layanan');
      }
    }
  });
};

onMounted(() => {
  fetchLogistics();
});
</script>
