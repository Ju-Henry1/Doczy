<template>
  <div class="contact-page">
    <div class="container">
      <h1 class="title">📬 Contactez l'équipe Doczy</h1>
      <p class="description">
        Une question, une suggestion, un bug ? Remplissez ce formulaire et nous reviendrons vers vous rapidement.
      </p>

      <form @submit.prevent="submitForm" class="contact-form">
        <div class="form-group">
          <label>Votre nom</label>
          <input v-model="form.name" required type="text" />
        </div>

        <div class="form-group">
          <label>Adresse e-mail</label>
          <input v-model="form.email" required type="email" />
        </div>

        <div class="form-group">
          <label>Objet</label>
          <input v-model="form.subject" required type="text" />
        </div>

        <div class="form-group">
          <label>Message</label>
          <textarea v-model="form.message" required rows="5"></textarea>
        </div>

        <div class="form-submit">
          <button type="submit">✉️ Envoyer</button>
        </div>
      </form>

      <div v-if="success" class="success-message">✅ Message envoyé avec succès !</div>
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
  console.log('Formulaire envoyé :', form.value)
  success.value = true

  setTimeout(() => {
    form.value = { name: '', email: '', subject: '', message: '' }
    success.value = false
  }, 3000)
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap');

.contact-page {
  font-family: 'Roboto', sans-serif;
  background-color: #f9fafb;
  padding: 4rem 1rem;
  display: flex;
  justify-content: center;
}

.container {
  max-width: 768px;
  width: 100%;
}

.title {
  font-size: 2rem;
  font-weight: bold;
  color: #1e3a8a;
  text-align: center;
  margin-bottom: 2rem;
}

.description {
  color: #4b5563;
  text-align: center;
  max-width: 600px;
  margin: 0 auto 2.5rem;
}

.contact-form {
  background: #ffffff;
  padding: 2rem;
  border-radius: 1rem;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  width: 100%;
  box-sizing: border-box;
}

/* Form group styles */
.form-group {
  display: flex;
  flex-direction: column;
}

.form-group label {
  font-size: 0.9rem;
  font-weight: 500;
  color: #374151;
  margin-bottom: 0.5rem;
}

input[type="text"],
input[type="email"],
textarea {
  width: 100%;
  padding: 0.75rem 1rem;
  border: 1px solid #d1d5db;
  border-radius: 0.5rem;
  font-size: 1rem;
  resize: vertical;
  box-sizing: border-box;
}

input:focus,
textarea:focus {
  outline: none;
  border-color: #3b82f6;
  box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.3);
}

/* Submit */
.form-submit {
  text-align: right;
}

.form-submit button {
  background-color: #2563eb;
  color: white;
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 0.5rem;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s;
}

.form-submit button:hover {
  background-color: #1d4ed8;
}

.success-message {
  color: #10b981;
  margin-top: 1.5rem;
  text-align: center;
}

/* Responsive */
@media (max-width: 640px) {
  .contact-form {
    padding: 1.5rem 1rem;
  }

  .title {
    font-size: 1.75rem;
  }

  .form-submit {
    text-align: center;
  }
}
</style>
