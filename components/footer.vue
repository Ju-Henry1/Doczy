<template>
  <footer class="bg-gray-100 border-t py-10 px-6 mt-16 text-sm text-gray-600">
    <div class="max-w-6xl mx-auto flex flex-col md:flex-row justify-between gap-6">
      <div>
        <h2 class="font-semibold text-gray-800 mb-2">Doczy</h2>
        <p>Générez vos documents pro en quelques clics.</p>
      </div>

      <div>
        <h3 class="font-semibold text-gray-800 mb-2">Liens utiles</h3>
        <ul class="space-y-1">
          <li><NuxtLink to="/outils" class="hover:underline text-blue-700">Outils</NuxtLink></li>
          <li><NuxtLink to="/documentation" class="hover:underline text-blue-700">Documentation</NuxtLink></li>
          <li><NuxtLink to="/contact" class="hover:underline text-blue-700">Contact</NuxtLink></li>
          <li><NuxtLink to="/mentions-legales" class="hover:underline text-blue-700">Mentions légales</NuxtLink></li>
          <li><NuxtLink to="/politique-confidentialite" class="hover:underline text-blue-700">Politique de confidentialité</NuxtLink></li>
        </ul>
      </div>

      <div>
        <p class="mt-4">&copy; {{ new Date().getFullYear() }} Doczy. Tous droits réservés.</p>
      </div>
    </div>
  </footer>
</template>

<script setup>
// Mode sombre désactivé, aucun script nécessaire
</script>

<style scoped>
/* Aucun style spécifique requis */
</style>
