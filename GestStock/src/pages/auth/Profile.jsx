"use client"

import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import Header from "../../components/Header"

export default function Profile() {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState("account")
  const [user, setUser] = useState(null)
  const [formData, setFormData] = useState({ nom: "", email: "" })
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  })

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token")
        const response = await fetch("http://localhost:8832/api/user/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })

        if (!response.ok) throw new Error("Erreur lors du chargement du profil")
        const data = await response.json()
        setUser(data)
        setFormData({ nom: data.nom, email: data.email })
      } catch (err) {
        console.error(err)
      }
    }

    fetchProfile()
  }, [])

  const handleLogout = () => {
    localStorage.removeItem("token")
    navigate("/login")
  }

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handlePasswordChange = e => {
    setPasswordData({ ...passwordData, [e.target.name]: e.target.value })
  }

  const handleSave = async () => {
    const token = localStorage.getItem("token")
    try {
      const res = await fetch("http://localhost:8832/api/user/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      })

      if (!res.ok) throw new Error("Erreur de mise à jour")

      const updated = await res.json()
      setUser(updated)
      alert("Profil mis à jour avec succès !")
    } catch (err) {
      alert("Erreur lors de la mise à jour du profil.")
    }
  }

  const handleBack = () => {
    navigate(-1)
  }

  const handleChangePassword = async () => {
    const { currentPassword, newPassword, confirmPassword } = passwordData

    if (newPassword !== confirmPassword) {
      alert("Les nouveaux mots de passe ne correspondent pas.")
      return
    }

    try {
      const token = localStorage.getItem("token")
      const res = await fetch("http://localhost:8832/api/user/password", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          currentPassword,
          newPassword
        }),
      })

      if (!res.ok) throw new Error("Échec du changement de mot de passe")

      alert("Mot de passe mis à jour avec succès !")
      setPasswordData({ currentPassword: "", newPassword: "", confirmPassword: "" })
    } catch (err) {
      alert("Erreur lors de la mise à jour du mot de passe.")
    }
  }

  if (!user) return <p className="p-4">Chargement du profil...</p>

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <Header title="Profil Utilisateur" />

      <div className="flex flex-col lg:flex-row gap-6 mt-6">
        {/* Sidebar */}
        <div className="bg-white rounded shadow p-4 flex-1 lg:max-w-xs">
          <h2 className="text-xl font-semibold mb-2">{user.nom}</h2>
          <p className="text-gray-600">{user.email}</p>
          <div className="mt-2">
            <span className="inline-block bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm">
              {user.role}
            </span>
          </div>
          <button
            onClick={handleLogout}
            className="mt-4 w-full bg-red-500 text-white py-2 rounded hover:bg-red-600"
          >
            Déconnexion
          </button>
        </div>

        {/* Main content */}
        <div className="flex-1 bg-white rounded shadow p-4">
        <div className="flex flex-col sm:flex-row gap-2 mb-4">
  <button
    className={`px-4 py-2 rounded font-semibold transition ${
      activeTab === "account"
        ? "bg-blue-600 text-white"
        : "bg-gray-200 text-gray-800 hover:bg-gray-300"
    }`}
    onClick={() => setActiveTab("account")}
  >
    Compte
  </button>

  <button
    className={`px-4 py-2 rounded font-semibold transition ${
      activeTab === "security"
        ? "bg-blue-600 text-white"
        : "bg-gray-200 text-gray-800 hover:bg-gray-300"
    }`}
    onClick={() => setActiveTab("security")}
  >
    Sécurité
  </button>
</div>


          {activeTab === "account" && (
            <div>
              <h3 className="text-lg font-semibold mb-1">Informations personnelles</h3>
              <p className="text-sm text-gray-500 mb-4">Modifiez votre nom et votre email</p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm mb-1">Nom complet</label>
                  <input
                    type="text"
                    name="nom"
                    value={formData.nom}
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                  />
                </div>
                <div>
                  <label className="block text-sm mb-1">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                  />
                </div>
              </div>

              <div className="mt-6 flex flex-col sm:flex-row gap-4">
                <button
                  onClick={handleSave}
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                  Enregistrer les modifications
                </button>
                <button
                  onClick={handleBack}
                  className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                >
                  Retour
                </button>
              </div>
            </div>
          )}

          {activeTab === "security" && (
            <div>
              <h3 className="text-lg font-semibold mb-1">Changer le mot de passe</h3>
              <p className="text-sm text-gray-500 mb-4">Saisissez votre mot de passe actuel et le nouveau</p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm mb-1">Mot de passe actuel</label>
                  <input
                    type="password"
                    name="currentPassword"
                    value={passwordData.currentPassword}
                    onChange={handlePasswordChange}
                    className="w-full p-2 border rounded"
                  />
                </div>
                <div>
                  <label className="block text-sm mb-1">Nouveau mot de passe</label>
                  <input
                    type="password"
                    name="newPassword"
                    value={passwordData.newPassword}
                    onChange={handlePasswordChange}
                    className="w-full p-2 border rounded"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm mb-1">Confirmer le nouveau mot de passe</label>
                  <input
                    type="password"
                    name="confirmPassword"
                    value={passwordData.confirmPassword}
                    onChange={handlePasswordChange}
                    className="w-full p-2 border rounded"
                  />
                </div>
              </div>

              <button
                onClick={handleChangePassword}
                className="mt-6 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                Modifier le mot de passe
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
