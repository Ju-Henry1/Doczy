<template>
  <div class="bg-gray-100 min-h-screen p-6 space-y-12">
    <!-- Aperçu PDF -->
    <div
      ref="pdfContent"
      class="bg-white text-sm leading-relaxed space-y-6"
      style="width: 210mm; min-height: 297mm; padding: 20mm; margin: auto;"
    >
      <div class="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-6">
        <!-- Vendeur -->
        <div class="w-full md:w-1/3">
          <h2 class="uppercase text-xs font-semibold text-gray-500 tracking-wide mb-2">Vendeur</h2>
          <p class="text-gray-800 leading-relaxed text-sm">
            <strong>{{ invoice.vendorName }}</strong><br />
            {{ invoice.vendorAddress }}<br />
            {{ invoice.vendorSiret }}<br />
            {{ invoice.vendorEmail }}<br />
            {{ invoice.vendorPhone }}
          </p>
        </div>

        <!-- Bloc Facture -->
        <div class="w-full md:w-1/3 text-center bg-gray-50 border border-gray-200 rounded-md py-4">
          <h1 class="text-xl font-bold text-gray-800 uppercase">Facture</h1>
          <p class="text-sm text-gray-500 mt-1">N° {{ invoice.number }}</p>
          <p class="text-sm text-gray-500">Date : {{ invoice.date }}</p>
        </div>

        <!-- Client -->
        <div class="w-full md:w-1/3 text-right">
          <h2 class="uppercase text-xs font-semibold text-gray-500 tracking-wide mb-2">Client</h2>
          <p class="text-gray-800 leading-relaxed text-sm">
            <strong>{{ invoice.clientName }}</strong><br />
            {{ invoice.clientAddress }}<br />
            {{ invoice.clientEmail }}<br />
            {{ invoice.clientPhone }}
          </p>
        </div>
      </div>

      <!-- Détails facture -->
      <div>
        <h2 class="text-lg font-semibold text-gray-800 mb-2">Détails de la facture</h2>
        <table class="w-full border text-sm">
          <thead class="bg-gray-100">
            <tr>
              <th class="p-2 border">Description</th>
              <th class="p-2 border text-right">Qté</th>
              <th class="p-2 border text-right">Prix unitaire</th>
              <th class="p-2 border text-right">Total</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in invoice.items" :key="index">
              <td class="p-2 border">{{ item.description }}</td>
              <td class="p-2 border text-right">{{ item.qty }}</td>
              <td class="p-2 border text-right">{{ format(item.price) }} €</td>
              <td class="p-2 border text-right">{{ format(item.qty * item.price) }} €</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="text-right text-lg font-semibold mt-4">
        Total à payer : {{ total }} €
      </div>

      <div class="text-xs text-gray-500 border-t pt-4 whitespace-pre-line">
        {{ invoice.footer }}
      </div>
    </div>

    <!-- Formulaire -->
    <form class="max-w-4xl mx-auto bg-white p-12 shadow rounded-2xl space-y-16">
      <!-- Vendeur -->
      <section class="space-y-6">
        <h2 class="text-2xl font-bold text-gray-800">🏢 Informations vendeur</h2>
        <div class="grid grid-cols-2 gap-6">
          <div>
            <label class="text-xs text-gray-500">Nom de votre entreprise</label>
            <input v-model="invoice.vendorName" class="p-4 border rounded-xl w-full" />
          </div>
          <div>
            <label class="text-xs text-gray-500">Numéro de SIRET ou TVA</label>
            <input v-model="invoice.vendorSiret" class="p-4 border rounded-xl w-full" />
          </div>
          <div>
            <label class="text-xs text-gray-500">Email professionnel</label>
            <input v-model="invoice.vendorEmail" class="p-4 border rounded-xl w-full" />
          </div>
          <div>
            <label class="text-xs text-gray-500">Numéro de téléphone</label>
            <input v-model="invoice.vendorPhone" class="p-4 border rounded-xl w-full" />
          </div>
          <div class="col-span-2">
            <label class="text-xs text-gray-500">Adresse complète</label>
            <textarea v-model="invoice.vendorAddress" rows="2" class="p-4 border rounded-xl w-full" />
          </div>
        </div>
      </section>

      <!-- Client -->
      <section class="space-y-6">
        <h2 class="text-2xl font-bold text-gray-800">👤 Informations client</h2>
        <div class="grid grid-cols-2 gap-6">
          <div>
            <label class="text-xs text-gray-500">Nom ou raison sociale du client</label>
            <input v-model="invoice.clientName" class="p-4 border rounded-xl w-full" />
          </div>
          <div>
            <label class="text-xs text-gray-500">Adresse email du client</label>
            <input v-model="invoice.clientEmail" class="p-4 border rounded-xl w-full" />
          </div>
          <div>
            <label class="text-xs text-gray-500">Numéro de téléphone</label>
            <input v-model="invoice.clientPhone" class="p-4 border rounded-xl w-full" />
          </div>
          <div class="col-span-2">
            <label class="text-xs text-gray-500">Adresse postale du client</label>
            <textarea v-model="invoice.clientAddress" rows="2" class="p-4 border rounded-xl w-full" />
          </div>
        </div>
      </section>

      <!-- Référence -->
      <section class="space-y-6">
        <h2 class="text-2xl font-bold text-gray-800">📅 Détails de la facture</h2>
        <div class="grid grid-cols-2 gap-6">
          <div>
            <label class="text-xs text-gray-500">Numéro de facture</label>
            <input v-model="invoice.number" class="p-4 border rounded-xl w-full" />
          </div>
          <div>
            <label class="text-xs text-gray-500">Date d'émission</label>
            <input v-model="invoice.date" type="date" class="p-4 border rounded-xl w-full" />
          </div>
        </div>
      </section>

      <!-- Lignes -->
      <section class="space-y-6">
        <h2 class="text-2xl font-bold text-gray-800">📦 Lignes de facturation</h2>
        <div class="space-y-4">
          <div v-for="(item, index) in invoice.items" :key="index" class="grid grid-cols-3 gap-4">
            <div>
              <label class="text-xs text-gray-500">Description de la prestation</label>
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
          <button @click.prevent="addItem" class="text-blue-600 hover:underline text-sm">+ Ajouter une ligne</button>
        </div>
      </section>

      <!-- Mentions -->
      <section class="space-y-6">
        <h2 class="text-2xl font-bold text-gray-800">📝 Mentions complémentaires</h2>
        <label class="text-xs text-gray-500">Conditions de paiement, mentions légales, IBAN...</label>
        <textarea v-model="invoice.footer" rows="4" class="p-4 border rounded-xl w-full" />
      </section>

      <!-- Boutons -->
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

