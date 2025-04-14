<template>
    <div class="bg-gray-100 min-h-screen p-6 space-y-12">
      <!-- Aperçu PDF -->
      <div
        ref="pdfContent"
        class="bg-white text-sm leading-relaxed space-y-6"
        style="width: 210mm; min-height: 297mm; padding: 20mm; margin: auto;"
      >
        <h1 class="text-2xl font-bold text-center text-blue-700 uppercase mb-4">Contrat de prestation de service</h1>

        <p>Ce contrat est conclu entre :</p>
        <p>
          <strong>{{ contract.vendorName }}</strong><br />
          {{ contract.vendorAddress }}<br />
          {{ contract.vendorSiret }}<br />
          {{ contract.vendorEmail }}
        </p>
  
        <p>Et le client suivant :</p>
        <p>
          <strong>{{ contract.clientName }}</strong><br />
          {{ contract.clientAddress }}<br />
          {{ contract.clientEmail }}
        </p>
  
        <hr />
  
        <h2 class="text-lg font-semibold mt-4">1. Objet de la prestation</h2>
        <p class="whitespace-pre-line">{{ contract.mission }}</p>
  
        <h2 class="text-lg font-semibold mt-4">2. Durée et délais</h2>
        <p>La prestation commence le <strong>{{ contract.startDate }}</strong> et se terminera le <strong>{{ contract.endDate }}</strong>.</p>
  
        <h2 class="text-lg font-semibold mt-4">3. Conditions financières</h2>
        <p>Le montant total de la prestation est de <strong>{{ contract.amount }} €</strong>.</p>
        <p>Modalités de paiement : {{ contract.paymentTerms }}</p>
  
        <h2 class="text-lg font-semibold mt-4">4. Obligations des parties</h2>
        <p class="whitespace-pre-line">{{ contract.conditions }}</p>
  
        <h2 class="text-lg font-semibold mt-4">5. Litiges</h2>
        <p>Toute contestation relative à ce contrat relèvera de la compétence des tribunaux du ressort du siège social du prestataire.</p>
  
        <h2 class="text-lg font-semibold mt-4">6. Signature</h2>
        <div class="flex justify-between mt-8">
          <div class="text-sm">
            <p>Fait à {{ contract.city }}, le {{ contract.date }}</p>
            <p class="mt-10">Signature du prestataire</p>
            <div class="border-t border-gray-400 w-48 mt-2"></div>
          </div>
          <div class="text-sm text-right">
            <p>&nbsp;</p>
            <p class="mt-10">Signature du client</p>
            <div class="border-t border-gray-400 w-48 mt-2 ml-auto"></div>
          </div>
        </div>
      </div>
  
      <!-- Formulaire -->
      <form class="max-w-4xl mx-auto bg-white p-10 shadow rounded-xl space-y-10">
        <h2 class="text-xl font-bold text-gray-800">🏢 Prestataire</h2>
        <div class="grid grid-cols-2 gap-6">
          <input v-model="contract.vendorName" placeholder="Nom de l'entreprise" class="p-3 border rounded-xl" />
          <input v-model="contract.vendorSiret" placeholder="SIRET / TVA" class="p-3 border rounded-xl" />
          <input v-model="contract.vendorEmail" placeholder="Email" class="p-3 border rounded-xl" />
          <textarea v-model="contract.vendorAddress" rows="2" placeholder="Adresse" class="p-3 border rounded-xl col-span-2" />
        </div>
  
        <h2 class="text-xl font-bold text-gray-800">👤 Client</h2>
        <div class="grid grid-cols-2 gap-6">
          <input v-model="contract.clientName" placeholder="Nom complet ou entreprise" class="p-3 border rounded-xl" />
          <input v-model="contract.clientEmail" placeholder="Email du client" class="p-3 border rounded-xl" />
          <textarea v-model="contract.clientAddress" rows="2" placeholder="Adresse client" class="p-3 border rounded-xl col-span-2" />
        </div>
  
        <h2 class="text-xl font-bold text-gray-800">✍️ Mission</h2>
        <textarea v-model="contract.mission" rows="4" placeholder="Description détaillée de la mission" class="p-3 border rounded-xl w-full" />
  
        <div class="grid grid-cols-2 gap-6">
          <div>
            <label class="text-xs text-gray-500">Date de début</label>
            <input type="date" v-model="contract.startDate" class="p-3 border rounded-xl w-full" />
          </div>
          <div>
            <label class="text-xs text-gray-500">Date de fin</label>
            <input type="date" v-model="contract.endDate" class="p-3 border rounded-xl w-full" />
          </div>
        </div>
  
        <div class="grid grid-cols-2 gap-6">
          <div>
            <label class="text-xs text-gray-500">Montant total (€)</label>
            <input type="number" v-model.number="contract.amount" class="p-3 border rounded-xl w-full" />
          </div>
          <div>
            <label class="text-xs text-gray-500">Modalités de paiement</label>
            <input v-model="contract.paymentTerms" class="p-3 border rounded-xl w-full" />
          </div>
        </div>
  
        <h2 class="text-xl font-bold text-gray-800">🔒 Conditions particulières</h2>
        <textarea v-model="contract.conditions" rows="4" placeholder="Conditions, engagement, responsabilités..." class="p-3 border rounded-xl w-full" />
  
        <div class="grid grid-cols-2 gap-6">
          <input v-model="contract.city" placeholder="Ville de signature" class="p-3 border rounded-xl" />
          <input v-model="contract.date" type="date" class="p-3 border rounded-xl" />
        </div>
  
        <div class="flex justify-end gap-6 pt-6 border-t">
          <button @click.prevent="generatePDF('preview')" class="bg-gray-300 px-6 py-3 rounded hover:bg-gray-400">👁️ Aperçu</button>
          <button @click.prevent="generatePDF('download')" class="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700">⬇️ Télécharger</button>
        </div>
      </form>
    </div>
  </template>
  
  <script setup>
import { ref, onMounted } from 'vue'

const pdfContent = ref(null)

const contract = ref({
  vendorName: 'Agence Doczy Solutions',
  vendorAddress: '14 rue du Code, 75002 Paris',
  vendorSiret: 'SIRET : 123 456 789 00021',
  vendorEmail: 'contact@doczy.fr',

  clientName: 'Client Professionnel SARL',
  clientAddress: '27 avenue des Projets, 69000 Lyon',
  clientEmail: 'client@societepro.fr',

  mission: `Développement d’un site vitrine sous Nuxt.js, incluant :
- Intégration design responsive
- Formulaire de contact et carte interactive
- SEO de base et déploiement

Le client fournit le contenu et valide chaque étape.`,

  startDate: '2025-05-01',
  endDate: '2025-06-15',
  amount: 2800,
  paymentTerms: '50% à la signature, 50% à la livraison',

  conditions: `Le prestataire s’engage à livrer un produit conforme aux spécifications validées.
Le client s’engage à fournir les contenus nécessaires et à valider les étapes sous 3 jours ouvrés.`,

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
    pdf.save(`contrat-${contract.value.vendorName}.pdf`)
  }
}
</script>
