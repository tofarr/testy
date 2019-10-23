import React, { FC, useEffect, useState } from 'react';
import { Redirect, useParams } from "react-router-dom";

import useErr from '../../../hooks/useErr';
import useMsg from '../../../hooks/useMsg';
import DeleteButton from '../../../components/DeleteButton';
import Loader from '../../../components/Loader';
import NotFound from '../../../components/NotFound';

import { destroy, read, update, ITestStep } from '../TestStepService';
import TestStepForm from '../components/TestStepForm';

export interface IProps {
  id: string;
}

const TestStepUpdate: FC = () => {
  const params = useParams<IProps>();
  const id = parseInt(params.id);
  const [testStep, setTestStep] = useState<ITestStep | undefined>(undefined);
  const [working, setWorking] = useState(false);
  const [done, setDone] = useState(false);
  const { addMsg } = useMsg();
  const { err } = useErr();

  function handleUpdate(testStep: ITestStep){
    setWorking(true);
    update(testStep).then(() => {
      addMsg('Test Step Updated');
      setDone(true);
    }, (e: any) => {
      setWorking(false);
      err(e);
    })
  }

  function handleDelete(){
    const id = (testStep as ITestStep).id as number;
    destroy(id).then(() => {
      addMsg('Test Step Deleted');
      setDone(true);
    }, err);
  }

  useEffect(() => {
    setWorking(true);
    read(id).then((testStep: ITestStep | undefined) => {
      setWorking(false);
      setTestStep(testStep);
    }, (e: any) => {
      setWorking(false);
      err(e);
    });
  }, [err, id]);

  if(done){
    return <Redirect to='/test-Step-list' />
  }

  if(working){
    return <Loader />
  }

  if(!testStep){
    return <NotFound />
  }

  return <div>
    <DeleteButton onDelete={handleDelete} />
    <TestStepForm testStep={testStep} onSubmit={handleUpdate} buttonLabel="Update" />
  </div>
}

export default TestStepUpdate;
