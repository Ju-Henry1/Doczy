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
            <p class="font-bold">{{ invoice.vendorName }}</p>
            <p class="whitespace-pre">{{ invoice.vendorAddress }}</p>
            <p>{{ invoice.vendorSiret }}</p>
            <p>{{ invoice.vendorEmail }}</p>
            <p>{{ invoice.vendorPhone }}</p>
          </div>
        </div>

        <!-- Facture -->
        <div class="facture-block">
          <h1>Facture</h1>
          <p class="small-text">N° {{ invoice.number }}</p>
          <p class="small-text">Date : {{ invoice.date }}</p>
        </div>

        <!-- Client -->
        <div class="block right-align">
          <h2 class="section-title">Destinataire</h2>
          <div class="text-block">
            <p class="font-bold">{{ invoice.clientName }}</p>
            <p class="whitespace-pre">{{ invoice.clientAddress }}</p>
            <p>{{ invoice.clientEmail }}</p>
            <p>{{ invoice.clientPhone }}</p>
          </div>
        </div>
      </div>

      <!-- Détails facture -->
      <div class="details">
        <h2 class="details-title">Détails de la facture</h2>
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
            <tr v-for="(item, index) in invoice.items" :key="index">
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
        Total à payer : {{ total }} €
      </div>

      <div class="text-block">
        <p><strong>Mode de paiement :</strong> {{ invoice.paymentMethod }}</p>

        <div v-if="invoice.paymentMethod === 'Virement bancaire'" class="bank-details-box">
          <h3>Coordonnées bancaires</h3>
          <ul class="bank-list">
            <li><strong>IBAN :</strong> {{ getBankField('iban') }}</li>
          </ul>
        </div>
      </div>

      <div class="footer-text">
        {{ invoice.footer }}
      </div>
    </div>

    <!-- Formulaire -->
    <form class="form">
      <!-- Émetteur -->
      <section class="section">
        <h2>🏢 Émetteur (vous)</h2>
        <div class="grid-2">
          <div>
            <label>Nom de l'entreprise émettrice</label>
            <input v-model="invoice.vendorName" class="input" />
          </div>
          <div>
            <label>Numéro de SIRET ou TVA</label>
            <input v-model="invoice.vendorSiret" class="input" />
          </div>
          <div>
            <label>Adresse email de contact</label>
            <input v-model="invoice.vendorEmail" class="input" />
          </div>
          <div>
            <label>Numéro de téléphone</label>
            <input v-model="invoice.vendorPhone" class="input" />
          </div>
          <div class="full">
            <label>Adresse postale complète</label>
            <textarea v-model="invoice.vendorAddress" class="textarea" rows="2"></textarea>
          </div>
        </div>
      </section>

      <!-- Client -->
      <section class="section">
        <h2>👤 Destinataire (client)</h2>
        <div class="grid-2">
          <div>
            <label>Nom du client ou de l'entreprise</label>
            <input v-model="invoice.clientName" class="input" />
          </div>
          <div>
            <label>Adresse email du client</label>
            <input v-model="invoice.clientEmail" class="input" />
          </div>
          <div>
            <label>Numéro de téléphone du client</label>
            <input v-model="invoice.clientPhone" class="input" />
          </div>
          <div class="full">
            <label>Adresse du client</label>
            <textarea v-model="invoice.clientAddress" class="textarea" rows="2"></textarea>
          </div>
        </div>
      </section>

      <!-- Référence -->
      <section class="section">
        <h2>🗓️ Référence de la facture</h2>
        <div class="grid-2">
          <div>
            <label>Numéro de la facture</label>
            <input v-model="invoice.number" class="input" />
          </div>
          <div>
            <label>Date d'émission</label>
            <input v-model="invoice.date" class="input" type="date" />
          </div>
        </div>
      </section>

      <!-- Prestations -->
      <section class="section">
        <h2>📦 Prestations</h2>
        <div class="space-y">
          <div v-for="(item, index) in invoice.items" :key="index" class="grid-3">
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
            <button @click.prevent="removeItem(index)" class="btn-delete">Supprimer</button>
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
        <select v-model="invoice.paymentMethod" class="input">
          <option>Espèces</option>
          <option>Virement bancaire</option>
          <option>Chèque</option>
          <option>Carte bancaire</option>
          <option>Autre</option>
        </select>
      </section>

      <!-- Coordonnées bancaires -->
      <section class="section">
        <h2>🏦 Coordonnées bancaires (si applicable)</h2>
        <label>IBAN :</label>
        <textarea v-model="invoice.bankDetails" class="textarea" rows="3" placeholder="IBAN : FR76 1234 5678 9012 3456 7890 123">
        </textarea>
      </section>

      <!-- Mentions légales -->
      <section class="section">
        <h2>📝 Mentions légales</h2>
        <label>Texte affiché en bas de la facture</label>
        <textarea v-model="invoice.footer" class="textarea" rows="4"></textarea>
      </section>

      <div class="actions">
        <button type="button" @click="generatePDF('preview')" class="view-button">
          👁️ Aperçu PDF
        </button>
        <button type="button" @click="generatePDF('download')" class="download-button">
          ⬇️ Télécharger
        </button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

useHead({
  title: 'Factures - Doczy',
  meta: [{ name: 'description', content: 'Créez vos factures personnalisés pour vos clients.' }],
});

const pdfContent = ref(null)

