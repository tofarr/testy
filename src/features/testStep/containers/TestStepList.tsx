import React, { FC, useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { Box, Button, Grid, Typography } from '@material-ui/core';

import useErr from '../../../hooks/useErr';
import EntityLink from '../../../components/EntityLink';
import Loader from '../../../components/Loader';


import { testStepCreatePath, testStepUpdatePath } from '../TestStepController';
import { list, ITestStep } from '../TestStepService';

export interface IProps {
  id: string;
  offset: string;
  limit: string;
}

const TestStepList: FC = () => {

  const [testSteps, setTestSteps] = useState<ITestStep[]>([]);
  const [working, setWorking] = useState(false);
  const { err } = useErr();
  const params = useParams<IProps>();

  useEffect(() => {

    function parseParams(){
      return {
        testStepId: parseInt(params.id),
        offset: parseInt(params.offset) || undefined,
        limit: parseInt(params.limit) || undefined
      };
    }

    setWorking(true);
    list(parseParams()).then((testSteps: ITestStep[]) => {
      setWorking(false);
      setTestSteps(testSteps);
    }, (e: any) => {
      setWorking(false);
      err(e);
    });
  }, [err, params.id, params.offset, params.limit]);

  if(working){
    return <Loader />
  }

  return (
    <Box>
      <Grid container alignItems="center" spacing={2}>
        <Grid xs item>
          <Typography variant="h4">Test Steps</Typography>
        </Grid>
        <Grid item>
          <Link to={testStepCreatePath(parseInt(params.id))} className="button">
            <Button variant="contained" color="primary">
              Create Test Step
            </Button>
          </Link>
        </Grid>
      </Grid>
      <Box p={1}>
        {testSteps.map(testStep => (
          <EntityLink key={testStep.id} title={testStep.title} description={testStep.description} href={testStepUpdatePath(testStep.id as number)} />
        ))}
      </Box>
    </Box>
  );
}

export default TestStepList;
