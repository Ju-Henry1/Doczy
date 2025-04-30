<template>
  <div class="container">
    <div class="content">
      <h1 class="title">🔐 Politique de Confidentialité</h1>

      <section class="section">
        <div class="section-item">
          <h2 class="section-title">1. Introduction</h2>
          <p>
            Chez Doczy, la confidentialité de vos données est une priorité. Cette politique de confidentialité explique comment nous traitons vos données lors de l'utilisation de notre application.
          </p>
        </div>

        <div class="section-item">
          <h2 class="section-title">2. Collecte des données</h2>
          <p>
            Doczy ne collecte, ne stocke ni ne transmet aucune donnée personnelle à des serveurs externes. Tous les formulaires (facture, devis, etc.) sont traités <strong>localement dans votre navigateur</strong>.
          </p>
        </div>

        <div class="section-item">
          <h2 class="section-title">3. Utilisation des données</h2>
          <p>
            Les données saisies servent uniquement à générer des documents PDF localement sur votre appareil. Elles ne sont jamais partagées ni utilisées à d'autres fins.
          </p>
        </div>

        <div class="section-item">
          <h2 class="section-title">4. Cookies</h2>
          <p>
            Le site n'utilise aucun cookie à des fins publicitaires ou de suivi. Seuls des cookies techniques peuvent être utilisés pour améliorer l'expérience utilisateur (ex : thème, langue).
          </p>
        </div>

        <div class="section-item">
          <h2 class="section-title">5. Sécurité</h2>
          <p>
            Comme aucune donnée n'est transmise à un serveur, le risque lié à la fuite ou à la compromission des données est considérablement réduit.
          </p>
        </div>

        <div class="section-item">
          <h2 class="section-title">6. Vos droits</h2>
          <p>
            Conformément au RGPD, vous avez le droit d'accéder, de modifier ou de supprimer vos données personnelles. Toutefois, comme Doczy ne conserve aucune donnée, ces droits s'appliquent uniquement à ce que vous gérez localement.
          </p>
        </div>

        <div class="section-item">
          <h2 class="section-title">7. Contact</h2>
          <p>
            Pour toute question concernant la confidentialité, vous pouvez nous contacter à : <a href="mailto:contact@doczy.fr" class="contact-link">contact@doczy.fr</a>
          </p>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup>
// Pas de logique nécessaire ici
</script>

<style scoped>
/* Importation de la font Roboto depuis Google Fonts */
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap');

/* Container principal */
.container {
  font-family: 'Roboto', sans-serif;
  min-height: 100vh;
  background-color: #fff;
  padding: 4rem 1.5rem;
}

/* Contenu principal */
.content {
  max-width: 1100px;
  margin: 0 auto;
  font-family: Arial, sans-serif;
}

/* Titre principal */
.title {
  font-size: 2rem;
  font-weight: bold;
  color: #2b6cb0;
  margin-bottom: 2rem;
  text-align: center;
}

/* Section des éléments */
.section {
  margin-top: 2rem;
}

.section-item {
  margin-bottom: 2rem;
}

/* Titre des sections */
.section-title {
  font-size: 1.25rem;
  font-weight: 600;
  color: #2d3748;
  margin-bottom: 1rem;
}

/* Paragraphe dans chaque section */
.section-item p {
  font-size: 1rem;
  color: #4a5568;
}

/* Lien de contact */
.contact-link {
  color: #3182ce;
  text-decoration: none;
  font-weight: 500;
}

.contact-link:hover {
  text-decoration: underline;
}

/* Responsivité */
@media (max-width: 768px) {
  .title {
    font-size: 1.5rem;
  }

  .section-title {
    font-size: 1.125rem;
  }

  .section-item p {
    font-size: 0.875rem;
  }
}
</style>
