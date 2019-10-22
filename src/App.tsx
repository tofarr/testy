import React from 'react';
import './App.css';
import { BrowserRouter as Router } from "react-router-dom"; 

import Header from './components/Header';
import Controller from './Controller';

const App: React.FC = () => {
  return (
    <Router>
      <div className="App">
        <Header />
        <Controller />
      </div>
    </Router>
  );
}

export default App;
