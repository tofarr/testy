import React from 'react';
import './App.css';

import Controller, { IRoute } from './components/Controller';
import { testCaseRoutes } from './features/testCase/TestCaseController';
import { testStepRoutes } from './features/testStep/TestStepController';
import { testSuiteRoutes } from './features/testSuite/TestSuiteController';

const AppController: React.FC = () => {
  const routes: IRoute[] = [];
  routes.push.apply(routes, testCaseRoutes());
  routes.push.apply(routes, testStepRoutes());
  routes.push.apply(routes, testSuiteRoutes());
  return <Controller routes={routes} />
}

export default AppController;
