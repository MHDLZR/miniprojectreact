import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  nom: "Funk",
  age: 4,
  admin: true,
  MotDePasse: "e2EpziAy5RIpJgP",
  pseudo: "Kaci_Reilly73",
  prenom: "Rose",
  couleur: "maroon",
  Devise: "kr",
  Pays: "Spain",
  avatar: "https://pics.craiyon.com/2023-06-16/3fa2e25b33eb4cc6a1cf653851737058.webp",
  email: "Wade34@yahoo.com",
  photo: "https://loremflickr.com/640/480/people",
  id: "8",
  demandes: [], // Ajout d'une propriété pour les demandes
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    // Authentification
    login: (state, action) => {
      return { ...state, ...action.payload };
    },
    logout: () => initialState,

    // Changer la couleur préférée
    changerCouleur: (state, action) => {
      state.couleur = action.payload;
    },

    // Ajouter une demande
    ajouterDemande: (state, action) => {
      state.demandes.push({
        ...action.payload, // Titre et description de la demande
        statut: "En attente", // Statut initial
        id: new Date().getTime(), // Génération d'un ID unique
      });
    },

    // Supprimer une demande (par ID)
    supprimerDemande: (state, action) => {
      state.demandes = state.demandes.filter((d) => d.id !== action.payload);
    },

    // Modifier le statut d'une demande
    modifierStatutDemande: (state, action) => {
      const { id, statut } = action.payload; // Récupère l'ID et le nouveau statut
      const demande = state.demandes.find((d) => d.id === id);
      if (demande) {
        demande.statut = statut; // Met à jour le statut de la demande
      }
    },
  },
});

export const { login, logout, changerCouleur, ajouterDemande, supprimerDemande, modifierStatutDemande, } = userSlice.actions;

export default userSlice.reducer;
