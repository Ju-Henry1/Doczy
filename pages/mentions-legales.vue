<template>
  <div class="container">
    <div class="content">
      <h1 class="title">📄 Mentions Légales</h1>

      <section class="legal-info">
        <div class="section">
          <h2 class="subtitle">Éditeur</h2>
          <p><strong>Doczy</strong> est une application personnelle développée et maintenue par Julien Henry.<br />
            Cette application est proposée sans but commercial.<br />
            Contact : contact.henryjulien@gmail.com</p>
        </div>

        <div class="section">
          <h2 class="subtitle">Responsable de publication</h2>
          <p>Julien Henry</p>
        </div>

        <div class="section">
          <h2 class="subtitle">Hébergement</h2>
          <p>Ce site est hébergé par Vercel Inc.<br />
            440 N Barranca Ave #4133, Covina, CA 91723, USA<br />
            Site web : <a href="https://vercel.com" target="_blank">https://vercel.com</a></p>
        </div>

        <div class="section">
          <h2 class="subtitle">Propriété intellectuelle</h2>
          <p>
            Le contenu de l'application (textes, images, interface) est la propriété exclusive de Julien Henry, sauf mention contraire. Toute reproduction ou utilisation non autorisée est interdite.
          </p>
        </div>

        <div class="section">
          <h2 class="subtitle">Cookies et données personnelles</h2>
          <p>
            L'application ne collecte aucune donnée personnelle sans votre consentement. Aucun cookie n'est utilisé à des fins de suivi publicitaire. Toutes les données sont traitées localement dans votre navigateur.
          </p>
        </div>

        <div class="section">
          <h2 class="subtitle">Crédits</h2>
          <p>
            Icônes par <a href="https://lucide.dev" class="link" target="_blank">Lucide</a>, illustrations libres de droits.
          </p>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup>
  useHead({
    title: 'Mentions Légales - Doczy',
    meta: [{ name: 'description', content: 'Informations légales de Doczy.' }],
  });
</script>

<style scoped>
/* Importation de la font Roboto depuis Google Fonts */
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap');
/* Global styles */
.container {
  font-family: 'Roboto', sans-serif;
  min-height: 100vh;
  background-color: white;
  padding: 16px 24px;
}

.content {
  max-width: 1024px;
  margin: 0 auto;
}

/* Title styles */
.title {
  font-size: 2.25rem;
  font-weight: bold;
  color: #2b6cb0;
  margin-bottom: 24px;
}

/* Legal section styles */
.legal-info {
  line-height: 1.8;
}

.section {
  margin-bottom: 24px;
}

.subtitle {
  font-size: 1.25rem;
  font-weight: bold;
  color: #1a202c;
  margin-bottom: 12px;
}

p {
  font-size: 1rem;
  color: #4a5568;
}

a.link {
  color: #3182ce;
  text-decoration: none;
}

a.link:hover {
  text-decoration: underline;
}

/* Media Queries for responsiveness */
@media (max-width: 768px) {
  .title {
    font-size: 1.75rem;
  }

  .subtitle {
    font-size: 1.125rem;
  }

  p {
    font-size: 0.875rem;
  }
}

@media (max-width: 480px) {
  .container {
    padding: 16px;
  }

  .title {
    font-size: 1.5rem;
  }

  .subtitle {
    font-size: 1rem;
  }

  p {
    font-size: 0.875rem;
  }
}
</style>
