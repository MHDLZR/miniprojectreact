import React from "react";
 import { useSelector } from "react-redux";

  const VoirMonProfile = () => {
    const user = useSelector((state) => state.user); // Obtenir les informations utilisateur depuis Redux
 
     return (
         <div className="voir-mon-profile-container">
            <h1>Mon Profil</h1>
              <div className="profileContainer">
                   {/* Afficher l'image de profil */}
                 <img
                     src={user.avatar || "https://images.app.goo.gl/3EYVTGp8sxK2ZvGPA"}
                   alt="Avatar utilisateur"
                      className="avatar"
                    />
        
                   {/* Afficher les informations utilisateur */}
                   <div className="info">
                     <p>
                       <strong>Nom :</strong> {user.nom}
                    </p>
                   <p>
                      <strong>Prénom :</strong> {user.prenom}
                     </p>
                    <p>
                      <strong>Âge :</strong> {user.age} ans
                     </p>
                  <p>
                         <strong>Email :</strong> {user.email}
                  </p>
                 <p>
                         <strong>Couleur préférée :</strong>{" "}
                         <span style={{ color: user.couleur }}>{user.couleur}</span>
                     </p>
                <p>
                        <strong>Pays :</strong> {user.Pays}
                 </p>
               <p>
                    <strong>Devise :</strong> {user.Devise}
                 </p>
              </div>
        </div>
      </div>
     );
};
     export default VoirMonProfile;