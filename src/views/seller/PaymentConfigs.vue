<template>
  <div>
    <!-- Header Section -->
    <div class="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
      <div>
        <h1 class="text-3xl font-black text-gray-800 tracking-tight">Metode Pembayaran</h1>
        <p class="text-gray-500 mt-1">Kelola metode pembayaran dan rekening bank toko Anda</p>
      </div>
      <button @click="openConfigModal" class="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-2xl font-bold shadow-lg shadow-blue-200 transition-all hover:-translate-y-1 flex items-center gap-2">
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path></svg>
        Tambah Metode Pembayaran
      </button>
    </div>

    <!-- Data Table -->
    <div class="bg-white rounded-3xl shadow-sm border border-blue-50 overflow-hidden">
      <div class="overflow-x-auto">
        <table class="w-full text-left border-collapse">
          <thead>
            <tr class="bg-slate-50/50 border-b border-gray-100">
              <th class="p-5 font-bold text-gray-600 text-sm w-16">ID</th>
              <th class="p-5 font-bold text-gray-600 text-sm w-48">Metode Pembayaran</th>
              <th class="p-5 font-bold text-gray-600 text-sm">Daftar Rekening Bank</th>
              <th class="p-5 font-bold text-gray-600 text-sm text-right">Aksi</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-50">
            <tr v-if="loading" class="animate-pulse">
              <td colspan="4" class="p-5 text-center text-gray-400">Memuat data...</td>
            </tr>
            <tr v-else-if="configs.length === 0">
              <td colspan="4" class="p-10 text-center text-gray-400">
                <span class="text-4xl mb-3 block">💳</span>
                Belum ada metode pembayaran.
              </td>
            </tr>
            <template v-else v-for="config in configs" :key="config.id">
              <tr class="hover:bg-blue-50/20 transition-colors group">
                <td class="p-5 text-sm text-gray-600 font-medium">#{{ config.id }}</td>
                <td class="p-5 text-sm text-gray-800 font-bold tracking-wide">{{ config.name }}</td>
                <td class="p-5">
                  <div class="flex flex-col gap-2">
                    <div v-for="bank in (config.banks || [])" :key="bank.id" 
                         class="px-4 py-2 bg-gray-50 rounded-xl border border-gray-100 flex items-center justify-between group/bank">
                      <div>
                        <span class="font-bold text-gray-800 uppercase text-sm block">{{ bank.name }}</span>
                        <span class="text-xs text-gray-500 font-mono">{{ bank.account_id }} (a.n. {{ bank.account_name }})</span>
                      </div>
                      <button @click.stop="confirmDeleteBank(bank.id)" class="text-red-400 hover:text-red-600 p-2 opacity-0 group-hover/bank:opacity-100 transition-opacity">
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                      </button>
                    </div>
                    <div>
                      <button @click="openBankModal(config)" class="mt-1 px-3 py-1.5 bg-blue-50 text-blue-600 hover:bg-blue-100 text-xs font-bold rounded-lg transition-colors inline-flex items-center gap-1">
                        <span>+</span> Tambah Rekening
                      </button>
                    </div>
                  </div>
                </td>
                <td class="p-5 text-right space-x-2 align-top">
                  <button @click="confirmDeleteConfig(config.id)" class="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors" title="Hapus">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                  </button>
                </td>
              </tr>
            </template>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Modal Config -->
    <div v-if="showConfigModal" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/50 backdrop-blur-sm">
      <div class="bg-white rounded-3xl w-full max-w-md shadow-2xl overflow-hidden transform transition-all">
        <div class="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
          <h3 class="font-bold text-gray-800 text-lg">Tambah Metode Pembayaran</h3>
          <button @click="showConfigModal = false" class="text-gray-400 hover:text-red-500 transition-colors">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
          </button>
        </div>
        
        <form @submit.prevent="submitConfigForm" class="p-6 space-y-4">
          <div>
            <label class="block text-sm font-bold text-gray-700 mb-1">Nama Metode</label>
            <input v-model="configForm.name" type="text" required class="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition" placeholder="Contoh: Transfer Bank, E-Wallet" />
          </div>

          <div class="pt-4 mt-2 border-t border-gray-100 flex justify-end gap-3">
            <button type="button" @click="showConfigModal = false" class="px-5 py-2.5 text-sm font-bold text-gray-600 bg-gray-100 rounded-xl hover:bg-gray-200 transition-colors">Batal</button>
            <button type="submit" :disabled="submitting" class="px-5 py-2.5 text-sm font-bold text-white bg-blue-600 rounded-xl hover:bg-blue-700 transition-colors shadow-lg shadow-blue-200 disabled:opacity-50">
              {{ submitting ? 'Menyimpan...' : 'Simpan' }}
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- Modal Bank -->
    <div v-if="showBankModal" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/50 backdrop-blur-sm">
      <div class="bg-white rounded-3xl w-full max-w-md shadow-2xl overflow-hidden transform transition-all">
        <div class="px-6 py-4 border-b border-gray-100 flex items-center justify-between bg-blue-50">
          <h3 class="font-bold text-blue-900 text-lg">Tambah Rekening untuk {{ selectedConfig?.name }}</h3>
          <button @click="showBankModal = false" class="text-blue-400 hover:text-blue-600 transition-colors">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
          </button>
        </div>
        
        <form @submit.prevent="submitBankForm" class="p-6 space-y-4">
          <div>
            <label class="block text-sm font-bold text-gray-700 mb-1">Nama Bank / E-Wallet</label>
            <input v-model="bankForm.name" type="text" required class="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition uppercase" placeholder="BCA, Mandiri, OVO, dll" />
          </div>

          <div>
            <label class="block text-sm font-bold text-gray-700 mb-1">Nomor Rekening / HP</label>
            <input v-model="bankForm.account_id" type="text" required class="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition font-mono" placeholder="0812xxxx / 1234567890" />
          </div>

          <div>
            <label class="block text-sm font-bold text-gray-700 mb-1">Atas Nama (a.n.)</label>
            <input v-model="bankForm.account_name" type="text" required class="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition uppercase" placeholder="JOHN DOE" />
          </div>

          <div class="pt-4 mt-2 border-t border-gray-100 flex justify-end gap-3">
            <button type="button" @click="showBankModal = false" class="px-5 py-2.5 text-sm font-bold text-gray-600 bg-gray-100 rounded-xl hover:bg-gray-200 transition-colors">Batal</button>
            <button type="submit" :disabled="submittingBank" class="px-5 py-2.5 text-sm font-bold text-white bg-blue-600 rounded-xl hover:bg-blue-700 transition-colors shadow-lg shadow-blue-200 disabled:opacity-50">
              {{ submittingBank ? 'Menyimpan...' : 'Simpan Rekening' }}
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

