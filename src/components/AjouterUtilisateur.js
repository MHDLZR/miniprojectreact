import React, { useState } from "react";
import axios from "axios";

const AjouterUtilisateur = () => {
    const [formData, setFormData] = useState({
        nom: "",
        prenom: "",
        email: "",
        age: "",
        admin: false,
    });
    const [message, setMessage] = useState("");

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === "checkbox" ? checked : value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post("https://670ed5b73e7151861655eaa3.mockapi.io/Stagiaire", {
                ...formData,
            });
            setMessage("Utilisateur ajouté avec succès !");
            setFormData({ nom: "", prenom: "", email: "", age: "", admin: false });
        } catch (error) {
            setMessage("Erreur lors de l'ajout de l'utilisateur.");
        }
    };

    return (
        <div className="ajouter-utilisateur-container">
            <h1>Ajouter un Utilisateur</h1>
            {message && <p className="message">{message}</p>}
            <form onSubmit={handleSubmit} className="form">
                <input
                    type="text"
                    name="nom"
                    placeholder="Nom"
                    value={formData.nom}
                    onChange={handleChange}
                    className="input"
                    required
                />
                <input
                    type="text"
                    name="prenom"
                    placeholder="Prénom"
                    value={formData.prenom}
                    onChange={handleChange}
                    className="input"
                    required
                />
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    className="input"
                    required
                />
                <input
                    type="number"
                    name="age"
                    placeholder="Âge"
                    value={formData.age}
                    onChange={handleChange}
                    className="input"
                    required
                />
                <label className="checkbox">
                    <input
                        type="checkbox"
                        name="admin"
                        checked={formData.admin}
                        onChange={handleChange}
                    />
                    Administrateur
                </label>
                <button type="submit" className="button">
                    Ajouter
                </button>
            </form>
        </div>
    );
};

export default AjouterUtilisateur;