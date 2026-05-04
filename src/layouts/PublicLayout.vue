<template>
  <div class="min-h-screen bg-white flex flex-col">
    <BuyerNavbar />
    <main class="flex-1">
      <router-view />
    </main>
    <BuyerFooter />
  </div>
</template>

<script setup>
import BuyerNavbar from '../components/buyer/Navbar.vue'
import BuyerFooter from '../components/buyer/Footer.vue'
</script>
