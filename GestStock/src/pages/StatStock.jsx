import { useEffect, useState } from "react";
import Header from "../components/Header";
import BarNavigation from "../components/BarNavigation";
import {
  LineChart, Line, XAxis, YAxis, Tooltip,
  CartesianGrid, ResponsiveContainer, BarChart, Bar, Cell
} from "recharts";
import './StatStock.css';

function StatStock() {
  const [ventes, setVentes] = useState([]);
  const [produitsTop, setProduitsTop] = useState([]);
  const [stockAlertes, setStockAlertes] = useState([]);
  const [chiffreAffaires, setChiffreAffaires] = useState(0);
  const [totalProduitsVendus, setTotalProduitsVendus] = useState(0);
  const [dateDerniereVente, setDateDerniereVente] = useState("");
  const [caParMois, setCaParMois] = useState([]);

  useEffect(() => {
    const chargerDonnees = async () => {
      try {
        const [resVentes, resTop, resStock] = await Promise.all([
          fetch("http://localhost:8832/api/statistiques/ventes"),
          fetch("http://localhost:8832/api/statistiques/top-produits"),
          fetch("http://localhost:8832/api/statistiques/stock-alertes"),
        ]);

        const ventesData = await resVentes.json();
        const topData = await resTop.json();
        const stockData = await resStock.json();

        setVentes(ventesData);
        setProduitsTop(topData);
        setStockAlertes(stockData);

        const totalCA = ventesData.reduce((acc, val) => acc + val.total, 0);
        const totalQte = topData.reduce((acc, val) => acc + val.quantite, 0);
        const derniereDate = ventesData.length > 0 ? ventesData[ventesData.length - 1].date : "";

        // CA par mois pour tableau
        const caMensuel = {};
        ventesData.forEach(v => {
          const mois = new Date(v.date).toLocaleString("fr-FR", { month: "long" });
          caMensuel[mois] = (caMensuel[mois] || 0) + v.total;
        });
        const tableauMensuel = Object.entries(caMensuel).map(([mois, total]) => ({ mois, total }));

        setCaParMois(tableauMensuel);
        setChiffreAffaires(totalCA);
        setTotalProduitsVendus(totalQte);
        setDateDerniereVente(derniereDate);
      } catch (err) {
        console.error("Erreur chargement stats:", err);
      }
    };

    chargerDonnees();
  }, []);

  const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff8042", "#00C49F"];

  return (
    <>
      <Header title="Statistiques Stock" />
      <main className="stat-wrapper">

        {/* Statistiques globales */}
        <div className="stat-cards">
          <div className="bg-green-100 text-green-900 rounded-xl shadow p-4 text-center">
            <div className="text-lg font-bold">{chiffreAffaires.toLocaleString()} €</div>
            <div className="text-sm text-gray-700">Chiffre d'affaires total</div>
          </div>
          <div className="bg-blue-100 text-blue-900 rounded-xl shadow p-4 text-center">
            <div className="text-lg font-bold">{totalProduitsVendus}</div>
            <div className="text-sm text-gray-700">Produits vendus</div>
          </div>
          <div className="bg-yellow-100 text-yellow-900 rounded-xl shadow p-4 text-center">
            <div className="text-lg font-bold">{dateDerniereVente || "Aucune"}</div>
            <div className="text-sm text-gray-700">Dernière vente</div>
          </div>
        </div>

        {/* Graphiques */}
          {/* 📈 Courbe des ventes */}
          <section className="bg-white rounded-xl shadow p-4">
            <h2 className="text-lg font-bold mb-2">📊 Courbe des ventes</h2>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={ventes}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="total" stroke="#3b82f6" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </section>
         

          {/* 🏆 Top produits */}
          <section className="bg-white rounded-xl shadow p-4 mt-4">
            <h2 className="text-lg font-bold mb-2">🏆 Top 5 des produits vendus</h2>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={produitsTop} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" />
                <YAxis type="category" dataKey="nom" />
                <Tooltip />
                <Bar dataKey="quantite">
                  {produitsTop.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>

          </section>

        {/* Produits en alerte */}
        <section className="bg-white rounded-xl shadow p-4 stat-alertes">
          <h2 className="text-lg font-bold mb-2">⚠️ Produits en alerte de stock</h2>
          {stockAlertes.length === 0 ? (
            <p className="text-gray-500">Aucun produit en rupture ou proche de rupture.</p>
          ) : (
            <ul className="list-disc pl-6">
              {stockAlertes.map((p, idx) => (
                <li key={idx} className="text-red-600">
                  {p.nom} — {p.quantite_stock} en stock
                </li>
              ))}
            </ul>
          )}
        </section>

        
      </main>

      <BarNavigation />
    </>
  );
}

export default StatStock;
