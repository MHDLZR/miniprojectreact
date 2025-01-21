// EditProfile.js
import React, { useState } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../redux/slice";

const EditProfile = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    nom: user.nom,
    prenom: user.prenom,
    email: user.email,
    MotDePasse: "",
     pseudo: user.pseudo,
    age: user.age,
    couleur: user.couleur,
    avatar: user.avatar,

  });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`https://670ed5b73e7151861655eaa3.mockapi.io/Stagiaire/${user.id}`, {
        ...formData,
      });
      dispatch(login(formData));
      setMessage("Informations mises à jour avec succès!");
       navigate("/profile");
    } catch (error) {
      setMessage("Erreur lors de la mise à jour des informations.");
    }
  };

  return (
    <div style={styles.container}>
      <h1>Modifier Mon Profil</h1>
      {message && <p style={styles.message}>{message}</p>}
      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="text"
          name="nom"
          placeholder="Nom"
          value={formData.nom}
          onChange={handleChange}
          style={styles.input}
          required
        />
        <input
          type="text"
          name="prenom"
          placeholder="Prénom"
          value={formData.prenom}
          onChange={handleChange}
          style={styles.input}
          required
        />
         <input
          type="text"
          name="pseudo"
          placeholder="pseudo"
          value={formData.pseudo}
          onChange={handleChange}
          style={styles.input}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          style={styles.input}
          required
        />
          <input
          type="password"
          name="MotDePasse"
          placeholder="Mot De Passe"
          value={formData.MotDePasse}
          onChange={handleChange}
          style={styles.input}
          required
        />
          <input
          type="number"
          name="age"
          placeholder="Âge"
          value={formData.age}
          onChange={handleChange}
          style={styles.input}
          required
        />
          <input
          type="text"
          name="avatar"
          placeholder="avatar"
          value={formData.avatar}
          onChange={handleChange}
          style={styles.input}
          required
        />
            <input
          type="text"
          name="couleur"
          placeholder="couleur"
          value={formData.couleur}
          onChange={handleChange}
          style={styles.input}
          required
        />
        <button type="submit" style={styles.button}>
          Mettre à jour
        </button>
      </form>
    </div>
  );
};

// Styles en ligne
const styles = {
  container: {
    maxWidth: "500px",
    margin: "20px auto",
    padding: "20px",
    border: "1px solid #ccc",
    borderRadius: "10px",
    backgroundColor: "#f9f9f9",
  },
  form: {
    display: "flex",
    flexDirection: "column",
  },
  input: {
    marginBottom: "10px",
    padding: "10px",
    fontSize: "16px",
  },
  button: {
    padding: "10px 20px",
    backgroundColor: "#4CAF50",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
  message: {
    color: "green",
    fontWeight: "bold",
  },
};

export default EditProfile;