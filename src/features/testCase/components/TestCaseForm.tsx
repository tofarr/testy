import React, { ChangeEvent, FC, FormEvent, useState } from 'react';
import { Box, Grid, TextField } from '@material-ui/core';
import CancelIcon from '@material-ui/icons/Cancel';

import ButtonWithIcon from '../../../components/ButtonWithIcon';
import { ITestCase } from '../TestCaseService';

export interface IProps {
  testCase: ITestCase;
  buttonIcon: JSX.Element;
  buttonLabel: string;
  onSubmit: (testCase: ITestCase) => void;
}

const TestCase: FC<IProps> = ({ testCase, buttonIcon, buttonLabel, onSubmit }) => {

  const [_testCase, setTestCase] = useState(testCase);

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    onSubmit(_testCase)
  }

  function handleReset() {
    setTestCase(testCase);
  }

  function updateTestCase(key: string, value: any) {
    const newTestCase: any = { ..._testCase };
    newTestCase[key] = value;
    setTestCase(newTestCase as ITestCase);
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
              value={_testCase.title}
              onChange={(event: ChangeEvent<HTMLInputElement>) => updateTestCase('title', event.target.value)} />
          </Grid>
          <Grid item>
            <TextField
              fullWidth
              variant="filled"
              label="Description"
              multiline
              value={_testCase.description}
              onChange={(event: ChangeEvent<HTMLInputElement>) => updateTestCase('description', event.target.value)} />
          </Grid>
          <Grid container item justify="flex-end" spacing={2}>
            <Grid item>
              <ButtonWithIcon type="reset" variant="contained" icon={<CancelIcon />}>
                Reset
              </ButtonWithIcon>
            </Grid>
            <Grid item>
              <ButtonWithIcon
                type="submit"
                variant="contained"
                color="primary"
                icon={buttonIcon}>
              {buttonLabel}
              </ButtonWithIcon>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </form>
  );
}

TestCase.defaultProps = {
  buttonLabel: 'Submit'
}

export default TestCase;
