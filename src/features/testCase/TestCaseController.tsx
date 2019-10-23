import React, { FC } from 'react';

import Controller, { IRoute } from '../../components/Controller';

import TestCaseCreate from './containers/TestCaseCreate';
import TestCaseList from './containers/TestCaseList';
import TestCaseUpdate from './containers/TestCaseUpdate';

const TEST_CASE_LIST = '/test-case/list';
const TEST_CASE_CREATE = '/test-case/create';
const TEST_CASE_UPDATE = '/test-case/update/:id';

export function testCaseRoutes(): IRoute[]{
  return [
    { path: TEST_CASE_CREATE, component: TestCaseCreate },
    { path: TEST_CASE_LIST, component: TestCaseList },
    { path: TEST_CASE_UPDATE, component: TestCaseUpdate }
  ];
}

const TestCaseController: FC = () => {
  return <Controller routes={testCaseRoutes()} />
}

export default TestCaseController;

export function testCaseCreatePath(testSuiteId: number){
  return TEST_CASE_CREATE + (testSuiteId ? `?testSuiteId=${testSuiteId}` : '');
}

export function testCaseListPath(){
  return TEST_CASE_LIST;
}

export function testCaseUpdatePath(id: number){
  return TEST_CASE_UPDATE.replace(':id', id.toString());
}
