import React from 'react';
import './App.css';
import { BrowserRouter as Router } from "react-router-dom";

import Header from './components/Header';
import AppController from './AppController';

const App: React.FC = () => {
  return (
    <Router>
      <div className="App">
        <Header />
        <AppController />
      </div>
    </Router>
  );
}

export default App;
