import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Header from '../../components/Header';
import { useNavigate } from 'react-router-dom';

const rolesDisponibles = ['client', 'gestionnaire', 'admin'];

const ListeUtilisateurs = () => {
  const [utilisateurs, setUtilisateurs] = useState([]);
  const navigate = useNavigate();

  const fetchUtilisateurs = async () => {
    try {
      const res = await axios.get('http://localhost:8832/api/user/utilisateurs', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setUtilisateurs(res.data);
    } catch (err) {
      console.error(err);
      alert("Vous n'avez pas les droits pour accéder à cette page.");
    }
  };

  const changerRole = async (id, nouveauRole) => {
    try {
      await axios.put(
        `http://localhost:8832/api/user/utilisateurs/${id}`,
        { role: nouveauRole },
        { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
      );
      setUtilisateurs(prev =>
        prev.map(u => (u.id === id ? { ...u, role: nouveauRole } : u))
      );
    } catch (err) {
      console.error(err);
      alert("Erreur lors de la mise à jour du rôle.");
    }
  };

  const handleBack = () => navigate(-1);

  useEffect(() => {
    fetchUtilisateurs();
  }, []);

  return (
    <>
      <Header title="Gestion des utilisateurs" />

      <div className="p-4 max-w-screen-lg mx-auto">
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-300 text-sm sm:text-base">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2 border">Nom</th>
                <th className="px-4 py-2 border">Email</th>
                <th className="px-4 py-2 border">Rôle</th>
              </tr>
            </thead>
            <tbody>
              {utilisateurs.map(user => (
                <tr key={user.id} className="hover:bg-gray-50">
                  <td className="px-4 py-2 border">{user.nom}</td>
                  <td className="px-4 py-2 border">{user.email}</td>
                  <td className="px-4 py-2 border">
                    <select
                      value={user.role}
                      onChange={e => changerRole(user.id, e.target.value)}
                      className="w-full border px-2 py-1 rounded bg-gray-50 text-blue-600"
                    >
                      {rolesDisponibles.map(role => (
                        <option key={role} value={role}>
                          {role}
                        </option>
                      ))}
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-6 flex justify-center">
          <button
            onClick={handleBack}
            className="w-1/2 sm:w-1/3 bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
          >
            Retour
          </button>
        </div>
      </div>
    </>
  );
};

export default ListeUtilisateurs;
