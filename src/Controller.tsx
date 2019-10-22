import React from 'react';
import './App.css';
import {
  Switch,
  Route,
} from "react-router-dom";

import TestCase from './components/TestCase';
import TestCases from './components/TestCases';

const Controller: React.FC = () => {

  return (
    <Switch>
      <Route path="/case/:caseId" component={TestCase} />
      <Route path="/cases" component={TestCases} />
      <Route path="/" component={TestCases} />
    </Switch>
  );
}

export default Controller;
