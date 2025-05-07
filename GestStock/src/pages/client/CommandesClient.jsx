import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Header";
import BarNavigation from "../../components/BarNavigation";

function CommandesClient() {
  const navigate = useNavigate();
  const [commandes, setCommandes] = useState([]);
  const [produitsDispo, setProduitsDispo] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("veuillez vous connecter.");
      navigate("/login");
      return;
    }
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) throw new Error("Token manquant");
  
        // 🔓 Décodage du token pour récupérer l'ID
        const payloadBase64 = token.split('.')[1];
        const payload = JSON.parse(atob(payloadBase64));
        const userId = payload.id;

        console.log("ID utilisateur :", userId);
  
        // 1. Récupère toutes les commandes
        const resCmd = await fetch("http://localhost:8832/api/commandes-client", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
  
        if (!resCmd.ok) {
          const errMsg = await resCmd.json();
          throw new Error(errMsg.message || "Erreur lors de la récupération des commandes");
        }
  
        const dataCmd = await resCmd.json();
        const enCours = dataCmd
          .filter(cmd => cmd.statut === "En cours" && cmd.client === userId);
        setCommandes(enCours);
  
        // 2. Récupère tous les produits dispo
        const resProd = await fetch("http://localhost:8832/api/produits");
        const dataProd = await resProd.json();
        setProduitsDispo(dataProd.filter(p => p.quantite_stock > 0));
      } catch (err) {
        console.error("Erreur récupération données :", err);
      }
    };
  
    fetchData();
  }, []);
  

  const handleNouvelle = async () => {
    try {

      const token = localStorage.getItem("token");
        if (!token) throw new Error("Token manquant");
  
         // 🔓 Décodage du token pour récupérer l'ID
        const payloadBase64 = token.split('.')[1];
        const payload = JSON.parse(atob(payloadBase64));
        const userId = payload.id; 

      const res = await fetch("http://localhost:8832/api/commandes-client/nouvelle", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ client: userId })
      });

      const json = await res.json();
      if (!json.success) throw new Error(json.message);

      localStorage.setItem("commandeClientId", json.data.id);
      navigate("/nouvelle-commande-client");
    } catch (err) {
      console.error("Erreur création commande :", err);
    }
  };

  return (
    <>
      <Header title="Commandes Client" />
      <div className="p-4">
        <h2 className="text-lg mb-4">Mes commandes</h2>

        <div className="grid grid-cols-1 gap-4 mb-6 max-w-[300px]">
          {commandes.map(cmd => (
            <div
              key={cmd.id}
              onClick={() => navigate(`/details-commande-client/${cmd.id}`)}
              className="bg-white p-4 rounded shadow hover:bg-gray-50 cursor-pointer"
            >
              <p className="font-semibold"># {cmd.id}</p>
              <p>Date : {new Date(cmd.date_commande).toLocaleDateString('fr-FR')}</p>
              <p>Statut : {cmd.statut}</p>
            </div>
          ))}
        </div>

        <div className="mt-6 flex space-x-2">
          <button
            onClick={handleNouvelle}
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          >
            Nouvelle commande
          </button>

          <button
            onClick={() => navigate("/historique-commandes-client")}
            className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
          >
            Voir l’historique
          </button>
        </div>

        {/* ✅ Produits disponibles avec scroll horizontal */}
        <h3 className="text-lg mt-10 mb-2 font-bold">Produits disponibles</h3>
        <div className="overflow-x-auto">
          <div className="flex gap-4 pb-4 max-w-[800px]">
            {produitsDispo.map((prod, index) => (
              <div key={index} className="min-w-[200px] bg-white p-4 rounded shadow flex-shrink-0 ">
                {prod.image && (
                  <img
                    src={`http://localhost:8832/uploads/${prod.image}`}
                    alt={prod.nom}
                    className="w-full h-32 object-cover rounded mb-2 max-h-[200px] max-w-[200px]"  
                  />
                )}
                <h4 className="font-semibold">{prod.nom}</h4>
                <p>Prix : {prod.prix} €</p>
                <p>Stock : {prod.quantite_stock}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      
    </>
  );
}

export default CommandesClient;
