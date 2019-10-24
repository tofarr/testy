import React, { FC, useEffect, useState } from 'react';
import { Link, Redirect } from "react-router-dom";
import { Box, Grid, Typography } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';

import useErr from '../../../hooks/useErr';
import useMsg from '../../../hooks/useMsg';
import ButtonWithIcon from '../../../components/ButtonWithIcon';
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

  return <Box>
    <Grid container alignItems="center" spacing={2}>
      <Grid xs item>
        <Typography variant="h4">Create Test Suite</Typography>
      </Grid>
      <Grid item>
        <Link to={testSuiteListPath()} className="button">
          <ButtonWithIcon icon={<ArrowDropUpIcon />} variant="contained">
            Test Suites
          </ButtonWithIcon>
        </Link>
      </Grid>
    </Grid>
    <TestSuiteForm
      testSuite={testSuite}
      onSubmit={handleCreate}
      buttonIcon={<AddIcon />}
      buttonLabel="Create" />
  </Box>
}

export default TestSuiteCreate;
