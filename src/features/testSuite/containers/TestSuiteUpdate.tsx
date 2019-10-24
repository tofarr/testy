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

import { testSuiteListPath } from '../TestSuiteController';
import { destroy, read, update, ITestSuite } from '../TestSuiteService';
import TestSuiteForm from '../components/TestSuiteForm';
import TestCaseList from '../../testCase/containers/TestCaseList';

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
    setWorking(true);
    read(id).then((testSuite: ITestSuite | undefined) => {
      setWorking(false);
      setTestSuite(testSuite);
    }, (e: any) => {
      setWorking(false);
      err(e);
    });
  }, [err, id]);

  if(done){
    return <Redirect to={testSuiteListPath()} />
  }

  if(working){
    return <Loader />
  }

  if(!testSuite){
    return <NotFound />
  }

  return <Box>
    <Grid container alignItems="center" spacing={2}>
      <Grid xs item>
        <Typography variant="h4">Test Suite</Typography>
      </Grid>
      <Grid item>
        <DeleteButton onDelete={handleDelete} />
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
      onSubmit={handleUpdate}
      buttonIcon={<EditIcon />}
      buttonLabel="Update" />
    <Paper>
      <Box p={2}>
        <TestCaseList />
      </Box>
    </Paper>
  </Box>
}

export default TestSuiteUpdate;