const invoice = ref({
  vendorName: 'Entreprise Pro Services',
  vendorAddress: '99 avenue des Affaires\n75000 Paris',
  vendorSiret: 'SIRET : 987 654 321 00010',
  vendorEmail: 'contact@entreprise-pro.fr',
  vendorPhone: '01 98 76 54 32',

  clientName: 'Société Client Premium',
  clientAddress: '15 rue des Clients\n75001 Paris',
  clientEmail: 'contact@clientpremium.fr',
  clientPhone: '06 11 22 33 44',

  number: 'FAC-2025-001',
  date: new Date().toISOString().substring(0, 10),

  items: [
    { description: 'Consultation technique', qty: 2, price: 120 },
    { description: 'Installation de matériel', qty: 1, price: 850 },
    { description: 'Maintenance mensuelle (3 mois)', qty: 3, price: 75 }
  ],

  footer: `Paiement par virement bancaire sous 30 jours.\nIBAN : FR76 1234 5678 9012 3456 7890 123\nTVA non applicable, art. 293 B du CGI.\nMerci de votre confiance.`
})

const addItem = () => {
  invoice.value.items.push({ description: '', qty: 1, price: 0 })
}

const format = (val) => Number(val).toFixed(2)

const total = computed(() =>
  format(invoice.value.items.reduce((acc, item) => acc + item.qty * item.price, 0))
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
    pdf.save(`facture-${invoice.value.number || 'doczy'}.pdf`)
  }
}
</script>
