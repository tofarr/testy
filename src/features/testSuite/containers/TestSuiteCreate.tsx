import React, { FC, useEffect, useState } from 'react';
import { Redirect } from "react-router-dom";

import useErr from '../../../hooks/useErr';
import useMsg from '../../../hooks/useMsg';
import Loader from '../../../components/Loader';

import { create, newInstance, ITestSuite } from '../TestSuiteService';
import TestSuiteForm from '../components/TestSuiteForm';

const TestSuiteUpdate: FC = () => {
  const [testSuite, setTestSuite] = useState<ITestSuite | undefined>(undefined);
  const [working, setWorking] = useState(false);
  const [done, setDone] = useState(false);
  const { addMsg } = useMsg();
  const { err } = useErr();

  function handleRefresh(){
    setWorking(true);
    newInstance().then((testSuite: ITestSuite) => {
      setWorking(false);
      setTestSuite(testSuite);
    }, (e: any) => {
      setWorking(false);
      err(e);
    });
  }

  function handleCreate(testSuite: ITestSuite){
    setWorking(true);
    create(testSuite).then(() => {
      addMsg('Test Suite Created');
      setDone(true);
    }, (e: any) => {
      setWorking(false);
      err(e);
    })
  }

  useEffect(() => {
    handleRefresh();
  }, []);

  if(done){
    return <Redirect to='/test-suite-list' />
  }

  if(working){
    return <Loader />
  }

  if(!testSuite){
    return null;
  }

  return <div>
    <TestSuiteForm testSuite={testSuite} onSubmit={handleCreate} buttonLabel="Create" />
  </div>
}

export default TestSuiteUpdate;
