<template>
  <header class="header">
    <div class="container">
      <div class="header-content">
        <!-- Logo -->
        <NuxtLink to="/" class="logo">📘 Doczy</NuxtLink>

        <!-- Hamburger (mobile) -->
        <button class="hamburger" @click="isOpen = !isOpen">
          ☰
        </button>

        <!-- Navigation -->
        <nav :class="['nav', { open: isOpen }]">
          <NuxtLink to="/" class="nav-link" @click="isOpen = false">Accueil</NuxtLink>
          <NuxtLink to="/docs" class="nav-link" @click="isOpen = false">Documentation</NuxtLink>
          <NuxtLink to="/outils" class="nav-link" @click="isOpen = false">Les Outils</NuxtLink>
          <NuxtLink to="/contact" class="nav-link" @click="isOpen = false">Contact</NuxtLink>
        </nav>
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref } from 'vue'
const isOpen = ref(false)
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap');

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

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
  position: relative;
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

/* Hamburger button */
.hamburger {
  display: none;
  font-size: 1.5rem;
  background: none;
  border: none;
  cursor: pointer;
  color: #1d4ed8;
}

/* Mobile Styles */
@media (max-width: 768px) {
  .hamburger {
    display: block;
  }

  .nav {
    flex-direction: column;
    align-items: flex-start;
    position: absolute;
    top: 64px;
    left: 0;
    width: 100%;
    background-color: white;
    padding: 1rem;
    border-top: 1px solid #e5e7eb;
    display: none;
  }

  .nav.open {
    display: flex;
  }

  .nav-link {
    padding: 0.5rem 0;
    font-size: 1rem;
  }
}
</style>
