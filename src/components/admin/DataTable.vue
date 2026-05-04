<template>
  <div class="bg-white/90 backdrop-blur-sm rounded-[2.5rem] border border-blue-100 shadow-xl shadow-blue-900/5 overflow-hidden">
    <table class="w-full text-left border-collapse">
      <thead>
        <tr class="bg-blue-50/50 border-b border-blue-100">
          <th v-for="header in headers" :key="header" class="px-8 py-5 text-[10px] uppercase font-black text-blue-400 tracking-[0.2em]">
            {{ header }}
          </th>
        </tr>
      </thead>
      <tbody class="divide-y divide-blue-50">
        <slot></slot> 
      </tbody>
    </table>

    <div class="px-8 py-5 bg-white/50 flex flex-col md:flex-row justify-between items-center border-t border-blue-50 gap-4">
      <p class="text-xs text-slate-400 font-bold uppercase tracking-wider">
        Menampilkan 
        <span class="text-blue-600">{{ from }}</span> - <span class="text-blue-600">{{ to }}</span> 
        dari <span class="text-slate-800 font-black">{{ total }}</span> Data
      </p>

      <div class="flex items-center space-x-2">
        <button 
          @click="$emit('page-change', currentPage - 1)"
          :disabled="currentPage <= 1"
          class="p-2 border border-blue-100 rounded-xl hover:bg-blue-600 hover:text-white text-blue-600 disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-blue-600 transition-all cursor-pointer"
        > 
          &lt; 
        </button>

        <div class="flex items-center space-x-1">
          <button 
            v-for="page in totalPages" 
            :key="page"
            @click="$emit('page-change', page)"
            :class="page === currentPage 
              ? 'bg-blue-600 text-white shadow-lg shadow-blue-200' 
              : 'text-slate-400 hover:bg-blue-50'"
            class="w-10 h-10 rounded-xl font-black text-xs transition-all cursor-pointer"
          >
            {{ page }}
          </button>
        </div>

        <button 
          @click="$emit('page-change', currentPage + 1)"
          :disabled="currentPage >= totalPages"
          class="p-2 border border-blue-100 rounded-xl hover:bg-blue-600 hover:text-white text-blue-600 disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-blue-600 transition-all cursor-pointer"
        > 
          &gt; 
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  headers: Array,
  total: { type: Number, default: 0 },
  perPage: { type: Number, default: 10 },
  currentPage: { type: Number, default: 1 }
});

// Emit untuk memberi tahu parent jika halaman berubah
defineEmits(['page-change']);

// Hitung rentang data yang ditampilkan (Pagination Info)
const from = computed(() => ((props.currentPage - 1) * props.perPage) + 1);
const to = computed(() => Math.min(props.currentPage * props.perPage, props.total));

// Hitung total halaman (Maksimal 5 tombol saja agar tidak kepanjangan)
const totalPages = computed(() => Math.ceil(props.total / props.perPage));
</script>