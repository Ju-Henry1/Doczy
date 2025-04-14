<!-- components/Footer.vue -->
<template>
    <footer class="bg-white border-t py-8 text-sm text-gray-500 px-6">
      <div class="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
        <p>&copy; {{ new Date().getFullYear() }} Doczy. Tous droits réservés.</p>
        <div class="flex gap-6">
          <NuxtLink to="/docs" class="hover:text-blue-600">Documentation</NuxtLink>
          <NuxtLink to="/contact" class="hover:text-blue-600">Contact</NuxtLink>
          <NuxtLink to="/mentions-legales" class="hover:text-blue-600">Mentions légales</NuxtLink>
        </div>
      </div>
    </footer>
  </template>
  
  <script setup>
  // Rien à déclarer ici
  </script>
  