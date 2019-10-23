import React, { FC, useEffect, useState } from 'react';
import { Link, Redirect, useParams } from "react-router-dom";
import { Box, Button, Grid, Typography } from '@material-ui/core';

import useErr from '../../../hooks/useErr';
import useMsg from '../../../hooks/useMsg';
import DeleteButton from '../../../components/DeleteButton';
import Loader from '../../../components/Loader';
import NotFound from '../../../components/NotFound';

import { testStepListPath } from '../../testStep/TestStepController';
import { testCaseUpdatePath } from '../../testCase/TestCaseController';
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
  const testCaseId = testStep ? testStep.testCaseId : undefined;
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

  function renderLink(){
    if(testCaseId){
      return <Link to={testCaseUpdatePath(testCaseId)} className="button">
        <Button variant="contained" color="primary">
          Test Case
        </Button>
      </Link>
    }
    return <Link to={testStepListPath()} className="button">
      <Button variant="contained" color="primary">
        Test Steps
      </Button>
    </Link>
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
    if(testCaseId){
      return <Redirect to={testCaseUpdatePath(testCaseId)} />
    }else{
      return <Redirect to={testStepListPath()} />
    }
  }

  if(working){
    return <Loader />
  }

  if(!testStep){
    return <NotFound />
  }

  return <Box>
    <Grid container alignItems="center" spacing={2}>
      <Grid xs item>
        <Typography variant="h4">Test Step</Typography>
      </Grid>
      <Grid item>
        <DeleteButton onDelete={handleDelete} />
      </Grid>
      <Grid item>
        {renderLink()}
      </Grid>
    </Grid>
    <TestStepForm testStep={testStep} onSubmit={handleUpdate} buttonLabel="Update" />
  </Box>
}

export default TestStepUpdate;
