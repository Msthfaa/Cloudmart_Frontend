<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50/50">
    <Sidebar />
    <Navbar />

    <main class="ml-64 pt-24 p-8 transition-all duration-500">
      <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </main>
  </div>
</template>

<script setup>
import Sidebar from './components/Sidebar.vue'
import Navbar from './components/Navbar.vue'
</script>

<style>
.fade-enter-active, .fade-leave-active { transition: opacity 0.3s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
</style>