<template>
  <div class="bg-gray-50 min-h-screen">
    <!-- Hero section -->
    <section class="bg-white py-24 px-6 text-center border-b">
      <div class="max-w-4xl mx-auto">
        <h1 class="text-4xl font-bold text-gray-900 mb-4">
          📄 Doczy – Générez vos documents pro en quelques clics
        </h1>
        <p class="text-gray-600 text-lg mb-8">
          Créez facilement des factures, devis, fiches de paie, contrats et plus encore, gratuitement et sans inscription.
        </p>
        <NuxtLink to="/outils" class="inline-block bg-blue-600 text-white px-6 py-3 rounded-xl shadow hover:bg-blue-700 transition">
          🚀 Commencer maintenant
        </NuxtLink>
      </div>
    </section>

    <!-- Fonctionnalités clés -->
    <section class="py-20 px-6">
      <div class="max-w-6xl mx-auto">
        <h2 class="text-3xl font-bold text-center text-gray-800 mb-12">🛠️ Nos fonctionnalités</h2>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div class="bg-white p-6 rounded-xl shadow hover:shadow-md transition">
            <h3 class="text-lg font-semibold text-blue-700 mb-2">🧾 Factures & Devis</h3>
            <p class="text-sm text-gray-600">Créez des documents professionnels pour vos clients, à envoyer en PDF en quelques secondes.</p>
          </div>
          <div class="bg-white p-6 rounded-xl shadow hover:shadow-md transition">
            <h3 class="text-lg font-semibold text-blue-700 mb-2">📑 Fiches de paie</h3>
            <p class="text-sm text-gray-600">Remplissez les infos salarié/employeur et générez une fiche de paie lisible et conforme.</p>
          </div>
          <div class="bg-white p-6 rounded-xl shadow hover:shadow-md transition">
            <h3 class="text-lg font-semibold text-blue-700 mb-2">📃 Contrats & Reçus</h3>
            <p class="text-sm text-gray-600">Contrats de prestation, attestations, reçus de paiement... tout est centralisé.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Appel à l'action -->
    <section class="bg-blue-50 py-16 px-6">
      <div class="max-w-3xl mx-auto text-center">
        <h2 class="text-2xl font-bold text-gray-800 mb-4">Générez des documents sans stress, gratuitement.</h2>
        <p class="text-gray-600 mb-6">Aucun compte requis. Vos données restent sur votre appareil.</p>
        <NuxtLink to="/outils" class="inline-block bg-blue-600 text-white px-6 py-3 rounded-xl shadow hover:bg-blue-700">
          ➕ Créer mon premier document
        </NuxtLink>
      </div>
    </section>
  </div>
</template>

<script setup>
// Aucun script nécessaire ici
</script>

<style scoped>
/* Tu peux ajouter du style personnalisé ici si besoin */
</style>
