"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"

export default function Connection() {
    const [activeTab, setActiveTab] = useState("login")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [showPassword, setShowPassword] = useState(false)
    const [rememberMe, setRememberMe] = useState(false)
    const [errorMessage, setErrorMessage] = useState("") // Pour afficher les erreurs
    const navigate = useNavigate()

    // Fonction pour gérer la connexion
    const handleLogin = async (e) => {
        e.preventDefault(); 
        console.log("Login with:", { email, password });
        try {
            const response = await fetch('http://localhost:8832/api/auth/login', {
                method: 'POST',
                headers: {'Content-Type': 'application/json',},
                body: JSON.stringify({
                    email: email, 
                    password: password, 
                }),
            });
            const data = await response.json();
            if (response.ok) {
                console.log('Connexion réussie', data);
                localStorage.setItem('token', data.token); // Sauvegarde du token
                const token = localStorage.getItem("token");
                if (!token) throw new Error("Token manquant");
                const payloadBase64 = token.split('.')[1];
                const payload = JSON.parse(atob(payloadBase64));
                const userRole = payload.role; 
                console.log("Rôle utilisateur :", userRole);
                if (userRole === "admin" || userRole === "gestionnaire") {
                    navigate("/accueil-gestionnaire");  // Redirection après connexion réussie
                }else {
                    navigate("/commandes-client");  // Redirection après connexion réussie
                }
            } else {
                const errorMessage = data.message || "Une erreur s'est produite lors de la connexion.";
                setErrorMessage(errorMessage);
                console.error(errorMessage);
            }

        } catch (error) {
            setErrorMessage("Erreur réseau : Impossible de se connecter.");
            console.error('Erreur réseau:', error);
        }
    };









    // Fonction pour gérer l'inscription
    const handleRegister = async (e) => {
        e.preventDefault();

        // Récupération des champs du formulaire
        const firstName = document.getElementById("first-name").value.trim();
        const lastName = document.getElementById("last-name").value.trim();
        const nom = `${firstName} ${lastName}`;
        const entreprise = document.getElementById("company").value.trim(); // Optionnel

        console.log("Register with:", { email, password, nom });

        try {
            const response = await fetch("http://localhost:8832/api/auth/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email,
                    mdp: password, // ⚠️ doit être 'mdp' comme attendu par le backend
                    nom,
                    role: "client", // ou 'admin' si besoin
                }),
            });

            const data = await response.json();

            if (response.ok) {
                console.log("Inscription réussie :", data);
                setActiveTab("login"); // Bascule sur l'onglet Connexion
                setErrorMessage(""); // Nettoie le message d'erreur
            } else {
                setErrorMessage(data.message || "Une erreur est survenue lors de l'inscription.");
            }
        } catch (error) {
            console.error("Erreur réseau dans register:", error);
            setErrorMessage("Erreur serveur. Veuillez réessayer plus tard.");
        }
    };


    return (
        <div className="auth-container">
            <div className="auth-card">
                <div className="auth-tabs">
                    <button className={`auth-tab ${activeTab === "login" ? "active" : ""}`} onClick={() => setActiveTab("login")}>
                        Connexion
                    </button>
                    <button
                        className={`auth-tab ${activeTab === "register" ? "active" : ""}`}
                        onClick={() => setActiveTab("register")}
                    >
                        Inscription
                    </button>
                </div>

                {/* Affichage des erreurs */}
                {errorMessage && <div className="error-message">{errorMessage}</div>}

                {activeTab === "login" ? (
                    <form onSubmit={handleLogin} className="auth-form">
                        <h2>Connexion</h2>
                        <p className="auth-description">Connectez-vous à votre compte pour accéder au système</p>

                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input
                                id="email"
                                type="email"
                                placeholder="samaikom@email.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <div className="password-header">
                                <label htmlFor="password">Mot de passe</label>
                                
                            </div>
                            <div className="password-input">
                                <input
                                    id="password"
                                    type={showPassword ? "text" : "password"}
                                    placeholder="••••••••"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                                <button type="button" className="toggle-password" onClick={() => setShowPassword(!showPassword)}>
                                    {showPassword ? "Masquer" : "Afficher"}
                                </button>
                            </div>
                        </div>

                        <div className="remember-me">
                            <input type="checkbox" id="remember" checked={rememberMe} onChange={() => setRememberMe(!rememberMe)} />
                            <label htmlFor="remember">Se souvenir de moi</label>
                        </div>

                        <button type="submit" className="auth-button">
                            Se connecter
                        </button>
                    </form>

                ) : (
                    <form onSubmit={handleRegister} className="auth-form">
                        <h2>Inscription</h2>
                        <p className="auth-description">Créez un compte pour accéder au système</p>

                        <div className="form-row">
                            <div className="form-group">
                                <label htmlFor="first-name">Prénom</label>
                                <input id="first-name" type="text" required />
                            </div>
                            <div className="form-group">
                                <label htmlFor="last-name">Nom</label>
                                <input id="last-name" type="text" required />
                            </div>
                        </div>

                        <div className="form-group">
                            <label htmlFor="register-email">Email</label>
                            <input
                                id="register-email"
                                type="email"
                                placeholder="exemple@email.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="company">Entreprise</label>
                            <input id="company" type="text" placeholder="Nom de votre entreprise" />
                        </div>

                        <div className="form-group">
                            <label htmlFor="register-password">Mot de passe</label>
                            <div className="password-input">
                                <input
                                    id="register-password"
                                    type={showPassword ? "text" : "password"}
                                    placeholder="••••••••"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                                <button type="button" className="toggle-password" onClick={() => setShowPassword(!showPassword)}>
                                    {showPassword ? "Masquer" : "Afficher"}
                                </button>
                            </div>
                        </div>

                        <div className="form-group">
                            <label htmlFor="confirm-password">Confirmer le mot de passe</label>
                            <input id="confirm-password" type="password" placeholder="••••••••" required />
                        </div>

                        <button type="submit" className="auth-button">
                            S'inscrire
                        </button>
                    </form>
                )}
            </div>
        </div>
    )
}
