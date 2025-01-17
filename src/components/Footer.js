import React from "react";
import { useSelector } from "react-redux";
import { FaFacebook, FaInstagram, FaTwitter, FaLinkedin } from "react-icons/fa";

const Footer = () => {
    const colorUser = useSelector((state)=>state.user.couleur);
    const styles = {
        footer: {
          backgroundColor: colorUser,
          color: "#000",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "20px",
          marginTop: "auto",
        },
        address: {
          flex: 1,
        },
        social: {
          flex: 1,
          textAlign: "right",
        },
        icons: {
          display: "flex",
          justifyContent: "flex-end",
          gap: "10px",
        },
        icon: {
          color: "#fff",
          textDecoration: "none",
          transition: "color 0.3s",
        },
      };
    return (
        <footer style={styles.footer}>
        <div style={styles.address}>
            <h4>Notre Adresse</h4>
            <p>123 Rue des Développeurs, Tech City, 12345</p>
        </div>

        <div style={styles.social}>
            <h4>Suivez-nous</h4>
            <div style={styles.icons}>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" style={styles.icon}>
                <FaFacebook size={30} />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" style={styles.icon}>
                <FaInstagram size={30} />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" style={styles.icon}>
                <FaTwitter size={30} />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" style={styles.icon}>
                <FaLinkedin size={30} />
            </a>
            </div>
        </div>
        </footer>
    );
};


export default Footer;