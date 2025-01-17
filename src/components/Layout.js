import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import NavigationBar from "./NavigationBar";
import Index from "./Index";

const Layout = () => {
  return (
    <div style={styles.container}>
      <Header />
      <NavigationBar />
      <div style={styles.contenue}>
        <Index style={styles.index} />
        <main style={styles.content}>
            <Outlet />
        </main>
      </div>
      <Footer />
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    minHeight: "100vh",
  },
  content: {
    flex: 1,
    padding: "20px",
    width:"80%",
  },
  contenue:{
    display:"flex",
  },
  index:{
    width:"20%",
    margin :"0px auto"
  },
};

export default Layout;
