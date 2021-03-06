import React from 'react';
import { Link } from 'react-router-dom';

export const Navbar = () => {
  return (
    <div className="navigation-bar">
      <Link className="nav-button" to="/">
        <i className="fas fa-list" />
        List
      </Link>
      <Link className="nav-button" to="/stats">
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
