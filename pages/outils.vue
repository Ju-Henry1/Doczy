<template>
  <div class="min-h-screen bg-gray-50 py-12 px-6">
    <div class="max-w-6xl mx-auto">
      <h1 class="text-3xl font-bold mb-10 text-center text-gray-800">📂 Tous les outils Doczy</h1>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <!-- Carte : Facture -->
        <div class="bg-white rounded-2xl shadow border p-6 flex flex-col justify-between hover:shadow-md transition">
          <div>
            <h2 class="text-xl font-semibold text-blue-700 mb-2">🧾 Créer une facture</h2>
            <p class="text-gray-600 text-sm">Générez une facture professionnelle avec vos informations personnalisées.</p>
          </div>
          <NuxtLink to="/facture" class="mt-4 inline-block text-blue-600 hover:underline text-sm font-medium">
            ➡️ Accéder à l'outil
          </NuxtLink>
        </div>

        <!-- Carte : Devis -->
        <div class="bg-white rounded-2xl shadow border p-6 flex flex-col justify-between hover:shadow-md transition">
          <div>
            <h2 class="text-xl font-semibold text-blue-700 mb-2">📝 Créer un devis</h2>
            <p class="text-gray-600 text-sm">Éditez rapidement un devis à envoyer à vos clients ou prospects.</p>
          </div>
          <NuxtLink to="/devis" class="mt-4 inline-block text-blue-600 hover:underline text-sm font-medium">
            ➡️ Accéder à l'outil
          </NuxtLink>
        </div>

        <!-- Carte : Reçu de paiement -->
        <div class="bg-white rounded-2xl shadow border p-6 flex flex-col justify-between hover:shadow-md transition">
          <div>
            <h2 class="text-xl font-semibold text-blue-700 mb-2">💵 Générer un reçu de paiement</h2>
            <p class="text-gray-600 text-sm">Créez un reçu officiel pour confirmer un règlement reçu par un client.</p>
          </div>
          <NuxtLink to="/recu-paiement" class="mt-4 inline-block text-blue-600 hover:underline text-sm font-medium">
            ➡️ Accéder à l'outil
          </NuxtLink>
        </div>

        <!-- Carte : Contrat de prestation -->
        <div class="bg-white rounded-2xl shadow border p-6 flex flex-col justify-between hover:shadow-md transition">
          <div>
            <h2 class="text-xl font-semibold text-blue-700 mb-2">📃 Créer un contrat de prestation</h2>
            <p class="text-gray-600 text-sm">Formalisez une mission de prestation avec un contrat clair entre les parties.</p>
          </div>
          <NuxtLink to="/contrat-prestation" class="mt-4 inline-block text-blue-600 hover:underline text-sm font-medium">
            ➡️ Accéder à l'outil
          </NuxtLink>
        </div>

        <!-- Tu peux ajouter ici plus d'outils à venir -->
      </div>
    </div>
  </div>
</template>

<script setup>
// rien à déclarer ici
</script>
