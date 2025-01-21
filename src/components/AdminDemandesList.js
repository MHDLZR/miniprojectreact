// AdminDemandesList.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { modifierStatutDemande, supprimerDemande, ajouterDemande } from "../redux/slice";
import "./DemandesStyle.css"; // Import CSS file

const AdminDemandesList = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const [loading, setLoading] = useState(false);
  const API_URL = "https://670ed5b73e7151861655eaa3.mockapi.io/Stagiaire";
  const [demandes, setDemandes] = useState([]);

  useEffect(() => {
    const fetchDemandes = async () => {
      try {
        setLoading(true);
        const response = await axios.get(API_URL);
        const demandesData = response.data;
        setDemandes(demandesData);
         demandesData.forEach((demande) => dispatch(ajouterDemande(demande)));
      } catch (error) {
        console.error("Erreur lors de la récupération des demandes:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchDemandes();
  }, [dispatch]);

  const handleChangeStatut = (id, statut) => {
      dispatch(modifierStatutDemande({ id, statut }));
      setDemandes(demandes.map(demande => demande.id === id ? {...demande, statut} : demande))
    };

  const handleDelete = (id) => {
      dispatch(supprimerDemande(id));
      setDemandes(demandes.filter((demande) => demande.id !== id));
    };

  return (
    <div className="demandes-container">
      <h2>Liste des Demandes (Admin)</h2>
      {loading && <p>Chargement des demandes...</p>}
      <div className="demandes-table-container">
        <table className="demandes-table">
          <thead>
            <tr>
              <th>Titre</th>
              <th>Description</th>
              <th>Statut</th>
              <th>Nom du Demandeur</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {demandes.map((demande) => (
              <tr key={demande.id}>
                <td>{demande.titre}</td>
                <td>{demande.description}</td>
                <td>{demande.statut}</td>
                <td>{demande.userId}</td>
                <td>
                  <button onClick={() => handleChangeStatut(demande.id, "Approuvée")}  className="approve-button">
                    Approuver
                  </button>
                  <button onClick={() => handleChangeStatut(demande.id, "Rejetée")} className="reject-button">
                    Rejeter
                  </button>
                   <button onClick={() => handleDelete(demande.id)} className="delete-button">
                      Supprimer
                    </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminDemandesList;