import React, { useEffect } from "react";
import { useSelector } from "react-redux";

const VoirMonProfile = () => {
  const user = useSelector((state) => state.user);


  useEffect(() => {
    
  }, [user.photo]); 

  return (
    <div className="voir-mon-profile-container">
      <h1>Mon Profil</h1>
      <div className="profileContainer">
        <img
            src={user.photo}
          alt="Avatar utilisateur"
          className="avatar"
        />

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