<template>
  <nav class="h-20 bg-white/80 backdrop-blur-md border-b border-gray-200 fixed top-0 right-0 left-64 z-10 px-8 flex items-center justify-between">
    <div class="flex items-center space-x-4">
      <h2 class="text-xl font-bold text-gray-800">Ringkasan Studio</h2>
    </div>
    
    <div class="flex items-center space-x-6">
      <button class="relative p-2 text-gray-400 hover:text-gray-600">
        <span class="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full"></span>
        🔔
      </button>
      <div class="flex items-center space-x-3 pl-4 border-l">
        <div class="text-right">
          <p class="text-sm font-bold text-gray-800">Musthofa Agung</p>
          <p class="text-xs text-green-500 font-medium">Premium Merchant</p>
        </div>
        <div class="w-10 h-10 bg-gradient-to-tr from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white font-bold">
          M
        </div>
      </div>
    </div>
  </nav>
</template>