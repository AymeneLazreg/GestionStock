import { useEffect, useState } from "react";
import Header from "../../components/Header";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { useNavigate } from "react-router-dom"
import BarNavigation from "../../components/BarNavigation";


export default function HistoriqueCommandesClient() {
  const [commandes, setCommandes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [modalLoading, setModalLoading] = useState(false);
  const [selectedDetails, setSelectedDetails] = useState(null);
  const [modalLignes, setModalLignes] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const [userRole, setUserRole] = useState(null);
  const [validChecked, setValidChecked] = useState(false); // pour "Validée"
  const [waitingChecked, setWaitingChecked] = useState(false); // pour "En Attente"

  const navigate = useNavigate();

  const itemsPerPage = 3;
  const start = (currentPage - 1) * itemsPerPage;
  const currentCommandes = commandes.slice(start, start + itemsPerPage);
  const totalPages = Math.ceil(commandes.length / itemsPerPage);
  const validerCommande = async (commandeId) => {
    try {
      const res = await fetch(`http://localhost:8832/api/commandes-client/valider/${commandeId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
  
      if (res.ok) {
        // Mise à jour du statut dans l'état local
        setCommandes(prevCommandes =>
          prevCommandes.map(cmd =>
            cmd.id === commandeId ? { ...cmd, statut: "Validée" } : cmd
          )
        );
        // Fermer le modal après la validation
        closeModal();
      } else {
        console.error("Erreur lors de la validation de la commande");
      }
    } catch (error) {
      console.error("Erreur:", error);
    }
  };
  useEffect(() => {

  
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const [, base64Payload] = token.split(".");
        const payload = JSON.parse(atob(base64Payload));
        setUserRole(payload.role);
      } catch (e) {
        console.error("Impossible de décoder le token :", e);
      }
    }
    if (!token) {
      alert("veuillez vous connecter.");
      navigate("/login");
      return;
    }

    const payloadBase64 = token.split('.')[1];
    const payload = JSON.parse(atob(payloadBase64));
    const userId = payload.id; 

    const chargerCommandes = async () => {
      try {
        const res = await fetch("http://localhost:8832/api/commandes-client");
        const data = await res.json();
        console.log("Commandes récupérées :", data);

        let filteredCommandes = data;

        // Si l'utilisateur est admin ou gestionnaire, appliquer les filtres
        if (userRole === "admin" || userRole === "gestionnaire") {
          if (validChecked && waitingChecked) {
            filteredCommandes = data.filter(cmd => cmd.statut === "Validée" || cmd.statut === "En Attente");
          } else if (validChecked) {
            filteredCommandes = data.filter(cmd => cmd.statut === "Validée");
          } else if (waitingChecked) {
            filteredCommandes = data.filter(cmd => cmd.statut === "En Attente");
          }
        } else {
          // Pour les autres utilisateurs, filtrer par userId
          filteredCommandes = data.filter(cmd => 
            (cmd.statut === "Validée" || cmd.statut === "En Attente") && cmd.client === userId
          );
        }
        
        setCommandes(filteredCommandes);
      } catch (err) {
        console.error("Erreur chargement commandes validées:", err);
      } finally {
        setLoading(false);
      }
    };

    chargerCommandes();
  }, [validChecked, waitingChecked, userRole]); // Recharger quand un checkbox est coché/décoché

  const openModal = async (id) => {
    setShowModal(true);
    setModalLoading(true);

    try {
      const res = await fetch(`http://localhost:8832/api/commandes-client/detail/${id}`);
      const json = await res.json();
      const details = json.data ?? json;
      setSelectedDetails(details);
      setModalLignes(details.lignes || []);
    } catch (err) {
      console.error(err);
    } finally {
      setModalLoading(false);
    }
  };

  const handleBack = () => {
    navigate(-1); // 👈 revient à la page précédente dans l'historique
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedDetails(null);
    setModalLignes([]);
  };

  const exporterPDF = (commande) => {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text(`Facture - Commande #${commande.id}`, 14, 20);

    doc.setFontSize(12);
    doc.text(`Date : ${new Date(commande.date_commande).toLocaleDateString('fr-FR')}`, 14, 30);

    autoTable(doc, {
      startY: 40,
      head: [["Produit", "Quantité", "PU (€)", "Total (€)"]], 
      body: commande.lignes.map(ligne => [
        ligne.produitInfo?.nom || "—", 
        ligne.quantite, 
        ligne.prix_unitaire.toFixed(2), 
        (ligne.quantite * ligne.prix_unitaire).toFixed(2)
      ])
    });

    const total = commande.lignes.reduce((sum, l) => sum + l.quantite * l.prix_unitaire, 0).toFixed(2);
    doc.text(`Montant total : ${total} €`, 14, doc.lastAutoTable.finalY + 10);

    doc.save(`Facture_Commande_${commande.id}.pdf`);
  };

  if (loading) return <div className="p-4">Chargement…</div>;

  return (
    <>
      <Header title="Historique Commandes Client" />
      
      {/* Checkbox pour filtrer les statuts */}
      {(userRole === "admin" || userRole === "gestionnaire") && (
        <div className="p-4">
          <label>
            <input
              type="checkbox"
              checked={validChecked}
              onChange={() => setValidChecked(!validChecked)}
            />
            Validée
          </label>
          <label className="ml-4">
            <input
              type="checkbox"
              checked={waitingChecked}
              onChange={() => setWaitingChecked(!waitingChecked)}
            />
            En Attente
          </label>
        </div>
      )}

      <div className="p-4 space-y-4">
        {currentCommandes.map(cmd => (
          <div
            key={cmd.id}
            className="bg-white p-4 rounded shadow cursor-pointer hover:bg-gray-50"
            onClick={() => openModal(cmd.id)}
          >
            <p className="font-semibold text-lg">Commande #{cmd.id}</p>
            <p>Date : {new Date(cmd.date_commande).toLocaleDateString("fr-FR")}</p>
            <p>Total : {cmd.montant_totale.toFixed(2)} €</p>
            <p className="text-green-600 font-semibold">Statut : {cmd.statut}</p>
          </div>
        ))}
      </div>

      {totalPages > 1 && (
        <div className="flex justify-center items-center space-x-2 my-4">
          {[...Array(totalPages)].map((_, i) => {
            const page = i + 1;
            return (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`px-3 py-1 rounded border ${
                  page === currentPage ? "bg-blue-500 text-white" : "bg-white text-gray-700"
                }`}
              >
                {page}
              </button>
            );
          })}
        </div>
      )}

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg w-11/12 max-w-lg p-6 relative">
            <button
              onClick={closeModal}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 text-xl"
            >
              ✕
            </button>

            {modalLoading ? (
              <p>Chargement des détails…</p>
            ) : selectedDetails ? (
              <>
                <h2 className="text-2xl font-bold mb-4">
                  Commande #{selectedDetails.id}
                </h2>
                <p className="mb-2">
                  <span className="font-semibold">Date :</span>{" "}
                  {new Date(selectedDetails.date_commande).toLocaleDateString('fr-FR')}
                </p>

                <div className="space-y-2 mb-4">
                  {modalLignes.length === 0 ? (
                    <p className="italic">Aucune ligne pour cette commande.</p>
                  ) : (
                    modalLignes.map(l => (
                      <div key={l.id} className="flex justify-between border-b pb-2">
                        <span>{l.produitInfo?.nom || "Produit inconnu"}</span>
                        <span>Qté : {l.quantite}</span>
                        <span>PU : {l.prix_unitaire.toFixed(2)}€</span>
                        <span>Total : {(l.quantite * l.prix_unitaire).toFixed(2)}€</span>
                      </div>
                    ))
                  )}
                </div>

                <p className="text-right font-semibold text-lg">
                  Montant total :{" "}
                  {modalLignes.reduce((sum, l) => sum + l.quantite * l.prix_unitaire, 0).toFixed(2)}€
                </p>

                <button
                  onClick={() => exporterPDF(selectedDetails)}
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mt-4"
                >
                  Exporter (PDF)
                </button>


                {(userRole === "admin" || userRole === "gestionnaire") && (selectedDetails.statut == "En Attente")&&(
                <button
                  onClick={() => validerCommande(selectedDetails.id)}
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mt-4 ml-4"
                >
                  Valider
                </button>
                )}
              </>
            ) : (
              <p className="text-red-500">Erreur lors du chargement</p>
            )}
          </div>
        </div>
      )}

      <button
        onClick={handleBack}
        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 mt-4 ml-10 mb-20"
      >
        Retour
      </button>


      {(userRole === "admin" || userRole === "gestionnaire") &&(
                      <BarNavigation />

                )}
    </>
  );
}
