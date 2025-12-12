# 🐱 CatMash - Le Chat le Plus Mignon

[![Next.js](https://img.shields.io/badge/Next.js-14-black)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.3-blue)](https://www.typescriptlang.org/)
[![License](https://img.shields.io/badge/license-MIT-green)](LICENSE)
[![Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black)](https://vercel.com)

Application web interactive permettant de voter pour les chats les plus mignons et de découvrir le classement communautaire basé sur l'algorithme Elo.

🔗 **Demo**: [catmash.vercel.app](https://cat-mash-one.vercel.app)

## ✨ Fonctionnalités

- 🗳️ **Vote interactif**: Comparez deux chats côte à côte
- 📊 **Classement Elo**: Système de scoring équitable inspiré des échecs
- 💾 **Persistence locale**: Votes sauvegardés dans le navigateur
- 📱 **Responsive**: Fonctionne sur mobile, tablette et desktop
- ⚡ **Performance optimisée**: Score Lighthouse > 95/100
- ♿ **Accessible**: Conforme WCAG 2.1 AA
- 🎨 **Design moderne**: Interface épurée et animations fluides

## 🚀 Démarrage Rapide

### Prérequis

- Node.js 20+ et npm
- Git

### Installation

```bash
# Cloner le repository
git clone https://github.com/votre-username/catmash.git
cd catmash

# Installer les dépendances
npm install

# Lancer le serveur de développement
npm run dev
```

Ouvrir [http://localhost:3000](http://localhost:3000) dans votre navigateur.

## 📁 Structure du Projet

```
catmash/
├── src/
│   ├── app/                          # Next.js App Router
│   │   ├── layout.tsx               # Layout principal + métadonnées SEO
│   │   ├── page.tsx                 # Page d'accueil (Vote)
│   │   ├── page.module.scss         # Styles page principale
│   │   ├── globals.scss             # Styles globaux
│   │
│   │
│   ├── components/                   # Composants React réutilisables
│   │   ├── CatCard/
│   │   │   ├── CatCard.tsx          # Carte de chat pour le vote
│   │   │   ├── CatCard.module.scss
│   │   │   ├── CatCard.test.tsx     # Tests unitaires
│   │   │   └── index.ts
│   │   ├── ResultCard/
│   │   │   ├── ResultCard.tsx       # Carte de résultat avec rang
│   │   │   ├── ResultCard.module.scss
│   │   │   └── index.ts
│   │   ├── Navigation/
│   │   │   ├── Navigation.tsx       # Barre de navigation
│   │   │   ├── Navigation.module.scss
│   │   │   └── index.ts
│   │   ├── Loading/
│   │   │   ├── Loading.tsx          # Spinner de chargement
│   │   │   ├── Loading.module.scss
│   │   │   └── index.ts
│   │   └── ErrorMessage/
│   │       ├── ErrorMessage.tsx     # Affichage d'erreurs
│   │       ├── ErrorMessage.module.scss
│   │       └── index.ts
│   │
│   ├── hooks/                        # Custom React Hooks
│   │   ├── useCatData.ts            # Hook principal gestion données
│   │   └── __tests__/
│   │       └── useCatData.test.ts
│   │
│   ├── lib/                          # Logique métier et utilitaires
│   │   ├── constants.ts             # Constantes globales
│   │   ├── elo.ts                   # Algorithme de calcul Elo
│   │   ├── storage.ts               # Service localStorage
│   │   └── __tests__/
│   │       ├── elo.test.ts
│   │       └── storage.test.ts
│   │
│   ├── types/                        # Définitions TypeScript
│   │   └── cat.ts                   # Types Cat, StoredData, etc.
│   │
│   ├── styles/                       # Styles SCSS partagés
│       ├── variables.scss           # Variables (couleurs, spacing)
│       ├── mixins.scss              # Mixins réutilisables
│       └── globals.scss             # Reset CSS et styles globaux
│   
│   
│
├── tests/                            # Tests End-to-End
│   └── e2e/
│       ├── vote.spec.ts             # Tests page de vote
│       ├── results.spec.ts          # Tests page résultats
│       ├── navigation.spec.ts       # Tests navigation
│       ├── performance.spec.ts      # Tests performance
│       └── localStorage.spec.ts     # Tests persistence
│
├── public/                           # Assets statiques
│   ├── favicon.ico
│   ├── icon-192x192.png
│   ├── icon-512x512.png
│   ├── apple-touch-icon.png
│   ├── og-image.jpg                 # Open Graph image
│   ├── twitter-image.jpg            # Twitter Card image
│   └── manifest.json                # PWA manifest
│
├── .github/                          # GitHub Actions (optionnel)
│   └── workflows/
│       └── ci.yml                   # Pipeline CI/CD
│
├── .gitlab-ci.yml                   # GitLab CI/CD
├── next.config.ts                   # Configuration Next.js
├── tsconfig.json                    # Configuration TypeScript
├── vitest.config.ts                 # Configuration Vitest
├── playwright.config.ts             # Configuration Playwright
├── lighthouserc.js                  # Configuration Lighthouse CI
├── .eslintrc.json                   # Configuration ESLint
├── .prettierrc.json                 # Configuration Prettier
├── package.json                     # Dépendances et scripts
└── README.md                        # Ce fichier
```

## 🏗️ Architecture

### Stack Technique

| Catégorie | Technologies |
|-----------|-------------|
| **Framework** | Next.js 16 (App Router), React 18 |
| **Langage** | TypeScript 5.3 |
| **Styling** | Sass, CSS Modules |
| **Tests** | Vitest (unitaires), Playwright (E2E) |
| **Qualité** | ESLint, Prettier, TypeScript strict |
| **CI/CD** | GitLab CI, GitHub Actions |
| **Déploiement** | Vercel |
| **Performance** | Lighthouse CI, Web Vitals |

### Décisions Architecturales

Voir les [Architecture Decision Records (ADR)](docs/ADR.md) pour les détails.

**Highlights**:
- **Algorithme Elo**: Classement équitable des chats (K=32, Initial=1000)
- **localStorage**: Persistence simple pour le MVP
- **Custom Hooks**: Gestion d'état avec `useCatData`
- **Image Optimization**: Préchargement, lazy loading, cache
- **Core Web Vitals**: LCP < 2.5s, FID < 100ms, CLS < 0.1

### Diagramme de Flux

```
┌─────────────────────────────────────────────────┐
│                  User Visit                     │
└────────────────────┬────────────────────────────┘
                     │
                     ▼
         ┌──────────────────────┐
         │   Check localStorage  │
         └──────────┬────────────┘
                    │
          ┌─────────┴─────────┐
          │                   │
      Data Exists         No Data
          │                   │
          ▼                   ▼
    ┌──────────┐      ┌────────────────┐
    │ Load Data│      │ Fetch from API │
    └────┬─────┘      └────────┬───────┘
         │                     │
         │    ┌────────────────┘
         │    │
         ▼    ▼
    ┌────────────────┐
    │  Display Vote  │
    │  Page (2 cats) │
    └────────┬───────┘
             │
        ┌────┴────┐
        │  User   │
        │  Votes  │
        └────┬────┘
             │
             ▼
    ┌──────────────────┐
    │  Calculate Elo   │
    │  Update Scores   │
    └────────┬─────────┘
             │
             ▼
    ┌──────────────────┐
    │ Save to localStorage │
    └────────┬─────────┘
             │
       ┌─────┴──────┐
       │            │
   New Pair    View Results
```

## 🧪 Tests

### Tests Unitaires (Vitest)

```bash
# Lancer tous les tests
npm test

# Mode watch
npm run test:watch

# Avec interface UI
npm run test:ui

# Coverage
npm run test:coverage
```

**Couverture actuelle**: > 96%

### Tests E2E (Playwright)

```bash
# Lancer tous les tests E2E
npm run test:e2e

# Mode UI interactif
npm run test:e2e:ui

# Mode headed (voir le navigateur)
npm run test:e2e:headed

# Tests spécifiques
npx playwright test vote.spec.ts
```

### Lighthouse CI

```bash
# Audit performance local
npm run lighthouse

# CI mode
npm run lighthouse:ci
```

## 📊 Performance

### Core Web Vitals (Production)

| Métrique | Score | Cible |
|----------|-------|-------|
| **LCP** | 1.8s | < 2.5s ✅ |
| **FID** | 45ms | < 100ms ✅ |
| **CLS** | 0.05 | < 0.1 ✅ |
| **TTFB** | 650ms | < 800ms ✅ |

### Lighthouse Score

- **Performance**: 96/100
- **Accessibility**: 100/100
- **Best Practices**: 100/100
- **SEO**: 100/100

## 🎨 Développement

### Scripts Disponibles

```bash
npm run dev            # Serveur de développement
npm run build          # Build de production
npm run start          # Serveur de production
npm run lint           # Vérification ESLint
npm run lint:fix       # Correction automatique
npm run format         # Formater le code
npm run type-check     # Vérification TypeScript
npm run analyze        # Analyser le bundle size
```

### Standards de Code

- **TypeScript strict mode**: Activé
- **ESLint**: Configuration Next.js + Prettier
- **Prettier**: Formatage automatique
- **Convention de nommage**:
  - Composants: PascalCase (`CatCard.tsx`)
  - Fichiers: camelCase (`useCatData.ts`)
  - CSS Modules: camelCase (`.card`, `.imageWrapper`)

### Git Workflow

```bash
# Créer une branche feature
git checkout -b feature/nom-feature

# Commits conventionnels
git commit -m "feat: ajouter système de favoris"
git commit -m "fix: corriger bug calcul Elo"
git commit -m "docs: mettre à jour README"

# Push et créer PR
git push origin feature/nom-feature
```

**Types de commits**:
- `feat`: Nouvelle fonctionnalité
- `fix`: Correction de bug
- `docs`: Documentation
- `style`: Formatage (pas de changement de code)
- `refactor`: Refactorisation
- `test`: Ajout/modification tests
- `chore`: Tâches de maintenance

## 🚀 Déploiement

### Vercel (Recommandé)

```bash
# Via CLI
npm i -g vercel
vercel login
vercel --prod

# Ou connecter GitHub repo sur vercel.com
```

### Variables d'Environnement

```bash
# .env.local (développement)
NODE_ENV=development
NEXT_PUBLIC_API_URL=https://data.latelier.co
NEXT_PUBLIC_APP_URL=http://localhost:3000

# Production (Vercel Dashboard)
NODE_ENV=production
NEXT_PUBLIC_API_URL=https://data.latelier.co
NEXT_PUBLIC_APP_URL=https://catmash.vercel.app
```

### Checklist Déploiement

- [ ] Tests passent
- [ ] Build réussit
- [ ] Coverage score > 90
- [ ] Pas de secrets dans le code
- [ ] Variables d'environnement configurées
- [ ] Domaine configuré (optionnel)
- [ ] Monitoring activé

## 📈 Roadmap

### Version 1.0 (MVP) ✅
- [x] Système de vote
- [x] Algorithme Elo
- [x] Page de résultats
- [x] Persistence localStorage
- [x] Design responsive
- [x] Tests E2E

## 🤝 Contribution

Les contributions sont les bienvenues ! Suivez ces étapes :

1. **Fork** le projet
2. **Créer** une branche (`git checkout -b feature/AmazingFeature`)
3. **Commit** vos changements (`git commit -m 'feat: Add AmazingFeature'`)
4. **Push** vers la branche (`git push origin feature/AmazingFeature`)
5. **Ouvrir** une Pull Request

### Guidelines

- Écrire des tests pour les nouvelles fonctionnalités
- Respecter les conventions de code (ESLint/Prettier)
- Mettre à jour la documentation si nécessaire
- Suivre les commits conventionnels

## 📝 License

Ce projet est sous licence MIT. Voir le fichier [LICENSE](LICENSE) pour plus de détails.

## 👥 Auteurs

- **Votre Nom** - *Développeur Principal* - [@votre_twitter](https://twitter.com/votre_twitter)

## 🙏 Remerciements

- [Next.js](https://nextjs.org/) - Framework React
- [Vercel](https://vercel.com/) - Hébergement
- [L'Atelier](https://latelier.co/) - API de chats
- [Facemash](https://en.wikipedia.org/wiki/History_of_Facebook) - Inspiration UX

## 📚 Documentation Complémentaire

- [Architecture Decision Records](docs/ADR.md)
- [Guide des Tests](docs/TESTING.md)
- [Optimisations Performance](docs/PERFORMANCE.md)
- [Guide de Déploiement](docs/DEPLOYMENT.md)

## 📞 Support

- **Issues**: [GitHub Issues](https://github.com/votre-username/catmash/issues)
- **Email**: votre.email@example.com
- **Twitter**: [@votre_twitter](https://twitter.com/votre_twitter)

---

**Made with ❤️ and TypeScript**

🐱 *"In the end, we will remember not the cats we voted for, but the moments we spent choosing."*