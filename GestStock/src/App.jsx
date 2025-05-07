import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { NotificationProvider } from "./context/NotificationContext";

import CommandesClient from "./pages/client/CommandesClient";
import HistoriqueCommandesClient from "./pages/client/HistoriqueCommandesClient";

import NvCommandeClient from "./pages/client/NvCommandeClient";


import CommandesFournisseur from "./pages/fournisseur/CommandesFournisseur";
import HistoriqueCommandesFournisseur from "./pages/fournisseur/HistoriqueCommandesFournisseur";
import NvCommandeFournisseur from "./pages/fournisseur/DetailsCommandeFournisseur";

import Stock from "./pages/gestion/stock";
import HistoriqueStock from "./pages/gestion/HistoriqueStock";
import AjoutProduit from "./pages/gestion/AjoutProduit";
import ModifierProduit from "./pages/gestion/ModifierProduit";

import AccueilGestionnaire from "./pages/gestionnaire/AccueilGestionnaire";
import ListeProduits from "./pages/gestionnaire/ListeProduits";

import Connection from "./pages/auth/Connection";
import Profile from "./pages/auth/Profile";
import ListeUtilisateurs from "./pages/auth/ListeUtilisateurs";
import DetailsCommandeClient from "./pages/client/DetailsCommandeClient";
import StatStock from "./pages/StatStock";





import Scanner from "./pages/utils/Scanner";

import "./App.css";

function App() {
  return (
    <NotificationProvider>
      <Router>
        <Routes>

          {/* Authentification */}
          <Route path="/login" element={<Connection />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/liste-utilisateurs" element={<ListeUtilisateurs />} />

          {/* Pages Client */}
          <Route path="/commandes-client" element={<CommandesClient />} />
          <Route path="/historique-commandes-client" element={<HistoriqueCommandesClient />} />
          <Route path="/nouvelle-commande-client" element={<NvCommandeClient />} />
          <Route path="/details-commande-client/:id" element={<DetailsCommandeClient />} />

          {/* Pages Fournisseur */}
          <Route path="/commandes-fournisseur" element={<CommandesFournisseur />} />
          <Route path="/historique-commandes-fournisseur" element={<HistoriqueCommandesFournisseur />} />
          <Route path="/details-commande-fournisseur" element={<NvCommandeFournisseur />} />
          <Route path="/details-commande-fournisseur/:id" element={<NvCommandeFournisseur />} />

          {/* Pages Gestion */}
          <Route path="/stock" element={<Stock />} />
          <Route path="/historique-stock" element={<HistoriqueStock />} />
          <Route path="/ajout-produit" element={<AjoutProduit />} />
          <Route path="/modifier-produit/:id" element={<ModifierProduit />} />

          {/* Gestionnaire */}
          <Route path="/accueil-gestionnaire" element={<AccueilGestionnaire />} />
          <Route path="/liste-produits" element={<ListeProduits />} />
          <Route path="/scanner" element={<Scanner />} />

          {/* Redirection par défaut */}
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/stat-stock" element={<StatStock />} />

        </Routes>
      </Router>
    </NotificationProvider>
  );
}

export default App;
