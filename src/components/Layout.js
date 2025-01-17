import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import NavigationBar from "./NavigationBar";
import Index from "./Index";
import { useSelector } from "react-redux";
import "./Layout.css";

const Layout = () => {
  const couleurAccueil = useSelector((state) => state.couleur);
  return (
    <div className="container">
      <Header />
      <NavigationBar />
      <div className="contenue" style={{ backgroundColor: couleurAccueil }}>
        <Index className="index" />
        <main className="content">
          <Outlet />
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
