import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Header";
import BarNavigation from "../../components/BarNavigation";
import { useNotification } from "../../context/NotificationContext";
import BarcodeScanner from '../../Scanner';

const token = localStorage.getItem("token");

function AjoutProduit() {
  const navigate = useNavigate();
  const { addNotification } = useNotification();
  const [categories, setCategories] = useState([]);
  const [produit, setProduit] = useState({
    nom: "",
    description: "",
    prix: "",
    quantite: "",
    categorie: "",
    codebar: "",
  });
  const [imageFile, setImageFile] = useState(null);

  useEffect(() => {

    const token = localStorage.getItem("token");
    if (!token) {
      alert("veuillez vous connecter.");
      navigate("/login");
      return;
    }
    const fetchCategories = async () => {
      try {
        const res = await fetch("http://localhost:8832/api/categories");
        const data = await res.json();
        setCategories(data);
        if (data.length > 0) {
          setProduit((prev) => ({ ...prev, categorie: data[0].id }));
        }
      } catch (err) {
        console.error("Erreur chargement catégories:", err);
      }
    };
    fetchCategories();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduit((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleBarcodeScan = (scannedCode) => {
    setProduit((prev) => ({ ...prev, codebar: scannedCode }));
  };

  const handleImageChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("nom", produit.nom);
    formData.append("description", produit.description);
    formData.append("prix", produit.prix);
    formData.append("quantite_stock", produit.quantite);
    formData.append("categorie", produit.categorie);
    formData.append("codebar", produit.codebar);
    if (imageFile) formData.append("image", imageFile);

    try {
      const res = await fetch("http://localhost:8832/api/produits", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (!res.ok) throw new Error("Erreur ajout produit");

      addNotification("✅ Produit ajouté avec succès !");
      navigate("/stock");
    } catch (err) {
      console.error("❌ Erreur ajout produit :", err);
      addNotification("❌ Erreur lors de l'ajout du produit !");
    }
  };

  const handleCancel = () => {
    navigate("/stock");
  };

  return (
    <>
      <Header title="Ajouter un Produit" />
      <div className="body">
        <form
          onSubmit={handleSubmit}
          className="product-form"
          encType="multipart/form-data"
        >
          <div className="form-group">
            <label htmlFor="nom">Nom du produit</label>
            <input
              type="text"
              id="nom"
              name="nom"
              value={produit.nom}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              name="description"
              value={produit.description}
              onChange={handleChange}
              rows="3"
            ></textarea>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="prix">Prix (€)</label>
              <input
                type="number"
                id="prix"
                name="prix"
                value={produit.prix}
                onChange={handleChange}
                step="0.01"
                min="0"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="quantite">Quantité initiale</label>
              <input
                type="number"
                id="quantite"
                name="quantite"
                value={produit.quantite}
                onChange={handleChange}
                min="0"
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="categorie">Catégorie</label>
            <select
              id="categorie"
              name="categorie"
              value={produit.categorie}
              onChange={handleChange}
              required
            >
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.nom}
                </option>
              ))}
            </select>
          </div>

          <div className="image-barcode-container">
            <div className="barcode-container">
              <BarcodeScanner
                value={produit.codebar}
                onScan={handleBarcodeScan}
              />
            </div>

            <div className="image-container">
              <label htmlFor="image">Image du produit</label>
              <input
                type="file"
                id="image"
                accept="image/*"
                onChange={handleImageChange}
              />
            </div>
          </div>

          <div className="form-buttons">
            <button type="submit" className="btn submit-btn">
              Ajouter
            </button>
            <button
              type="button"
              className="btn cancel-btn"
              onClick={handleCancel}
            >
              Annuler
            </button>
          </div>
        </form>
      </div>

      <BarNavigation />

      <style>
        {`
          .form-group input,
          .form-group textarea,
          .form-group select {
            width: 100%;
            padding: 10px;
            border: 1px solid #ddd;
            border-radius: 5px;
            font-size: 16px;
            color: #333;
            background-color: #fff;
            box-sizing: border-box;
          }

          .form-group textarea {
            resize: vertical;
          }

          .form-row {
            display: flex;
            gap: 20px;
            justify-content: space-between;
            flex-wrap: wrap;
          }

          .form-row .form-group {
            flex: 1 1 100%;
          }

          @media (min-width: 640px) {
            .form-row .form-group {
              flex: 1 1 45%;
            }
          }

          .body {
            display: flex;
            justify-content: center;
            align-items: flex-start;
            min-height: 100vh;
            background-color: #f9f9f9;
            padding: 20px;
          }

          .product-form {
            width: 100%;
            max-width: 600px;
            background-color: #fff;
            padding: 24px;
            border-radius: 10px;
            box-shadow: 0 2px 8px rgba(0,0,0,0.1);
          }

          .form-group {
            margin-bottom: 16px;
            display: flex;
            flex-direction: column;
          }

          .image-barcode-container {
            display: flex;
            flex-wrap: wrap;
            justify-content: space-between;
            gap: 20px;
            margin-top: 20px;
          }

          .image-container, .barcode-container {
            flex: 1 1 100%;
          }

          @media (min-width: 640px) {
            .image-container, .barcode-container {
              flex: 1 1 48%;
            }
          }

          .image-container input {
            margin-top: 5px;
          }

          .form-buttons {
            display: flex;
            flex-wrap: wrap;
            gap: 10px;
            margin-top: 20px;
          }

          .form-buttons .btn {
            flex: 1 1 48%;
            padding: 12px;
            font-size: 16px;
            border-radius: 6px;
            border: none;
            cursor: pointer;
          }

          .submit-btn {
            background-color: #28a745;
            color: white;
          }

          .cancel-btn {
            background-color: #dc3545;
            color: white;
          }
        `}
      </style>
    </>
  );
}

export default AjoutProduit;