const invoice = ref({
  vendorName: 'Entreprise Générale',
  vendorAddress: '12 rue de l’Entreprise\n75000 Paris',
  vendorSiret: 'SIRET : 123 456 789 00012',
  vendorEmail: 'contact@entreprise.fr',
  vendorPhone: '01 23 45 67 89',

  clientName: 'Monsieur Jean Client',
  clientAddress: '42 avenue des Clients\n75001 Paris',
  clientEmail: 'jean.client@example.com',
  clientPhone: '06 12 34 56 78',

  number: 'FAC-2025-001',
  date: new Date().toISOString().substring(0, 10),

  items: [
    { description: 'Consultation', qty: 2, price: 100 },
    { description: 'Installation', qty: 1, price: 250 }
  ],

  paymentMethod: 'Espèces',
  bankDetails: 'IBAN : FR76 1234 5678 9012 3456 7890 123',

  footer: `Facture payable sous 30 jours.\nTVA non applicable, art. 293 B du CGI.`
})

const addItem = () => {
  invoice.value.items.push({ description: '', qty: 1, price: 0 })
}

const formatNumber = (val) => Number(val).toFixed(2)

const total = computed(() =>
  formatNumber(invoice.value.items.reduce((acc, item) => acc + item.qty * item.price, 0))
)

const getBankField = (field) => {
  const lines = invoice.value.bankDetails.split('\n')
  const map = { iban: ''}

  lines.forEach(line => {
    const lower = line.toLowerCase()
    if (lower.includes('iban')) map.iban = line.split(':').slice(1).join(':').trim()
  })

  return map[field] || ''
}

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

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap');

body, html {
  margin: 0;
  padding: 0;
}

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
  margin-top: 25px;
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

.footer-text {
  font-size: 12px;
  color: #6b7280;
  margin-top: 2rem;
}

.form {
  background: white;
  padding: 2rem;
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
  margin-bottom: 15px;
}

.full {
  grid-column: span 2;
}

.input, .textarea {
  font-family: 'Roboto', sans-serif;
  width: 100%;
  padding: 1rem; /* équivalent à p-4 */
  border: 1px solid #ccc; /* une bordure simple */
  border-radius: 12px; /* arrondi équivalent à rounded-xl */
  font-size: 1rem;
  background-color: #f9fafb; /* couleur de fond similaire à celle de Tailwind */
  box-sizing: border-box; /* Pour que le padding ne dépasse pas la largeur de l'élément */
  transition: border-color 0.2s ease-in-out; /* Transition douce lors du focus */
}

.input:focus, .textarea:focus {
  border-color: #4F46E5; /* couleur de bordure au focus */
  outline: none; /* suppression du contour par défaut */
}

label {
  display: block;
  font-size: 14px;
  color: #4b5563;
  margin-bottom: 0.5rem;
}

/* Tous les boutons */

.actions {
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  margin-top: 2rem;
  padding-top: 2rem;
  border-top: 1px solid #e5e7eb;
}

.link-button, .primary-button, .secondary-button {
  padding: 1rem;
  border-radius: 12px;
  cursor: pointer;
}

/* Bouton de téléchargement */

.download-button {
  background: #2563eb;
  color: white;
  padding: 1rem 2rem;
  border: none;
  border-radius: 8px;
  font-weight: bold;
  cursor: pointer;
}

.download-button:hover {
  background: #1e40af;
}

/* Bouton d'aperçu PDF */

.view-button {
  background: #e5e7eb;
  color: black;
  padding: 1rem 2rem;
  border: none;
  border-radius: 8px;
  font-weight: bold;
  cursor: pointer;
}

.view-button:hover {
  background: #d1d5db;
}

/* Bouton d'ajout de ligne */

.link-button {
  background-color: #e2e8f0;
  border: none;
  color: #4A5568;
}

.link-button:hover {
  text-decoration: underline;
}


/* Bouton de suppression */

.btn-delete {
  background-color: #e74c3c;
  color: white;
  border: none;
  padding: 10px 20px;         /* légèrement réduit */
  font-size: 14px;            /* plus petit */
  font-weight: bold;
  border-radius: 8px;
  cursor: pointer;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: background-color 0.3s ease, transform 0.2s ease;
}

.btn-delete:hover {
  background-color: #c0392b;
  transform: scale(1.05);
}

.btn-delete:active {
  transform: scale(0.98);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}


@media (max-width: 768px) {
  .block {
    text-align: left;
  }

  .space-y > div {
    background: #f3f4f6;
    padding: 1rem;
    border: 1px solid #e5e7eb;
    border-radius: 12px;
    margin-bottom: 1rem;
  }

  .pdf-content {
    display: none;
  }

    /* Sur mobile, changer la disposition des éléments à 1 colonne */
    .grid-2 {
    grid-template-columns: 1fr; /* Une seule colonne sur mobile */
  }

  .grid-3 {
    grid-template-columns: 1fr; /* Une seule colonne pour les prestations */
  }

  .full {
    grid-column: span 1; /* Prendre 1 seule colonne sur mobile */
  }

  /* Ajouter un peu d'espacement entre les sections */
  .section {
    margin-bottom: 2rem;
  }

  /* Agrandir la zone de saisie de l'adresse pour plus de lisibilité */
  .input, .textarea {
    font-size: 1rem;
    padding: 0.8rem;
  }

  .actions {
    flex-direction: column;
    align-items: flex-start;
  }
}
</style>
