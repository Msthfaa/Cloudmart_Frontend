<template>
  <div class="min-h-screen bg-white">
    <Navbar /> 
    
    <main>
      <router-view /> 
    </main>
    
    </div>
</template>

<script setup>
import Navbar from './components/admin/Navbar.vue'
</script>