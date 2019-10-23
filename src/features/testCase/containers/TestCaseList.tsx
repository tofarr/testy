import React, { FC, useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { Box, Button, Grid, Typography } from '@material-ui/core';

import useErr from '../../../hooks/useErr';
import EntityLink from '../../../components/EntityLink';
import Loader from '../../../components/Loader';


import { testCaseCreatePath, testCaseUpdatePath } from '../TestCaseController';
import { list, ITestCase } from '../TestCaseService';

export interface IProps {
  id: string;
  offset: string;
  limit: string;
}

const TestCaseList: FC = () => {

  const [testCases, setTestCases] = useState<ITestCase[]>([]);
  const [working, setWorking] = useState(false);
  const { err } = useErr();
  const params = useParams<IProps>();

  useEffect(() => {

    function parseParams(){
      return {
        testSuiteId: parseInt(params.id),
        offset: parseInt(params.offset) || undefined,
        limit: parseInt(params.limit) || undefined
      };
    }

    setWorking(true);
    list(parseParams()).then((testCases: ITestCase[]) => {
      setWorking(false);
      setTestCases(testCases);
    }, (e: any) => {
      setWorking(false);
      err(e);
    });
  }, [err, params.id, params.limit, params.offset]);

  if(working){
    return <Loader />
  }

  return (
    <Box>
      <Grid container alignItems="center" spacing={2}>
        <Grid xs item>
          <Typography variant="h4">Test Cases</Typography>
        </Grid>
        <Grid item>
          <Link to={testCaseCreatePath(parseInt(params.id))} className="button">
            <Button variant="contained" color="primary">
              Create Test Case
            </Button>
          </Link>
        </Grid>
      </Grid>
      <Box p={1}>
        {testCases.map(testCase => (
          <EntityLink key={testCase.id} title={testCase.title} description={testCase.description} href={testCaseUpdatePath(testCase.id as number)} />
        ))}
      </Box>
    </Box>
  );
}

export default TestCaseList;
