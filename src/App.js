import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Login from './components/Login';
import CreateAccount from './components/CreateAccount';
import EditProfile from './components/EditProfile';
import Home from './components/Index';
import Demandes from './components/Demandes';
import ModifierCouleur from './components/ModifierCouleur';
import ListeUtilisateurs from './components/ListeUtilisateurs';
import AjouterUtilisateur from './components/AjouterUtilisateur';
import EditUser from './components/EditUser';
import VoirMonProfile from './components/VoirMonProfile';
function App() {
   return (
     <Router>
         <Routes>
            <Route path="/login" element={<Login />} />
           <Route path="/create-account" element={<CreateAccount />} />
          <Route path="/" element={<Layout />}>
                   <Route index element={<Home />} />
                   <Route path="profile" element={<VoirMonProfile />} />
               <Route path="edit-profile" element={<EditProfile />} />
              <Route path="color" element={<ModifierCouleur />} />
               <Route path="requests" element={<Demandes />} />
           <Route path="users" element={<ListeUtilisateurs />} />
                   <Route path="add-user" element={<AjouterUtilisateur />} />
             <Route path="/edit-user/:id" element={<EditUser />} />
           </Route>
       </Routes>
  </Router>
);
}

export default App;