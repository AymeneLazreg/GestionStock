import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Header from "../../components/Header";
import BarNavigation from "../../components/BarNavigation";
import { useNotification } from "../../context/NotificationContext";

function ModifierProduit() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { addNotification } = useNotification();
  const [produit, setProduit] = useState(null);
  const [newQuantite, setNewQuantite] = useState("");
  const [loading, setLoading] = useState(true); // Ajout du loading pour l'affichage du produit

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("veuillez vous connecter.");
      navigate("/login");
      return;
    }
    const fetchProduit = async () => {
      try {
        const res = await fetch(`http://localhost:8832/api/produits/${id}`);
        if (!res.ok) throw new Error("Produit non trouvé");
        const data = await res.json();
        setProduit(data);
        setNewQuantite(data.quantite_stock);
        setLoading(false); // Fin du chargement
      } catch (err) {
        console.error("Erreur chargement produit:", err);
        addNotification("❌ Erreur de chargement du produit");
        setLoading(false);
      }
    };

    fetchProduit();
  }, [id, addNotification]);

  const handleChange = (e) => {
    setNewQuantite(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedStock = parseInt(newQuantite);

    if (isNaN(updatedStock) || updatedStock < 0) { // Ajout vérification pour valeur négative
      addNotification("❌ Veuillez saisir une quantité valide (positive)");
      return;
    }

    if (produit.quantite_stock === updatedStock) {
      addNotification("Aucun changement de quantité détecté");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        addNotification("❌ Utilisateur non authentifié");
        return;
      }

      
        const res = await fetch(`http://localhost:8832/api/produits/${id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // Assurez-vous que le token est envoyé
          },
          body: JSON.stringify({ quantite_stock: updatedStock }),
        });

      if (!res.ok) {
        if (res.status === 401) {
          throw new Error("Non autorisé");
        } else if (res.status === 403) {
          throw new Error("Accès interdit");
        } else {
          throw new Error("Erreur lors de la modification du produit");
        }
      }

      addNotification("✅ Produit modifié avec succès !");
      navigate("/stock");
    } catch (err) {
      console.error("Erreur modification produit:", err);
      addNotification("❌ Erreur lors de la modification du produit");
    }
  };

  const handleCancel = () => {
    navigate("/stock");
  };

  if (loading) {
    return <div>Chargement...</div>; // Indication de chargement
  }

  return (
    <>
      <Header title="Modifier Produit" />
      <div className="body">
        {produit ? (
          <form onSubmit={handleSubmit} className="product-form">
          <div className="form-group">
            <label htmlFor="nom">Nom du produit</label>
            <input type="text" id="nom" name="nom" value={produit.nom} disabled />
          </div>
          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              name="description"
              value={produit.description}
              disabled
              rows="3"
            ></textarea>
          </div>
          <div className="form-group">
            <label htmlFor="codebar">Code-barres</label>
            <input
              type="text"
              id="codebar"
              name="codebar"
              value={produit.codebar}
              disabled
            />
          </div>
          <div className="form-group">
            <label htmlFor="quantite_stock">Quantité en stock</label>
            <input
              type="number"
              id="quantite_stock"
              name="quantite_stock"
              value={newQuantite}
              onChange={handleChange}
              min="0"
              required
            />
          </div>
          <div className="form-buttons">
            <button type="submit" className="btn submit-btn">Modifier</button>
            <button type="button" className="btn cancel-btn" style={{marginBottom : "30px"}} onClick={handleCancel}>Annuler</button>
          </div>
        </form>
        
        ) : (
          <p>Produit non trouvé</p> // Affichage message produit introuvable
        )}
      </div>
      <BarNavigation />
    </>
  );
}

export default ModifierProduit;
