import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changerCouleur } from "../redux/slice";
import axios from "axios";

const ModifierCouleur = () => {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user);
    const [newColor, setNewColor] = useState(user.couleur);
    const [message, setMessage] = useState("");
    const userAge = useSelector((state) => state.user.age);

    const handleColorChange = async () => {
        try {
            await axios.put(`https://670ed5b73e7151861655eaa3.mockapi.io/Stagiaire/${user.id}`, {
                ...user,
                couleur: newColor,
            });
            dispatch(changerCouleur(newColor));
            setMessage("Couleur mise à jour avec succès !");
        } catch (error) {
            setMessage("Une erreur est survenue lors de la mise à jour.");
        }
    };

    return (
        <div className="modifier-couleur-container">
            <h1>Modifier votre couleur préférée</h1>

            {!user.admin ? (
                userAge < 15 ? (
                    <p className="warning">Vous n'êtes pas autorisé à modifier la couleur.</p>
                ) : (
                    <>
                        <label htmlFor="color">Choisissez une couleur :</label>
                        <select
                            id="color"
                            value={newColor}
                            onChange={(e) => setNewColor(e.target.value)}
                            className="select"
                        >
                            <option value="red">Rouge</option>
                            <option value="blue">Bleu</option>
                            <option value="green">Vert</option>
                            <option value="yellow">Jaune</option>
                            <option value="purple">Violet</option>
                            <option value="maroon">Marron</option>
                            <option value="pink">Rose</option>
                            <option value="lime">Lime</option>
                            <option value="teal">Teal</option>
                            <option value="navy">Marine</option>
                            <option value="coral">Corail</option>
                            <option value="skyblue">Bleu ciel</option>
                            <option value="gold">Or</option>
                            <option value="silver">Argent</option>
                              <option value="#800080">Violet foncé</option>
                        </select>
                        <button onClick={handleColorChange} className="button">
                            Valider
                        </button>
                        {message && <p className="message">{message}</p>}
                    </>
                )
            ) : (
                <>
                    <label htmlFor="color">Choisissez une couleur :</label>
                    <select
                        id="color"
                        value={newColor}
                        onChange={(e) => setNewColor(e.target.value)}
                        className="select"
                    >
                        <option value="red">Rouge</option>
                        <option value="blue">Bleu</option>
                        <option value="green">Vert</option>
                        <option value="yellow">Jaune</option>
                        <option value="purple">Violet</option>
                        <option value="maroon">Marron</option>
                        <option value="pink">Rose</option>
                        <option value="lime">Lime</option>
                        <option value="teal">Teal</option>
                        <option value="navy">Marine</option>
                        <option value="coral">Corail</option>
                           <option value="skyblue">Bleu ciel</option>
                        <option value="gold">Or</option>
                         <option value="silver">Argent</option>
                            <option value="#800080">Violet foncé</option>
                    </select>
                    <button onClick={handleColorChange} className="button">
                        Valider
                    </button>
                    {message && <p className="message">{message}</p>}
                </>
            )}
        </div>
    );
};

export default ModifierCouleur;