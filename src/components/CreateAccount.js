import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CreateAccount = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        nom: '',
        prenom: '',
        age: '',
        couleur: '',
        admin: false,
        MotDePasse: '',
        confirmPassword: '',
        pseudo: '',
    });
    const [error, setError] = useState([]);

    const validatePassword = (password) => {
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]).{8,}$/;
        if (!passwordRegex.test(password)) {
            return 'Le mot de passe doit contenir au moins 8 caractères, une majuscule, une minuscule, un chiffre et un caractère spécial.';
        }
        return null;
    };

    const handleSubmit = async () => {
        const { MotDePasse, confirmPassword } = formData;

         const passwordError = validatePassword(MotDePasse);
          if(passwordError){
            setError([passwordError]);
              return;
           }

       if (MotDePasse !== confirmPassword) {
            setError(['Les mots de passe ne correspondent pas']);
            return;
       }

        try {
           await axios.post('https://670ed5b73e7151861655eaa3.mockapi.io/Stagiaire', formData);
            setError([]);
          alert('Compte créé avec succès !');
            navigate('/login');
      } catch (err) {
            setError(['Une erreur est survenue. Veuillez réessayer.']);
        }
    };

    return (
        <div className="login-container">
            <h1>Créer un Compte</h1>
            {Object.keys(formData).map((key) =>
                key !== 'confirmPassword' ? (
                    <input
                        key={key}
                        type="text"
                         placeholder={key} /* Keep placeholder English */
                        value={formData[key]}
                        onChange={(e) => setFormData({ ...formData, [key]: e.target.value })}
                        required
                    />
                ) : null
            )}
            <input
                type="password"
               placeholder="Confirmer le mot de passe"
                value={formData.confirmPassword}
                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                required
            />
           <button onClick={handleSubmit}>Créer un Compte</button>
            {error.length > 0 && (
               <ul>
                    {error.map((err, index) => (
                      <li key={index}>{err}</li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default CreateAccount;