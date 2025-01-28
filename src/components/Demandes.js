import React from "react";
import { useSelector } from "react-redux";
import UserDemandesList from "./UserDemandesList";
import AdminDemandesList from "./AdminDemandesList";

const Demandes = () => {
    const user = useSelector((state) => state.user);

    return (
        <div>
            <h1>Gestion des Demandes</h1>
            {!user.admin ? (
                <>
                    <UserDemandesList />
                </>
            ) : (
                <AdminDemandesList />
            )}
        </div>
    );
};

export default Demandes;