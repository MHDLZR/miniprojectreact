// Layout.js
import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import NavigationBar from "./NavigationBar";
import Index from "./Index";
import { useSelector } from "react-redux";

const Layout = () => {
    const couleurAccueil = useSelector((state) => state.user.couleur);
    const location = useLocation();
    const isAccueil = location.pathname === "/";
    const whatsappLink = "https://wa.me/?text=Bonjour%20de%20mon%20application%20React"; // lien whatsapp

    const handleIndexClick = () => {
        if (isAccueil) {
            window.open(whatsappLink, "_blank");
        }
    };

    return (
        <div className="container">
            <Header />
            <NavigationBar />
            <div className="main-content-wrapper">
                <div
                    className={`index-container-wrapper ${isAccueil ? "index-centered" : "index-left"}`}
                    onClick={handleIndexClick}
                    style={{ backgroundColor: couleurAccueil }} // Apply color here
                >
                   <Index className={isAccueil ? "index-centered" : "index-left"} />
                </div>
                <main className="content" style={{ backgroundColor: couleurAccueil }}> {/* Apply color here */}
                    <Outlet />
                </main>
            </div>
            <Footer />
        </div>
    );
};
export default Layout;