<template>
  <div class="bg-white min-h-screen">
    <!-- Contenu sans barre latérale -->
    <main ref="pdfContent" class="px-6 py-12 max-w-5xl mx-auto space-y-20">
      <header>
        <h1 class="text-4xl font-bold text-blue-800 mb-4">📚 Documentation de Doczy</h1>
        <p class="text-gray-700 text-lg max-w-3xl">
          Retrouvez ici toutes les informations pour comprendre, utiliser et exploiter au mieux les outils proposés par Doczy.
        </p>
      </header>

      <section id="start" class="scroll-mt-28">
        <h2 class="text-2xl font-semibold text-gray-800 mb-4">🧭 Guide de démarrage rapide</h2>
        <p class="text-gray-600 text-sm">
          1. Allez dans la rubrique <NuxtLink to="/outils" class="text-blue-600 hover:underline">Mes outils</NuxtLink><br />
          2. Sélectionnez un type de document (facture, devis, etc.)<br />
          3. Remplissez le formulaire<br />
          4. Cliquez sur "Aperçu PDF" ou "Télécharger"
        </p>
      </section>

      <section id="types" class="scroll-mt-28">
        <h2 class="text-2xl font-semibold text-gray-800 mb-4">📄 Types de documents disponibles</h2>
        <ul class="list-disc pl-5 space-y-1 text-gray-600 text-sm">
          <li><strong>Facture :</strong> Pour facturer une prestation ou un produit</li>
          <li><strong>Devis :</strong> Pour envoyer une proposition commerciale</li>
          <li><strong>Fiche de paie :</strong> Pour générer des bulletins de salaire</li>
          <li><strong>Reçu :</strong> Pour confirmer un paiement effectué</li>
          <li><strong>Contrat :</strong> Pour formaliser une mission ou prestation</li>
        </ul>
      </section>

      <section id="privacy" class="scroll-mt-28">
        <h2 class="text-2xl font-semibold text-gray-800 mb-4">🔒 Sécurité & Confidentialité</h2>
        <p class="text-gray-600 text-sm">
          Vos données ne sont jamais envoyées sur un serveur. Doczy fonctionne en local dans votre navigateur. Aucune inscription ou sauvegarde distante n'est requise.
        </p>
      </section>

      <section id="faq" class="scroll-mt-28">
        <h2 class="text-2xl font-semibold text-gray-800 mb-4">❓ Questions fréquentes</h2>
        <div class="space-y-4">
          <details class="bg-gray-50 border rounded-md p-4 group">
            <summary class="cursor-pointer font-medium text-blue-700 flex items-center justify-between">
              <span>Puis-je modifier mes documents après génération ?</span>
              <span class="text-gray-400 group-open:rotate-180 transition-transform">▼</span>
            </summary>
            <p class="text-gray-600 text-sm mt-2">Oui, il vous suffit de revenir sur la page de l’outil, ajuster les champs puis régénérer le PDF.</p>
          </details>
          <details class="bg-gray-50 border rounded-md p-4 group">
            <summary class="cursor-pointer font-medium text-blue-700 flex items-center justify-between">
              <span>Est-ce que Doczy est gratuit ?</span>
              <span class="text-gray-400 group-open:rotate-180 transition-transform">▼</span>
            </summary>
            <p class="text-gray-600 text-sm mt-2">Oui, tous les outils sont accessibles gratuitement sans création de compte.</p>
          </details>
          <details class="bg-gray-50 border rounded-md p-4 group">
            <summary class="cursor-pointer font-medium text-blue-700 flex items-center justify-between">
              <span>Mes documents sont-ils sauvegardés ?</span>
              <span class="text-gray-400 group-open:rotate-180 transition-transform">▼</span>
            </summary>
            <p class="text-gray-600 text-sm mt-2">Non. Tout est effacé lorsque vous quittez la page. Pour garder une trace, téléchargez vos PDF.</p>
          </details>
        </div>
      </section>

      <section id="contact" class="scroll-mt-28">
        <h2 class="text-2xl font-semibold text-gray-800 mb-4">📬 Besoin d'aide ?</h2>
        <p class="text-gray-600 text-sm">
          Si vous avez un souci ou souhaitez suggérer une nouvelle fonctionnalité, contactez-nous via la page <NuxtLink to="/contact" class="text-blue-600 hover:underline">contact</NuxtLink>.
        </p>
      </section>
    </main>
  </div>
</template>
