<template>
  <footer class="footer">
    <div class="container">
      <div class="footer-content">
        <div class="footer-section">
          <h2 class="footer-title">Doczy</h2>
          <p>Générez vos documents pro en quelques clics.</p>
        </div>

        <div class="footer-section">
          <h3 class="footer-subtitle">Liens utiles</h3>
          <ul class="footer-links">
            <li><NuxtLink to="/outils" class="footer-link">Outils</NuxtLink></li>
            <li><NuxtLink to="/docs" class="footer-link">Documentation</NuxtLink></li>
            <li><NuxtLink to="/contact" class="footer-link">Contact</NuxtLink></li>
            <li><NuxtLink to="/mentions-legales" class="footer-link">Mentions légales</NuxtLink></li>
            <li><NuxtLink to="/politique-confidentialite" class="footer-link">Politique de confidentialité</NuxtLink></li>
          </ul>
        </div>

        <div class="footer-section">
          <p>&copy; {{ new Date().getFullYear() }} Doczy. Tous droits réservés.</p>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
// Pas de logique nécessaire ici
</script>

<style scoped>
/* Importation de la font Roboto depuis Google Fonts */
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap');

/* Général */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

/* Footer */
.footer {
  font-family: 'Roboto', sans-serif;
  background-color: #f3f4f6;
  padding: 40px 24px;
  color: #4b5563;
}

.container {
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 1rem;
}

.footer-content {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.footer-section {
  width: 100%;
}

.footer-title {
  font-size: 1.25rem;
  font-weight: bold;
  color: #1f2937;
}

.footer-subtitle {
  font-size: 1rem;
  font-weight: 600;
  color: #1f2937;
  margin-bottom: 10px;
}

.footer-links {
  list-style: none;
  padding: 0;
}

.footer-link {
  text-decoration: none;
  color: #1e40af;
  transition: color 0.2s ease-in-out;
}

.footer-link:hover {
  color: #2563eb;
}

/* Responsivité */
@media (min-width: 768px) {
  .footer-content {
    flex-direction: row;
    justify-content: space-between;
  }

  .footer-section {
    flex: 1;
  }
}
</style>
