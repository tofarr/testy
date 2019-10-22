import React, { FC, useEffect, useState } from 'react';
import { Redirect, useParams } from "react-router-dom";

import useErr from '../../../hooks/useErr';
import useMsg from '../../../hooks/useMsg';
import DeleteButton from '../../../components/DeleteButton';
import Loader from '../../../components/Loader';

import { destroy, read, update, ITestSuite } from '../TestSuiteService';
import TestSuiteForm from '../components/TestSuiteForm';

export interface IProps {
  id: string;
}

const TestSuiteUpdate: FC = () => {
  const params = useParams<IProps>();
  const id = parseInt(params.id);
  const [testSuite, setTestSuite] = useState<ITestSuite | undefined>(undefined);
  const [working, setWorking] = useState(false);
  const [done, setDone] = useState(false);
  const { addMsg } = useMsg();
  const { err } = useErr();

  function handleError(e: any){
    setWorking(false);
    err(e);
  }

  function handleRefresh(){
    setWorking(true);
    read(id).then((testSuite: ITestSuite | undefined) => {
      setWorking(false);
      setTestSuite(testSuite);
    }, handleError);
  }

  function handleUpdate(testSuite: ITestSuite){
    setWorking(true);
    update(testSuite).then(() => {
      addMsg('Test Suite Updated');
      setDone(true);
    }, (e: any) => {
      setWorking(false);
      err(e);
    })
  }

  function handleDelete(){
    const id = (testSuite as ITestSuite).id as number;
    destroy(id).then(() => {
      addMsg('Test Suite Deleted');
      setDone(true);
    }, err);
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
    <DeleteButton onDelete={handleDelete} />
    <TestSuiteForm testSuite={testSuite} onSubmit={handleUpdate} buttonLabel="Update" />
  </div>
}

export default TestSuiteUpdate;
