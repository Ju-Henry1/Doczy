<template>
  <div class="page-container">
    <main ref="pdfContent" class="content">
      <header>
        <h1>📚 Documentation de Doczy</h1>
        <p class="intro">
          Retrouvez ici toutes les informations pour comprendre, utiliser et exploiter au mieux les outils proposés par Doczy.
        </p>
      </header>

      <section id="start" class="section">
        <h2>🧭 Guide de démarrage rapide</h2>
        <p class="text">
          1. Allez dans la rubrique <NuxtLink to="/outils" class="link">Mes outils</NuxtLink><br />
          2. Sélectionnez un type de document (facture, devis, etc.)<br />
          3. Remplissez le formulaire<br />
          4. Cliquez sur "Aperçu PDF" ou "Télécharger"
        </p>
      </section>

      <section id="types" class="section">
        <h2>📄 Types de documents disponibles</h2>
        <ul class="list">
          <li><strong>Facture :</strong> Pour facturer une prestation ou un produit</li>
          <li><strong>Devis :</strong> Pour envoyer une proposition commerciale</li>
          <li><strong>Reçu :</strong> Pour confirmer un paiement effectué</li>
          <!-- <li><strong>Contrat de prestation :</strong> Pour formaliser une mission ou prestation</li> -->
        </ul>
      </section>

      <section id="privacy" class="section">
        <h2>🔒 Sécurité & Confidentialité</h2>
        <p class="text">
          Vos données ne sont jamais envoyées sur un serveur. Doczy fonctionne en local dans votre navigateur. Aucune inscription ou sauvegarde distante n'est requise.
        </p>
      </section>

      <section id="faq" class="section">
        <h2>❓ Questions fréquentes</h2>
        <div class="faq">
          <details class="faq-item">
            <summary>Puis-je modifier mes documents après génération ?</summary>
            <p>Oui, il vous suffit de revenir sur la page de l’outil, ajuster les champs puis régénérer le PDF.</p>
          </details>
          <details class="faq-item">
            <summary>Est-ce que Doczy est gratuit ?</summary>
            <p>Oui, tous les outils sont accessibles gratuitement sans création de compte.</p>
          </details>
          <details class="faq-item">
            <summary>Mes documents sont-ils sauvegardés ?</summary>
            <p>Non. Tout est effacé lorsque vous quittez la page. Pour garder une trace, téléchargez vos PDF.</p>
          </details>
        </div>
      </section>

      <section id="contact" class="section">
        <h2>📬 Besoin d'aide ?</h2>
        <p class="text">
          Si vous avez un souci ou souhaitez suggérer une nouvelle fonctionnalité, contactez-nous via la page <NuxtLink to="/contact" class="link">contact</NuxtLink>.
        </p>
      </section>
    </main>
  </div>
</template>

<script setup>
  useHead({
  title: 'Documentations - Doczy',
  meta: [{ name: 'description', content: 'Accédez à la documentations.' }],
});
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap');

.page-container {
  font-family: 'Roboto', sans-serif;
  background-color: #ffffff;
  min-height: 100vh;
  padding: 0 20px;
}

.content {
  max-width: 1000px;
  margin: 0 auto;
  padding: 48px 0;
  display: flex;
  flex-direction: column;
  gap: 80px;
}

header h1 {
  font-size: 2.5rem;
  color: #1e40af;
  font-weight: bold;
  margin-bottom: 16px;
}

.intro {
  color: #4b5563;
  font-size: 1.125rem;
  max-width: 720px;
}

.section h2 {
  font-size: 1.75rem;
  font-weight: 600;
  color: #1f2937;
  margin-bottom: 16px;
}

.text {
  color: #4b5563;
  font-size: 0.9rem;
}

.list {
  list-style-type: disc;
  padding-left: 20px;
  color: #4b5563;
  font-size: 0.9rem;
}

.list li {
  margin-bottom: 8px;
}

.link {
  color: #2563eb;
  text-decoration: underline;
  cursor: pointer;
}

.link:hover {
  text-decoration: none;
}

.faq {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.faq-item {
  background-color: #f9fafb;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  padding: 16px;
}

.faq-item summary {
  cursor: pointer;
  font-weight: 500;
  color: #2563eb;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.faq-item p {
  color: #4b5563;
  font-size: 0.9rem;
  margin-top: 8px;
}

@media (max-width: 768px) {
  .content {
    padding: 32px 0;
    gap: 60px;
  }

  header h1 {
    font-size: 2rem;
  }

  .section h2 {
    font-size: 1.5rem;
  }
}
</style>
