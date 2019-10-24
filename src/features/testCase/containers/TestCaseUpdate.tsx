import React, { FC, useEffect, useState } from 'react';
import { Link, Redirect, useParams } from "react-router-dom";
import { Box, Grid, Paper, Typography } from '@material-ui/core';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import EditIcon from '@material-ui/icons/Edit';

import useErr from '../../../hooks/useErr';
import useMsg from '../../../hooks/useMsg';
import ButtonWithIcon from '../../../components/ButtonWithIcon';
import DeleteButton from '../../../components/DeleteButton';
import Loader from '../../../components/Loader';
import NotFound from '../../../components/NotFound';

import { testSuiteUpdatePath } from '../../testSuite/TestSuiteController';
import { destroy, read, update, ITestCase } from '../TestCaseService';
import TestCaseForm from '../components/TestCaseForm';
import TestStepList from '../../testStep/containers/TestStepList';

export interface IProps {
  id: string;
}

const TestCaseUpdate: FC = () => {
  const params = useParams<IProps>();
  const id = parseInt(params.id);
  const [testCase, setTestCase] = useState<ITestCase | undefined>(undefined);
  const [working, setWorking] = useState(false);
  const [done, setDone] = useState(false);
  const testSuiteId = testCase ? testCase.testSuiteId : undefined;
  const { addMsg } = useMsg();
  const { err } = useErr();

  function handleUpdate(testCase: ITestCase){
    setWorking(true);
    update(testCase).then(() => {
      addMsg('Test Case Updated');
      setDone(true);
    }, (e: any) => {
      setWorking(false);
      err(e);
    })
  }

  function handleDelete(){
    const id = (testCase as ITestCase).id as number;
    destroy(id).then(() => {
      addMsg('Test Case Deleted');
      setDone(true);
    }, err);
  }

  useEffect(() => {
    setWorking(true);
    read(id).then((testCase: ITestCase | undefined) => {
      setWorking(false);
      setTestCase(testCase);
    }, (e: any) => {
      setWorking(false);
      err(e);
    });
  }, [err, id]);

  if(done){
    return <Redirect to={testSuiteUpdatePath(testSuiteId as number)} />
  }

  if(working){
    return <Loader />
  }

  if(!testCase){
    return <NotFound />
  }

  return <Box>
    <Grid container alignItems="center" spacing={2}>
      <Grid xs item>
        <Typography variant="h4">Test Case</Typography>
      </Grid>
      <Grid item>
        <DeleteButton onDelete={handleDelete} />
      </Grid>
      {!!testSuiteId && <Grid item>
        <Link to={testSuiteUpdatePath(testSuiteId)} className="button">
          <ButtonWithIcon
            variant="contained"
            icon={<ArrowDropUpIcon />}>
            Test Suite
          </ButtonWithIcon>
        </Link>
      </Grid>}
    </Grid>
    <TestCaseForm
      testCase={testCase}
      onSubmit={handleUpdate}
      buttonIcon={<EditIcon />}
      buttonLabel="Update" />
    <Paper>
      <Box p={2}>
        <TestStepList />
      </Box>
    </Paper>
  </Box>
}

export default TestCaseUpdate;
