<template>
  <div class="bg-gray-50 min-h-screen py-10">
    <div class="max-w-[1000px] mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
      
      <!-- Profile Sidebar -->
      <div class="md:col-span-1">
        <div class="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 flex flex-col items-center text-center sticky top-24">
          <div class="w-24 h-24 rounded-full bg-gradient-to-tr from-blue-500 to-indigo-400 flex items-center justify-center text-white text-3xl font-bold mb-4 shadow-lg shadow-blue-200">
            {{ getInitials(profile?.name) }}
          </div>
          <h2 class="text-xl font-bold text-gray-800">{{ profile?.name || 'Loading...' }}</h2>
          <p class="text-sm text-gray-500 mb-6">{{ profile?.email }}</p>
          
          <div class="w-full space-y-3 text-left border-t border-gray-100 pt-6">
            <div class="flex items-center gap-3 text-sm text-gray-600">
              <span class="w-8 h-8 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center">📱</span>
              <span>{{ profile?.phone || '-' }}</span>
            </div>
            <div class="flex items-center gap-3 text-sm text-gray-600">
              <span class="w-8 h-8 rounded-full bg-green-50 text-green-600 flex items-center justify-center">🛡️</span>
              <span class="capitalize">{{ profile?.role || 'User' }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Main Content -->
      <div class="md:col-span-2 space-y-8">
        
        <!-- Addresses Section -->
        <div class="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
          <div class="flex items-center justify-between mb-6">
            <div>
              <h3 class="text-lg font-bold text-gray-800">Daftar Alamat</h3>
              <p class="text-sm text-gray-500">Kelola alamat pengiriman Anda</p>
            </div>
            <button @click="showAddressForm = true" class="px-4 py-2 bg-blue-600 text-white text-sm font-bold rounded-xl hover:bg-blue-700 transition-colors shadow-lg shadow-blue-200">
              + Tambah Alamat
            </button>
          </div>

          <div v-if="loadingAddresses" class="text-center py-10 text-gray-500">Memuat alamat...</div>
          
          <div v-else-if="addresses.length === 0" class="text-center py-16 bg-gray-50 rounded-2xl border border-dashed border-gray-200">
            <span class="text-4xl mb-3 block">📍</span>
            <p class="text-gray-500 text-sm">Belum ada alamat tersimpan.</p>
          </div>

          <div v-else class="grid grid-cols-1 gap-4">
            <div v-for="address in addresses" :key="address.id" class="p-5 border border-gray-100 rounded-2xl hover:border-blue-300 hover:shadow-md transition-all group relative">
              <div class="absolute top-4 right-4">
                <span class="px-3 py-1 text-[10px] font-bold uppercase tracking-wider rounded-full" 
                      :class="address.type === 'home' ? 'bg-indigo-50 text-indigo-600' : 'bg-emerald-50 text-emerald-600'">
                  {{ address.type }}
                </span>
              </div>
              <h4 class="font-bold text-gray-800 mb-1">{{ address.recipient }}</h4>
              <p class="text-xs text-gray-500 mb-3">{{ address.phone }}</p>
              <p class="text-sm text-gray-600 leading-relaxed">{{ address.address }}, {{ address.city }}, {{ address.state }}, {{ address.country }} {{ address.postal_code }}</p>
              <p v-if="address.additional_information" class="text-xs text-gray-400 mt-2">Catatan: {{ address.additional_information }}</p>
            </div>
          </div>
        </div>

      </div>
    </div>

    <!-- Modal Form Alamat -->
    <div v-if="showAddressForm" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/50 backdrop-blur-sm">
      <div class="bg-white rounded-3xl w-full max-w-lg shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        <div class="px-6 py-4 border-b border-gray-100 flex items-center justify-between sticky top-0 bg-white z-10">
          <h3 class="font-bold text-gray-800 text-lg">Tambah Alamat Baru</h3>
          <button @click="showAddressForm = false" class="text-gray-400 hover:text-red-500 transition-colors">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
          </button>
        </div>
        
        <div class="p-6 overflow-y-auto">
          <form @submit.prevent="submitAddress" class="space-y-4">
            <div class="grid grid-cols-2 gap-4">
              <div>
                <label class="block text-xs font-bold text-gray-600 mb-1">Nama Penerima</label>
                <input v-model="form.recipient" type="text" required class="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none text-sm transition" placeholder="Jhon Doe" />
              </div>
              <div>
                <label class="block text-xs font-bold text-gray-600 mb-1">Nomor HP</label>
                <input v-model="form.phone" type="text" required class="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none text-sm transition" placeholder="0812..." />
              </div>
            </div>

            <div>
              <label class="block text-xs font-bold text-gray-600 mb-1">Alamat Lengkap</label>
              <textarea v-model="form.address" required rows="3" class="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none text-sm transition" placeholder="Nama jalan, gedung, no. rumah..."></textarea>
            </div>

            <div class="grid grid-cols-2 gap-4">
              <div>
                <label class="block text-xs font-bold text-gray-600 mb-1">Kota/Kabupaten</label>
                <input v-model="form.city" type="text" required class="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none text-sm transition" placeholder="Surabaya" />
              </div>
              <div>
                <label class="block text-xs font-bold text-gray-600 mb-1">Provinsi</label>
                <input v-model="form.state" type="text" required class="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none text-sm transition" placeholder="Jawa Timur" />
              </div>
            </div>

            <div class="grid grid-cols-2 gap-4">
              <div>
                <label class="block text-xs font-bold text-gray-600 mb-1">Negara</label>
                <input v-model="form.country" type="text" required class="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none text-sm transition" placeholder="Indonesia" />
              </div>
              <div>
                <label class="block text-xs font-bold text-gray-600 mb-1">Kode Pos</label>
                <input v-model="form.postal_code" type="text" required class="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none text-sm transition" placeholder="60293" />
              </div>
            </div>

            <div class="grid grid-cols-2 gap-4">
              <div>
                <label class="block text-xs font-bold text-gray-600 mb-1">Tipe Alamat</label>
                <select v-model="form.type" required class="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none text-sm transition bg-white">
                  <option value="home">Rumah</option>
                  <option value="office">Kantor</option>
                </select>
              </div>
              <div>
                <label class="block text-xs font-bold text-gray-600 mb-1">Informasi Tambahan (Opsional)</label>
                <input v-model="form.additional_information" type="text" class="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none text-sm transition" placeholder="Patokan jalan..." />
              </div>
            </div>

            <div class="pt-4 mt-4 border-t border-gray-100 flex justify-end gap-3">
              <button type="button" @click="showAddressForm = false" class="px-5 py-2.5 text-sm font-bold text-gray-600 bg-gray-100 rounded-xl hover:bg-gray-200 transition-colors">Batal</button>
              <button type="submit" :disabled="submitting" class="px-5 py-2.5 text-sm font-bold text-white bg-blue-600 rounded-xl hover:bg-blue-700 transition-colors shadow-lg shadow-blue-200 disabled:opacity-50">
                {{ submitting ? 'Menyimpan...' : 'Simpan Alamat' }}
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
import { profileService } from '../../services/profile';
import { showToastSuccess, showToastError } from '../../services/api';

const profile = ref(null);
const addresses = ref([]);
const loadingAddresses = ref(true);
const showAddressForm = ref(false);
const submitting = ref(false);

const form = ref({
  recipient: '',
  phone: '',
  address: '',
  city: '',
  state: '',
  country: 'Indonesia',
  postal_code: '',
  type: 'home',
  additional_information: ''
});

const getInitials = (name) => {
  if (!name) return 'U';
  return name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
};

const fetchProfileData = async () => {
  try {
    profile.value = await profileService.getProfile();
  } catch (error) {
    showToastError('Gagal memuat profil');
  }
};

const fetchAddressesData = async () => {
  loadingAddresses.value = true;
  try {
    addresses.value = await profileService.getAddresses();
  } catch (error) {
    showToastError('Gagal memuat daftar alamat');
  } finally {
    loadingAddresses.value = false;
  }
};

const submitAddress = async () => {
  submitting.value = true;
  try {
    await profileService.addAddress(form.value);
    showToastSuccess('Alamat berhasil ditambahkan');
    showAddressForm.value = false;
    // Reset form
    form.value = { recipient: '', phone: '', address: '', city: '', state: '', country: 'Indonesia', postal_code: '', type: 'home', additional_information: '' };
    // Reload addresses
    fetchAddressesData();
  } catch (error) {
    showToastError(error.message || 'Gagal menyimpan alamat');
  } finally {
    submitting.value = false;
  }
};

onMounted(() => {
  fetchProfileData();
  fetchAddressesData();
});
</script>
