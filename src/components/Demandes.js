import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  ajouterDemande,
  supprimerDemande,
  modifierStatutDemande,
} from "../redux/slice";

const Demandes = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user); // Accès aux données utilisateur
  const [newDemande, setNewDemande] = useState({ titre: "", description: "" });

  const handleAddDemande = (e) => {
    e.preventDefault();
    dispatch(ajouterDemande(newDemande)); // Ajouter une nouvelle demande
    setNewDemande({ titre: "", description: "" }); // Réinitialiser le formulaire
  };

  const handleCancelDemande = (id) => {
    dispatch(supprimerDemande(id)); // Supprimer une demande par ID
  };

  const handleChangeStatut = (id, statut) => {
    dispatch(modifierStatutDemande({ id, statut })); // Modifier le statut d'une demande
  };

  return (
    <div>
      <h1>Gestion des Demandes</h1>

      {/* Formulaire pour ajouter une demande */}
      {!user.admin && (
        <form onSubmit={handleAddDemande}>
          <input
            type="text"
            placeholder="Titre"
            value={newDemande.titre}
            onChange={(e) => setNewDemande({ ...newDemande, titre: e.target.value })}
            required
          />
          <textarea
            placeholder="Description"
            value={newDemande.description}
            onChange={(e) => setNewDemande({ ...newDemande, description: e.target.value })}
            required
          />
          <button type="submit">Soumettre</button>
        </form>
      )}

      {/* Liste des demandes */}
      <h2>Liste des Demandes</h2>
      <ul>
        {user.demandes.map((demande) => (
          <li key={demande.id}>
            <p>{demande.titre}</p>
            <p>{demande.description}</p>
            <p>{demande.statut}</p>
            {!user.admin && demande.statut === "En attente" && (
              <button onClick={() => handleCancelDemande(demande.id)}>Annuler</button>
            )}
            {user.admin && (
              <>
                <button onClick={() => handleChangeStatut(demande.id, "Approuvée")}>
                  Approuver
                </button>
                <button onClick={() => handleChangeStatut(demande.id, "Rejetée")}>
                  Rejeter
                </button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Demandes;
