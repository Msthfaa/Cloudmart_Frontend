<template>
  <div class="max-w-6xl mx-auto">
    <div class="mb-8">
      <p class="text-xs font-black text-blue-400 uppercase tracking-widest mb-1">Workspace</p>
      <h2 class="text-3xl font-black text-slate-800 tracking-tight underline decoration-blue-500 decoration-4 underline-offset-8">PENGATURAN TOKO</h2>
      <p class="text-slate-500 mt-4 max-w-2xl text-sm leading-relaxed font-medium">
        Konfigurasikan identitas merk Anda, kelola preferensi logistik, dan atur saluran pembayaran finansial Anda dari kontrol studio terpusat ini.
      </p>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div class="lg:col-span-2 space-y-8">
        
        <section class="bg-white p-8 rounded-[2rem] border border-blue-100 shadow-sm">
          <h3 class="text-lg font-bold text-slate-800 mb-6 flex items-center">
            <span class="mr-2">🏪</span> Profil Toko
          </h3>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div class="space-y-4">
              <div>
                <label class="text-[10px] font-black uppercase text-slate-400 tracking-widest block mb-2">Nama Toko</label>
                <input type="text" v-model="store.name" class="w-full bg-blue-50/50 border border-blue-100 p-3 rounded-xl focus:ring-2 ring-blue-200 outline-none font-bold text-slate-700">
              </div>
              <div>
                <label class="text-[10px] font-black uppercase text-slate-400 tracking-widest block mb-2">Narasi Merk</label>
                <textarea v-model="store.description" rows="4" class="w-full bg-blue-50/50 border border-blue-100 p-3 rounded-xl focus:ring-2 ring-blue-200 outline-none text-sm text-slate-600 leading-relaxed"></textarea>
              </div>
            </div>
            <div class="flex flex-col items-center justify-center border-2 border-dashed border-blue-100 rounded-[2rem] bg-blue-50/20 p-6">
              <div class="w-32 h-32 bg-white rounded-3xl shadow-inner mb-4 flex items-center justify-center text-4xl">🛒</div>
              <button class="text-blue-600 font-bold text-xs hover:underline">Ganti Logo</button>
            </div>
          </div>
        </section>

        <section class="bg-white p-8 rounded-[2rem] border border-blue-100 shadow-sm">
          <h3 class="text-lg font-bold text-slate-800 mb-6 flex items-center">
            <span class="mr-2">💳</span> Pembayaran dan Tagihan
          </h3>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div class="p-5 border border-blue-100 rounded-2xl bg-gradient-to-br from-white to-blue-50/30">
              <p class="text-[10px] font-black text-slate-400 uppercase mb-3">Metode Pencairan</p>
              <p class="font-bold text-slate-800 text-sm">Bank Central Asia (BCA)</p>
              <p class="text-xs text-slate-500">**** 9012 - a/n PT Editorial Global</p>
              <button class="text-blue-600 text-[10px] font-black mt-4 uppercase hover:underline">Ubah Rekening ></button>
            </div>
            <button class="border-2 border-dashed border-slate-200 rounded-2xl flex items-center justify-center text-slate-400 font-bold text-sm hover:bg-slate-50 transition">
              + Tambah Metode
            </button>
          </div>
        </section>
      </div>

      <div class="space-y-6">
        <section class="bg-slate-50 p-6 rounded-[2rem] border border-slate-100">
          <h3 class="font-bold text-slate-800 mb-6 flex items-center">
            <span class="mr-2">🚚</span> Logistik Pengiriman
          </h3>
          
          <div class="space-y-3 mb-8">
            <div v-for="courier in couriers" :key="courier.name" class="flex items-center justify-between p-3 bg-white rounded-xl shadow-sm">
              <div class="flex items-center space-x-3">
                <div class="w-8 h-8 bg-blue-50 rounded-lg"></div>
                <span class="text-xs font-bold text-slate-700">{{ courier.name }}</span>
              </div>
              <input type="checkbox" :checked="courier.active" class="w-10 h-5 bg-slate-200 rounded-full appearance-none checked:bg-blue-600 transition-all cursor-pointer relative after:content-[''] after:absolute after:w-4 after:h-4 after:bg-white after:rounded-full after:top-0.5 after:left-0.5 checked:after:left-5 after:transition-all">
            </div>
          </div>

          <div class="p-4 bg-white rounded-2xl border border-blue-50 mb-6">
            <div class="flex justify-between items-center mb-2">
              <span class="text-[10px] font-black text-slate-400 uppercase">Flat Rate Nasional</span>
              <span class="text-xs font-black text-orange-500">Rp 15.000</span>
            </div>
            <p class="text-[10px] text-slate-500 leading-tight">Aktifkan untuk menyederhanakan biaya kirim ke seluruh wilayah Indonesia.</p>
            <button class="w-full mt-4 py-2 bg-blue-50 text-blue-600 rounded-lg text-[10px] font-black uppercase hover:bg-blue-100 transition">Pengaturan Lanjutan</button>
          </div>

          <button @click="saveChanges" class="w-full bg-slate-800 text-white py-4 rounded-2xl font-black shadow-lg shadow-slate-200 hover:bg-slate-900 transition-all active:scale-95">
            SIMPAN SEMUA PERUBAHAN
          </button>
          <p class="text-[9px] text-center text-slate-400 mt-4 uppercase font-bold tracking-tighter">Terakhir diperbarui: 12 April 2026, 10.30 WIB</p>
        </section>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import Swal from 'sweetalert2';

const store = ref({
  name: 'The Editorial Merchant',
  description: 'Kurasi produk fashion dan gaya hidup kelas atas dengan fokus pada kualitas kerajinan tangan dan desain kontemporer yang baik.'
});

const couriers = ref([
  { name: 'JNE Express', active: true },
  { name: 'Sicepat Gokil', active: true },
  { name: 'Gosend / Grab', active: true },
]);

const saveChanges = () => {
  Swal.fire({
    title: 'Simpan Perubahan?',
    text: "Data pengaturan toko akan diperbarui.",
    icon: 'question',
    showCancelButton: true,
    confirmButtonColor: '#1e293b',
    confirmButtonText: 'Ya, Simpan!'
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire('Berhasil!', 'Pengaturan telah disimpan.', 'success');
    }
  });
};
</script>