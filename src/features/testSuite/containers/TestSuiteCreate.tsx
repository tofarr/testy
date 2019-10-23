import React, { FC, useEffect, useState } from 'react';
import { Link, Redirect } from "react-router-dom";

import useErr from '../../../hooks/useErr';
import useMsg from '../../../hooks/useMsg';
import Loader from '../../../components/Loader';

import { testSuiteListPath, testSuiteUpdatePath } from '../TestSuiteController';
import { create, newInstance, ITestSuite } from '../TestSuiteService';
import TestSuiteForm from '../components/TestSuiteForm';

const TestSuiteCreate: FC = () => {
  const [testSuite, setTestSuite] = useState<ITestSuite | undefined>(undefined);
  const [working, setWorking] = useState(false);
  const [done, setDone] = useState(false);
  const { addMsg } = useMsg();
  const { err } = useErr();

  function handleCreate(testSuite: ITestSuite){
    setWorking(true);
    create(testSuite).then((newTestSuite) => {
      addMsg('Test Suite Created');
      setTestSuite(newTestSuite);
      setDone(true);
    }, (e: any) => {
      setWorking(false);
      err(e);
    })
  }

  useEffect(() => {
    setWorking(true);
    newInstance().then((testSuite: ITestSuite) => {
      setWorking(false);
      setTestSuite(testSuite);
    }, (e: any) => {
      setWorking(false);
      err(e);
    });
  }, [err]);

  if(done){
    return <Redirect to={testSuiteUpdatePath((testSuite as ITestSuite).id as number)} />
  }

  if(working){
    return <Loader />
  }

  if(!testSuite){
    return null;
  }

  return <div>
    <h1>Create Test Suite</h1>
    <Link to={testSuiteListPath()}>Test Suites</Link>
    <TestSuiteForm testSuite={testSuite} onSubmit={handleCreate} buttonLabel="Create" />
  </div>
}

export default TestSuiteCreate;
