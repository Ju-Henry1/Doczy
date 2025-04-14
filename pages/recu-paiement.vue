<template>
    <div class="bg-gray-100 min-h-screen p-6 space-y-12">
      <!-- Aperçu PDF -->
      <div
        ref="pdfContent"
        class="bg-white text-sm leading-relaxed space-y-6"
        style="width: 210mm; min-height: 297mm; padding: 20mm; margin: auto;"
      >
        <h1 class="text-2xl font-bold text-center text-green-700 uppercase mb-6">Reçu de paiement</h1>
  
        <p>Je soussigné <strong>{{ receipt.vendorName }}</strong>,</p>
        <p>ayant pour adresse :</p>
        <p>{{ receipt.vendorAddress }}</p>
  
        <p>déclare avoir reçu la somme de <strong>{{ receipt.amount }} €</strong> de la part de :</p>
        <p>
          <strong>{{ receipt.clientName }}</strong><br />
          {{ receipt.clientAddress }}
        </p>
  
        <p>Correspondant à : <strong>{{ receipt.reason }}</strong></p>
        <p>Payé le : <strong>{{ receipt.date }}</strong></p>
  
        <div class="mt-10 text-sm text-gray-500">
          <p>Fait à {{ receipt.city }}, le {{ receipt.date }}</p>
          <p class="mt-12">Signature du prestataire :</p>
          <div class="border-t border-gray-400 w-48 mt-2"></div>
        </div>
      </div>
  
      <!-- Formulaire -->
      <form class="max-w-2xl mx-auto bg-white p-10 shadow rounded-xl space-y-8">
        <h2 class="text-xl font-bold text-gray-800">🏢 Émetteur</h2>
        <input v-model="receipt.vendorName" placeholder="Nom / entreprise" class="p-3 border rounded-xl w-full" />
        <textarea v-model="receipt.vendorAddress" placeholder="Adresse complète" rows="2" class="p-3 border rounded-xl w-full" />
  
        <h2 class="text-xl font-bold text-gray-800">👤 Destinataire</h2>
        <input v-model="receipt.clientName" placeholder="Nom du client" class="p-3 border rounded-xl w-full" />
        <textarea v-model="receipt.clientAddress" placeholder="Adresse du client" rows="2" class="p-3 border rounded-xl w-full" />
  
        <h2 class="text-xl font-bold text-gray-800">💸 Détails</h2>
        <input v-model.number="receipt.amount" type="number" placeholder="Montant en €" class="p-3 border rounded-xl w-full" />
        <input v-model="receipt.reason" placeholder="Motif (ex: acompte site web)" class="p-3 border rounded-xl w-full" />
  
        <h2 class="text-xl font-bold text-gray-800">📍 Infos complémentaires</h2>
        <div class="grid grid-cols-2 gap-6">
          <input v-model="receipt.city" placeholder="Ville de signature" class="p-3 border rounded-xl" />
          <input v-model="receipt.date" type="date" class="p-3 border rounded-xl" />
        </div>
  
        <div class="flex justify-end gap-6 pt-6 border-t">
          <button @click.prevent="generatePDF('preview')" class="bg-gray-300 px-6 py-3 rounded hover:bg-gray-400">👁️ Aperçu</button>
          <button @click.prevent="generatePDF('download')" class="bg-green-600 text-white px-6 py-3 rounded hover:bg-green-700">⬇️ Télécharger</button>
        </div>
      </form>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue'
  
  const pdfContent = ref(null)
  
  const receipt = ref({
    vendorName: 'Doczy Services',
    vendorAddress: '12 avenue du Web, 75010 Paris',
    clientName: 'Jean Martin',
    clientAddress: '45 rue des clients, 69001 Lyon',
    amount: 1200,
    reason: 'Acompte pour projet site vitrine',
    city: 'Paris',
    date: new Date().toISOString().substring(0, 10),
  })
  
  let jsPDF, html2canvas
  onMounted(async () => {
    const jspdfModule = await import('jspdf')
    const html2canvasModule = await import('html2canvas')
    jsPDF = jspdfModule.default
    html2canvas = html2canvasModule.default
  })
  
  const generatePDF = async (action = 'download') => {
    if (!pdfContent.value || !jsPDF || !html2canvas) return
    const canvas = await html2canvas(pdfContent.value, { scale: 2, useCORS: true })
    const imgData = canvas.toDataURL('image/png')
    const pdf = new jsPDF('p', 'mm', 'a4')
    const pageWidth = 210
    const imgHeight = (canvas.height * pageWidth) / canvas.width
    pdf.addImage(imgData, 'PNG', 0, 0, pageWidth, imgHeight)
    if (action === 'preview') {
      const blob = pdf.output('blob')
      const url = URL.createObjectURL(blob)
      window.open(url, '_blank')
    } else {
      pdf.save(`recu-${receipt.value.clientName}.pdf`)
    }
  }
  </script>
  