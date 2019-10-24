import React, { ChangeEvent, FC, FormEvent, useState } from 'react';
import { Box, Grid, TextField } from '@material-ui/core';
import CancelIcon from '@material-ui/icons/Cancel';

import ButtonWithIcon from '../../../components/ButtonWithIcon';
import { ITestSuite } from '../TestSuiteService';

export interface IProps {
  testSuite: ITestSuite;
  buttonIcon: JSX.Element;
  buttonLabel: string;
  onSubmit: (testSuite: ITestSuite) => void;
}

const TestSuite: FC<IProps> = ({ testSuite, buttonIcon, buttonLabel, onSubmit }) => {

  const [_testSuite, setTestSuite] = useState(testSuite);

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    onSubmit(_testSuite)
  }

  function handleReset() {
    setTestSuite(testSuite);
  }

  function updateTestSuite(key: string, value: any) {
    const newTestSuite: any = { ..._testSuite };
    newTestSuite[key] = value;
    setTestSuite(newTestSuite as ITestSuite);
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
              value={_testSuite.title}
              onChange={(event: ChangeEvent<HTMLInputElement>) => updateTestSuite('title', event.target.value)} />
          </Grid>
          <Grid item>
            <TextField
              fullWidth
              variant="filled"
              label="Description"
              multiline
              value={_testSuite.description}
              onChange={(event: ChangeEvent<HTMLInputElement>) => updateTestSuite('description', event.target.value)} />
          </Grid>
          <Grid container item justify="flex-end" spacing={2}>
            <Grid item>
              <ButtonWithIcon icon={<CancelIcon />} type="reset" variant="contained">
                Reset
              </ButtonWithIcon>
            </Grid>
            <Grid item>
              <ButtonWithIcon
               type="submit"
               icon={buttonIcon}
               variant="contained"
               color="primary">
               {buttonLabel}
             </ButtonWithIcon>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </form>
  );
}

TestSuite.defaultProps = {
  buttonLabel: 'Submit'
}

export default TestSuite;
