// DemandeForm.js
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ajouterDemande, modifierDemande, login } from "../redux/slice";
import axios from "axios";
const DemandeForm = () => {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user);
    const [newDemande, setNewDemande] = useState({ titre: "", description: "" });
      const API_URL = "https://670ed5b73e7151861655eaa3.mockapi.io/Stagiaire";

      const handleAddDemande = async (e) => {
        e.preventDefault();
         try {
                if (user.demande && user.demande.statut !== "Approuvée" && user.demande.statut !== "Rejetée") {
                    const updatedDemande = { ...user.demande, ...newDemande };
                     await axios.put(`${API_URL}/${user.id}`, { ...user, demande: updatedDemande });
                     dispatch(login({...user, demande: updatedDemande}));
                 }
                 else {
                    const demandeId = Date.now().toString(); // Generate ID using timestamp
                    const newDemandeData = {
                        id: demandeId,
                        titre: newDemande.titre,
                        description: newDemande.description,
                        statut: "En attente",
                        userId: user.id,
                      }
                    await axios.put(`${API_URL}/${user.id}`, { ...user, demande: newDemandeData });
                    dispatch(login({...user, demande: newDemandeData}));
                 }
             setNewDemande({ titre: "", description: "" });
        }
         catch(error){
             console.log("Erreur lors de l'ajout de la demande",error)
         }
    };

    return (
        <div>
            <h2>Ajouter une Demande</h2>
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
                    onChange={(e) =>
                        setNewDemande({ ...newDemande, description: e.target.value })
                    }
                    required
                />
                <button type="submit">Soumettre</button>
            </form>
        </div>
    );
};

export default DemandeForm;