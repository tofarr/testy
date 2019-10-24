import React, { FC, useEffect, useState } from 'react';
import { Link, Redirect } from "react-router-dom";
import { Box, Grid, Typography } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';

import useErr from '../../../hooks/useErr';
import useMsg from '../../../hooks/useMsg';
import useQuery from '../../../hooks/useQuery';
import ButtonWithIcon from '../../../components/ButtonWithIcon';
import Loader from '../../../components/Loader';

import { testSuiteUpdatePath } from '../../testSuite/TestSuiteController';
import { testCaseListPath, testCaseUpdatePath } from '../TestCaseController';
import { create, newInstance, ITestCase } from '../TestCaseService';
import TestCaseForm from '../components/TestCaseForm';

const TestCaseCreate: FC = () => {
  const [testCase, setTestCase] = useState<ITestCase | undefined>(undefined);
  const [working, setWorking] = useState(false);
  const [done, setDone] = useState(false);
  const { addMsg } = useMsg();
  const { err } = useErr();
  const testSuiteId = useQuery().get('testSuiteId');

  function handleCreate(testCase: ITestCase){
    setWorking(true);
    create(testCase).then((newTestCase) => {
      addMsg('Test Case Created');
      setTestCase(newTestCase);
      setDone(true);
    }, (e: any) => {
      setWorking(false);
      err(e);
    })
  }

  function renderRedirect(){
    if(!testSuiteId){
      return <Redirect to={testCaseListPath()} />
    }
    return <Redirect to={testCaseUpdatePath((testCase as ITestCase).id as number)} />
  }

  function renderLink(){
    if(testSuiteId){
      return <Link to={testSuiteUpdatePath(parseInt(testSuiteId))} className="button">
        <ButtonWithIcon variant="contained" icon={<ArrowDropUpIcon />}>
          Test Suite
        </ButtonWithIcon>
      </Link>
    }
    return <Link to={testCaseListPath()} className="button">
      <ButtonWithIcon variant="contained" icon={<ArrowDropUpIcon />}>
        Test Cases
      </ButtonWithIcon>
    </Link>
  }

  useEffect(() => {
    setWorking(true);
    newInstance().then((testCase: ITestCase) => {
      if(testSuiteId){
        testCase.testSuiteId = parseInt(testSuiteId);
      }
      setWorking(false);
      setTestCase(testCase);
    }, (e: any) => {
      setWorking(false);
      err(e);
    });
  }, [err, testSuiteId]);

  if(done){
    return renderRedirect();
  }

  if(working){
    return <Loader />
  }

  if(!testCase){
    return null;
  }

  return <Box>
    <Grid container alignItems="center" spacing={2}>
      <Grid xs item>
        <Typography variant="h4">Create Test Case</Typography>
      </Grid>
      <Grid item>
        {renderLink()}
      </Grid>
    </Grid>
    <TestCaseForm
      testCase={testCase}
      onSubmit={handleCreate}
      buttonLabel="Create"
      buttonIcon={<AddIcon />} />
  </Box>
}

export default TestCaseCreate;
