# TraduHub

TraduHub est une application mobile de marketplace moderne conçue spécialement pour l'Afrique francophone. Elle permet aux utilisateurs d'acheter et vendre des produits avec un design futuriste et une interface utilisateur intuitive.

## 🌟 Fonctionnalités

### Pour tous les utilisateurs
- **Navigation intuitive** : 5 onglets principaux (Accueil, Produits, Fournisseurs, Messages, Menu)
- **Design futuriste** : Interface sombre avec des couleurs lumineuses (#00FFFF)
- **Recherche avancée** : Filtres par catégories, localisation et prix
- **Messagerie intégrée** : Communication directe avec les fournisseurs
- **Localisation** : Support pour toutes les villes francophones d'Afrique

### Utilisateurs simples (Gratuit)
- ✅ Parcourir les produits
- ✅ Contacter les fournisseurs
- ✅ Liker et commenter
- ✅ Acheter des produits
- ✅ Gérer leur profil

### Fournisseurs (5 USD)
- ✅ Toutes les fonctionnalités des utilisateurs simples
- ✅ Publier et gérer des produits
- ✅ Tableau de bord des ventes
- ✅ Outils de gestion avancés
- ✅ Statistiques détaillées

## 🏗️ Architecture technique

### Frontend
- **React Native** : Framework mobile cross-platform
- **TypeScript** : Typage statique pour une meilleure qualité de code
- **React Navigation** : Navigation entre écrans
- **Linear Gradient** : Effets visuels futuristes

### Backend & Base de données
- **Supabase** : Backend-as-a-Service
- **PostgreSQL** : Base de données relationnelle
- **Authentication** : Gestion sécurisée des utilisateurs
- **Real-time** : Messagerie en temps réel

### Design
- **Thème sombre** : Interface moderne et élégante
- **Couleurs cyans (#00FFFF)** : Accent futuriste
- **Gradients** : Effets visuels immersifs
- **Icons emoji** : Interface ludique et universelle

## 📱 Installation

### Prérequis
- Node.js (version 16 ou supérieure)
- React Native CLI
- Android Studio (pour Android)
- Xcode (pour iOS)

### Étapes d'installation

1. **Cloner le repository**
```bash
git clone <repository-url>
cd TraduHub
```

2. **Installer les dépendances**
```bash
npm install
```

3. **Configuration iOS (macOS uniquement)**
```bash
cd ios && pod install && cd ..
```

4. **Lancer l'application**

Pour Android :
```bash
npm run android
```

Pour iOS :
```bash
npm run ios
```

## 🔧 Configuration

### Variables d'environnement
L'application utilise Supabase comme backend. Les clés sont déjà configurées dans `src/config/supabase.ts`.

### Base de données Supabase
Les tables suivantes sont nécessaires :
- `users` : Profils utilisateur
- `suppliers` : Informations fournisseurs
- `products` : Catalogue produits
- `conversations` : Discussions
- `messages` : Messages
- `orders` : Commandes
- `reviews` : Évaluations

## 🌍 Localisation supportée

### Pays et villes inclus :
- **RDC** : Kinshasa, Lubumbashi, Mbuji-Mayi, etc.
- **Cameroun** : Yaoundé, Douala, Bamenda, etc.
- **Côte d'Ivoire** : Abidjan, Bouaké, Daloa, etc.
- **Mali** : Bamako, Sikasso, Mopti, etc.
- **Sénégal** : Dakar, Thiès, Kaolack, etc.
- **Burkina Faso** : Ouagadougou, Bobo-Dioulasso, etc.
- **Et 8 autres pays francophones**

## 💳 Système de paiement

### Pour les fournisseurs
- **Coût** : 5 USD pour l'inscription
- **RDC** : Paiement mobile (+234979401982, +243842578529)
- **Autres pays** : Western Union ou virement bancaire

## 🎨 Guide de style

### Couleurs principales
- **Arrière-plan** : Gradients sombres (#0a0a0a → #1a1a2e → #16213e)
- **Accent** : Cyan lumineux (#00FFFF)
- **Texte** : Blanc (#fff) et gris (#ccc, #666)
- **Bordures** : Gris sombre (#333)

### Typographie
- **Titres** : Bold, couleur cyan
- **Texte principal** : Regular, blanc
- **Texte secondaire** : Regular, gris clair
- **Labels** : Small, gris moyen

## 📂 Structure du projet

```
TraduHub/
├── src/
│   ├── config/
│   │   └── supabase.ts          # Configuration base de données
│   └── screens/
│       ├── AuthScreen.tsx       # Authentification
│       ├── HomeScreen.tsx       # Écran d'accueil
│       ├── ProductsScreen.tsx   # Catalogue produits
│       ├── SuppliersScreen.tsx  # Liste fournisseurs
│       ├── MessagesScreen.tsx   # Messagerie
│       ├── MenuScreen.tsx       # Menu utilisateur
│       └── ProfileScreen.tsx    # Profil utilisateur
├── App.tsx                      # Composant principal
├── index.js                     # Point d'entrée
├── package.json                 # Dépendances
└── README.md                    # Documentation
```

## 🚀 Fonctionnalités à venir

- [ ] Notifications push
- [ ] Géolocalisation GPS
- [ ] Paiement mobile intégré
- [ ] Mode hors-ligne
- [ ] Support multilingue
- [ ] Analytics avancés
- [ ] API tiers (livraison, paiement)

## 🐛 Dépannage

### Problèmes courants

1. **Erreur Metro Bundler**
```bash
npx react-native start --reset-cache
```

2. **Problème de dépendances**
```bash
rm -rf node_modules && npm install
```

3. **Erreur iOS Pods**
```bash
cd ios && rm -rf Pods && pod install
```

## 👥 Contribution

1. Fork le projet
2. Créer une branche feature (`git checkout -b feature/nouvelle-fonctionnalite`)
3. Commit les changements (`git commit -m 'Ajout nouvelle fonctionnalité'`)
4. Push vers la branche (`git push origin feature/nouvelle-fonctionnalite`)
5. Ouvrir une Pull Request

## 📄 Licence

Ce projet est sous licence MIT. Voir le fichier `LICENSE` pour plus de détails.

## 📞 Support

Pour toute question ou support :
- Email : support@traduhub.com
- Téléphone RDC : +243842578529
- Téléphone International : +234979401982

---

**TraduHub v1.0.0** - Made with ❤️ for Africa