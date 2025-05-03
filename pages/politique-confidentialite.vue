<template>
  <div class="container">
    <div class="content">
      <h1 class="title">🔐 Politique de Confidentialité</h1>

      <section class="section">
        <div class="section-item">
          <h2 class="section-title">1. Introduction</h2>
          <p>
            Doczy est une application personnelle développée par Julien Henry. Le respect de votre vie privée est fondamental. Cette politique de confidentialité décrit comment l’application traite vos données.
          </p>
        </div>

        <div class="section-item">
          <h2 class="section-title">2. Collecte des données</h2>
          <p>
            Aucune donnée personnelle n’est collectée, stockée ou transmise vers un serveur externe. Tous les formulaires (facture, devis, etc.) sont traités <strong>localement dans votre navigateur</strong>.
          </p>
        </div>

        <div class="section-item">
          <h2 class="section-title">3. Utilisation des données</h2>
          <p>
            Les données saisies sont uniquement utilisées pour générer des documents PDF localement sur votre appareil. Elles ne sont jamais partagées, stockées ou utilisées à d'autres fins.
          </p>
        </div>

        <div class="section-item">
          <h2 class="section-title">4. Cookies</h2>
          <p>
            L’application n’utilise aucun cookie publicitaire ou de suivi. Seuls des cookies techniques peuvent être utilisés pour mémoriser vos préférences (comme le thème ou la langue).
          </p>
        </div>

        <div class="section-item">
          <h2 class="section-title">5. Sécurité</h2>
          <p>
            Étant donné que toutes les données sont traitées localement et qu'aucune transmission n'a lieu, les risques liés à la fuite ou à la compromission de données sont très limités.
          </p>
        </div>

        <div class="section-item">
          <h2 class="section-title">6. Vos droits</h2>
          <p>
            Conformément au RGPD, vous avez des droits sur vos données personnelles. Cependant, comme Doczy ne collecte ni ne stocke aucune information, l'exercice de ces droits se limite aux données que vous gérez vous-même sur votre appareil.
          </p>
        </div>

        <div class="section-item">
          <h2 class="section-title">7. Contact</h2>
          <p>
            Pour toute question liée à la confidentialité, vous pouvez contacter Julien Henry à : <a href="mailto:contact.henryjulien@gmail.com" class="contact-link">contact.henryjulien@gmail.com</a>
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
