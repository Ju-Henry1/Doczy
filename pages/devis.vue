<template>
  <div class="bg-gray-100 min-h-screen p-6 space-y-12">
    <!-- Aperçu PDF -->
    <div
      ref="pdfContent"
      class="bg-white text-sm leading-relaxed space-y-6"
      style="width: 210mm; min-height: 297mm; padding: 20mm; margin: auto;"
    >
      <!-- En-tête PRO -->
      <div class="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-6 text-sm">
        <!-- Émetteur -->
        <div class="w-full md:w-1/3">
          <h2 class="uppercase text-xs font-semibold text-gray-500 tracking-wide mb-2">Émetteur</h2>
          <div class="text-gray-800 leading-relaxed text-sm">
            <p class="font-semibold">{{ devis.vendorName }}</p>
            <p class="whitespace-pre-line">{{ devis.vendorAddress }}</p>
            <p>{{ devis.vendorSiret }}</p>
            <p>{{ devis.vendorEmail }}</p>
            <p>{{ devis.vendorPhone }}</p>
          </div>
        </div>

        <!-- Bloc Devis -->
        <div class="w-full md:w-1/3 text-center bg-gray-50 border border-gray-200 rounded-md py-4">
          <h1 class="text-xl font-bold text-gray-800 uppercase">Devis</h1>
          <p class="text-sm text-gray-500 mt-1">N° {{ devis.number }}</p>
          <p class="text-sm text-gray-500">Date : {{ devis.date }}</p>
        </div>

        <!-- Client -->
        <div class="w-full md:w-1/3 text-right">
          <h2 class="uppercase text-xs font-semibold text-gray-500 tracking-wide mb-2">Destinataire</h2>
          <div class="text-gray-800 leading-relaxed text-sm">
            <p class="font-semibold">{{ devis.clientName }}</p>
            <p class="whitespace-pre-line">{{ devis.clientAddress }}</p>
            <p>{{ devis.clientEmail }}</p>
            <p>{{ devis.clientPhone }}</p>
          </div>
        </div>
      </div>

      <!-- Détails devis -->
      <div>
        <h2 class="text-lg font-semibold text-gray-800 mb-2">Détails du devis</h2>
        <table class="w-full border text-sm">
          <thead class="bg-gray-100">
            <tr>
              <th class="p-2 border">Prestation</th>
              <th class="p-2 border text-right">Qté</th>
              <th class="p-2 border text-right">Prix unitaire</th>
              <th class="p-2 border text-right">Total</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in devis.items" :key="index">
              <td class="p-2 border">{{ item.description }}</td>
              <td class="p-2 border text-right">{{ item.qty }}</td>
              <td class="p-2 border text-right">{{ formatNumber(item.price) }} €</td>
              <td class="p-2 border text-right">{{ formatNumber(item.qty * item.price) }} €</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="text-right text-lg font-semibold mt-4">
        Total estimé : {{ total }} €
      </div>

      <div class="text-xs text-gray-500 border-t pt-4 whitespace-pre-line">
        {{ devis.footer }}
      </div>
    </div>

    <!-- Formulaire -->
    <form class="max-w-4xl mx-auto bg-white p-12 shadow rounded-2xl space-y-16">
      <section class="space-y-6">
        <h2 class="text-2xl font-bold text-gray-800">🏢 Émetteur (vous)</h2>
        <div class="grid grid-cols-2 gap-6">
          <div>
            <label class="text-xs text-gray-500">Nom de l'entreprise émettrice</label>
            <input v-model="devis.vendorName" class="p-4 border rounded-xl w-full" />
          </div>
          <div>
            <label class="text-xs text-gray-500">Numéro de SIRET ou TVA</label>
            <input v-model="devis.vendorSiret" class="p-4 border rounded-xl w-full" />
          </div>
          <div>
            <label class="text-xs text-gray-500">Adresse email de contact</label>
            <input v-model="devis.vendorEmail" class="p-4 border rounded-xl w-full" />
          </div>
          <div>
            <label class="text-xs text-gray-500">Numéro de téléphone</label>
            <input v-model="devis.vendorPhone" class="p-4 border rounded-xl w-full" />
          </div>
          <div class="col-span-2">
            <label class="text-xs text-gray-500">Adresse postale complète</label>
            <textarea v-model="devis.vendorAddress" rows="2" class="p-4 border rounded-xl w-full" />
          </div>
        </div>
      </section>

      <section class="space-y-6">
        <h2 class="text-2xl font-bold text-gray-800">👤 Destinataire (client)</h2>
        <div class="grid grid-cols-2 gap-6">
          <div>
            <label class="text-xs text-gray-500">Nom du client ou de l'entreprise</label>
            <input v-model="devis.clientName" class="p-4 border rounded-xl w-full" />
          </div>
          <div>
            <label class="text-xs text-gray-500">Adresse email du client</label>
            <input v-model="devis.clientEmail" class="p-4 border rounded-xl w-full" />
          </div>
          <div>
            <label class="text-xs text-gray-500">Numéro de téléphone du client</label>
            <input v-model="devis.clientPhone" class="p-4 border rounded-xl w-full" />
          </div>
          <div class="col-span-2">
            <label class="text-xs text-gray-500">Adresse du client</label>
            <textarea v-model="devis.clientAddress" rows="2" class="p-4 border rounded-xl w-full" />
          </div>
        </div>
      </section>

      <section class="space-y-6">
        <h2 class="text-2xl font-bold text-gray-800">🗓️ Référence du devis</h2>
        <div class="grid grid-cols-2 gap-6">
          <div>
            <label class="text-xs text-gray-500">Numéro du devis</label>
            <input v-model="devis.number" class="p-4 border rounded-xl w-full" />
          </div>
          <div>
            <label class="text-xs text-gray-500">Date d'émission</label>
            <input v-model="devis.date" type="date" class="p-4 border rounded-xl w-full" />
          </div>
        </div>
      </section>

      <section class="space-y-6">
        <h2 class="text-2xl font-bold text-gray-800">📦 Prestations</h2>
        <div class="space-y-4">
          <div v-for="(item, index) in devis.items" :key="index" class="grid grid-cols-3 gap-4">
            <div>
              <label class="text-xs text-gray-500">Description</label>
              <input v-model="item.description" class="p-4 border rounded-xl w-full" />
            </div>
            <div>
              <label class="text-xs text-gray-500">Quantité</label>
              <input v-model.number="item.qty" type="number" class="p-4 border rounded-xl w-full" />
            </div>
            <div>
              <label class="text-xs text-gray-500">Prix unitaire (€)</label>
              <input v-model.number="item.price" type="number" class="p-4 border rounded-xl w-full" />
            </div>
          </div>
          <button @click.prevent="addItem" class="text-blue-600 hover:underline text-sm">
            + Ajouter une ligne
          </button>
        </div>
      </section>

      <section class="space-y-6">
        <h2 class="text-2xl font-bold text-gray-800">📝 Mentions légales</h2>
        <label class="text-xs text-gray-500">Texte affiché en bas du devis (validité, mode de règlement...)</label>
        <textarea v-model="devis.footer" rows="4" class="p-4 border rounded-xl w-full" />
      </section>

      <div class="flex justify-end gap-6 pt-8 border-t mt-6">
        <button
          type="button"
          @click="generatePDF('preview')"
          class="bg-gray-300 text-black px-6 py-3 rounded-lg hover:bg-gray-400"
        >
          👁️ Aperçu PDF
        </button>
        <button
          type="button"
          @click="generatePDF('download')"
          class="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
        >
          ⬇️ Télécharger
        </button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const pdfContent = ref(null)

