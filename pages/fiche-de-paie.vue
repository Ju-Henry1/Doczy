<template>
    <div class="bg-gray-100 min-h-screen p-6 space-y-12">
      <!-- Aperçu PDF -->
      <div
        ref="pdfContent"
        class="bg-white text-sm leading-relaxed space-y-6"
        style="width: 210mm; min-height: 297mm; padding: 20mm; margin: auto;"
      >
        <div class="flex justify-between items-start mb-10">
          <div>
            <h1 class="text-2xl font-bold text-blue-700">FICHE DE PAIE</h1>
            <p class="text-gray-600">Mois de : {{ pay.period }}</p>
          </div>
          <div class="text-right text-sm">
            <p><strong>{{ pay.employerName }}</strong></p>
            <p>{{ pay.employerAddress }}</p>
            <p>{{ pay.employerSiret }}</p>
          </div>
        </div>
  
        <div class="border border-gray-300 rounded p-4 mb-6">
          <h2 class="text-lg font-semibold text-gray-700 mb-2">Informations du salarié</h2>
          <div class="grid grid-cols-2 gap-4 text-sm">
            <p><strong>Nom :</strong> {{ pay.employeeName }}</p>
            <p><strong>Poste :</strong> {{ pay.employeeRole }}</p>
            <p><strong>Date d'entrée :</strong> {{ pay.entryDate }}</p>
            <p><strong>Matricule :</strong> {{ pay.employeeId }}</p>
            <p><strong>N° Sécu :</strong> {{ pay.socialNumber }}</p>
            <p><strong>Période :</strong> {{ pay.period }}</p>
          </div>
        </div>
  
        <table class="w-full text-sm border">
          <thead class="bg-gray-100">
            <tr>
              <th class="p-2 border text-left">Libellé</th>
              <th class="p-2 border text-right">Base</th>
              <th class="p-2 border text-right">Taux</th>
              <th class="p-2 border text-right">Montant</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="p-2 border">Salaire de base</td>
              <td class="p-2 border text-right">{{ pay.baseHours }} h</td>
              <td class="p-2 border text-right">{{ format(pay.baseRate) }} €</td>
              <td class="p-2 border text-right">{{ format(pay.baseHours * pay.baseRate) }} €</td>
            </tr>
            <tr v-if="pay.bonusAmount">
              <td class="p-2 border">Prime exceptionnelle</td>
              <td class="p-2 border text-right">—</td>
              <td class="p-2 border text-right">—</td>
              <td class="p-2 border text-right">{{ format(pay.bonusAmount) }} €</td>
            </tr>
            <tr v-if="pay.extraHours">
              <td class="p-2 border">Heures supplémentaires</td>
              <td class="p-2 border text-right">{{ pay.extraHours }} h</td>
              <td class="p-2 border text-right">25%</td>
              <td class="p-2 border text-right">{{ format(extraPay) }} €</td>
            </tr>
            <tr v-for="(cotisation, i) in pay.charges" :key="i">
              <td class="p-2 border">{{ cotisation.label }}</td>
              <td class="p-2 border text-right">—</td>
              <td class="p-2 border text-right">{{ cotisation.rate }}%</td>
              <td class="p-2 border text-right">-{{ format(chargeAmount(cotisation)) }} €</td>
            </tr>
          </tbody>
        </table>
  
        <div class="mt-6 text-sm space-y-1">
          <p><strong>Salaire brut :</strong> {{ format(brutTotal) }} €</p>
          <p><strong>Total cotisations :</strong> {{ format(totalCharges) }} €</p>
          <p><strong>Salaire net :</strong> {{ format(netToPay - pay.taxAtSource) }} €</p>
        </div>
  
        <div class="mt-6 border border-gray-300 rounded p-4">
          <h2 class="text-lg font-semibold text-gray-700 mb-2">Congés</h2>
          <div class="grid grid-cols-2 gap-4 text-sm">
            <p><strong>Congés acquis :</strong> {{ pay.leave.acquired }} jours</p>
            <p><strong>Congés pris :</strong> {{ pay.leave.taken }} jours</p>
          </div>
        </div>
  
        <div class="mt-6 text-xs text-gray-500 border-t pt-4 whitespace-pre-line">
          {{ pay.footer }}
          <p class="text-sm text-gray-600 mt-6 font-semibold">Signature de l’employeur :</p>
          <div class="mt-10 border-t border-gray-300 w-64"></div>
        </div>
      </div>
  
      <!-- Formulaire -->
      <form class="max-w-4xl mx-auto bg-white p-8 shadow rounded-xl space-y-10">
  
        <!-- Entreprise -->
        <div>
          <h2 class="text-xl font-bold mb-4">🏢 Informations entreprise</h2>
          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="text-xs text-gray-500">Nom légal de l'entreprise</label>
              <input v-model="pay.employerName" class="p-3 border rounded w-full" />
            </div>
            <div>
              <label class="text-xs text-gray-500">Numéro SIRET</label>
              <input v-model="pay.employerSiret" class="p-3 border rounded w-full" />
            </div>
            <div class="col-span-2">
              <label class="text-xs text-gray-500">Adresse complète</label>
              <textarea v-model="pay.employerAddress" rows="2" class="p-3 border rounded w-full" />
            </div>
          </div>
        </div>
  
        <!-- Salarié -->
        <div>
          <h2 class="text-xl font-bold mb-4">👤 Informations salarié</h2>
          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="text-xs text-gray-500">Nom complet</label>
              <input v-model="pay.employeeName" class="p-3 border rounded w-full" />
            </div>
            <div>
              <label class="text-xs text-gray-500">Poste ou fonction</label>
              <input v-model="pay.employeeRole" class="p-3 border rounded w-full" />
            </div>
            <div>
              <label class="text-xs text-gray-500">Date d'entrée dans l'entreprise</label>
              <input v-model="pay.entryDate" type="date" class="p-3 border rounded w-full" />
            </div>
            <div>
              <label class="text-xs text-gray-500">Matricule interne</label>
              <input v-model="pay.employeeId" class="p-3 border rounded w-full" />
            </div>
            <div class="col-span-2">
              <label class="text-xs text-gray-500">Numéro de sécurité sociale</label>
              <input v-model="pay.socialNumber" class="p-3 border rounded w-full" />
            </div>
          </div>
        </div>
  
        <!-- Paie -->
        <div>
          <h2 class="text-xl font-bold mb-4">💰 Détails de paie</h2>
          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="text-xs text-gray-500">Période du bulletin (ex: Mars 2025)</label>
              <input v-model="pay.period" class="p-3 border rounded w-full" />
            </div>
            <div>
              <label class="text-xs text-gray-500">Heures de base</label>
              <input v-model.number="pay.baseHours" type="number" class="p-3 border rounded w-full" />
            </div>
            <div>
              <label class="text-xs text-gray-500">Taux horaire brut (€)</label>
              <input v-model.number="pay.baseRate" type="number" class="p-3 border rounded w-full" />
            </div>
            <div>
              <label class="text-xs text-gray-500">Heures supplémentaires</label>
              <input v-model.number="pay.extraHours" type="number" class="p-3 border rounded w-full" />
            </div>
            <div>
              <label class="text-xs text-gray-500">Prime exceptionnelle (€)</label>
              <input v-model.number="pay.bonusAmount" type="number" class="p-3 border rounded w-full" />
            </div>
            <div>
              <label class="text-xs text-gray-500">Impôt à la source (€)</label>
              <input v-model.number="pay.taxAtSource" type="number" class="p-3 border rounded w-full" />
            </div>
          </div>
        </div>
  
        <!-- Cotisations -->
        <div>
          <h2 class="text-xl font-bold mb-4">📉 Cotisations sociales</h2>
          <div v-for="(cotisation, i) in pay.charges" :key="i" class="grid grid-cols-3 gap-4 mb-2">
            <input v-model="cotisation.label" placeholder="Nom (ex: URSSAF)" class="p-3 border rounded" />
            <input v-model.number="cotisation.rate" type="number" placeholder="Taux (%)" class="p-3 border rounded" />
            <button @click.prevent="pay.charges.splice(i, 1)" class="text-red-500 text-sm">Supprimer</button>
          </div>
          <button @click.prevent="pay.charges.push({ label: '', rate: 0 })" class="text-blue-600 text-sm">
            + Ajouter une cotisation
          </button>
        </div>
  
        <!-- Congés -->
        <div>
          <h2 class="text-xl font-bold mb-4">🏖️ Congés</h2>
          <div class="grid grid-cols-2 gap-4">
            <input v-model.number="pay.leave.acquired" type="number" placeholder="Congés acquis" class="p-3 border rounded" />
            <input v-model.number="pay.leave.taken" type="number" placeholder="Congés pris" class="p-3 border rounded" />
          </div>
        </div>
  
        <!-- Mentions -->
        <div>
          <h2 class="text-xl font-bold mb-4">📝 Mentions complémentaires</h2>
          <textarea v-model="pay.footer" rows="3" class="p-3 border rounded w-full" placeholder="Ex : IBAN ou mentions légales…" />
        </div>
  
        <!-- Actions -->
        <div class="flex justify-end gap-4 pt-6 border-t">
          <button @click="generatePDF('preview')" type="button" class="bg-gray-300 px-6 py-3 rounded hover:bg-gray-400">👁️ Aperçu PDF</button>
          <button @click="generatePDF('download')" type="button" class="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700">⬇️ Télécharger</button>
        </div>
      </form>
    </div>
  </template>
  
  <script setup>
  import { ref, computed, onMounted } from 'vue'
  
  const pdfContent = ref(null)
  
  const pay = ref({
    employerName: 'ENTREPRISE EXEMPLE',
    employerAddress: '123 rue Exemple\n75000 Paris',
    employerSiret: 'SIRET : 123 456 789 00012',
    employeeName: 'Jean Dupont',
    employeeRole: 'Développeur Web',
    entryDate: '2023-01-01',
    employeeId: 'EMP-00123',
    socialNumber: '1 84 12 75 123 456',
    period: 'Mars 2025',
    baseHours: 151.67,
    baseRate: 15.0,
    bonusAmount: 100,
    extraHours: 10,
    taxAtSource: 42.75,
    leave: { acquired: 2.5, taken: 1 },
    charges: [
      { label: 'URSSAF', rate: 15 },
      { label: 'Retraite complémentaire', rate: 8 },
    ],
    footer: `Bulletin généré par Doczy.\nIBAN : FR76 XXXX XXXX XXXX XXXX XXXX XXXX`
  })
  
  const format = (val) => Number(val).toFixed(2)
  const extraPay = computed(() => pay.value.extraHours * pay.value.baseRate * 1.25)
  const brutTotal = computed(() => pay.value.baseHours * pay.value.baseRate + (pay.value.bonusAmount || 0) + (extraPay.value || 0))
  const chargeAmount = (cotisation) => (brutTotal.value * cotisation.rate) / 100
  const totalCharges = computed(() => pay.value.charges.reduce((sum, c) => sum + chargeAmount(c), 0))
  const netToPay = computed(() => brutTotal.value - totalCharges.value)
  
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
      pdf.save(`fiche-de-paie-${pay.value.employeeName}.pdf`)
    }
  }
  </script>  