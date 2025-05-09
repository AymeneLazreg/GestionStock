import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/user.model.js'; // Import par défaut

// Route d'inscription
export const register = async (req, res) => {
  const { nom, email, mdp, role } = req.body;
  // Vérification des champs obligatoires
  if (!email || !mdp || !nom) {
    return res.status(400).json({ message: "Champs obligatoires manquants." });
  }

  
  try {
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: "L'email est déjà utilisé." });
    }

    const hashedPassword = await bcrypt.hash(mdp, 10);
    const newUser = await User.create({
      nom,
      email,
      mdp: hashedPassword,
      role,
    });

    res.status(201).json({
      message: 'Utilisateur créé avec succès.',
      user: {
        id: newUser.id,
        nom: newUser.nom,
        email: newUser.email,
        role: newUser.role,
      },
    });
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur.', error });
  }
};

// Route de connexion
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });
    if (!user) {
      console.log('Utilisateur non trouvé');
      return res.status(400).json({ message: "Email ou mot de passe incorrect." });
    }
    const isPasswordValid = bcrypt.compareSync(password, user.mdp);
    if (!isPasswordValid) {
      console.log('Mot de passe incorrect');
      return res.status(400).json({ message: "Email ou mot de passe incorrect." });
    }
    // Génération du token JWT
    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET,
    );    console.log('utilisateur connecté : ', user.nom);

    // Envoi de la réponse  
    return res.json({ token });
  } catch (error) {
    console.error('Erreur dans la route login :', error);
    res.status(500).json({ message: 'Erreur serveur.', error });
  }
};
