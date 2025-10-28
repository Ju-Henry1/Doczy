<template>
  <div class="container" v-if="!isMobile">
    <!-- Aperçu PDF -->
    <div ref="pdfContent" class="pdf-content">
      <!-- En-tête -->
      <div class="header">
        <div class="block">
          <p class="font-bold">{{ form.senderName }}</p>
          <p class="whitespace-pre">{{ form.senderAddress }}</p>
          <p>{{ form.senderEmail }}</p>
          <p>{{ form.senderPhone }}</p>
        </div>
        <div class="block right-align">
          <p>{{ form.date }}</p>
          <p class="font-semibold">à : {{ form.recipientName }}</p>
        </div>
      </div>

      <div class="content">
        <h1 class="text-xl font-bold mb-6">Objet : Résiliation de {{ form.subject }}</h1>
        <p class="mb-4">Madame, Monsieur,</p>
        <p class="mb-4 whitespace-pre-line">{{ form.body }}</p>
        <p>Je vous remercie de prendre en compte cette demande.</p>
        <p class="mt-8">Cordialement,</p>
        <p class="mt-4 font-bold">{{ form.senderName }}</p>
      </div>
    </div>

    <!-- Formulaire -->
    <form class="form">
      <section class="section">
        <h2>🏡 Expéditeur</h2>
        <div class="grid-2">
          <div class="form-group">
            <label>Nom / Entreprise</label>
            <input v-model="form.senderName" class="input" />
          </div>
          <div class="form-group">
            <label>Email</label>
            <input v-model="form.senderEmail" class="input" />
          </div>
          <div class="form-group">
            <label>Téléphone</label>
            <input v-model="form.senderPhone" class="input" />
          </div>
          <div class="form-group full">
            <label>Adresse postale</label>
            <textarea v-model="form.senderAddress" class="textarea" rows="2" />
          </div>
        </div>
      </section>

      <section class="section">
        <h2>👤 Destinataire</h2>
        <div class="form-group">
          <label>Nom de l'entreprise destinataire</label>
          <input v-model="form.recipientName" class="input" />
        </div>
      </section>

      <section class="section">
        <h2>📝 Contenu de la lettre</h2>
        <div class="form-group">
          <label>Objet</label>
          <input v-model="form.subject" class="input" placeholder="Ex : abonnement X" />
        </div>
        <div class="form-group">
          <label>Corps de la lettre</label>
          <textarea v-model="form.body" class="textarea" rows="6" placeholder="Contenu de la lettre" />
        </div>
      </section>

      <div class="actions">
        <button @click.prevent="generatePDF('preview')" class="view-button">👁️ Aperçu PDF</button>
        <button @click.prevent="generatePDF('download')" class="download-button">⬇️ Télécharger</button>
      </div>
    </form>
  </div>

  <!-- Message mobile -->
  <div v-else class="mobile-warning">
    <h2>📵 Non disponible sur mobile</h2>
    <p>Veuillez utiliser un ordinateur pour générer une lettre de résiliation.</p>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const isMobile = ref(false)

onMounted(() => {
  isMobile.value = window.innerWidth <= 768
})

const pdfContent = ref(null)

const form = ref({
  senderName: 'Entreprise SARL',
  senderAddress: '22 rue de Paris\n75000 Paris',
  senderEmail: 'contact@entreprise.fr',
  senderPhone: '01 23 45 67 89',
  recipientName: 'Nom de la société destinataire',
  subject: 'l’abonnement au service X',
  date: new Date().toISOString().substring(0, 10),
  body: `Par la présente, je souhaite vous informer de ma décision de résilier {{subject}} à compter de ce jour, conformément aux conditions générales.`
})

const generatePDF = async (action) => {
  const jsPDF = (await import('jspdf')).default
  const html2canvas = (await import('html2canvas')).default

  const canvas = await html2canvas(pdfContent.value, { scale: 2 })
  const imgData = canvas.toDataURL('image/png')
  const pdf = new jsPDF('p', 'mm', 'a4')
  const width = 210
  const height = (canvas.height * width) / canvas.width

  pdf.addImage(imgData, 'PNG', 0, 0, width, height)

  if (action === 'preview') {
    const url = URL.createObjectURL(pdf.output('blob'))
    window.open(url, '_blank')
  } else {
    pdf.save('lettre-resiliation.pdf')
  }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Roboto&display=swap');

.container {
  font-family: 'Roboto', sans-serif;
  background: #f7fafc;
  padding: 2rem;
}

.pdf-content {
  background: white;
  width: 210mm;
  min-height: 297mm;
  padding: 25mm;
  margin: auto;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
  font-size: 14px;
  line-height: 1.6;
}

.header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 2rem;
}

.block {
  flex: 1 1 45%;
}

.right-align {
  text-align: right;
}

.form {
  background: white;
  padding: 2rem;
  margin: 3rem auto;
  border-radius: 16px;
  max-width: 900px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.section {
  margin-bottom: 2.5rem;
}

.grid-2 {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.5rem;
}

.full {
  grid-column: span 2;
}

.input, .textarea {
  width: 100%;
  padding: 1rem;
  border-radius: 10px;
  border: 1px solid #e2e8f0;
  background: #f9fafb;
  font-size: 1rem;
}

label {
  font-weight: 500;
  display: block;
  margin-bottom: 0.25rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;
}

.actions {
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  margin-top: 2rem;
}

.download-button {
  background: #2563eb;
  color: white;
  border: none;
  padding: 1rem 2rem;
  border-radius: 8px;
  font-weight: bold;
  cursor: pointer;
}

.view-button {
  background: #e2e8f0;
  padding: 1rem 2rem;
  border-radius: 8px;
  font-weight: bold;
}

.mobile-warning {
  max-width: 600px;
  margin: 100px auto;
  padding: 2rem;
  text-align: center;
  background-color: #fff3cd;
  border: 1px solid #ffeeba;
  border-radius: 12px;
  color: #856404;
  font-family: 'Roboto', sans-serif;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
}
</style>
