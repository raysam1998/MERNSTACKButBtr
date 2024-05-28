import React from 'react';
import logo from './logo.svg';
import './App.css';
import HomePage from './pages/HomePage';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route  path="/" element={<HomePage/>} />
      </Routes>
    </Router>
  );
};

export default App;
