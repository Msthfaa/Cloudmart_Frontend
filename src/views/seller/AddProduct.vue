<template>
  <div class="max-w-6xl mx-auto pb-20 px-4">
    <div class="flex justify-between items-center mb-10">
      <div>
        <button @click="$router.push('/admin/products')" class="group flex items-center text-blue-600 text-[10px] font-black uppercase tracking-[0.2em] mb-2 hover:text-blue-800 transition-all">
          <span class="mr-2 group-hover:-translate-x-1 transition-transform">←</span> Kembali ke Katalog
        </button>
        <h2 class="text-4xl font-black text-slate-800 tracking-tighter italic uppercase">Tambah Produk Baru</h2>
      </div>
    </div>

    <form @submit.prevent="submitProduct" class="grid grid-cols-1 lg:grid-cols-3 gap-10">
      
      <div class="lg:col-span-2 space-y-10">
        
        <div class="bg-white p-10 rounded-[3rem] shadow-xl shadow-blue-900/5 border border-blue-50">
          <h3 class="font-black text-slate-800 mb-8 flex items-center tracking-widest text-sm uppercase">
            <span class="w-10 h-10 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center mr-4 shadow-sm italic text-lg">1</span>
            Informasi Produk
          </h3>
          
          <div class="space-y-8">
            <div>
              <label class="label-style">Nama Produk</label>
              <input v-model="form.name" @input="updateAllSKU" type="text" class="input-style" placeholder="Contoh: Adidas Adizero Evo SL" required>
            </div>

            <div>
              <label class="label-style">Kategori Koleksi</label>
              <div class="relative">
                <select v-model="form.categoryId" @change="updateAllSKU" class="input-style appearance-none pr-10 cursor-pointer" required>
                  <option value="" disabled selected>Pilih Kategori</option>
                  <option v-for="cat in categories" :key="cat.id" :value="cat.id">{{ cat.name }}</option>
                </select>
                <div class="absolute right-4 top-5 pointer-events-none text-blue-400">▼</div>
              </div>
            </div>

            <div>
              <label class="label-style">Deskripsi Singkat</label>
              <textarea v-model="form.description" rows="4" class="input-style h-32 resize-none py-4" placeholder="Jelaskan detail keunggulan produk ini..."></textarea>
            </div>
          </div>
        </div>

        <div class="bg-blue-50/40 p-10 rounded-[3.5rem] border border-blue-100 shadow-inner">
          <div class="flex justify-between items-center mb-8">
            <h3 class="font-black text-blue-700 italic flex items-center text-sm tracking-[0.2em] uppercase">
              <span class="w-10 h-10 bg-blue-600 text-white rounded-2xl flex items-center justify-center mr-4 shadow-lg shadow-blue-200 not-italic text-lg">2</span>
              Varian & Stok
            </h3>
            <button type="button" @click="addVariant" class="px-6 py-3 bg-white text-blue-600 text-[10px] font-black rounded-2xl border-2 border-blue-100 hover:bg-blue-600 hover:text-white transition-all shadow-sm">
              + TAMBAH VARIAN
            </button>
          </div>

          <div class="space-y-4">
            <div v-for="(v, index) in form.variants" :key="index" class="bg-white p-6 rounded-[2rem] border border-blue-50 flex flex-wrap lg:flex-nowrap gap-6 items-end relative group hover:shadow-md transition-shadow">
              
              <div class="flex-1 min-w-[150px]">
                <label class="text-[9px] font-black text-blue-300 uppercase mb-2 block tracking-widest">SKU Otomatis</label>
                <input v-model="v.sku" readonly placeholder="Generating..." class="w-full bg-blue-50/50 border-0 p-4 rounded-2xl text-[11px] font-black text-blue-600 outline-none cursor-not-allowed italic">
              </div>

              <div class="w-24">
                <label class="text-[9px] font-black text-slate-400 uppercase mb-2 block tracking-widest">Warna</label>
                <input v-model="v.color" @input="generateSKU(v)" type="text" placeholder="Ex: White" class="w-full bg-slate-50 border-0 p-4 rounded-2xl text-xs font-bold outline-none focus:ring-2 ring-blue-100" required>
              </div>
              <div class="w-24">
                <label class="text-[9px] font-black text-slate-400 uppercase mb-2 block tracking-widest">Ukuran</label>
                <input v-model="v.size" @input="generateSKU(v)" type="text" placeholder="Ex: 42" class="w-full bg-slate-50 border-0 p-4 rounded-2xl text-xs font-bold outline-none focus:ring-2 ring-blue-100" required>
              </div>
              <div class="w-24">
                <label class="text-[9px] font-black text-slate-400 uppercase mb-2 block tracking-widest">Harga</label>
                <input v-model.number="v.price" type="number" placeholder="0" class="w-full bg-slate-50 border-0 p-4 rounded-2xl text-xs font-bold outline-none focus:ring-2 ring-blue-100" required>
              </div>
              <div class="w-24">
                <label class="text-[9px] font-black text-slate-400 uppercase mb-2 block tracking-widest">Stok</label>
                <input v-model.number="v.stock" type="number" placeholder="0" class="w-full bg-slate-50 border-0 p-4 rounded-2xl text-xs font-bold outline-none focus:ring-2 ring-blue-100" required>
              </div>

              <button v-if="form.variants.length > 1" @click="removeVariant(index)" type="button" class="p-4 text-red-300 hover:text-red-500 hover:bg-red-50 rounded-2xl transition-all mb-0.5">
                🗑
              </button>
            </div>
          </div>
        </div>
      </div>

      <div class="space-y-6">
        <div class="bg-white p-8 rounded-[3rem] shadow-2xl shadow-slate-200 border border-blue-50 sticky top-10">
          <h4 class="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] mb-8 text-center">Status Publikasi</h4>
          
          <div class="space-y-4 mb-8">
            <div class="flex items-center justify-between p-4 bg-green-50 rounded-3xl border border-green-100">
              <span class="text-[10px] font-black text-green-700 uppercase italic">Katalog Aktif</span>
              <div class="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
            </div>
            <p class="text-[10px] text-slate-400 text-center leading-relaxed">Pastikan semua data varian dan SKU sudah benar sebelum disimpan ke sistem Cloudmart.</p>
          </div>

          <button type="submit" :disabled="submitting" class="w-full bg-slate-800 text-white py-6 rounded-[2rem] font-black shadow-xl hover:bg-slate-900 transition-all tracking-[0.2em] active:scale-95 disabled:opacity-50">
            {{ submitting ? 'MENYIMPAN...' : 'SIMPAN PRODUK' }}
          </button>
          
          <button @click="$router.push('/admin/products')" type="button" class="w-full mt-4 text-[10px] font-black text-slate-400 uppercase tracking-widest hover:text-red-500 transition-colors">
            Batalkan
          </button>
        </div>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { sellerFeaturesService } from '../../services/sellerFeatures';
