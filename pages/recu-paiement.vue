<template>
  <div class="bg-gray-100 min-h-screen p-6 space-y-12">
    <!-- Aperçu PDF -->
    <div
      ref="pdfContent"
      class="bg-white text-sm leading-relaxed space-y-6"
      style="width: 210mm; min-height: 297mm; padding: 20mm; margin: auto;"
    >
      <h1 class="text-2xl font-bold text-center text-blue-700 uppercase">Reçu de paiement</h1>
      <p class="text-right text-sm">Date : {{ receipt.date }}</p>
      <p v-if="receipt.number" class="text-right text-sm text-gray-500">N° reçu : {{ receipt.number }}</p>

      <div class="grid grid-cols-2 gap-6 text-sm">
        <div>
          <h2 class="font-semibold mb-2">Reçu par</h2>
          <p>{{ receipt.issuerName }}</p>
          <p>{{ receipt.issuerAddress }}</p>
          <p>{{ receipt.issuerSiret }}</p>
        </div>

        <div>
          <h2 class="font-semibold mb-2">Payé par</h2>
          <p>{{ receipt.clientName }}</p>
          <p>{{ receipt.clientAddress }}</p>
        </div>
      </div>

      <div class="mt-8">
        <h2 class="font-semibold text-lg mb-2">Détails du paiement</h2>
        <table class="w-full border text-sm">
          <thead class="bg-gray-100">
            <tr>
              <th class="p-2 border">Motif</th>
              <th class="p-2 border text-right">Montant (€)</th>
              <th class="p-2 border">Mode de paiement</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(line, index) in receipt.lines" :key="index">
              <td class="p-2 border">{{ line.reason }}</td>
              <td class="p-2 border text-right">{{ format(line.amount) }}</td>
              <td class="p-2 border">{{ line.method }}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="mt-8 text-sm text-gray-700">
        <p>Ce document atteste que la somme de <strong>{{ format(totalAmount) }} €</strong> a été reçue pour le(s) motif(s) indiqué(s) ci-dessus.</p>
        <p class="mt-8">Signature :</p>
        <div class="mt-6 border-t border-gray-400 w-48"></div>
      </div>
    </div>

    <!-- Formulaire -->
    <form class="max-w-2xl mx-auto bg-white p-8 shadow rounded-xl space-y-8">
      <div>
        <h2 class="text-xl font-bold mb-4">Informations du reçu</h2>
        <div class="grid grid-cols-2 gap-4">
          <input v-model="receipt.date" type="date" class="p-3 border rounded w-full" />
          <input v-model="receipt.number" placeholder="Numéro de reçu (optionnel)" class="p-3 border rounded w-full" />
        </div>

        <div class="space-y-4 mt-4">
          <div
            v-for="(line, index) in receipt.lines"
            :key="index"
            class="grid grid-cols-3 gap-4 items-center"
          >
            <input v-model="line.reason" placeholder="Motif" class="p-3 border rounded" />
            <input v-model.number="line.amount" type="number" placeholder="Montant" class="p-3 border rounded" />
            <input v-model="line.method" placeholder="Mode de paiement" class="p-3 border rounded" />
            <button
              @click.prevent="receipt.lines.splice(index, 1)"
              class="text-red-500 text-sm ml-2"
            >Supprimer</button>
          </div>
          <button
            @click.prevent="receipt.lines.push({ reason: '', amount: 0, method: '' })"
            class="text-blue-600 text-sm"
          >+ Ajouter un paiement</button>
        </div>
      </div>

      <div>
        <h2 class="text-xl font-bold mb-4">Informations du client</h2>
        <input v-model="receipt.clientName" placeholder="Nom du client" class="p-3 border rounded w-full mb-2" />
        <textarea v-model="receipt.clientAddress" rows="2" placeholder="Adresse du client" class="p-3 border rounded w-full" />
      </div>

      <div>
        <h2 class="text-xl font-bold mb-4">Informations émetteur</h2>
        <input v-model="receipt.issuerName" placeholder="Nom de l'émetteur" class="p-3 border rounded w-full mb-2" />
        <input v-model="receipt.issuerSiret" placeholder="SIRET / TVA" class="p-3 border rounded w-full mb-2" />
        <textarea v-model="receipt.issuerAddress" rows="2" placeholder="Adresse de l'émetteur" class="p-3 border rounded w-full" />
      </div>

      <div class="flex justify-end gap-4 pt-6 border-t">
        <button @click.prevent="generatePDF('preview')" type="button" class="bg-gray-300 px-6 py-3 rounded hover:bg-gray-400">👁️ Aperçu PDF</button>
        <button @click.prevent="generatePDF('download')" type="button" class="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700">⬇️ Télécharger</button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'

const pdfContent = ref(null)

const receipt = ref({
  date: new Date().toISOString().substring(0, 10),
  number: '',
  lines: [
    {
      reason: 'Paiement prestation freelance - développement web',
      amount: 120.0,
      method: 'Virement bancaire'
    }
  ],
  clientName: 'Client Société SARL',
  clientAddress: '45 rue du Client\n75000 Paris',
  issuerName: 'Doczy SAS',
  issuerSiret: 'SIRET : 123 456 789 00010',
  issuerAddress: '99 avenue des Projets\n75001 Paris'
})

const format = (val) => Number(val).toFixed(2)

const totalAmount = computed(() => {
  return receipt.value.lines.reduce((sum, l) => sum + l.amount, 0)
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
    window.open(url)
  } else {
    pdf.save(`recu-${receipt.value.clientName}.pdf`)
  }
}
</script>