const configs = ref([]);
const loading = ref(true);

// Config Modal
const showConfigModal = ref(false);
const submitting = ref(false);
const configForm = ref({ name: '' });

// Bank Modal
const showBankModal = ref(false);
const submittingBank = ref(false);
const selectedConfig = ref(null);
const bankForm = ref({ name: '', account_id: '', account_name: '' });

const fetchConfigs = async () => {
  loading.value = true;
  try {
    configs.value = await sellerFeaturesService.getPaymentConfigs();
  } catch (error) {
    showToastError('Gagal memuat metode pembayaran');
  } finally {
    loading.value = false;
  }
};

// --- CONFIG ACTIONS ---
const openConfigModal = () => {
  configForm.value = { name: '' };
  showConfigModal.value = true;
};

const submitConfigForm = async () => {
  submitting.value = true;
  try {
    await sellerFeaturesService.createPaymentConfig(configForm.value);
    showToastSuccess('Metode pembayaran berhasil ditambahkan');
    showConfigModal.value = false;
    fetchConfigs();
  } catch (error) {
    showToastError(error.message || 'Gagal menyimpan metode pembayaran');
  } finally {
    submitting.value = false;
  }
};

const confirmDeleteConfig = (id) => {
  Swal.fire({
    title: 'Hapus Metode Pembayaran?',
    text: "Metode pembayaran ini beserta rekeningnya akan dihapus!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#ef4444',
    cancelButtonColor: '#9ca3af',
    confirmButtonText: 'Ya, Hapus!',
    cancelButtonText: 'Batal'
  }).then(async (result) => {
    if (result.isConfirmed) {
      try {
        await sellerFeaturesService.deletePaymentConfig(id);
        showToastSuccess('Metode pembayaran berhasil dihapus');
        fetchConfigs();
      } catch (error) {
        showToastError(error.message || 'Gagal menghapus metode pembayaran');
      }
    }
  });
};

// --- BANK ACTIONS ---
const openBankModal = (config) => {
  selectedConfig.value = config;
  bankForm.value = { name: '', account_id: '', account_name: '' };
  showBankModal.value = true;
};

const submitBankForm = async () => {
  submittingBank.value = true;
  try {
    await sellerFeaturesService.addBankToPaymentConfig(selectedConfig.value.id, bankForm.value);
    showToastSuccess('Rekening berhasil ditambahkan');
    showBankModal.value = false;
    fetchConfigs(); // Refresh the list
  } catch (error) {
    showToastError(error.message || 'Gagal menambahkan rekening');
  } finally {
    submittingBank.value = false;
  }
};

const confirmDeleteBank = (id) => {
  Swal.fire({
    title: 'Hapus Rekening?',
    text: "Rekening ini akan dihapus dari metode pembayaran!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#ef4444',
    cancelButtonColor: '#9ca3af',
    confirmButtonText: 'Ya, Hapus!',
    cancelButtonText: 'Batal'
  }).then(async (result) => {
    if (result.isConfirmed) {
      try {
        await sellerFeaturesService.deleteBankFromPaymentConfig(id);
        showToastSuccess('Rekening berhasil dihapus');
        fetchConfigs();
      } catch (error) {
        showToastError(error.message || 'Gagal menghapus rekening');
      }
    }
  });
};

onMounted(() => {
  fetchConfigs();
});
</script>
