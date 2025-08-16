import React from "react";
import "../styles/NavBar.css";

const SideBar = ({ user }) => {
  return (
    <nav className="main-menu">
      <ul>
        <li>
          <p>
            <span className="nav-text">
              <strong>{user && user.nickname ? `Olá, ${user.nickname}` : "MyLists"}</strong>
            </span>
          </p>
        </li>
        <li>
          <a href="/">
            <i className="fa fa-shopping-cart fa-2x"></i>
            <span className="nav-text">Produtos</span>
          </a>
        </li>
        <li className="has-subnav">
          <a href="/minhas-listas">
            <i className="fa fa-user fa-2x"></i>
            <span className="nav-text">Minhas Listas</span>
          </a>
        </li>
        <li className="has-subnav">
          <a href="/listas-publicas">
            <i className="fa fa-list-ul fa-2x"></i>
            <span className="nav-text">Listas Públicas</span>
          </a>
        </li>
      </ul>

      <ul className="logout">
        {user && user.isAuthenticated ? (
          <li className="has-subnav">
            <a href="/logout" className="nav-link">
              <i className="fa fa-power-off fa-2x"></i>
              <span className="nav-text">Logout</span>
            </a>
          </li>
        ) : (
          <li className="has-subnav">
            <a href="/login" className="nav-link">
              <i className="fa fa-sign-in fa-2x"></i>
              <span className="nav-text">Login</span>
            </a>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default SideBar;