import Swal from 'sweetalert2';

const router = useRouter();
const submitting = ref(false);
const categories = ref([]);

// Form Data sesuai skema backend
const form = ref({
  name: '',
  description: '',
  categoryId: '',
  variants: [
    { sku: '', color: '', size: '', price: 0, stock: 0 }
  ]
});

// 1. Fetch data Categories
const fetchInitialData = async () => {
  try {
    categories.value = await sellerFeaturesService.getCategories();
  } catch (error) {
    console.error("Gagal load categories:", error);
  }
};

// 2. Logika SKU Generator Otomatis
const generateSKU = (variant) => {
  const brandCode = 'CM'; // Cloudmart
  
  const selectedCat = categories.value.find(c => c.id === form.value.categoryId);
  const catCode = selectedCat ? selectedCat.name.substring(0, 3).toUpperCase() : 'CAT';

  const nameCode = form.value.name
    .split(' ')
    .map(word => word[0])
    .join('')
    .substring(0, 3)
    .toUpperCase() || 'PRD';

  const colorCode = variant.color ? variant.color.substring(0, 2).toUpperCase() : 'XX';
  const sizeCode = variant.size ? variant.size.toUpperCase() : '00';

  variant.sku = `${brandCode}-${catCode}-${nameCode}-${colorCode}${sizeCode}`;
};

// Update semua SKU jika data utama (Nama/Brand/Cat) berubah
const updateAllSKU = () => {
  form.value.variants.forEach(v => generateSKU(v));
};

// 3. Form Handling
const addVariant = () => {
  const newVariant = { sku: '', color: '', size: '', price: 0, stock: 0 };
  form.value.variants.push(newVariant);
  generateSKU(newVariant);
};

const removeVariant = (index) => {
  form.value.variants.splice(index, 1);
};

const submitProduct = async () => {
  submitting.value = true;
  try {
    const payload = {
      category_id: Number(form.value.categoryId),
      name: form.value.name,
      description: form.value.description
    };
    
    // Create main product
    const newProduct = await sellerFeaturesService.createProduct(payload);
    
    // Create all variants for the product
    for (const v of form.value.variants) {
      if (!v.sku || !v.price) continue;
      await sellerFeaturesService.addVariant(newProduct.id, {
        sku: v.sku,
        color: v.color || '-',
        size: v.size || '-',
        price: Number(v.price),
        stock: Number(v.stock) || 0
      });
    }
    
    await Swal.fire({
      title: 'BERHASIL DISIMPAN!',
      text: 'Produk baru telah masuk ke sistem Cloudmart.',
      icon: 'success',
      confirmButtonColor: '#1e293b',
      borderRadius: '40px',
      customClass: { title: 'font-black italic text-slate-800' }
    });
    
    router.push('/admin/products');
  } catch (error) {
    Swal.fire({
      title: 'OPS!',
      text: error.message || 'Gagal menyimpan produk.',
      icon: 'error',
      confirmButtonColor: '#ef4444'
    });
  } finally {
    submitting.value = false;
  }
};

onMounted(fetchInitialData);
</script>

<style scoped>
/* Utility Styles tanpa @apply untuk menghindari Vite Recursion Error */
.label-style {
  display: block;
  font-size: 10px;
  font-weight: 900;
  text-transform: uppercase;
  color: #94a3b8; /* slate-400 */
  letter-spacing: 0.2em;
  margin-bottom: 0.5rem;
}

.input-style {
  width: 100%;
  background-color: rgba(239, 246, 255, 0.4); /* blue-50/40 */
  border: 1px solid #dbeafe; /* blue-100 */
  padding: 1rem;
  border-radius: 1.5rem; /* rounded-3xl */
  font-weight: 700;
  color: #334155; /* slate-700 */
  outline: none;
  transition: all 0.3s;
}

.input-style:focus {
  border-color: #3b82f6; /* blue-500 */
  box-shadow: 0 0 0 4px rgba(59, 130, 246, 0.1);
}
</style>