<template>
  <div class="container">
    <!-- Aperçu PDF -->
    <div ref="pdfContent" class="pdf-content">
      <!-- En-tête -->
      <div class="header">
        <!-- Émetteur -->
        <div class="block">
          <h2 class="section-title">Émetteur</h2>
          <div class="text-block">
            <p class="font-bold">{{ receipt.vendorName }}</p>
            <p class="whitespace-pre">{{ receipt.vendorAddress }}</p>
            <p>{{ receipt.vendorSiret }}</p>
            <p>{{ receipt.vendorEmail }}</p>
            <p>{{ receipt.vendorPhone }}</p>
          </div>
        </div>

        <!-- Reçu -->
        <div class="facture-block">
          <h1>Reçu de Paiement</h1>
          <p class="small-text">N° {{ receipt.number }}</p>
          <p class="small-text">Date : {{ receipt.date }}</p>
        </div>

        <!-- Client -->
        <div class="block right-align">
          <h2 class="section-title">Destinataire</h2>
          <div class="text-block">
            <p class="font-bold">{{ receipt.clientName }}</p>
            <p class="whitespace-pre">{{ receipt.clientAddress }}</p>
            <p>{{ receipt.clientEmail }}</p>
            <p>{{ receipt.clientPhone }}</p>
          </div>
        </div>
      </div>

      <!-- Détails paiement -->
      <div class="details">
        <h2 class="details-title">Détails du paiement</h2>
        <br>
        <table class="facture-table">
          <thead>
            <tr>
              <th>Prestation</th>
              <th>Qté</th>
              <th>Prix unitaire</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in receipt.items" :key="index">
              <td>{{ item.description }}</td>
              <td>{{ item.qty }}</td>
              <td>{{ formatNumber(item.price) }} €</td>
              <td>{{ formatNumber(item.qty * item.price) }} €</td>
            </tr>
          </tbody>
        </table>
      </div>

      <br>

      <div class="total">
        Montant total payé : {{ total }} €
      </div>

      <div class="text-block">
        <p><strong>Mode de paiement :</strong> {{ receipt.paymentMethod }}</p>
      </div>

      <!-- Signature de réception -->
      <section class="section signature-reception">
        <h3>✍️ Signature de réception</h3>
        <p class="signature-text">
          Je soussigné(e), <strong>{{ receipt.clientName }}</strong>, confirme avoir reçu la somme de <strong>{{ total }} €</strong> pour la ou les prestations décrites ci-dessus.
        </p>
        <br>
        <p class="signature-text">
          Fait à .............................................., le ............................. .
        </p>
        <p class="signature-line">
          Signature : 
        </p>
      </section>
    </div>

    <!-- Formulaire -->
    <form class="form">
      <!-- Émetteur -->
      <section class="section">
        <h2>🏢 Émetteur (vous)</h2>
        <div class="grid-2">
          <div>
            <label>Nom de l'entreprise émettrice</label>
            <input v-model="receipt.vendorName" class="input" />
          </div>
          <div>
            <label>Numéro de SIRET ou TVA</label>
            <input v-model="receipt.vendorSiret" class="input" />
          </div>
          <div>
            <label>Adresse email de contact</label>
            <input v-model="receipt.vendorEmail" class="input" />
          </div>
          <div>
            <label>Numéro de téléphone</label>
            <input v-model="receipt.vendorPhone" class="input" />
          </div>
          <div class="full">
            <label>Adresse postale complète</label>
            <textarea v-model="receipt.vendorAddress" class="textarea" rows="2"></textarea>
          </div>
        </div>
      </section>

      <!-- Client -->
      <section class="section">
        <h2>👤 Destinataire (client)</h2>
        <div class="grid-2">
          <div>
            <label>Nom du client ou de l'entreprise</label>
            <input v-model="receipt.clientName" class="input" />
          </div>
          <div>
            <label>Adresse email du client</label>
            <input v-model="receipt.clientEmail" class="input" />
          </div>
          <div>
            <label>Numéro de téléphone du client</label>
            <input v-model="receipt.clientPhone" class="input" />
          </div>
          <div class="full">
            <label>Adresse du client</label>
            <textarea v-model="receipt.clientAddress" class="textarea" rows="2"></textarea>
          </div>
        </div>
      </section>

      <!-- Référence -->
      <section class="section">
        <h2>🗓️ Référence du paiement</h2>
        <div class="grid-2">
          <div>
            <label>Numéro du reçu</label>
            <input v-model="receipt.number" class="input" />
          </div>
          <div>
            <label>Date du paiement</label>
            <input v-model="receipt.date" class="input" type="date" />
          </div>
        </div>
      </section>

      <!-- Prestations -->
      <section class="section">
        <h2>📦 Prestations</h2>
        <div class="space-y">
          <div v-for="(item, index) in receipt.items" :key="index" class="grid-3">
            <div>
              <label>Description</label>
              <input v-model="item.description" class="input" />
            </div>
            <div>
              <label>Quantité</label>
              <input v-model.number="item.qty" class="input" type="number" />
            </div>
            <div>
              <label>Prix unitaire (€)</label>
              <input v-model.number="item.price" class="input" type="number" />
            </div>
          </div>
          <br>
          <button @click.prevent="addItem" class="link-button">
            + Ajouter une ligne
          </button>
        </div>
      </section>

      <!-- Mode de paiement -->
      <section class="section">
        <h2>💳 Mode de paiement</h2>
        <select v-model="receipt.paymentMethod" class="input">
          <option>Espèces</option>
          <option>Virement bancaire</option>
          <option>Chèque</option>
          <option>Carte bancaire</option>
          <option>Autre</option>
        </select>
      </section>

      <div class="actions">
        <button type="button" @click="generatePDF('preview')" class="secondary-button">
          👁️ Aperçu PDF
        </button>
        <button type="button" @click="generatePDF('download')" class="primary-button">
          ⬇️ Télécharger
        </button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const pdfContent = ref(null)

