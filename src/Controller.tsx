import React from 'react';
import './App.css';
import {
  Switch,
  Route,
} from "react-router-dom";

import TestCase from './components/TestCase';
import TestCases from './components/TestCases';
import TestSuiteCreate from './features/testSuite/containers/TestSuiteCreate';
import TestSuiteList from './features/testSuite/containers/TestSuiteList';
import TestSuiteUpdate from './features/testSuite/containers/TestSuiteUpdate';

const Controller: React.FC = () => {

  return (
    <Switch>
      <Route path="/test-suite-create/" component={TestSuiteCreate} />
      <Route path="/test-suite-update/:id" component={TestSuiteUpdate} />
      <Route path="/test-suite-list" component={TestSuiteList} />
      {/*<Route path="/case/:id" component={TestCase} />
      <Route path="/cases" component={TestCases} />*/}
      <Route path="/" component={TestSuiteList} />
    </Switch>
  );
}

export default Controller;
