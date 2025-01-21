// UserDemandesList.js
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { supprimerDemande, ajouterDemande, login } from "../redux/slice";
import DemandeForm from "./DemandeForm";
import axios from "axios";
import "./DemandesStyle.css"; // Import CSS file

const UserDemandesList = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const [isEditing, setIsEditing] = useState(false);
  const API_URL = "https://670ed5b73e7151861655eaa3.mockapi.io/Stagiaire";
  const [userDemande, setUserDemande] = useState(null);


  useEffect(() => {
    const fetchUserAndDemande = async () => {
      if (user.id) {
          try {
              const response = await axios.get(`${API_URL}/${user.id}`);
              if (response.data.demande) {
                setUserDemande(response.data.demande)
              }
             else if (response.data.titre && response.data.description && response.data.statut && response.data.userId){
                dispatch(ajouterDemande(response.data));
                setUserDemande(response.data);
              }
               else{
                  setUserDemande(null)
                }
          }
            catch(error){
              console.error("Erreur lors de la récupération de l'utilisateur et de sa demande:", error);
           }
       }
     };
        fetchUserAndDemande()
  }, [user.id, dispatch, user.demande]);

  const handleCancelDemande = async () => {
    if (userDemande && userDemande.statut === "En attente") {
         try {
             await axios.put(`${API_URL}/${user.id}`, { ...user, demande: null });
             dispatch(login({...user, demande: null}));
             setUserDemande(null);
            }
         catch(error){
           console.error("Erreur lors de la suppression de la demande:", error);
         }
    } else {
      alert(
        "Ce demande ne peut pas être supprimée car elle n'est pas en attente."
      );
    }
  };


  const handleEditDemande = () => {
    setIsEditing(true);
  };

    return (
        <div className="demandes-container">
            <h2>Mon Demande</h2>
            {isEditing ? (
                <>
                    <DemandeForm />
                    <button onClick={() => setIsEditing(false)}>Cancel</button>
                </>
            ) : (
                <div className="demandes-table-container">
                 {userDemande ? (
                    <table className="demandes-table">
                     <thead>
                         <tr>
                             <th>Titre</th>
                             <th>Description</th>
                            <th>Statut</th>
                              <th>Actions</th>
                         </tr>
                     </thead>
                     <tbody>
                            <tr>
                            <td>{userDemande.titre}</td>
                             <td>{userDemande.description}</td>
                            <td>{userDemande.statut}</td>
                            <td>
                            {userDemande.statut === "En attente" && (
                                <>
                                    <button onClick={() => handleCancelDemande()} className="cancel-button">Annuler</button>
                                    <button onClick={() => handleEditDemande()} className="edit-button">Modifier</button>
                                </>
                              )}
                               </td>
                         </tr>
                     </tbody>
                    </table>
                 ) : (
                      <p className="no-demandes">Aucune demande</p>
                 )}
                </div>
            )}
        </div>
    );
};

export default UserDemandesList;