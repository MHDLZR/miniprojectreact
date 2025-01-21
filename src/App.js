// App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import CreateAccount from "./components/CreateAccount";
import Layout from "./components/Layout";
import ModifierCouleur from "./components/ModifierCouleur";
import VoirMonProfile from "./components/VoirMonProfile";
import ListeUtilisateurs from "./components/ListeUtilisateurs";
import Demandes from "./components/Demandes";
import AjouterUtilisateur from "./components/AjouterUtilisateur";
import EditUser from "./components/EditUser";
import EditProfile from "./components/EditProfile";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/create-account" element={<CreateAccount />} />
        <Route path="/" element={<Layout />} >
           <Route index element={<></>} />
          <Route path="color" element={<ModifierCouleur />} />
          <Route path="profile" element={<VoirMonProfile />} />
           <Route path="edit-profile" element={<EditProfile />} />
          <Route path="users" element={<ListeUtilisateurs />} />
          <Route path="requests" element={<Demandes />} />
          <Route path="add-user" element={<AjouterUtilisateur />} />
           <Route path="edit-user/:id" element={<EditUser />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;