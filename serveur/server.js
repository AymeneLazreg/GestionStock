import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';

import sequelize from './config/db.js';
import './models/index.js';

import authRoutes from './routes/auth.routes.js';
import userRoutes from './routes/user.route.js';
import produitRoutes from './routes/produit.route.js';
import categorieRoutes from './routes/categorie.route.js';
import mouvementRoutes from './routes/mouvement.route.js';
import commandeFournisseurRoutes from './routes/commandeFournisseur.routes.js';
import ligneCommandeFournisseurRoutes from './routes/ligneCommandeFournisseur.routes.js';
import statistiquesRoutes from './routes/statistiques.routes.js';
import path from "path";


// 🆕 AJOUT
import ligneCommandeClientRoutes from './routes/ligneCommandeClient.routes.js';
import commandeClientRoutes from './routes/commandeClient.routes.js';

import User from './models/user.model.js';

dotenv.config();
const app = express();

// Middleware
app.use(cors({
  origin: '*',
  credentials: true
}));
app.use(express.json());

// Routes API
app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/produits', produitRoutes);
app.use('/api/categories', categorieRoutes);
app.use('/api/mouvements', mouvementRoutes);
app.use('/api/commandes-fournisseur', commandeFournisseurRoutes);
app.use('/api/lignes-commande-fournisseur', ligneCommandeFournisseurRoutes);
app.use("/uploads", express.static(path.resolve("uploads")));
app.use('/api/statistiques', statistiquesRoutes);
app.use('/api/commandes-client', commandeClientRoutes);
app.use('/api/lignes-commande-client', ligneCommandeClientRoutes);

// Création automatique de l'admin si non existant
(async () => {
  const pwdAdmin = await bcrypt.hash('admin', 10);
  await User.findOrCreate({
    where: { email: 'admin@admin.com' },
    defaults: {
      nom: 'Super Admin',
      mdp: pwdAdmin,
      role: 'Admin'
    }
  });
})();

// Démarrage du serveur
const PORT = process.env.PORT || 8832;

try {
  await sequelize.authenticate();
  console.log('✅ Connexion DB OK');

  await sequelize.sync();
  console.log('✅ Modèles synchronisés');

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 Serveur lancé sur http://localhost:${PORT}`);
  });
} catch (error) {
  console.error('❌ Erreur DB:', error);
}
