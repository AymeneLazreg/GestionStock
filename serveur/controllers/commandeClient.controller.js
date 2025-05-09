// controllers/commandeClient.controller.js
import db from '../models/index.js';
const { CommandeClient, LigneCommandeClient, Produit, Mouvement } = db;


// ✅ Créer une commande AVEC produits (non utilisé par bouton vert)
export const creerCommandeClient = async (req, res) => {
  try {
    const { client, lignes } = req.body;

    if (!client || !Array.isArray(lignes)) {
      return res.status(400).json({ message: "Client ou lignes manquantes" });
    }

    const commande = await CommandeClient.create({
      client : req.user.id,
      statut: 'Validée',
      date_commande: new Date(),
    });

    let montantTotal = 0;

    for (const ligne of lignes) {
      const produit = await Produit.findOne({ where: { nom: ligne.produit } });

      if (!produit || produit.quantite_stock < ligne.quantite) {
        return res.status(400).json({ message: `Produit invalide ou stock insuffisant: ${ligne.produit}` });
      }

      await LigneCommandeClient.create({
        commande: commande.id,
        produit: produit.id,
        quantite: ligne.quantite,
        prix_unitaire: produit.prix,
      });

      produit.quantite_stock -= ligne.quantite;
      await produit.save();

      montantTotal += produit.prix * ligne.quantite;
    }

    commande.montant_totale = montantTotal;
    await commande.save();

    return res.status(201).json({ success: true, data: commande });
  } catch (err) {
    console.error("❌ Erreur création commande:", err);
    return res.status(500).json({ success: false, message: "Erreur serveur", error: err.message });
  }
};

// ✅ Créer commande VIDE (utilisée par bouton vert)
export const creerCommandeVide = async (req, res) => {
  try {
    const { client } = req.body;
    if (!client) {
      return res.status(400).json({ success: false, message: "Client manquant" });
    }

    const commande = await CommandeClient.create({
      client,
      date_commande: new Date(),
      statut: 'En cours',
    });

    res.status(201).json({ success: true, data: commande });
  } catch (e) {
    console.error("❌ Erreur création commande vide :", e);
    res.status(500).json({ success: false, message: "Erreur serveur", error: e.message });
  }
};
// ✅ Obtenir toutes les commandes
export const getCommandesClient = async (req, res) => {
  try {
    
    const commandes = await CommandeClient.findAll({
      include: [{
        model: LigneCommandeClient,
        as: 'lignes',
        include: [{
          model: Produit,
          as: 'produitInfo'
        }]
      }]
    });
    res.status(200).json(commandes);
  } catch (err) {
    console.error("❌ Erreur récupération commandes globales :", err);
    res.status(500).json({ message: "Erreur serveur", error: err.message });
  }
};

// ✅ Obtenir commandes par client
export const getCommandesByClient = async (req, res) => {
  try {
    const { clientId } = req.params;

    const commandes = await CommandeClient.findAll({
      where: { client: clientId },
      include: [{
        model: LigneCommandeClient,
        as: 'lignes',
        include: [{
          model: Produit,
          as: 'produitInfo'
        }]
      }]
    });

    return res.status(200).json(commandes);
  } catch (err) {
    console.error("❌ Erreur récupération commandes:", err);
    return res.status(500).json({ message: "Erreur serveur", error: err.message });
  }
};

// ✅ Obtenir une commande par ID (pour page détail)
export const getCommandeClientById = async (req, res) => {
  try {
    const { id } = req.params;

    const commande = await CommandeClient.findByPk(id, {
      include: [{
        model: LigneCommandeClient,
        as: 'lignes',
        include: [{ model: Produit, as: 'produitInfo' }]
      }]
    });

    if (!commande) {
      return res.status(404).json({ success: false, message: "Commande introuvable" });
    }

    return res.status(200).json({ success: true, data: commande });
  } catch (err) {
    console.error("❌ Erreur getCommandeClientById:", err);
    return res.status(500).json({ message: "Erreur serveur", error: err.message });
  }
};

// ✅ Valider une commande client
export const validerCommande = async (req, res) => {
  try {
    const { id } = req.params;

    const commande = await CommandeClient.findByPk(id, {
      include: [{
        model: LigneCommandeClient,
        as: 'lignes',
        include: [{ model: Produit, as: 'produitInfo' }]
      }]
    });

    if (!commande) {
      return res.status(404).json({ success: false, message: "Commande introuvable" });
    }

    if (commande.statut === "Validée") {
      return res.status(400).json({ success: false, message: "Commande déjà validée" });
    }

    let montantTotal = 0;

    for (const ligne of commande.lignes) {
      const produit = ligne.produitInfo;

      if (!produit || produit.quantite_stock < ligne.quantite) {
        return res.status(400).json({
          success: false,
          message: `Stock insuffisant pour ${produit?.nom ?? "?"}`
        });
      }
      produit.quantite_stock -= ligne.quantite; // Décrémenter le stock
      await produit.save();

      // Créer un mouvement de type "Sortie"
      await Mouvement.create({
        produit: produit.nom,
        quantite: ligne.quantite,
        action: "Sortie",
        date: new Date(),
        utilisateur_id: commande.client
      });

      montantTotal += ligne.quantite * ligne.prix_unitaire;
    }

    // Mettre à jour le statut de la commande
    commande.statut = "Validée";
    commande.montant_totale = montantTotal;
    await commande.save();

    return res.status(200).json({ success: true, message: "Commande validée" });
  } catch (err) {
    console.error("❌ Erreur validation commande :", err);
    res.status(500).json({ success: false, message: "Erreur serveur", error: err.message });
  }
};


// ✅ Supprimer une commande client
export const supprimerCommandeClient = async (req, res) => {
  try {
    const { id } = req.params;

    await LigneCommandeClient.destroy({ where: { commande: id } });
    const deleted = await CommandeClient.destroy({ where: { id } });

    if (deleted === 0) {
      return res.status(404).json({ success: false, message: "Commande introuvable" });
    }

    return res.status(200).json({ success: true, message: "Commande supprimée" });
  } catch (err) {
    console.error("❌ Erreur suppression commande:", err);
    return res.status(500).json({ success: false, message: "Erreur serveur", error: err.message });
  }
};

// ✅ Valider une commande client
export const validerCommandeClient = async (req, res) => {
  try {
    const { id } = req.params;

    const commande = await CommandeClient.findByPk(id, {
      include: [{
        model: LigneCommandeClient,
        as: 'lignes',
        include: [{ model: Produit, as: 'produitInfo' }]
      }]
    });

    if (!commande) {
      return res.status(404).json({ success: false, message: "Commande introuvable" });
    }

    if (commande.statut === "Validée") {
      return res.status(400).json({ success: false, message: "Commande déjà validée" });
    }

    let montantTotal = 0;

    for (const ligne of commande.lignes) {
      const produit = ligne.produitInfo;

      if (!produit || produit.quantite_stock < ligne.quantite) {
        return res.status(400).json({
          success: false,
          message: `Stock insuffisant pour ${produit?.nom ?? "?"}`
        });
      }
      
        
        
      
      montantTotal += ligne.quantite * ligne.prix_unitaire;
    }

    commande.statut = "En Attente";
    commande.montant_totale = montantTotal;
    await commande.save();

    return res.status(200).json({ success: true, message: "Commande validée" });
  } catch (err) {
    console.error("❌ Erreur validation commande :", err);
    res.status(500).json({ success: false, message: "Erreur serveur", error: err.message });
  }
};
