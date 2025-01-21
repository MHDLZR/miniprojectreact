// slice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  nom: "Funk",
  age: 66,
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
  demande: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action) => {
      return { ...state, ...action.payload };
    },
    logout: () => initialState,
    changerCouleur: (state, action) => {
      state.couleur = action.payload;
    },
    ajouterDemande: (state, action) => {
        state.demande = action.payload;
      },
    supprimerDemande: (state) => {
        state.demande = null;
      },
      modifierStatutDemande: (state, action) => {
        if (state.demande) {
          state.demande.statut = action.payload.statut;
        }
    },
    modifierDemande: (state, action) => {
        if (state.demande) {
            state.demande = { ...state.demande, ...action.payload };
        }
    }
  },
});

export const {
  login,
  logout,
  changerCouleur,
  ajouterDemande,
  supprimerDemande,
  modifierStatutDemande,
  modifierDemande
} = userSlice.actions;

export default userSlice.reducer;