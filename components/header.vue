<template>
  <header class="header">
    <!-- Groupe gauche : logo + nav -->
    <div class="left">
      <NuxtLink to="/" class="logo">DOCZY</NuxtLink>
      <nav class="nav">
        <NuxtLink to="/" class="nav-link">Accueil</NuxtLink>
        <NuxtLink to="/docs" class="nav-link">Documentation</NuxtLink>
        <NuxtLink to="/contact" class="nav-link">Contact</NuxtLink>
      </nav>
    </div>

    <!-- Authentification à droite -->
    <div class="auth">
      <NuxtLink to="/login" class="login">Se connecter</NuxtLink>
      <NuxtLink to="/register" class="signup">S’inscrire</NuxtLink>
    </div>
  </header>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Kablammo&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');


.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 32px;
  background-color: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

/* Logo + nav */
.left {
  display: flex;
  align-items: center;
  gap: 32px;
}

/* Logo */
.logo {
  font-family: 'Kablammo', sans-serif;
  background-color: #5A57E8;
  color: white;
  font-weight: bold;
  font-size: 18px;
  padding: 8px 16px;
  border-radius: 8px;
  text-decoration: none;
}

/* Navigation */
.nav {
  font-family: 'Inter', sans-serif;
  display: flex;
  align-items: center;
  gap: 24px;
}

.nav-link {
  color: #111;
  font-size: 14px;
  text-decoration: none;
}

.nav-link:hover {
  color: #5A57E8;
}

/* Auth à droite */
.auth {
  font-family: 'Inter', sans-serif;
  display: flex;
  align-items: center;
  gap: 16px;
}

.login {
  color: #111;
  font-size: 14px;
  text-decoration: none;
}

.login:hover {
  color: #5A57E8;
}

.signup {
  font-family: 'Inter', sans-serif;
  background-color: #5A57E8;
  color: white;
  font-size: 14px;
  padding: 8px 16px;
  border-radius: 8px;
  text-decoration: none;
}

.signup:hover {
  opacity: 0.9;
}
</style>
