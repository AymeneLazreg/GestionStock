import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Header";
import BarNavigation from "../../components/BarNavigation";
import axios from "axios";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

function HistoriqueStock() {
  const [historique, setHistorique] = useState([]);
  const [dateDebut, setDateDebut] = useState("");
  const [dateFin, setDateFin] = useState("");
  const navigate = useNavigate();

  const [filtreUtilisateur, setFiltreUtilisateur] = useState("");
  const [filtreProduit, setFiltreProduit] = useState("");
  const [filtreAction, setFiltreAction] = useState("");

  const [page, setPage] = useState(1);
  const itemsParPage = 10;

  const fetchHistorique = async () => {
    try {
      const res = await axios.get("http://localhost:8832/api/mouvements", {
        params: {
          dateDebut,
          dateFin,
        },
      });
      setHistorique(res.data);
    } catch (err) {
      console.error("❌ Erreur lors du chargement de l'historique:", err);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("veuillez vous connecter.");
      navigate("/login");
      return;
    }
    fetchHistorique();
  }, []);

  const handleFiltrer = () => {
    fetchHistorique();
    setPage(1);
  };

  const handleBack = () => {
    navigate(-1);
  };

  const historiqueFiltré = historique.filter((item) => {
    const utilisateurOk =
      filtreUtilisateur === "" ||
      item.utilisateur?.nom?.toLowerCase().includes(filtreUtilisateur.toLowerCase());
    const produitOk =
      filtreProduit === "" ||
      item.produit?.toLowerCase().includes(filtreProduit.toLowerCase());
    const actionOk = filtreAction === "" || item.action === filtreAction;
    return utilisateurOk && produitOk && actionOk;
  });

  const totalPages = Math.ceil(historiqueFiltré.length / itemsParPage);
  const historiquePagine = historiqueFiltré.slice(
    (page - 1) * itemsParPage,
    page * itemsParPage
  );

  const exportPDF = () => {
    const doc = new jsPDF();
    doc.text("Historique des mouvements de stock", 14, 15);
    const tableData = historiqueFiltré.map((item) => {
      const quantityText =
        item.action === "Entrée" ? `+${item.quantite}` : `-${item.quantite}`;
      const utilisateur = item.utilisateur?.nom || "—";
      return [item.date, item.produit, item.action, quantityText, utilisateur];
    });
    autoTable(doc, {
      head: [["Date", "Produit", "Action", "Quantité", "Utilisateur"]],
      body: tableData,
      startY: 20,
    });
    doc.save("historique-stock.pdf");
  };

  return (
    <>
      <Header title="Historique Stock" />

      <style>{`
        .pagination-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(80px, 1fr));
          gap: 10px;
          margin-top: 20px;
          padding: 0 10px;
        }

        .pagination-card {
          text-align: center;
          cursor: pointer;
          padding: 12px;
          border-radius: 12px;
          background-color: #f5f5f5;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          border: none;
          margin-bottom: 20px;
          transition: background-color 0.2s ease;
        }

        .pagination-card:hover {
          background-color: #e0e0e0;
        }

        .active-page {
          background-color: #007bff;
          color: white;
        }

        @media (max-width: 640px) {
          .filter-container {
            flex-direction: column !important;
            gap: 12px;
          }

          .filter-group {
            width: 100%;
          }

          .text-input,
          .select-input,
          .date-input {
            width: 100%;
          }

          .action-buttons {
            flex-direction: column;
            gap: 12px;
          }

          .historique-header,
          .historique-row {
            font-size: 14px;
          }

          .historique-container {
            overflow-x: auto;
          }
        }
      `}</style>

      <div className="body max-w-screen-xl mx-auto px-4">
        <div className="filter-container flex flex-wrap gap-4 justify-between mb-4">
          <div className="filter-group flex flex-col w-full sm:w-auto">
            <label>Du:</label>
            <input
              type="date"
              className="date-input w-full sm:w-48"
              value={dateDebut}
              onChange={(e) => setDateDebut(e.target.value)}
            />
          </div>
          <div className="filter-group flex flex-col w-full sm:w-auto">
            <label>Au:</label>
            <input
              type="date"
              className="date-input w-full sm:w-48"
              value={dateFin}
              onChange={(e) => setDateFin(e.target.value)}
            />
          </div>
          <button className="filter-btn" onClick={handleFiltrer}>
            Filtrer
          </button>
        </div>

        <div className="filter-container flex flex-wrap gap-4 justify-between mb-4">
          <div className="filter-group flex flex-col w-full sm:w-auto">
            <label>Produit:</label>
            <input
              type="text"
              className="text-input w-full sm:w-48"
              value={filtreProduit}
              onChange={(e) => setFiltreProduit(e.target.value)}
              placeholder="Nom du produit"
            />
          </div>

          <div className="filter-group flex flex-col w-full sm:w-auto">
            <label>Utilisateur:</label>
            <input
              type="text"
              className="text-input w-full sm:w-48"
              value={filtreUtilisateur}
              onChange={(e) => setFiltreUtilisateur(e.target.value)}
              placeholder="Nom de l'utilisateur"
            />
          </div>

          <div className="filter-group flex flex-col w-full sm:w-auto">
            <label>Type:</label>
            <select
              className="select-input w-full sm:w-48"
              value={filtreAction}
              onChange={(e) => setFiltreAction(e.target.value)}
              style={{
                backgroundColor: "#ffffff",
              }}
            >
              <option value="">Tous</option>
              <option value="Entrée">Entrée</option>
              <option value="Sortie">Sortie</option>
            </select>
          </div>
        </div>

        <div className="historique-container overflow-x-auto mt-4">
          <div className="historique-header flex justify-between font-bold bg-gray-200 px-4 py-2">
            <div className="historique-cell w-1/5">Date</div>
            <div className="historique-cell w-1/5">Produit</div>
            <div className="historique-cell w-1/5">Action</div>
            <div className="historique-cell w-1/5">Quantité</div>
            <div className="historique-cell w-1/5">Utilisateur</div>
          </div>

          {historiquePagine.map((item, index) => {
            const isPositive = item.action === "Entrée";
            const quantityText = isPositive ? `+${item.quantite}` : `-${item.quantite}`;
            const quantityClass = isPositive ? "positive" : "negative";

            return (
              <div key={index} className="historique-row flex justify-between border-b px-4 py-2">
                <div className="historique-cell w-1/5">{item.date}</div>
                <div className="historique-cell w-1/5">{item.produit}</div>
                <div className="historique-cell w-1/5">{item.action}</div>
                <div className="historique-cell w-1/5">
                  <span className={quantityClass}>{quantityText}</span>
                </div>
                <div className="historique-cell w-1/5">
                  {item.utilisateur?.nom || "—"}
                </div>
              </div>
            );
          })}
        </div>

        <div className="pagination-grid">
          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i}
              className={`pagination-card ${page === i + 1 ? "active-page" : ""}`}
              onClick={() => setPage(i + 1)}
            >
              {i + 1}
            </button>
          ))}
        </div>
      </div>

      <div className="action-buttons flex gap-3 mt-4 px-4">
        <button className="btn" onClick={exportPDF}>
          Exporter (PDF)
        </button>
        <button onClick={handleBack} className="btn">
          Retour
        </button>
      </div>

      <BarNavigation />
    </>
  );
}

export default HistoriqueStock;