const devis = ref({
  vendorName: 'Entreprise Générale',
  vendorAddress: '12 rue de l’Entreprise\n75000 Paris',
  vendorSiret: 'SIRET : 123 456 789 00012',
  vendorEmail: 'contact@entreprise.fr',
  vendorPhone: '01 23 45 67 89',

  clientName: 'Monsieur Jean Client',
  clientAddress: '42 avenue des Clients\n75001 Paris',
  clientEmail: 'jean.client@example.com',
  clientPhone: '06 12 34 56 78',

  number: 'DEV-2025-001',
  date: new Date().toISOString().substring(0, 10),

  items: [
    { description: 'Conseil et accompagnement', qty: 3, price: 90 },
    { description: 'Fourniture de matériel', qty: 2, price: 150 },
    { description: 'Livraison', qty: 1, price: 40 }
  ],

  footer: `Devis valable 30 jours à compter de la date d’émission.\nRèglement par virement à réception.\nTVA non applicable, art. 293 B du CGI.`
})

const addItem = () => {
  devis.value.items.push({ description: '', qty: 1, price: 0 })
}

const formatNumber = (val) => Number(val).toFixed(2)

const total = computed(() =>
  formatNumber(devis.value.items.reduce((acc, item) => acc + item.qty * item.price, 0))
)

const generatePDF = async (action) => {
  if (!pdfContent.value) return
  const jsPDF = (await import('jspdf')).default
  const html2canvas = (await import('html2canvas')).default

  const canvas = await html2canvas(pdfContent.value, {
    scale: 2,
    useCORS: true
  })

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
    pdf.save(`devis-${devis.value.number || 'doczy'}.pdf`)
  }
}
</script>
