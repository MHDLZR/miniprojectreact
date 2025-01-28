import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
// import { useDispatch } from "react-redux"; // Removed useDispatch and login
// import { login } from "../redux/slice";

const EditUser = () => {
    const { id } = useParams();
    const [formData, setFormData] = useState({
        nom: "",
        prenom: "",
        email: "",
        age: "",
        admin: false,
    });
    const [message, setMessage] = useState("");
    const navigate = useNavigate();
    // const dispatch = useDispatch(); // Removed dispatch

    useEffect(() => {
        fetchUser();
    }, [id]);


    const fetchUser = async () => {
        try {
            const response = await axios.get(
                `https://670ed5b73e7151861655eaa3.mockapi.io/Stagiaire/${id}`
            );
            setFormData(response.data);
        } catch (error) {
            setMessage("Erreur lors du chargement de l'utilisateur.");
        }
    };

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
            await axios.put(`https://670ed5b73e7151861655eaa3.mockapi.io/Stagiaire/${id}`, {
                ...formData,
            });
            setMessage("Utilisateur modifié avec succès !");
            // dispatch(login(formData)); // Removed this line
            navigate("/users");
        } catch (error) {
            setMessage("Erreur lors de la modification de l'utilisateur.");
        }
    };

    return (
        <div className="edit-user-container">
            <h1>Modifier l'Utilisateur</h1>
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
                    Modifier
                </button>
            </form>
        </div>
    );
};

export default EditUser;