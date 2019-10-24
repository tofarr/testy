import React, { ChangeEvent, FC, FormEvent, useState } from 'react';
import { Box, Button, Grid, TextField } from '@material-ui/core';
import CancelIcon from '@material-ui/icons/Cancel';

import { ITestStep } from '../TestStepService';

export interface IProps {
  testStep: ITestStep;
  buttonIcon: JSX.Element;
  buttonLabel: string;
  onSubmit: (testStep: ITestStep) => void;
}

const TestStep: FC<IProps> = ({ testStep, buttonIcon, buttonLabel, onSubmit }) => {

  const [_testStep, setTestStep] = useState(testStep);

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    onSubmit(_testStep)
  }

  function handleReset() {
    setTestStep(testStep);
  }

  function updateTestStep(key: string, value: any) {
    const newTestStep: any = { ..._testStep };
    newTestStep[key] = value;
    setTestStep(newTestStep as ITestStep);
  }

  return (
    <form onSubmit={handleSubmit} onReset={handleReset}>
      <Box p={2}>
        <Grid container direction="column" spacing={2}>
          <Grid item>
            <TextField
              autoFocus
              fullWidth
              variant="filled"
              label="Title"
              value={_testStep.title}
              onChange={(event: ChangeEvent<HTMLInputElement>) => updateTestStep('title', event.target.value)} />
          </Grid>
          <Grid item>
            <TextField
              fullWidth
              variant="filled"
              label="Description"
              multiline
              value={_testStep.description}
              onChange={(event: ChangeEvent<HTMLInputElement>) => updateTestStep('description', event.target.value)} />
          </Grid>
          <Grid container item justify="flex-end" spacing={2}>
            <Grid item>
              <Button type="reset" variant="contained">
                <CancelIcon />
                Reset
              </Button>
            </Grid>
            <Grid item>
              <Button type="submit" variant="contained" color="primary">
                {buttonIcon}
                {buttonLabel}
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </form>
  );
}

TestStep.defaultProps = {
  buttonLabel: 'Submit'
}

export default TestStep;
