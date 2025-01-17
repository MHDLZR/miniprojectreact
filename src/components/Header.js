import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../redux/slice';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const handleLogout = () => {
    dispatch(logout());
    navigate('/login')
  };

  return (
    <header style={{ padding: '10px', backgroundColor: user.couleur, color: "black", display: "flex", justifyContent: "space-evenly" }}>
      <img src={user.avatar} style={{ height:"8%",width:"8%",borderRadius:"9%" }} />
      <h1>Bienvenue {user.prenom} {user.nom}</h1>
      <button style={{height:"30px",marginTop:"20px"}} onClick={handleLogout}>Se Déconnecter</button>
    </header>
  );
};

export default Header;
