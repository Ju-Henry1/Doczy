<template>
  <header class="header">
    <div class="container">
      <div class="header-content">
        <!-- Logo -->
        <NuxtLink to="/" class="logo">
          📘​ Doczy
        </NuxtLink>

        <!-- Navigation -->
        <nav class="nav">
          <NuxtLink to="/" class="nav-link">Accueil</NuxtLink>
          <NuxtLink to="/docs" class="nav-link">Documentation</NuxtLink>
          <NuxtLink to="/outils" class="nav-link">Les Outils</NuxtLink>
          <NuxtLink to="/contact" class="nav-link">Contact</NuxtLink>
        </nav>
      </div>
    </div>
  </header>
</template>

<script setup>
// Rien à déclarer ici pour l'instant
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

/* Header */
.header {
  font-family: 'Roboto', sans-serif;
  background-color: white;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
  border-bottom: 1px solid #e5e7eb;
  position: sticky;
  top: 0;
  z-index: 50;
}

.container {
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 1rem;
}

.header-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 64px;
}

.logo {
  font-size: 1.25rem;
  font-weight: bold;
  color: #1d4ed8;
  text-decoration: none;
}

.logo:hover {
  color: #2563eb;
}

/* Navigation */
.nav {
  display: flex;
  gap: 24px;
  font-size: 0.875rem;
  font-weight: 500;
  color: #374151;
}

.nav-link {
  text-decoration: none;
  color: inherit;
  transition: color 0.2s ease-in-out;
}

.nav-link:hover {
  color: #1d4ed8;
}

/* Responsivité */
@media (max-width: 768px) {
  .header-content {
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
    height: auto;
  }

  .nav {
    flex-direction: column;
    gap: 12px;
    font-size: 1rem;
  }
}
</style>
