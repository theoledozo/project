# Application de Gestion de Courses et Recettes

Une application web moderne pour gérer votre inventaire, votre liste de courses et générer des recettes.

## Fonctionnalités

- 📦 Gestion d'inventaire avec compteur de quantité
- 🛒 Liste de courses interactive
- 🍳 Générateur de recettes intelligent
- 🔍 Recherche en temps réel
- 📱 Interface responsive

## Technologies

- React + TypeScript
- Tailwind CSS
- Supabase
- Google Gemini AI

## Installation

1. Clonez le repository
```bash
git clone [votre-repo]
cd [votre-repo]
```

2. Installez les dépendances
```bash
npm install
```

3. Configurez les variables d'environnement
```bash
cp .env.example .env
```
Remplissez le fichier `.env` avec vos propres clés API.

4. Lancez l'application en développement
```bash
npm run dev
```

## Structure de la base de données Supabase

### Table: inventory_items
- id: bigint (primary key)
- name: text
- quantity: integer
- created_at: timestamp with time zone

### Table: shopping_items
- id: bigint (primary key)
- name: text
- created_at: timestamp with time zone

### Table: recipes
- id: bigint (primary key)
- ingredients: text[]
- suggestion: text
- created_at: timestamp with time zone

## Déploiement

1. Construisez l'application
```bash
npm run build
```

2. Testez la version de production localement
```bash
npm run preview
```

3. Déployez sur votre plateforme préférée (Vercel, Netlify, etc.)

## Contribution

Les contributions sont les bienvenues ! N'hésitez pas à ouvrir une issue ou une pull request. 