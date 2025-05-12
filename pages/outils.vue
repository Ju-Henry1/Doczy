<template>
  <div class="container">
    <div class="content">
      <h1 class="title">📂 Tous les outils Doczy</h1>

      <div class="tools-grid">
        <!-- Carte : Facture -->
        <div class="card">
          <div>
            <h2 class="card-title">🧾 Créer une facture</h2>
            <p class="card-description">Générez une facture professionnelle avec vos informations personnalisées.</p>
          </div>
          <NuxtLink to="/facture" class="card-link">➡️ Accéder à l'outil</NuxtLink>
        </div>

        <!-- Carte : Devis -->
        <div class="card">
          <div>
            <h2 class="card-title">📝 Créer un devis</h2>
            <p class="card-description">Éditez rapidement un devis à envoyer à vos clients ou prospects.</p>
          </div>
          <NuxtLink to="/devis" class="card-link">➡️ Accéder à l'outil</NuxtLink>
        </div>

        <!-- Carte : Reçu de paiement -->
        <div class="card">
          <div>
            <h2 class="card-title">💵 Générer un reçu de paiement</h2>
            <p class="card-description">Créez un reçu officiel pour confirmer un règlement reçu par un client.</p>
          </div>
          <NuxtLink to="/recu-paiement" class="card-link">➡️ Accéder à l'outil</NuxtLink>
        </div>

        
        <!-- Carte : Contrat de prestation
        <div class="card">
          <div>
            <h2 class="card-title">📃 Créer un contrat de prestation</h2>
            <p class="card-description">Formalisez une mission de prestation avec un contrat clair entre les parties.</p>
          </div>
          <NuxtLink to="/contrat-prestation" class="card-link">➡️ Accéder à l'outil</NuxtLink>
        </div> -->

        <!-- Tu peux ajouter ici plus d'outils à venir -->
      </div>
    </div>
  </div>
</template>

<script setup>
useHead({
  title: 'Outils - Doczy',
  meta: [{ name: 'description', content: 'Découvrez les outils pratiques proposés par Doczy pour vous et votre entreprise.' }],
});
</script>

<style scoped>
/* Importation de la font Roboto depuis Google Fonts */
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap');

/* Container principal */
.container {
  font-family: 'Roboto', sans-serif;
  min-height: 100vh;
  background-color: #f7fafc;
  padding: 3rem 1.5rem;
}

/* Contenu principal */
.content {
  max-width: 1200px;
  margin: 0 auto;
  text-align: center;
}

/* Titre principal */
.title {
  font-size: 2rem;
  font-weight: bold;
  color: #2d3748;
  margin-bottom: 2.5rem;
}

/* Grille des cartes */
.tools-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 2rem;
}

/* Carte individuelle */
.card {
  background-color: white;
  border-radius: 1rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  transition: box-shadow 0.3s ease;
}

/* Effet au survol de la carte */
.card:hover {
  box-shadow: 0 6px 10px rgba(0, 0, 0, 0.15);
}

/* Titre de la carte */
.card-title {
  font-size: 1.25rem;
  font-weight: 600;
  color: #2b6cb0;
  margin-bottom: 0.5rem;
}

/* Description de la carte */
.card-description {
  font-size: 1rem;
  color: #4a5568;
}

/* Lien vers l'outil */
.card-link {
  margin-top: 1rem;
  font-size: 0.875rem;
  font-weight: 500;
  color: #3182ce;
  text-decoration: none;
  transition: color 0.3s ease;
}

.card-link:hover {
  text-decoration: underline;
  color: #2b6cb0;
}

/* Responsive design pour les écrans plus petits */
@media (max-width: 768px) {
  .title {
    font-size: 1.5rem;
  }

  .card-title {
    font-size: 1.125rem;
  }

  .card-description {
    font-size: 0.875rem;
  }
}
</style>
