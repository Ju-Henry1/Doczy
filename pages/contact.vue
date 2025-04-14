<template>
    <div class="min-h-screen bg-gray-50 py-16 px-6">
      <div class="max-w-3xl mx-auto">
        <h1 class="text-3xl font-bold text-blue-800 mb-8 text-center">📬 Contactez l'équipe Doczy</h1>
        <p class="text-gray-600 text-center max-w-xl mx-auto mb-10">
          Une question, une suggestion, un bug ? Remplissez ce formulaire et nous reviendrons vers vous rapidement.
        </p>
  
        <form @submit.prevent="submitForm" class="bg-white shadow rounded-xl p-8 space-y-6">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Votre nom</label>
            <input v-model="form.name" required type="text" class="w-full border border-gray-300 rounded-md px-4 py-3" />
          </div>
  
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Adresse e-mail</label>
            <input v-model="form.email" required type="email" class="w-full border border-gray-300 rounded-md px-4 py-3" />
          </div>
  
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Objet</label>
            <input v-model="form.subject" required type="text" class="w-full border border-gray-300 rounded-md px-4 py-3" />
          </div>
  
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Message</label>
            <textarea v-model="form.message" required rows="5" class="w-full border border-gray-300 rounded-md px-4 py-3"></textarea>
          </div>
  
          <div class="text-right">
            <button type="submit" class="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition">
              ✉️ Envoyer
            </button>
          </div>
        </form>
  
        <div v-if="success" class="text-green-600 mt-6 text-center">✅ Message envoyé avec succès !</div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  
  const form = ref({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  
  const success = ref(false)
  
  const submitForm = () => {
    // Simulation d'envoi
    console.log('Formulaire envoyé :', form.value)
    success.value = true
  
    // Reset après 3s
    setTimeout(() => {
      form.value = { name: '', email: '', subject: '', message: '' }
      success.value = false
    }, 3000)
  }
  </script>
  
  <style scoped>
  input:focus,
  textarea:focus {
    outline: none;
    ring: 2px;
    ring-color: #3b82f6;
  }
  </style>
  