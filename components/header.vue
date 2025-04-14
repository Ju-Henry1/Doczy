<template>
  <header class="bg-white shadow-sm border-b sticky top-0 z-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center h-16">
        <!-- Logo -->
        <NuxtLink to="/" class="text-xl font-bold text-blue-700 hover:text-blue-800">
          Doczy
        </NuxtLink>

        <!-- Navigation -->
        <nav class="flex items-center gap-6 text-sm font-medium text-gray-700">
          <NuxtLink to="/" class="hover:text-blue-700">Accueil</NuxtLink>
          <NuxtLink to="/docs" class="hover:text-blue-700">Documentation</NuxtLink>
          <NuxtLink to="/outils" class="hover:text-blue-700">Les Outils</NuxtLink>
          <NuxtLink to="/contact" class="hover:text-blue-700">Contact</NuxtLink>
        </nav>
      </div>
    </div>
  </header>
</template>

<script setup>
// Rien à déclarer ici pour l'instant
</script>

<style scoped>
/* Tu peux personnaliser si tu veux plus de style responsive */
</style>
