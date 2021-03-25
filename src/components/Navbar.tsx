import React from 'react';
import { Link } from 'react-router-dom';

export const Navbar = () => {
  return (
    <div className="navigation-bar">
      <Link
        className={`nav-button ${window.location.pathname === '/lists' ? 'active' : ''}`}
        to="/lists">
        <i className="fas fa-list" />
        List
      </Link>
      <Link
        className={`nav-button ${window.location.pathname === '/stats' ? 'active' : ''}`}
        to="/stats">
        <i className="fas fa-chart-pie" />
        Stats
      </Link>
      <Link className="nav-button" to="/">
        <i className="fas fa-utensils" />
        Recipes
      </Link>
    </div>
  );
};
