import React, { FC, useEffect, useState } from 'react';
import { Link, Redirect  } from "react-router-dom";
import { Box, Grid, Typography } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';

import useErr from '../../../hooks/useErr';
import useMsg from '../../../hooks/useMsg';
import useQuery from '../../../hooks/useQuery';
import ButtonWithIcon from '../../../components/ButtonWithIcon';
import Loader from '../../../components/Loader';

import { testCaseUpdatePath } from '../../testCase/TestCaseController';
import { testStepListPath } from '../TestStepController';
import { create, newInstance, ITestStep } from '../TestStepService';
import TestStepForm from '../components/TestStepForm';

const TestStepCreate: FC = () => {
  const [testStep, setTestStep] = useState<ITestStep | undefined>(undefined);
  const [working, setWorking] = useState(false);
  const [done, setDone] = useState(false);
  const { addMsg } = useMsg();
  const { err } = useErr();
  const testCaseId = useQuery().get('testCaseId');

  function handleCreate(testStep: ITestStep){
    setWorking(true);
    create(testStep).then(() => {
      addMsg('Test Step Created');
      setDone(true);
    }, (e: any) => {
      setWorking(false);
      err(e);
    })
  }

  function renderRedirect(){
    if(testCaseId){
      return <Redirect to={testCaseUpdatePath(parseInt(testCaseId))} />
    }
    return <Redirect to={testStepListPath()} />
  }

  function renderLink(){
    if(testCaseId){
      return <Link to={testCaseUpdatePath(parseInt(testCaseId))} className="button">
        <ButtonWithIcon variant="contained" icon={<ArrowDropUpIcon />}>
          Test Case
        </ButtonWithIcon>
      </Link>
    }

    return <Link to={testStepListPath()} className="button">
      <ButtonWithIcon variant="contained" icon={<ArrowDropUpIcon />}>
        Test Steps
      </ButtonWithIcon>
    </Link>
  }

  useEffect(() => {
    setWorking(true);
    newInstance().then((testStep: ITestStep) => {
      if(testCaseId){
        testStep.testCaseId = parseInt(testCaseId);
      }
      setWorking(false);
      setTestStep(testStep);
    }, (e: any) => {
      setWorking(false);
      err(e);
    });
  }, [err, testCaseId]);

  if(done){
    return renderRedirect();
  }

  if(working){
    return <Loader />
  }

  if(!testStep){
    return null;
  }

  return <Box>
    <Grid container alignItems="center" spacing={2}>
      <Grid xs item>
        <Typography variant="h4">Create Test Step</Typography>
      </Grid>
      <Grid item>
        {renderLink()}
      </Grid>
    </Grid>
    <TestStepForm
      testStep={testStep}
      onSubmit={handleCreate}
      buttonIcon={<AddIcon />}
      buttonLabel="Create" />
  </Box>
}

export default TestStepCreate;
