<template>
  <footer class="footer">
    <div class="container">
      <div class="footer-grid">
        <!-- Logo + Description -->
        <div class="footer-brand">
          <h2 class="footer-title">Doczy</h2>
          <p class="footer-description">Générez vos documents professionnels en quelques clics.</p>
        </div>

        <!-- Liens utiles -->
        <div class="footer-links-section">
          <h3 class="footer-subtitle">Liens utiles</h3>
          <ul class="footer-links">
            <li><NuxtLink to="/outils" class="footer-link">Outils</NuxtLink></li>
            <li><NuxtLink to="/docs" class="footer-link">Documentation</NuxtLink></li>
            <li><NuxtLink to="/contact" class="footer-link">Contact</NuxtLink></li>
            <li><NuxtLink to="/mentions-legales" class="footer-link">Mentions légales</NuxtLink></li>
            <li><NuxtLink to="/politique-confidentialite" class="footer-link">Politique de confidentialité</NuxtLink></li>
          </ul>
        </div>
      </div>

      <!-- Bas de page -->
      <div class="footer-bottom">
        <p>&copy; {{ new Date().getFullYear() }} Doczy. Tous droits réservés.</p>
      </div>
    </div>
  </footer>
</template>

<script setup>
// Pas de logique nécessaire ici
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap');

.footer {
  font-family: 'Roboto', sans-serif;
  background-color: #f9fafb;
  padding: 48px 24px 32px;
  color: #374151;
  border-top: 1px solid #e5e7eb;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 16px;
}

.footer-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 32px;
  margin-bottom: 32px;
}

.footer-brand {
  max-width: 400px;
}

.footer-title {
  font-size: 1.5rem;
  font-weight: 700;
  color: #111827;
  margin-bottom: 8px;
}

.footer-description {
  font-size: 1rem;
  color: #6b7280;
}

.footer-subtitle {
  font-size: 1.125rem;
  font-weight: 600;
  color: #111827;
  margin-bottom: 12px;
}

.footer-links {
  list-style: none;
  padding: 0;
  margin: 0;
}

.footer-link {
  display: block;
  margin-bottom: 8px;
  color: #1d4ed8;
  text-decoration: none;
  transition: color 0.2s ease-in-out;
}

.footer-link:hover {
  color: #2563eb;
}

.footer-bottom {
  text-align: center;
  font-size: 0.875rem;
  color: #9ca3af;
  border-top: 1px solid #e5e7eb;
  padding-top: 16px;
}

/* Responsive */
@media (min-width: 768px) {
  .footer-grid {
    grid-template-columns: 1fr 1fr;
  }

  .footer-bottom {
    text-align: right;
  }
}
</style>
