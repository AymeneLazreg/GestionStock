import express from "express";
import Produit from "../models/produit.model.js";
import Mouvement from "../models/mouvement.model.js";
import authenticateToken from "../middleware/auth.js";
import upload from "../middleware/upload.js"; // ✅ middleware image

const router = express.Router();

// ✅ Route POST : création produit + image + mouvement
router.post("/", authenticateToken, upload.single("image"), async (req, res) => {
  try {
    const userId = req.user?.id;
    if (!userId) return res.status(401).json({ message: "Non autorisé" });

    const {
      nom = "",
      description = "",
      prix = "0",
      quantite_stock = "0",
      categorie = "0",
      codebar = ""
    } = req.body;

    const image = req.file?.filename || null;

    const produit = await Produit.create({
      nom,
      description,
      prix: parseFloat(prix),
      quantite_stock: parseInt(quantite_stock),
      categorie: parseInt(categorie),
      codebar,
      image
    });

    await Mouvement.create({
      produit: produit.nom,
      produit_id: produit.id,
      action: "Entrée",
      quantite: parseInt(quantite_stock),
      date: new Date().toISOString().slice(0, 10),
      utilisateur_id: userId
    });

    res.status(201).json(produit);
  } catch (error) {
    console.error("❌ Erreur création produit :", error);
    res.status(500).json({ message: "Erreur serveur", error: error.message });
  }
});

// ✅ Route GET : récupérer tous les produits
router.get("/", async (req, res) => {
  try {
    const produits = await Produit.findAll();
    res.json(produits);
  } catch (error) {
    console.error("Erreur récupération produits :", error);
    res.status(500).json({ message: "Erreur serveur", error: error.message });
  }
});

// ✅ Route GET stats
router.get("/stats", async (req, res) => {
  try {
    const produits = await Produit.findAll();

    const stockMaxTotal = 10000;
    const quantiteTotale = produits.reduce((acc, p) => acc + p.quantite_stock, 0);
    const remplissage = Math.round((quantiteTotale / stockMaxTotal) * 100);

    const ruptureStock = produits.filter(p => p.quantite_stock === 0).length;
    const bientotEpuise = produits.filter(p => p.quantite_stock > 0 && p.quantite_stock <= 10).length;

    res.json({
      remplissage,
      ruptureStock,
      bientotEpuise
    });
  } catch (error) {
    console.error("Erreur stats stock :", error);
    res.status(500).json({ message: "Erreur serveur", error: error.message });
  }
});

// ✅ Route PUT : mise à jour produit + mouvement
router.put("/:id", authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const { quantite_stock } = req.body;

    const produit = await Produit.findByPk(id);
    if (!produit) {
      return res.status(404).json({ message: 'Produit non trouvé' });
    }

    if (produit.quantite_stock !== quantite_stock) {
      const diffQuantite = quantite_stock - produit.quantite_stock;
      produit.quantite_stock = quantite_stock;
      await produit.save();

      const action = diffQuantite > 0 ? 'Entrée' : 'Sortie';

      await Mouvement.create({
        produit: produit.nom,
        action,
        quantite: Math.abs(diffQuantite),
        date: new Date().toISOString().slice(0, 10),
        utilisateur_id: req.user.id
      });

      console.log(`✅ Mouvement ${action} enregistré pour ${produit.nom}`);
    }

    res.status(200).json(produit);
  } catch (error) {
    console.error("❌ Erreur mise à jour produit :", error.message);
    res.status(500).json({ message: "Erreur serveur", error: error.message });
  }
});

// ✅ Route GET : un produit par ID
router.get('/:id', async (req, res) => {
  console.log('Requête reçue pour ID :', req.params.id);
  try {
    const produit = await Produit.findByPk(req.params.id);
    if (!produit) {
      return res.status(404).json({ message: 'Produit non trouvé' });
    }
    res.json(produit);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur serveur', error: error.message });
  }
});

export default router;
