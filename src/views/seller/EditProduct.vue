<template>
  <div class="max-w-6xl mx-auto pb-20 px-4">
    <div class="flex justify-between items-center mb-10">
      <div>
        <button @click="$router.push('/admin/products')" class="group flex items-center text-blue-600 text-[10px] font-black uppercase tracking-[0.2em] mb-2 hover:text-blue-800 transition-all">
          <span class="mr-2 group-hover:-translate-x-1 transition-transform">←</span> Kembali ke Katalog
        </button>
        <h2 class="text-4xl font-black text-slate-800 tracking-tighter italic uppercase">Edit Produk</h2>
      </div>
    </div>

    <!-- Loading State -->
    <div v-if="loadingProduct" class="flex flex-col items-center justify-center py-20">
      <div class="w-12 h-12 border-4 border-blue-100 border-t-blue-600 rounded-full animate-spin mb-4"></div>
      <p class="text-xs font-black text-slate-400 uppercase tracking-widest">Mengambil Data Produk...</p>
    </div>

    <form v-else @submit.prevent="submitProduct" class="grid grid-cols-1 lg:grid-cols-3 gap-10">
      
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

            <div>
              <label class="label-style">Gambar Produk (Utama)</label>
              <div v-if="existingProductImage" class="mb-4">
                <img :src="existingProductImage" alt="Produk" class="w-24 h-24 object-cover rounded-xl border border-slate-200">
                <p class="text-[10px] text-slate-400 mt-1 italic">Gambar saat ini. Unggah gambar baru untuk menggantinya.</p>
              </div>
              <input type="file" accept="image/*" @change="handleProductImageChange" class="w-full text-sm text-slate-500 file:mr-4 file:py-3 file:px-6 file:rounded-xl file:border-0 file:text-xs file:font-black file:bg-blue-50 file:text-blue-600 hover:file:bg-blue-100 cursor-pointer" />
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
            <div v-for="(v, index) in form.variants" :key="index" class="bg-white p-6 rounded-[2rem] border border-blue-50 relative group hover:shadow-md transition-shadow">
              
              <!-- Badge untuk menandakan ini varian baru atau lama -->
              <div class="absolute -top-3 -right-3">
                <span v-if="v.id" class="px-3 py-1 bg-slate-100 text-slate-500 text-[9px] font-black uppercase rounded-full shadow-sm border border-slate-200">ID: {{ v.id }}</span>
                <span v-else class="px-3 py-1 bg-green-100 text-green-600 text-[9px] font-black uppercase rounded-full shadow-sm border border-green-200">Baru</span>
              </div>

              <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4 items-end mt-2">
                <div class="lg:col-span-2">
                  <label class="text-[9px] font-black text-blue-300 uppercase mb-2 block tracking-widest">SKU Otomatis</label>
                  <input v-model="v.sku" readonly placeholder="Generating..." class="w-full bg-blue-50/50 border-0 p-4 rounded-2xl text-[11px] font-black text-blue-600 outline-none cursor-not-allowed italic">
                </div>

                <div>
                  <label class="text-[9px] font-black text-slate-400 uppercase mb-2 block tracking-widest">Warna</label>
                  <input v-model="v.color" @input="generateSKU(v)" type="text" placeholder="Ex: White" class="w-full bg-slate-50 border-0 p-4 rounded-2xl text-xs font-bold outline-none focus:ring-2 ring-blue-100" required>
                </div>
                <div>
                  <label class="text-[9px] font-black text-slate-400 uppercase mb-2 block tracking-widest">Ukuran</label>
                  <input v-model="v.size" @input="generateSKU(v)" type="text" placeholder="Ex: 42" class="w-full bg-slate-50 border-0 p-4 rounded-2xl text-xs font-bold outline-none focus:ring-2 ring-blue-100" required>
                </div>
                <div>
                  <label class="text-[9px] font-black text-slate-400 uppercase mb-2 block tracking-widest">Harga</label>
                  <input v-model.number="v.price" type="number" placeholder="0" class="w-full bg-slate-50 border-0 p-4 rounded-2xl text-xs font-bold outline-none focus:ring-2 ring-blue-100" required>
                </div>
                <div>
                  <label class="text-[9px] font-black text-slate-400 uppercase mb-2 block tracking-widest">Stok</label>
                  <input v-model.number="v.stock" type="number" placeholder="0" class="w-full bg-slate-50 border-0 p-4 rounded-2xl text-xs font-bold outline-none focus:ring-2 ring-blue-100" required>
                </div>
              </div>

              <div class="mt-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-t border-blue-50 pt-4">
                <div class="w-full max-w-sm">
                  <label class="text-[9px] font-black text-slate-400 uppercase mb-2 block tracking-widest">Gambar Varian</label>
                  <div v-if="v.existingImage" class="mb-2 flex items-center gap-3">
                    <img :src="v.existingImage" class="w-12 h-12 object-cover rounded-lg border border-slate-200">
                    <span class="text-[9px] text-slate-400 italic">Gambar lama tersimpan</span>
                  </div>
                  <input type="file" accept="image/*" @change="e => handleVariantImageChange(e, v)" class="w-full text-xs text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-[10px] file:font-black file:bg-blue-50 file:text-blue-600 hover:file:bg-blue-100 cursor-pointer" />
                </div>

                <button v-if="form.variants.length > 1" @click="removeVariant(index)" type="button" class="p-3 text-[10px] font-black uppercase tracking-widest text-red-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all self-end md:self-auto">
                  🗑 Hapus Varian
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="space-y-6">
        <div class="bg-white p-8 rounded-[3rem] shadow-2xl shadow-slate-200 border border-blue-50 sticky top-10">
          <h4 class="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] mb-8 text-center">Status Publikasi</h4>
          
          <div class="space-y-4 mb-8">
            <div class="flex items-center justify-between p-4 bg-blue-50 rounded-3xl border border-blue-100">
              <span class="text-[10px] font-black text-blue-700 uppercase italic">Update Katalog</span>
              <div class="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
            </div>
            <p class="text-[10px] text-slate-400 text-center leading-relaxed">
              Varian yang Anda hapus akan benar-benar dibuang dari sistem setelah Anda menekan tombol "Simpan Perubahan".
            </p>
          </div>

          <button type="submit" :disabled="submitting" class="w-full bg-slate-800 text-white py-6 rounded-[2rem] font-black shadow-xl hover:bg-slate-900 transition-all tracking-[0.2em] active:scale-95 disabled:opacity-50">
            {{ submitting ? 'MENYIMPAN...' : 'SIMPAN PERUBAHAN' }}
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
import { useRouter, useRoute } from 'vue-router';
import { sellerFeaturesService } from '../../services/sellerFeatures';
import { productService } from '../../services/product';
import Swal from 'sweetalert2';

