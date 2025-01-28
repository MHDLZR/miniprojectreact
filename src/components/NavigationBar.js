import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

const NavigationBar = () => {
  const user = useSelector((state) => state.user);

   return (
        <nav className="navigation-bar-nav">
            <ul className="navigation-bar-menu">
             <li className="navigation-bar-menuItem">
                    <NavLink to="/" className="navigation-bar-link" activeClassName="navigation-bar-active">
                     Accueil
                   </NavLink>
              </li>
              <li className="navigation-bar-menuItem">
                    <NavLink to="/profile" className="navigation-bar-link" activeClassName="navigation-bar-active">
                      Profil
                     </NavLink>
                </li>
               <li className="navigation-bar-menuItem">
                   <NavLink to="/edit-profile" className="navigation-bar-link" activeClassName="navigation-bar-active">
                         Modifie Profile
                   </NavLink>
                </li>
                 <li className="navigation-bar-menuItem">
                    <NavLink to="/color" className="navigation-bar-link" activeClassName="navigation-bar-active">
                     Modifier Couleur
                   </NavLink>
              </li>
                <li className="navigation-bar-menuItem">
                    <NavLink to="/requests" className="navigation-bar-link" activeClassName="navigation-bar-active">
                       Demandes
                   </NavLink>
              </li>
            {user.admin && (
                  <>
                     <li className="navigation-bar-menuItem">
                       <NavLink to="/users" className="navigation-bar-link" activeClassName="navigation-bar-active">
                        Utilisateurs
                      </NavLink>
                 </li>

                 <li className="navigation-bar-menuItem">
                    <NavLink to="/add-user" className="navigation-bar-link" activeClassName="navigation-bar-active">
                          Ajouter Utilisateur
                       </NavLink>
                    </li>
               </>
              )}
             </ul>
     </nav>
     );
    };

  export default NavigationBar;