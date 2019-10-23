import React, { FC } from 'react';

import Controller, { IRoute } from '../../components/Controller';

import TestStepCreate from './containers/TestStepCreate';
import TestStepList from './containers/TestStepList';
import TestStepUpdate from './containers/TestStepUpdate';

const TEST_STEP_LIST = '/test-step/list';
const TEST_STEP_CREATE = '/test-step/create';
const TEST_STEP_UPDATE = '/test-step/update/:id';

export function testStepRoutes(): IRoute[]{
  return [
    { path: TEST_STEP_CREATE, component: TestStepCreate },
    { path: TEST_STEP_LIST, component: TestStepList },
    { path: TEST_STEP_UPDATE, component: TestStepUpdate }
  ];
}

const TestStepController: FC = () => {
  return <Controller routes={testStepRoutes()} />
}

export default TestStepController;

export function testStepCreatePath(testCaseId: number){
  return TEST_STEP_CREATE + (testCaseId ? `?testCaseId=${testCaseId}` : '');
}

export function testStepListPath(){
  return TEST_STEP_LIST;
}

export function testStepUpdatePath(id: number){
  return TEST_STEP_UPDATE.replace(':id', id.toString());
}
