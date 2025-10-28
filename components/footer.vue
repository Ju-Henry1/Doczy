<template>
  <footer class="footer">
    <div class="footer-row">
      <div class="footer-left">
        <div class="logo">Doczy</div>
        <nav class="nav">
          <NuxtLink to="/">Accueil</NuxtLink>
          <NuxtLink to="/documentation">Documentation</NuxtLink>
          <NuxtLink to="/contact">Contact</NuxtLink>
        </nav>
      </div>
      <div class="footer-right">
        <NuxtLink to="/mentions-legales">Mentions légales</NuxtLink>
        <NuxtLink to="/confidentialite">Confidentialité</NuxtLink>
      </div>
    </div>
    <div class="footer-bottom">
      © 2025 Doczy – Tous droits réservés.
    </div>
  </footer>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Kablammo&display=swap');

.footer {
  font-family: 'Inter', sans-serif;
  background-color: #f9f9fc;
  border-top: 1px solid #e0e0e0;
  font-size: 14px;
  color: #333;
  padding: 30px 40px 20px;
}

.footer-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
}

.footer-left {
  display: flex;
  align-items: center;
  gap: 40px;
}

.logo {
  font-family: 'Kablammo', sans-serif;
  font-weight: 700;
  font-size: 18px;
  color: #4a46e4;
}

.nav {
  display: flex;
  gap: 24px;
}

.nav a,
.footer-right a {
  color: #444;
  text-decoration: none;
  transition: color 0.2s;
}

.nav a:hover,
.footer-right a:hover {
  color: #4a46e4;
}

.footer-right {
  display: flex;
  gap: 20px;
}

.footer-bottom {
  text-align: center;
  color: #777;
  font-size: 13px;
  margin-top: 20px;
}
</style>
