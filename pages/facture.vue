<template>
    <div class="bg-gray-100 min-h-screen p-6 space-y-12">
      <!-- Zone PDF -->
      <div ref="pdfContent" class="max-w-4xl mx-auto bg-white px-10 py-12 shadow-md rounded-md">
        <div class="flex justify-between mb-10">
          <!-- Vendeur -->
          <div>
            <h2 class="text-xl font-bold uppercase">{{ invoice.vendorName }}</h2>
            <p class="text-sm text-gray-700 whitespace-pre-line">
              {{ invoice.vendorAddress }}<br />
              {{ invoice.vendorSiret }}<br />
              {{ invoice.vendorEmail }}<br />
              {{ invoice.vendorPhone }}
            </p>
          </div>
          <!-- Client -->
          <div class="text-right">
            <h2 class="text-xl font-semibold mb-2">Client</h2>
            <p class="text-sm text-gray-700 whitespace-pre-line">
              {{ invoice.clientName }}<br />
              {{ invoice.clientAddress }}<br />
              {{ invoice.clientEmail }}<br />
              {{ invoice.clientPhone }}
            </p>
          </div>
        </div>
  
        <div class="text-center mb-10">
          <h1 class="text-4xl font-bold">FACTURE</h1>
          <p class="text-gray-600">N° {{ invoice.number }} – {{ invoice.date }}</p>
        </div>
  
        <table class="w-full text-sm border-t border-b">
          <thead class="bg-gray-100">
            <tr>
              <th class="p-3 text-left">Description</th>
              <th class="p-3 text-right">Qté</th>
              <th class="p-3 text-right">Prix</th>
              <th class="p-3 text-right">Total</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in invoice.items" :key="index" class="border-t">
              <td class="p-3">{{ item.description }}</td>
              <td class="p-3 text-right">{{ item.qty }}</td>
              <td class="p-3 text-right">{{ formatNumber(item.price) }} €</td>
              <td class="p-3 text-right">{{ formatNumber(item.qty * item.price) }} €</td>
            </tr>
          </tbody>
        </table>
  
        <div class="text-right mt-8 text-lg font-semibold">
          Total à payer : {{ total }} €
        </div>
  
        <div class="text-xs text-gray-500 mt-12 border-t pt-4 whitespace-pre-line">
          {{ invoice.footer }}
        </div>
      </div>
  
      <!-- Formulaire -->
      <form class="max-w-4xl mx-auto bg-white p-8 shadow rounded-md space-y-8">
  
        <!-- Vendeur -->
        <div>
          <h2 class="text-lg font-semibold">Informations vendeur</h2>
          <div class="grid grid-cols-2 gap-4">
            <input v-model="invoice.vendorName" placeholder="Nom entreprise" class="p-2 border rounded" />
            <input v-model="invoice.vendorSiret" placeholder="SIRET / TVA" class="p-2 border rounded" />
            <input v-model="invoice.vendorEmail" placeholder="Email" class="p-2 border rounded" />
            <input v-model="invoice.vendorPhone" placeholder="Téléphone" class="p-2 border rounded" />
            <textarea v-model="invoice.vendorAddress" placeholder="Adresse" class="p-2 border rounded col-span-2" />
          </div>
        </div>
  
        <!-- Client -->
        <div>
          <h2 class="text-lg font-semibold">Informations client</h2>
          <div class="grid grid-cols-2 gap-4">
            <input v-model="invoice.clientName" placeholder="Nom client" class="p-2 border rounded" />
            <input v-model="invoice.clientEmail" placeholder="Email client" class="p-2 border rounded" />
            <input v-model="invoice.clientPhone" placeholder="Téléphone client" class="p-2 border rounded" />
            <textarea v-model="invoice.clientAddress" placeholder="Adresse client" class="p-2 border rounded col-span-2" />
          </div>
        </div>
  
        <!-- Infos facture -->
        <div class="grid grid-cols-2 gap-4">
          <input v-model="invoice.number" placeholder="Numéro facture" class="p-2 border rounded" />
          <input v-model="invoice.date" type="date" class="p-2 border rounded" />
        </div>
  
        <!-- Lignes facture -->
        <div>
          <h2 class="text-lg font-semibold">Lignes de facture</h2>
          <div class="space-y-4">
            <div v-for="(item, index) in invoice.items" :key="index" class="grid grid-cols-3 gap-2">
              <input v-model="item.description" placeholder="Description" class="p-2 border rounded" />
              <input v-model.number="item.qty" type="number" placeholder="Qté" class="p-2 border rounded" />
              <input v-model.number="item.price" type="number" placeholder="Prix unitaire" class="p-2 border rounded" />
            </div>
            <button @click.prevent="addItem" class="text-blue-600 hover:underline text-sm">+ Ajouter une ligne</button>
          </div>
        </div>
  
        <!-- Footer -->
        <div>
          <h2 class="text-lg font-semibold">Mentions (IBAN, etc.)</h2>
          <textarea v-model="invoice.footer" rows="4" class="p-2 border rounded w-full" />
        </div>
  
        <!-- Boutons -->
        <div class="flex gap-4">
          <button
            type="button"
            @click="generatePDF('preview')"
            class="bg-gray-300 text-black px-6 py-2 rounded hover:bg-gray-400"
          >
            👁️ Aperçu PDF
          </button>
          <button
            type="button"
            @click="generatePDF('download')"
            class="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
          >
            ⬇️ Télécharger PDF
          </button>
        </div>
      </form>
    </div>
  </template>
  
  <script setup>
  import { ref, computed, onMounted } from 'vue'
  
  const invoice = ref({
    vendorName: 'TON ENTREPRISE',
    vendorAddress: '123 Rue Exemple\n75000 Paris',
    vendorSiret: 'SIRET : 123 456 789 00012',
    vendorEmail: 'contact@entreprise.com',
    vendorPhone: '06 00 00 00 00',
  
    clientName: '',
    clientAddress: '',
    clientEmail: '',
    clientPhone: '',
  
    number: '',
    date: '',
  
    items: [{ description: '', qty: 1, price: 0 }],
  
    footer: `Merci pour votre confiance.
  Paiement par virement – IBAN : FR76 1234 5678 9123 4567 8901 234
  TVA non applicable, art. 293 B du CGI`
  })
  
  const addItem = () => {
    invoice.value.items.push({ description: '', qty: 1, price: 0 })
  }
  
  const formatNumber = (val) => {
    const n = Number(val)
    return isNaN(n) ? '0.00' : n.toFixed(2)
  }
  
  const total = computed(() =>
    formatNumber(
      invoice.value.items.reduce(
        (acc, item) => acc + Number(item.qty) * Number(item.price),
        0
      )
    )
  )
  
  const pdfContent = ref(null)
  
  let jsPDF
  let html2canvas
  
  onMounted(async () => {
    const jspdfModule = await import('jspdf')
    const html2canvasModule = await import('html2canvas')
    jsPDF = jspdfModule.default
    html2canvas = html2canvasModule.default
  })
  
  const generatePDF = async (action = 'download') => {
    if (!pdfContent.value || !jsPDF || !html2canvas) {
      console.error('PDF non prêt')
      return
    }
  
    try {
      const canvas = await html2canvas(pdfContent.value, { scale: 2, useCORS: true })
      const imgData = canvas.toDataURL('image/png')
      const pdf = new jsPDF('p', 'mm', 'a4')
      const pageWidth = pdf.internal.pageSize.getWidth()
      const imgHeight = (canvas.height * pageWidth) / canvas.width
  
      pdf.addImage(imgData, 'PNG', 0, 0, pageWidth, imgHeight)
  
      if (action === 'preview') {
        const blob = pdf.output('blob')
        const url = URL.createObjectURL(blob)
        window.open(url)
      } else {
        pdf.save(`facture-${invoice.value.number || 'sans-num'}.pdf`)
      }
    } catch (err) {
      console.error('Erreur PDF :', err)
    }
  }
  </script>
  