import React from 'react';
import './App.css';
import { BrowserRouter as Router, Navigate, Route, Routes } from 'react-router-dom';

import { PrivateRoute } from './PrivateRoute';

import { Login, Signup, Statistics } from './components';
import { Lists } from './components/Lists';

export const App = () => {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <PrivateRoute>
            <Route path="/lists" element={<Lists />} />
            <Route path="/stats" element={<Statistics />} />
            <Route path="/">
              <Navigate to="/lists" />
            </Route>
          </PrivateRoute>
        </Routes>
      </Router>
    </div>
  );
};
