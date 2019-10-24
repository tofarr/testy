import React, { FC, useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import { Box, Grid, Typography } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';

import useErr from '../../../hooks/useErr';
import ButtonWithIcon from '../../../components/ButtonWithIcon';
import EntityLink from '../../../components/EntityLink';
import Loader from '../../../components/Loader';
import { testSuiteCreatePath, testSuiteUpdatePath } from '../TestSuiteController';
import { list, ITestSuite } from '../TestSuiteService';


const TestSuiteList: FC = () => {

  const [testSuites, setTestSuites] = useState<ITestSuite[]>([]);
  const [working, setWorking] = useState(false);
  const { err } = useErr();

  useEffect(() => {
    setWorking(true);
    list().then((testSuites: ITestSuite[]) => {
      setWorking(false);
      setTestSuites(testSuites);
    }, (e: any) => {
      setWorking(false);
      err(e);
    });
  }, [err]);

  if(working){
    return <Loader />
  }

  return (
    <Box>
      <Grid container alignItems="center" spacing={2}>
        <Grid xs item>
          <Typography variant="h4">Test Suites</Typography>
        </Grid>
        <Grid item>
          <Link to={testSuiteCreatePath()} className="button">
            <ButtonWithIcon icon={<AddIcon />} variant="contained" color="primary">
              Create Test Suite
            </ButtonWithIcon>
          </Link>
        </Grid>
      </Grid>
      <Box p={1}>
        {testSuites.map(testSuite => (
          <EntityLink
            key={testSuite.id}
            title={testSuite.title}
            description={testSuite.description}
            href={testSuiteUpdatePath(testSuite.id as number)} />
        ))}
      </Box>
    </Box>
  );
}

export default TestSuiteList;
