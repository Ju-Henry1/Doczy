<template>
  <div class="container">
    <!-- Hero section -->
    <section class="hero">
      <div class="hero-content">
        <h1 class="hero-title">
          📄 Doczy – Générez vos documents pro en quelques clics
        </h1>
        <p class="hero-description">
          Créez facilement des factures, devis, fiches de paie, contrats et plus encore, gratuitement et sans inscription.
        </p>
        <NuxtLink to="/outils" class="cta-button">
          🚀 Commencer maintenant
        </NuxtLink>
      </div>
    </section>

    <!-- Fonctionnalités clés -->
    <section class="features">
      <div class="features-container">
        <h2 class="features-title">🛠️ Les Avantages</h2>

        <div class="feature-cards">
          <div class="feature-card">
            <h3 class="feature-title">🧾 Documents</h3>
            <p class="feature-description">Créez des documents professionnels pour vos clients, à envoyer en PDF en quelques secondes.</p>
          </div>
          <div class="feature-card">
            <h3 class="feature-title">🔒 Sécurité & Confidentialité</h3>
            <p class="feature-description">Aucune donnée n'est stockée sur nos serveurs. Tout est traité localement dans votre navigateur.</p>
          </div>
          <div class="feature-card">
            <h3 class="feature-title">📱 Accessible partout</h3>
            <p class="feature-description">Utilisez Doczy sur n'importe quel appareil, sans installation ni inscription.</p>
          </div>

        </div>
      </div>
    </section>

    <!-- Appel à l'action -->
    <section class="cta">
      <div class="cta-content">
        <h2 class="cta-title">Générez des documents sans stress, gratuitement.</h2>
        <p class="cta-description">Aucun compte requis. Vos données restent sur votre appareil.</p>
        <NuxtLink to="/outils" class="cta-button">
          ➕ Créer mon premier document
        </NuxtLink>
      </div>
    </section>
  </div>
</template>

<script setup>
useHead({
  title: 'Accueil - Doczy',
  meta: [{ name: 'description', content: 'Bienvenue sur le site officiel de Doczy.' }],
});
</script>

<style scoped>
/* Importation de la font Roboto depuis Google Fonts */
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap');
/* Global container */
.container {
  font-family: 'Roboto', sans-serif;
  margin: 0;
  padding: 0;
}

/* Hero Section */
.hero {
  background-color: white;
  padding: 24px 16px;
  text-align: center;
  border-bottom: 1px solid #f1f1f1;
}

.hero-content {
  max-width: 800px;
  margin: 0 auto;
}

.hero-title {
  font-size: 2.5rem;
  font-weight: bold;
  color: #1a202c;
  margin-bottom: 16px;
}

.hero-description {
  color: #4a5568;
  font-size: 1.25rem;
  margin-bottom: 24px;
}

.cta-button {
  display: inline-block;
  background-color: #3182ce;
  color: white;
  padding: 12px 24px;
  border-radius: 12px;
  text-decoration: none;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: background-color 0.3s;
}

.cta-button:hover {
  background-color: #2b6cb0;
}

/* Features Section */
.features {
  padding: 40px 16px;
}

.features-container {
  max-width: 1000px;
  margin: 0 auto;
}

.features-title {
  font-size: 2.25rem;
  font-weight: bold;
  text-align: center;
  color: #2d3748;
  margin-bottom: 48px;
}

.feature-cards {
  display: grid;
  grid-template-columns: 1fr;
  gap: 32px;
}

.feature-card {
  background-color: white;
  padding: 24px;
  border-radius: 16px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.3s ease;
}

.feature-card:hover {
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15);
}

.feature-title {
  font-size: 1.25rem;
  color: #3182ce;
  font-weight: 600;
  margin-bottom: 8px;
}

.feature-description {
  font-size: 1rem;
  color: #4a5568;
}

/* CTA Section */
.cta {
  background-color: #ebf8ff;
  padding: 64px 16px;
}

.cta-content {
  max-width: 600px;
  margin: 0 auto;
  text-align: center;
}

.cta-title {
  font-size: 1.75rem;
  font-weight: bold;
  color: #1a202c;
  margin-bottom: 16px;
}

.cta-description {
  color: #4a5568;
  margin-bottom: 24px;
}

@media (min-width: 768px) {
  .feature-cards {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 1024px) {
  .feature-cards {
    grid-template-columns: repeat(3, 1fr);
  }
}
</style>
