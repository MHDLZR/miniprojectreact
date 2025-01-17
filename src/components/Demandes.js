import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

const Demandes = () => {
  const user = useSelector((state) => state.user); // Obtenir les informations utilisateur depuis Redux
  const [demandes, setDemandes] = useState([]); // Liste des demandes
  const [newDemande, setNewDemande] = useState({ titre: "", description: "" }); // Nouvelle demande
  const [message, setMessage] = useState(""); // Messages utilisateur

  // Charger les demandes depuis l'API
  useEffect(() => {
    fetchDemandes();
  }, []);

  const fetchDemandes = async () => {
    try {
      const response = await axios.get(
        "https://670ed5b73e7151861655eaa3.mockapi.io/Demandes"
      );
      setDemandes(response.data);
    } catch (error) {
      setMessage("Erreur lors du chargement des demandes.");
    }
  };

  // Ajouter une nouvelle demande
  const handleAddDemande = async () => {
    try {
      await axios.post("https://670ed5b73e7151861655eaa3.mockapi.io/Demandes", {
        ...newDemande,
        statut: "En attente", // Statut initial
        utilisateurId: user.id, // ID utilisateur
      });
      setMessage("Demande ajoutée avec succès !");
      setNewDemande({ titre: "", description: "" });
      fetchDemandes(); // Recharger les demandes
    } catch (error) {
      setMessage("Erreur lors de l'ajout de la demande.");
    }
  };

  // Annuler une demande (utilisateur)
  const handleCancelDemande = async (id) => {
    try {
      await axios.delete(`https://670ed5b73e7151861655eaa3.mockapi.io/Demandes/${id}`);
      setMessage("Demande annulée avec succès !");
      fetchDemandes();
    } catch (error) {
      setMessage("Erreur lors de l'annulation de la demande.");
    }
  };

  // Changer le statut d'une demande (admin)
  const handleChangeStatut = async (id, statut) => {
    try {
      await axios.put(`https://670ed5b73e7151861655eaa3.mockapi.io/Demandes/${id}`, {
        statut,
      });
      setMessage(`Demande ${statut.toLowerCase()} avec succès !`);
      fetchDemandes();
    } catch (error) {
      setMessage("Erreur lors de la mise à jour du statut.");
    }
  };

  return (
    <div style={styles.container}>
      <h1>Gestion des Demandes</h1>

      {/* Afficher les messages */}
      {message && <p style={styles.message}>{message}</p>}

      {/* Formulaire pour ajouter une demande (utilisateur) */}
      {!user.admin && (
        <div style={styles.form}>
          <h2>Ajouter une Demande</h2>
          <input
            type="text"
            placeholder="Titre"
            value={newDemande.titre}
            onChange={(e) => setNewDemande({ ...newDemande, titre: e.target.value })}
            style={styles.input}
          />
          <textarea
            placeholder="Description"
            value={newDemande.description}
            onChange={(e) =>
              setNewDemande({ ...newDemande, description: e.target.value })
            }
            style={styles.textarea}
          />
          <button onClick={handleAddDemande} style={styles.addButton}>
            Ajouter
          </button>
        </div>
      )}

      {/* Liste des demandes */}
      <h2>Mes Demandes</h2>
      <table style={styles.table}>
        <thead>
          <tr>
            <th>Titre</th>
            <th>Description</th>
            <th>Statut</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {demandes
            .filter((d) =>
              user.admin ? true : d.utilisateurId === user.id // Filtrer par utilisateur si non admin
            )
            .map((demande) => (
              <tr key={demande.id}>
                <td>{demande.titre}</td>
                <td>{demande.description}</td>
                <td>{demande.statut}</td>
                <td>
                  {/* Annuler une demande (utilisateur) */}
                  {!user.admin && demande.statut === "En attente" && (
                    <button
                      style={styles.cancelButton}
                      onClick={() => handleCancelDemande(demande.id)}
                    >
                      Annuler
                    </button>
                  )}

                  {/* Actions pour admin */}
                  {user.admin && (
                    <>
                      <button
                        style={styles.acceptButton}
                        onClick={() => handleChangeStatut(demande.id, "Approuvée")}
                      >
                        Approuver
                      </button>
                      <button
                        style={styles.rejectButton}
                        onClick={() => handleChangeStatut(demande.id, "Rejetée")}
                      >
                        Rejeter
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

// Styles en ligne
const styles = {
  container: {
    maxWidth: "800px",
    margin: "20px auto",
    padding: "20px",
    border: "1px solid #ccc",
    borderRadius: "10px",
    backgroundColor: "#f9f9f9",
  },
  message: {
    color: "green",
    fontWeight: "bold",
  },
  form: {
    marginBottom: "20px",
  },
  input: {
    display: "block",
    width: "100%",
    marginBottom: "10px",
    padding: "10px",
    fontSize: "16px",
  },
  textarea: {
    display: "block",
    width: "100%",
    height: "100px",
    marginBottom: "10px",
    padding: "10px",
    fontSize: "16px",
  },
  addButton: {
    padding: "10px 20px",
    backgroundColor: "#4CAF50",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
  },
  cancelButton: {
    padding: "5px 10px",
    backgroundColor: "#f44336",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
  acceptButton: {
    marginRight: "10px",
    padding: "5px 10px",
    backgroundColor: "#4CAF50",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
  rejectButton: {
    padding: "5px 10px",
    backgroundColor: "#f44336",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
};

export default Demandes;
