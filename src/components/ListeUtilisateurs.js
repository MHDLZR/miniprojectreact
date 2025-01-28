import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ListeUtilisateurs = () => {
    const [users, setUsers] = useState([]);
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const response = await axios.get(
                "https://670ed5b73e7151861655eaa3.mockapi.io/Stagiaire"
            );
            setUsers(response.data);
        } catch (error) {
            setMessage("Erreur lors du chargement des utilisateurs.");
        }
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`https://670ed5b73e7151861655eaa3.mockapi.io/Stagiaire/${id}`);
            setMessage("Utilisateur supprimé avec succès !");
            fetchUsers();
        } catch (error) {
            setMessage("Erreur lors de la suppression de l'utilisateur.");
        }
    };

    const handleEdit = (id) => {
        navigate(`/edit-user/${id}`);
    };

    return (
        <div className="liste-utilisateurs-container">
            <h1>Liste des Utilisateurs</h1>

            {message && <p className="message">{message}</p>}

            <table>
                <thead>
                    <tr>
                        <th>Nom</th>
                        <th>Prénom</th>
                        <th>Email</th>
                        <th>Rôle</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.length > 0 ? (
                        users.map((user) => (
                            <tr key={user.id}>
                                <td>{user.nom}</td>
                                <td>{user.prenom}</td>
                                <td>{user.email}</td>
                                <td>{user.admin ? "Admin" : "Visiteur"}</td>
                                <td>
                                    <button
                                        className="edit-button"
                                        onClick={() => handleEdit(user.id)}
                                    >
                                        Modifier
                                    </button>
                                    <button
                                        className="delete-button"
                                        onClick={() => handleDelete(user.id)}
                                    >
                                        Supprimer
                                    </button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="5" className="no-data">
                                Aucun utilisateur trouvé.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default ListeUtilisateurs;