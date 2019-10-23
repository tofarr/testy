import React from 'react';
import { Redirect } from 'react-router-dom';

import { IRoute } from '../../components/Controller';

import TestSuiteCreate from './containers/TestSuiteCreate';
import TestSuiteList from './containers/TestSuiteList';
import TestSuiteUpdate from './containers/TestSuiteUpdate';

const ROOT_PATH = '/';
const TEST_SUITE_LIST = '/test-suite/list';
const TEST_SUITE_CREATE = '/test-suite/create';
const TEST_SUITE_UPDATE = '/test-suite/update/:id';


export function testSuiteRoutes(): IRoute[]{
  return [
    { path: TEST_SUITE_CREATE, component: TestSuiteCreate },
    { path: TEST_SUITE_LIST, component: TestSuiteList },
    { path: TEST_SUITE_UPDATE, component: TestSuiteUpdate },
    { path: ROOT_PATH, component: () => <Redirect to={TEST_SUITE_LIST} /> }
  ];
}

export function testSuiteCreatePath(){
  return TEST_SUITE_CREATE;
}

export function testSuiteListPath(){
  return TEST_SUITE_LIST;
}

export function testSuiteUpdatePath(id: number){
  return TEST_SUITE_UPDATE.replace(':id', id.toString());
}
