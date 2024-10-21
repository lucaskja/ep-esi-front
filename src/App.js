import logo from './logo.svg';
import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Cadastro from './pages/cadastro';

function App() {
  return (
    <Router>
      <Routes>
        {/* Define the route for registration */}
        <Route path="/registration" element={<Cadastro />} />
      </Routes>
    </Router>
  );
}

export default App;