const router = useRouter();
const route = useRoute();
const productId = route.params.id;

const loadingProduct = ref(true);
const submitting = ref(false);
const categories = ref([]);

// State for deletion tracking
const deletedVariantIds = ref([]);

// Existing images
const existingProductImage = ref(null);

// Form Data sesuai skema backend
const form = ref({
  name: '',
  description: '',
  categoryId: '',
  imageFile: null,
  variants: []
});

// 1. Fetch data Categories & Product
const fetchInitialData = async () => {
  loadingProduct.value = true;
  try {
    // Parallel fetch
    const [catData, prodData] = await Promise.all([
      sellerFeaturesService.getCategories(),
      productService.getProductById(productId)
    ]);
    
    categories.value = catData;

    // Populate form data
    form.value.name = prodData.name;
    form.value.description = prodData.description || '';
    form.value.categoryId = prodData.category_id || (prodData.category ? prodData.category.id : '');
    
    if (prodData.images && prodData.images.length > 0) {
      existingProductImage.value = prodData.images[0].image_url || prodData.images[0].imageUrl;
    }

    if (prodData.variants && prodData.variants.length > 0) {
      form.value.variants = prodData.variants.map(v => {
        let vImg = null;
        if (v.images && v.images.length > 0) {
          vImg = v.images[0].image_url || v.images[0].imageUrl;
        }
        return {
          id: v.id, // ID marks it as existing
          sku: v.sku,
          color: v.color === '-' ? '' : v.color,
          size: v.size === '-' ? '' : v.size,
          price: v.price,
          stock: v.stock,
          imageFile: null,
          existingImage: vImg
        };
      });
    } else {
      // Fallback if no variants
      addVariant();
    }
    
  } catch (error) {
    console.error("Gagal load product:", error);
    Swal.fire('Error', 'Gagal memuat data produk', 'error');
    router.push('/admin/products');
  } finally {
    loadingProduct.value = false;
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

  // Only auto-generate SKU if it's a new variant, OR if you want to allow overwriting existing SKU
  variant.sku = `${brandCode}-${catCode}-${nameCode}-${colorCode}${sizeCode}`;
};

// Update semua SKU jika data utama (Nama/Brand/Cat) berubah
const updateAllSKU = () => {
  form.value.variants.forEach(v => generateSKU(v));
};

// 3. Form Handling
const addVariant = () => {
  const newVariant = { id: null, sku: '', color: '', size: '', price: 0, stock: 0, imageFile: null, existingImage: null };
  form.value.variants.push(newVariant);
  generateSKU(newVariant);
};

const removeVariant = (index) => {
  const v = form.value.variants[index];
  if (v.id) {
    // If it has an ID, it means it's an existing variant that must be deleted via API
    deletedVariantIds.value.push(v.id);
  }
  form.value.variants.splice(index, 1);
};

const handleProductImageChange = (event) => {
  form.value.imageFile = event.target.files[0];
};

const handleVariantImageChange = (event, variant) => {
  variant.imageFile = event.target.files[0];
};

const submitProduct = async () => {
  submitting.value = true;
  try {
    const payload = {
      category_id: Number(form.value.categoryId),
      name: form.value.name,
      description: form.value.description
    };
    
    // 1. Update main product
    await sellerFeaturesService.updateProduct(productId, payload);
    
    // 2. Upload new product image if exists
    if (form.value.imageFile) {
      await sellerFeaturesService.uploadProductImage(productId, form.value.imageFile);
    }
    
    // 3. Delete removed variants
    for (const deletedId of deletedVariantIds.value) {
      try {
        await sellerFeaturesService.deleteVariant(deletedId);
      } catch (err) {
        console.warn(`Failed to delete variant ${deletedId}`, err);
      }
    }
    
    // 4. Update existing variants / Create new variants
    for (const v of form.value.variants) {
      if (!v.sku || !v.price) continue;
      
      const variantPayload = {
        sku: v.sku,
        color: v.color || '-',
        size: v.size || '-',
        price: Number(v.price),
        stock: Number(v.stock) || 0
      };

      let currentVariantId = v.id;

      if (v.id) {
        // Update existing variant
        await sellerFeaturesService.updateVariant(v.id, variantPayload);
      } else {
        // Create new variant
        const newVariant = await sellerFeaturesService.addVariant(productId, variantPayload);
        currentVariantId = newVariant.id;
      }
      
      // Upload variant image if a new file was selected
      if (v.imageFile && currentVariantId) {
        await sellerFeaturesService.uploadVariantImage(currentVariantId, v.imageFile);
      }
    }
    
    await Swal.fire({
      title: 'BERHASIL DIPERBARUI!',
      text: 'Perubahan produk telah disimpan ke sistem Cloudmart.',
      icon: 'success',
      confirmButtonColor: '#1e293b',
      borderRadius: '40px',
      customClass: { title: 'font-black italic text-slate-800' }
    });
    
    router.push('/admin/products');
  } catch (error) {
    Swal.fire({
      title: 'OPS!',
      text: error.message || 'Gagal menyimpan perubahan produk.',
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
