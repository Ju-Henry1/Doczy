<template>
    <div class="flex bg-white min-h-screen">
      <!-- Table des matières -->
      <aside class="hidden lg:block w-1/4 bg-gray-50 border-r px-6 py-10 fixed top-[80px] left-0 h-[calc(100vh-80px)] overflow-y-auto z-10">
        <nav class="space-y-4 text-sm sticky">
          <h2 class="text-xs uppercase tracking-wide text-gray-500 font-semibold mb-2">Navigation</h2>
          <ul class="space-y-2">
            <li><a href="#start" class="text-blue-700 hover:underline">Guide de démarrage</a></li>
            <li><a href="#types" class="text-blue-700 hover:underline">Types de documents</a></li>
            <li><a href="#privacy" class="text-blue-700 hover:underline">Confidentialité</a></li>
            <li><a href="#faq" class="text-blue-700 hover:underline">Questions fréquentes</a></li>
            <li><a href="#contact" class="text-blue-700 hover:underline">Contact</a></li>
          </ul>
          <div class="mt-8">
            <button @click="downloadPDF" class="bg-blue-600 text-white px-4 py-2 rounded text-sm hover:bg-blue-700 w-full">
              📄 Télécharger en PDF
            </button>
          </div>
        </nav>
      </aside>
  
      <!-- Contenu -->
      <main ref="pdfContent" class="lg:ml-[25%] px-6 py-12 max-w-5xl mx-auto space-y-20">
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
  
  <script setup>
  import { ref, onMounted } from 'vue'
  
  const pdfContent = ref(null)
  let jsPDF, html2canvas
  
  onMounted(async () => {
    jsPDF = (await import('jspdf')).default
    html2canvas = (await import('html2canvas')).default
  })
  
  const downloadPDF = async () => {
    if (!pdfContent.value) return
    const canvas = await html2canvas(pdfContent.value, { scale: 2, useCORS: true })
    const imgData = canvas.toDataURL('image/png')
    const pdf = new jsPDF('p', 'mm', 'a4')
    const pageWidth = pdf.internal.pageSize.getWidth()
    const imgHeight = (canvas.height * pageWidth) / canvas.width
    pdf.addImage(imgData, 'PNG', 0, 0, pageWidth, imgHeight)
    pdf.save('documentation-doczy.pdf')
  }
  </script>
  
  <style scoped>
  .group summary span:last-child {
    transition: transform 0.2s;
  }
  .group[open] summary span:last-child {
    transform: rotate(180deg);
  }
  summary::-webkit-details-marker {
    display: none;
  }
  summary {
    list-style: none;
    outline: none;
  }
  html {
    scroll-behavior: smooth;
  }
  </style>
  