<template>
    <div class="min-h-screen flex flex-col bg-gray-50">
  
      <!-- 🧭 Header -->
      <header class="bg-white shadow-md">
        <div class="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 class="text-2xl font-bold text-blue-700">🧾 FacturePro</h1>
          <nav class="space-x-4">
            <NuxtLink to="/facture" class="text-sm text-gray-700 hover:text-blue-600">Factures</NuxtLink>
            <NuxtLink to="/devis" class="text-sm text-gray-700 hover:text-blue-600">Devis</NuxtLink>
          </nav>
        </div>
      </header>
  
      <!-- 🚀 Hero -->
      <main class="flex-1 flex items-center justify-center text-center px-4">
        <div class="max-w-2xl">
          <h2 class="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Générez vos factures & devis <span class="text-blue-600">en quelques clics</span>
          </h2>
          <p class="text-gray-600 text-lg mb-8">
            Une solution simple, rapide et gratuite pour créer vos documents professionnels en ligne.
          </p>
          <div class="flex flex-col sm:flex-row justify-center gap-4">
            <NuxtLink to="/facture" class="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition">
              ➕ Créer une facture
            </NuxtLink>
            <NuxtLink to="/devis" class="bg-gray-200 text-gray-800 px-6 py-3 rounded-md hover:bg-gray-300 transition">
              📝 Créer un devis
            </NuxtLink>
          </div>
        </div>
      </main>
  
      <!-- 📄 Footer -->
      <footer class="bg-white border-t mt-12">
        <div class="max-w-6xl mx-auto px-4 py-6 text-center text-sm text-gray-400">
          &copy; {{ new Date().getFullYear() }} FacturePro. Fait avec 💙 en Nuxt 3.
        </div>
      </footer>
  
    </div>
  </template>
  
  <script setup>
  // rien à déclarer pour le moment
  </script>
  