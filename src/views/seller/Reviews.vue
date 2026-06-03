<template>
  <div>
    <!-- Header Section -->
    <div class="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
      <div>
        <h1 class="text-3xl font-black text-gray-800 tracking-tight">Ulasan Pembeli</h1>
        <p class="text-gray-500 mt-1">Pantau dan berikan tanggapan untuk ulasan produk Anda</p>
      </div>
    </div>

    <!-- Data Table -->
    <div class="bg-white rounded-3xl shadow-sm border border-blue-50 overflow-hidden">
      <div class="overflow-x-auto">
        <table class="w-full text-left border-collapse">
          <thead>
            <tr class="bg-slate-50/50 border-b border-gray-100">
              <th class="p-5 font-bold text-gray-600 text-sm w-1/4">Produk & Pembeli</th>
              <th class="p-5 font-bold text-gray-600 text-sm w-1/12 text-center">Rating</th>
              <th class="p-5 font-bold text-gray-600 text-sm w-1/3">Ulasan & Media</th>
              <th class="p-5 font-bold text-gray-600 text-sm w-1/4">Tanggapan Anda</th>
              <th class="p-5 font-bold text-gray-600 text-sm text-right">Aksi</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-50">
            <tr v-if="loading" class="animate-pulse">
              <td colspan="5" class="p-5 text-center text-gray-400">Memuat data...</td>
            </tr>
            <tr v-else-if="reviews.length === 0">
              <td colspan="5" class="p-10 text-center text-gray-400">
                <span class="text-4xl mb-3 block">💬</span>
                Belum ada ulasan pembeli.
              </td>
            </tr>
            <tr v-else v-for="review in reviews" :key="review.id" class="hover:bg-blue-50/20 transition-colors">
              <td class="p-5 align-top">
                <p class="font-bold text-gray-800 text-sm line-clamp-2">{{ review.order_item?.name || 'Produk' }}</p>
                <p class="text-[11px] text-gray-500 mt-0.5 mb-2">Varian: {{ review.order_item?.variant_name || '-' }}</p>
                <div class="flex items-center gap-2 mt-2">
                  <div class="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 text-[10px] font-black uppercase">
                    {{ review.user?.name ? review.user.name[0] : 'U' }}
                  </div>
                  <div>
                    <p class="text-xs font-bold text-gray-700">{{ review.user?.name || 'User' }}</p>
                    <p class="text-[10px] text-gray-400">{{ formatDate(review.created_at) }}</p>
                  </div>
                </div>
              </td>
              <td class="p-5 align-top text-center text-yellow-400">
                <div class="flex flex-col items-center">
                  <span class="text-lg font-black text-gray-900 mb-1">{{ review.rating }}</span>
                  <div class="flex">
                    <span v-for="i in 5" :key="i" class="text-xs">{{ i <= review.rating ? '★' : '☆' }}</span>
                  </div>
                </div>
              </td>
              <td class="p-5 align-top">
                <p class="text-sm text-gray-600 mb-3">{{ review.comment || '-' }}</p>
                
                <!-- Media -->
                <div v-if="(review.images && review.images.length > 0) || review.video_url" class="flex flex-wrap gap-2 mt-2">
                  <!-- Video -->
                  <a v-if="review.video_url" :href="review.video_url" target="_blank" class="w-12 h-12 bg-gray-100 rounded border border-gray-200 flex items-center justify-center relative hover:opacity-80 transition">
                    <div class="absolute inset-0 bg-black/40 flex items-center justify-center rounded">
                      <svg class="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20"><path d="M4 4l12 6-12 6z"></path></svg>
                    </div>
                  </a>
                  <!-- Images -->
                  <a v-for="img in review.images" :key="img.id" :href="img.image_url" target="_blank" class="w-12 h-12 bg-gray-100 rounded border border-gray-200 block hover:opacity-80 transition">
                    <img :src="img.image_url" class="w-full h-full object-cover rounded" />
                  </a>
                </div>
              </td>
              <td class="p-5 align-top">
                <div v-if="review.reply">
                  <p class="text-sm text-gray-600 bg-gray-50 p-3 rounded-lg border-l-2 border-blue-500">{{ review.reply }}</p>
                  <p class="text-[10px] text-gray-400 mt-1">{{ formatDate(review.reply_created_at) }}</p>
                </div>
                <div v-else>
                  <span class="inline-block px-2.5 py-1 bg-yellow-100 text-yellow-700 text-[10px] font-bold rounded uppercase tracking-wider">Belum Dibalas</span>
                </div>
              </td>
              <td class="p-5 align-top text-right space-x-2">
                <button 
                  v-if="!review.reply"
                  @click="openReplyModal(review)" 
                  class="px-4 py-2 bg-blue-50 text-blue-600 hover:bg-blue-600 hover:text-white rounded-lg text-xs font-bold transition-colors"
                >
                  Balas
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Modal Reply -->
    <div v-if="showModal" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/50 backdrop-blur-sm">
      <div class="bg-white rounded-3xl w-full max-w-lg shadow-2xl overflow-hidden flex flex-col">
        <div class="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
          <h3 class="font-bold text-gray-800 text-lg">Balas Ulasan</h3>
          <button @click="showModal = false" class="text-gray-400 hover:text-red-500 transition-colors">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
          </button>
        </div>
        
        <div class="p-6">
          <div class="mb-5 bg-gray-50 p-4 rounded-xl border border-gray-100">
            <div class="flex items-center gap-2 mb-2">
               <span class="text-yellow-400 text-xs">
                 <span v-for="i in 5" :key="i">{{ i <= selectedReview.rating ? '★' : '☆' }}</span>
               </span>
               <span class="text-xs font-bold text-gray-700">{{ selectedReview.user?.name || 'User' }}</span>
            </div>
            <p class="text-sm text-gray-600 italic">"{{ selectedReview.comment }}"</p>
          </div>

          <form @submit.prevent="submitReply">
            <div>
              <label class="block text-sm font-bold text-gray-700 mb-2">Tanggapan Anda</label>
              <textarea 
                v-model="replyText" 
                rows="4" 
                required 
                class="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition resize-none"
                placeholder="Terima kasih atas ulasannya kak!..."
              ></textarea>
            </div>

            <div class="pt-4 mt-4 flex justify-end gap-3">
              <button type="button" @click="showModal = false" class="px-5 py-2.5 text-sm font-bold text-gray-600 bg-gray-100 rounded-xl hover:bg-gray-200 transition">Batal</button>
              <button type="submit" :disabled="submitting || !replyText.trim()" class="px-5 py-2.5 text-sm font-bold text-white bg-blue-600 rounded-xl hover:bg-blue-700 transition shadow-lg shadow-blue-200 disabled:opacity-50">
                {{ submitting ? 'Mengirim...' : 'Kirim Balasan' }}
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
import { reviewService } from '../../services/review';
import { showToastSuccess, showToastError } from '../../services/api';

const reviews = ref([]);
const loading = ref(true);

const showModal = ref(false);
const submitting = ref(false);
const selectedReview = ref(null);
const replyText = ref('');

const fetchReviews = async () => {
  loading.value = true;
  try {
    reviews.value = await reviewService.getStoreReviews();
  } catch (error) {
    showToastError('Gagal memuat daftar ulasan');
  } finally {
    loading.value = false;
  }
};

const formatDate = (dateString) => {
  if (!dateString) return '-';
  const d = new Date(dateString);
  return new Intl.DateTimeFormat('id-ID', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' }).format(d);
};

const openReplyModal = (review) => {
  selectedReview.value = review;
  replyText.value = '';
  showModal.value = true;
};

const submitReply = async () => {
  if (!replyText.value.trim()) return;
  submitting.value = true;
  try {
    await reviewService.replyReview(selectedReview.value.id, replyText.value);
    showToastSuccess('Balasan berhasil dikirim');
    showModal.value = false;
    fetchReviews();
  } catch (error) {
    let msg = error.response?.data?.Errors || error.message || 'Gagal mengirim balasan';
    showToastError(msg);
  } finally {
    submitting.value = false;
  }
};

onMounted(() => {
  fetchReviews();
});
</script>
