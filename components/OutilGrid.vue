<template>
  <section class="outils-grid">
    <div
      class="outil-card"
      v-for="outil in outils"
      :key="outil.slug"
      @click="goTo(outil.slug)"
    >
      <div class="emoji">{{ outil.emoji }}</div>
      <div class="nouveau" v-if="outil.nouveau">Nouveau</div>
      <h3 class="titre">{{ outil.nom }}</h3>
      <div class="badge" :style="{ backgroundColor: categories[outil.categorie].color + '22', color: categories[outil.categorie].color }" >
        {{ categories[outil.categorie].emoji }} {{ outil.categorie }}
      </div>
      <p class="description">{{ outil.description }}</p>
    </div>
  </section>
</template>

<script setup>
const router = useRouter()

const outils = [
  {
    nom: "Facture",
    slug: "/facture",
    emoji: "🧾",
    categorie: "Facturation",
    description: "Créez une facture professionnelle en quelques clics.",
    nouveau: true
  },
  {
    nom: "Reçu de Paiement",
    slug: "/recu-de-paiement",
    emoji: "📥",
    categorie: "Administratif",
    description: "Générez un reçu officiel de paiement rapidement.",
    nouveau: true
  },
  {
    nom: "Devis",
    slug: "/devis",
    emoji: "📄",
    categorie: "Facturation",
    description: "Préparez vos devis en quelques secondes.",
    nouveau: false
  }
  // ➕ Ajoute d'autres outils ici
]

const categories = {
  "Facturation": { emoji: "🧾", color: "#4b51c1" },
  "Ressources Humaines": { emoji: "👥", color: "#009688" },
  "Administratif": { emoji: "📁", color: "#f57c00" },
  "Commercial": { emoji: "📈", color: "#3f51b5" },
  "Juridique": { emoji: "⚖️", color: "#6a1b9a" },
  "Gestion": { emoji: "📊", color: "#00897b" }
}


function goTo(slug) {
  router.push(slug)
}
</script>

<style scoped>
.outils-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  max-width: 1120px; /* 220px x 5 + 4 * 20px de gap */
  margin: 0 auto;
  gap: 20px;
  padding: 40px 20px;
  justify-items: center; /* centre chaque carte dans sa colonne */
  justify-content: center; /* centre la grille elle-même */
}


.outil-card {
  width: 100%;
  max-width: 300px;
  min-height: 200px;
  border: 1px solid #4b51c1;
  border-radius: 10px;
  padding: 20px;
  font-family: 'Inter', sans-serif;
  cursor: pointer;
  transition: 0.2s ease-in-out;
  position: relative;
  background: white;
  box-sizing: border-box;
}


.outil-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.07);
}

.emoji {
  font-size: 32px;
  margin-bottom: 10px;
}

.nouveau {
  position: absolute;
  top: 10px;
  right: 10px;
  font-size: 12px;
  background-color: #fff0f0;
  color: red;
  border: 1px solid red;
  border-radius: 10px;
  padding: 2px 6px;
}

.titre {
  font-size: 18px;
  font-weight: 600;
  color: #333;
  margin: 10px 0 6px;
}

.badge {
  display: inline-block;
  font-size: 12px;
  padding: 4px 8px;
  background-color: #f0f2ff;
  color: #4b51c1;
  border-radius: 20px;
  font-weight: 500;
  margin-bottom: 10px;
}

.description {
  font-size: 14px;
  color: #555;
  line-height: 1.4;
}
</style>
