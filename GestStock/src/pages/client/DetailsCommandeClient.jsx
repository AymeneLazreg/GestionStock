import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Header from "../../components/Header";
import BarNavigation from "../../components/BarNavigation";

function DetailsCommandeClient() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [produits, setProduits] = useState([]);
  const [commande, setCommande] = useState(null);
  const [lignes, setLignes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedProduit, setSelectedProduit] = useState(null);
  const [quantite, setQuantite] = useState(1);
  const [recherche, setRecherche] = useState("");


  useEffect(() => {

    const token = localStorage.getItem("token");
  if (!token) {
    alert("veuillez vous connecter.");
    navigate("/login");
    return;
  }
    const charger = async () => {
      try {
        const [pRes, cRes] = await Promise.all([
          fetch("http://localhost:8832/api/produits"),
          fetch(`http://localhost:8832/api/commandes-client/detail/${id}`)
        ]);

        const produitsData = await pRes.json();
        setProduits(produitsData.filter(p => p.quantite_stock > 0));

        const commandeData = await cRes.json();
        setCommande(commandeData.data);
        setLignes(commandeData.data?.lignes || []);
      } catch (err) {
        console.error("Erreur chargement commande:", err);
      } finally {
        setLoading(false);
      }
    };
    charger();
  }, [id]);

  const ajouterProduit = async () => {
    if (!selectedProduit || !quantite) return;
    try {
      await fetch("http://localhost:8832/api/lignes-commande-client", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          commande: parseInt(id),
          produit: selectedProduit.nom,
          quantite: parseInt(quantite),
        }),
      });

      const res = await fetch(`http://localhost:8832/api/commandes-client/detail/${id}`);
      const data = await res.json();
      setCommande(data.data);
      setLignes(data.data?.lignes || []);
      setSelectedProduit(null);
      setQuantite(1);
    } catch (err) {
      console.error("❌ Erreur ajout produit :", err);
    }
  };

  const supprimerCommande = async () => {
    if (!window.confirm("Supprimer cette commande ?")) return;
    try {
      await fetch(`http://localhost:8832/api/commandes-client/${id}`, {
        method: "DELETE"
      });
      navigate("/commandes-client");
    } catch (err) {
      console.error("Erreur suppression:", err);
    }
  };

  const validerCommande = async () => {
    try {
      await fetch(`http://localhost:8832/api/commandes-client/${id}/valider`, {
        method: "PUT"
      });
      navigate("/commandes-client");
    } catch (err) {
      console.error("Erreur validation:", err);
    }
  };

  if (loading) return <div>Chargement…</div>;
  if (!commande) return <div>Commande introuvable</div>;

  return (
    <>
      <Header title={`Commande #${commande.id}`} />
      <div className="p-4">
        <div className="mb-4">
          <p>Date : {new Date(commande.date_commande).toLocaleDateString("fr-FR")}</p>
          <p>Statut : {commande.statut}</p>
          <p>Montant total : {commande.montant_totale.toFixed(2)} €</p>
        </div>

        <div className="grid grid-cols-1 gap-4 mb-8">
          {lignes.map(l => (
            <div key={l.id} className="bg-white p-4 rounded shadow max-w-[300px]">
              <h3 className="font-semibold">{l.produitInfo?.nom}</h3>
              <p>Quantité : {l.quantite}</p>
              <p>PU : {l.prix_unitaire}€</p>
              <p>Total : {(l.quantite * l.prix_unitaire).toFixed(2)}€</p>
            </div>
          ))}
        </div>

        {commande.statut !== "Validée" && (
          <>
            <h3 className="text-lg font-bold mb-2">Produits disponibles</h3>
            <input
  type="text"
  placeholder="Rechercher un produit..."
  value={recherche}
  onChange={(e) => setRecherche(e.target.value)}
  className="w-full p-2 mb-4 border rounded max-w-sm"
/>

            <div className="overflow-x-auto mb-6 max-w-[800px]">
              <div className="flex gap-4">
              {produits
  .filter(p => p.nom.toLowerCase().includes(recherche.toLowerCase()))
  .map(prod => (
    <div
      key={prod.id}
      onClick={() => setSelectedProduit(prod)}
      className="min-w-[160px] cursor-pointer bg-white rounded shadow p-3"
    >
      {prod.image && (
        <img
          src={`http://localhost:8832/uploads/${prod.image}`}
          alt={prod.nom}
          className="w-full h-28 object-cover rounded mb-2 max-h-[200px] max-w-[200px]"
        />
      )}
      <h4 className="font-semibold">{prod.nom}</h4>
      <p>Prix : {prod.prix} €</p>
      <p>Stock : {prod.quantite_stock}</p>
    </div>
))}

              </div>
            </div>

            {selectedProduit && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                <div className="bg-white p-6 rounded shadow max-w-sm w-full">
                  <h2 className="text-lg font-bold mb-4">Ajouter {selectedProduit.nom}</h2>
                  <input
                    type="number"
                    min="1"
                    max={selectedProduit.quantite_stock}
                    value={quantite}
                    onChange={e => setQuantite(e.target.value)}
                    className="p-2 border rounded w-full mb-4"
                  />
                  <div className="flex justify-end gap-4">
                    <button
                      onClick={() => setSelectedProduit(null)}
                      className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500"
                    >
                      Annuler
                    </button>
                    <button
                      onClick={ajouterProduit}
                      className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                    >
                      Ajouter
                    </button>
                  </div>
                </div>
              </div>
            )}

            <div className="flex gap-4 mt-4">
              <button
                onClick={validerCommande}
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
              >
                Valider la commande
              </button>
              <button
                onClick={supprimerCommande}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              >
                Supprimer
              </button>
            </div>
          </>
        )}

        <div className="mt-4">
          <button
            onClick={() => navigate("/commandes-client")}
            className="bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-900"
          >
            Retour
          </button>
        </div>
      </div>
    </>
  );
}

export default DetailsCommandeClient;