const receipt = ref({
  vendorName: 'Entreprise Générale',
  vendorAddress: '12 rue de l’Entreprise\n75000 Paris',
  vendorSiret: 'SIRET : 123 456 789 00012',
  vendorEmail: 'contact@entreprise.fr',
  vendorPhone: '01 23 45 67 89',

  clientName: 'Monsieur Jean Client',
  clientAddress: '42 avenue des Clients\n75001 Paris',
  clientEmail: 'jean.client@example.com',
  clientPhone: '06 12 34 56 78',

  number: 'RECU-2025-001',
  date: new Date().toISOString().substring(0, 10),

  items: [
    { description: 'Consultation', qty: 2, price: 100 },
    { description: 'Installation', qty: 1, price: 250 }
  ],

  paymentMethod: 'Espèces',
})

const addItem = () => {
  receipt.value.items.push({ description: '', qty: 1, price: 0 })
}

const formatNumber = (val) => Number(val).toFixed(2)

const total = computed(() =>
  formatNumber(receipt.value.items.reduce((acc, item) => acc + item.qty * item.price, 0))
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
    pdf.save(`reçu-${receipt.value.number || 'doczy'}.pdf`)
  }
}
</script>

<style scoped>
.container {
  font-family: 'Roboto', sans-serif;
  background: #f7fafc;
  min-height: 100vh;
  padding: 1.5rem;
}

.pdf-content {
  background: white;
  width: 210mm;
  min-height: 297mm;
  padding: 20mm;
  margin: auto;
  font-size: 14px;
}

.header {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin-bottom: 2rem;
  gap: 1.5rem;
}

.block {
  flex: 1 1 30%;
}

.details {
  margin-top: 50px;
}

.facture-block {
  text-align: center;
  background: #f9fafb;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  padding: 1rem;
}

.right-align {
  text-align: right;
}

.section-title {
  font-size: 12px;
  text-transform: uppercase;
  font-weight: 600;
  color: #6b7280;
  margin-bottom: 0.5rem;
}

.text-block p {
  margin: 0.2rem 0;
}

.facture-table {
  width: 100%;
  border-collapse: collapse;
}

.facture-table th, .facture-table td {
  border: 1px solid #ccc;
  padding: 0.5rem;
  text-align: right;
}

.facture-table th:first-child,
.facture-table td:first-child {
  text-align: left;
}

.total {
  font-size: 18px;
  font-weight: bold;
  text-align: right;
  margin-top: 2rem;
}

.form {
  background: white;
  padding: 3rem;
  max-width: 1000px;
  margin: 3rem auto;
  border-radius: 16px;
  box-shadow: 0 5px 15px rgba(0,0,0,0.1);
}

.section {
  margin-bottom: 4rem;
}

.grid-2, .grid-3 {
  display: grid;
  gap: 1.5rem;
}

.grid-2 {
  grid-template-columns: 1fr 1fr;
}

.grid-3 {
  grid-template-columns: repeat(3, 1fr);
}

.full {
  grid-column: span 2;
}

.input, .textarea {
  font-family: 'Roboto', sans-serif;
  width: 100%;
  padding: 1rem;
  border: 1px solid #ccc;
  border-radius: 12px;
  font-size: 1rem;
  background-color: #f9fafb;
  box-sizing: border-box;
  transition: border-color 0.2s ease-in-out;
}

.input:focus, .textarea:focus {
  border-color: #2563eb;
  outline: none;
}

label {
  display: block;
  font-size: 14px;
  color: #4b5563;
  margin-bottom: 0.5rem;
}

.actions {
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  margin-top: 2rem;
  padding-top: 2rem;
  border-top: 1px solid #e5e7eb;
}

.primary-button, .secondary-button {
  padding: 1rem 2rem;
  border: none;
  border-radius: 8px;
  font-weight: bold;
  cursor: pointer;
}

.primary-button {
  background: #2563eb;
  color: white;
}

.primary-button:hover {
  background: #1e40af;
}

.secondary-button {
  background: #e5e7eb;
  color: #374151;
}

.secondary-button:hover {
  background: #d1d5db;
}

.link-button {
  background: none;
  border: none;
  color: #2563eb;
  cursor: pointer;
  text-align: left;
  padding: 0;
  font-size: 0.9rem;
}

.signature-reception {
  margin-top: 4rem;
  padding-top: 2rem;
  border-top: 1px solid #e5e7eb;
}

.signature-text {
  font-size: 14px;
  margin-bottom: 0.5rem;
  color: #111827;
}

.signature-text strong {
  font-weight: 600;
}

.signature-line {
  margin-top: 2rem;
  font-size: 14px;
  font-style: italic;
  color: #374151;
}
</style>
