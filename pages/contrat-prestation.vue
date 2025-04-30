<template>
  <div class="contract-page">
    <!-- Aperçu PDF -->
    <div ref="pdfContent" class="pdf-preview">
      <h1>📄 Contrat de prestation de service</h1>

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

      <h2>1. Objet de la prestation</h2>
      <p class="preformatted">{{ contract.mission }}</p>

      <h2>2. Durée et délais</h2>
      <p>La prestation commence le <strong>{{ contract.startDate }}</strong> et se terminera le <strong>{{ contract.endDate }}</strong>.</p>

      <h2>3. Conditions financières</h2>
      <p>Le montant total de la prestation est de <strong>{{ contract.amount }} €</strong>.</p>
      <p>Modalités de paiement : {{ contract.paymentTerms }}</p>

      <h2>4. Obligations des parties</h2>
      <p class="preformatted">{{ contract.conditions }}</p>

      <h2>5. Litiges</h2>
      <p>Toute contestation relative à ce contrat relèvera de la compétence des tribunaux du ressort du siège social du prestataire.</p>

      <h2>6. Signature</h2>
      <div class="signature-section">
        <div>
          <p>Fait à {{ contract.city }}, le {{ contract.date }}</p>
          <p class="signature-line">Signature du prestataire</p>
        </div>
        <div>
          <p>&nbsp;</p>
          <p class="signature-line">Signature du client</p>
        </div>
      </div>
    </div>

    <!-- Formulaire -->
    <form class="contract-form">
      <h2>🏢 Prestataire</h2>
      <div class="grid-2">
        <input v-model="contract.vendorName" placeholder="Nom de l'entreprise" />
        <input v-model="contract.vendorSiret" placeholder="SIRET / TVA" />
        <input v-model="contract.vendorEmail" placeholder="Email" />
        <textarea v-model="contract.vendorAddress" rows="2" placeholder="Adresse"></textarea>
      </div>

      <h2>👤 Client</h2>
      <div class="grid-2">
        <input v-model="contract.clientName" placeholder="Nom complet ou entreprise" />
        <input v-model="contract.clientEmail" placeholder="Email du client" />
        <textarea v-model="contract.clientAddress" rows="2" placeholder="Adresse client"></textarea>
      </div>

      <h2>✍️ Mission</h2>
      <textarea v-model="contract.mission" rows="4" placeholder="Description détaillée de la mission"></textarea>

      <div class="grid-2">
        <div>
          <label>Date de début</label>
          <input type="date" v-model="contract.startDate" />
        </div>
        <div>
          <label>Date de fin</label>
          <input type="date" v-model="contract.endDate" />
        </div>
      </div>

      <div class="grid-2">
        <div>
          <label>Montant total (€)</label>
          <input type="number" v-model.number="contract.amount" />
        </div>
        <div>
          <label>Modalités de paiement</label>
          <input v-model="contract.paymentTerms" />
        </div>
      </div>

      <h2>🔒 Conditions particulières</h2>
      <textarea v-model="contract.conditions" rows="4" placeholder="Conditions, engagement, responsabilités..."></textarea>

      <div class="grid-2">
        <input v-model="contract.city" placeholder="Ville de signature" />
        <input v-model="contract.date" type="date" />
      </div>

      <div class="form-actions">
        <button @click.prevent="generatePDF('preview')" class="btn-secondary">👁️ Aperçu</button>
        <button @click.prevent="generatePDF('download')" class="btn-primary">⬇️ Télécharger</button>
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

<style scoped>
/* Importation de la font Roboto depuis Google Fonts */
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap');
.contract-page {
  font-family: 'Roboto', sans-serif;
  background-color: #f3f4f6;
  padding: 2rem 1rem;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  gap: 3rem;
}

/* PDF Preview */
.pdf-preview {
  background: white;
  width: 210mm;
  min-height: 297mm;
  margin: auto;
  padding: 20mm;
  font-size: 0.875rem;
  line-height: 1.6;
}

.pdf-preview h1 {
  font-size: 1.75rem;
  font-weight: bold;
  text-align: center;
  color: #1d4ed8;
  margin-bottom: 1rem;
  text-transform: uppercase;
}

.pdf-preview h2 {
  font-size: 1.125rem;
  font-weight: 600;
  margin-top: 1.5rem;
}

.preformatted {
  white-space: pre-line;
}

.signature-section {
  display: flex;
  justify-content: space-between;
  margin-top: 2rem;
}

.signature-line {
  margin-top: 2.5rem;
  border-top: 1px solid #9ca3af;
  width: 12rem;
}

/* Formulaire */
.contract-form {
  max-width: 1024px;
  background: white;
  padding: 2.5rem;
  border-radius: 1rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  margin: auto;
  display: flex;
  flex-direction: column;
  gap: 2.5rem;
}

.contract-form h2 {
  font-size: 1.25rem;
  font-weight: bold;
  color: #1f2937;
}

/* Champs et grids */
input, textarea {
  padding: 0.75rem 1rem;
  border: 1px solid #d1d5db;
  border-radius: 0.75rem;
  font-size: 1rem;
  width: 100%;
}

input:focus, textarea:focus {
  outline: none;
  border-color: #3b82f6;
  box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.3);
}

.grid-2 {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
}

@media (max-width: 768px) {
  .grid-2 {
    grid-template-columns: 1fr;
  }
}

/* Boutons */
.form-actions {
  display: flex;
  justify-content: flex-end;
  gap: 1.5rem;
  padding-top: 2rem;
  border-top: 1px solid #e5e7eb;
}

.btn-primary {
  background-color: #2563eb;
  color: white;
  padding: 0.75rem 1.5rem;
  border-radius: 0.5rem;
  border: none;
  cursor: pointer;
  transition: background 0.3s;
}

.btn-primary:hover {
  background-color: #1d4ed8;
}

.btn-secondary {
  background-color: #d1d5db;
  color: #111827;
  padding: 0.75rem 1.5rem;
  border-radius: 0.5rem;
  border: none;
  cursor: pointer;
  transition: background 0.3s;
}

.btn-secondary:hover {
  background-color: #9ca3af;
}
</style>
