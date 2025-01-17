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
  avatar:
    "https://pics.craiyon.com/2023-06-16/3fa2e25b33eb4cc6a1cf653851737058.webp",
  email: "Wade34@yahoo.com",
  photo: "https://loremflickr.com/640/480/people",
  id: "8",
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
  },
});

export const { login, logout, changerCouleur } = userSlice.actions;
export default userSlice.reducer;
