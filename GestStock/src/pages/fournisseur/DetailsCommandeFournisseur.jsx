import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Header from "../../components/Header";
import BarNavigation from "../../components/BarNavigation";

function DetailsCommandeFournisseur() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [produits, setProduits] = useState([]);
  const [produitChoisi, setProduitChoisi] = useState("");
  const [quantite, setQuantite] = useState(1);
  const [lignes, setLignes] = useState([]);
  const [commande, setCommande] = useState(null);
  const [loading, setLoading] = useState(true);

  const getToken = () => localStorage.getItem("token");

  useEffect(() => {
    if (!id) return;
    const token = getToken();
    const headers = token
      ? { "Content-Type": "application/json", Authorization: `Bearer ${token}` }
      : { "Content-Type": "application/json" };

    const charger = async () => {
      try {
        const [r1, r2, r3] = await Promise.all([
          fetch("http://localhost:8832/api/produits", { headers }),
          fetch(`http://localhost:8832/api/commandes-fournisseur/${id}`, { headers }),
          fetch(`http://localhost:8832/api/lignes-commande-fournisseur/${id}`, { headers })
        ]);

        if (r2.status === 401 || r3.status === 401) {
          alert("Session expirée, veuillez vous reconnecter.");
          return navigate("/login");
        }

        const produitsData = await r1.json();
        setProduits(produitsData);

        const cmdJson = await r2.json();
        if (cmdJson.success) setCommande(cmdJson.data);
        else console.error("Err cmd:", cmdJson);

        const lignesData = await r3.json();
        setLignes(Array.isArray(lignesData) ? lignesData : []);
      } catch (err) {
        console.error("Erreur chargement:", err);
      } finally {
        setLoading(false);
      }
    };

    charger();
  }, [id, navigate]);

  const reloadLignes = async () => {
    const token = getToken();
    const res = await fetch(
      `http://localhost:8832/api/lignes-commande-fournisseur/${id}`,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    const data = await res.json();
    setLignes(Array.isArray(data) ? data : []);
  };

  const supprimerCommande = async () => {
    if (!window.confirm("Voulez-vous vraiment supprimer cette commande ?")) return;
    const token = getToken();
    try {
      const res = await fetch(
        `http://localhost:8832/api/commandes-fournisseur/${id}`,
        {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` }
        }
      );
      if (res.status === 401) {
        alert("Session expirée, veuillez vous reconnecter.");
        return navigate("/login");
      }
      navigate("/commandes-fournisseur");
    } catch (err) {
      console.error("Erreur suppression :", err);
    }
  };

  const ajouterProduit = async () => {
    if (!produitChoisi) return;
    const token = getToken();
    try {
      await fetch("http://localhost:8832/api/lignes-commande-fournisseur", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          commande: parseInt(id, 10),
          produit: parseInt(produitChoisi, 10),
          quantite: quantite,
          prix_unitaire: produits.find(p => p.id === parseInt(produitChoisi, 10)).prix
        })
      });
      setProduitChoisi("");
      setQuantite(1);
      await reloadLignes();
    } catch (err) {
      console.error("Erreur ajout produit :", err);
    }
  };

  const finaliserCommande = async () => {
    const token = getToken();
    if (!token) {
      alert("Vous devez être connecté pour valider cette commande.");
      return navigate("/login");
    }

    const payloadLignes = lignes.map(l => ({
      produit: l.produit,
      quantite: l.quantité,
      prix_unitaire: l.prix_unitaire
    }));

    try {
      const res = await fetch(
        `http://localhost:8832/api/commandes-fournisseur/${id}/valider`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify({ lignes: payloadLignes })
        }
      );

      if (res.status === 401) {
        alert("Session expirée, veuillez vous reconnecter.");
        return navigate("/login");
      }
      if (!res.ok) {
        const err = await res.json();
        console.error("Erreur backend :", err);
        return alert(err.message || "Erreur lors de la validation");
      }

      navigate("/commandes-fournisseur");
    } catch (err) {
      console.error("Erreur validation :", err);
      alert("Erreur de communication avec le serveur.");
    }
  };

  if (loading) return <div className="p-4">Chargement…</div>;
  if (!commande) return <div className="p-4">Commande introuvable</div>;

  return (
    <>
      <Header title={`Commande #${commande.id}`} />
      <div className="p-4 max-w-screen-sm mx-auto">
        <div className="mb-4">
          <h2 className="text-xl font-bold">
            Fournisseur : {commande.fournisseurInfo?.nom}
          </h2>
          <p>
            Date : {new Date(commande.date_commande).toLocaleDateString("fr-FR")}
          </p>
          <p>Statut : {commande.statut}</p>
        </div>

        <div className="grid gap-4 mb-8 sm:grid-cols-2">
          {lignes.map(l => (
            <div key={l.id} className="bg-white p-4 rounded shadow">
              <h3 className="font-semibold">{l.produitInfo?.nom}</h3>
              <p>Quantité : {l.quantité}</p>
              <p>PU : {l.prix_unitaire}€</p>
              <p>Total : {(l.quantité * l.prix_unitaire).toFixed(2)}€</p>
            </div>
          ))}
        </div>

        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="text-lg font-bold mb-4">Ajouter un produit</h3>

          <select
            value={produitChoisi}
            onChange={e => setProduitChoisi(e.target.value)}
            className="p-2 border rounded mb-4 w-full text-black bg-white"
          >
            <option value="">Choisir un produit</option>
            {produits.map(p => (
              <option key={p.id} value={p.id}>
                {p.nom} – {p.prix}€
              </option>
            ))}
          </select>

          <input
            type="number"
            value={quantite}
            onChange={e => setQuantite(parseInt(e.target.value, 10))}
            min="1"
            className="p-2 border rounded mb-4 w-full"
          />

          <div className="flex flex-wrap gap-2">
            <button
              onClick={ajouterProduit}
              disabled={!produitChoisi}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:opacity-50"
            >
              Ajouter
            </button>

            <button
              onClick={finaliserCommande}
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
            >
              Finaliser la commande
            </button>

            <button
              onClick={() => window.history.back()}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Retour
            </button>

            <button
              onClick={supprimerCommande}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            >
              Supprimer la commande
            </button>
          </div>
        </div>
      </div>
      <BarNavigation />
    </>
  );
}

export default DetailsCommandeFournisseur;
