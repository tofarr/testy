import React, { ChangeEvent, FC, FormEvent, useState } from 'react';
import { ITestSuite } from '../TestSuiteService';

export interface IProps {
  testSuite: ITestSuite;
  buttonLabel: string;
  onSubmit: (testSuite: ITestSuite) => void;
}

const TestSuite: FC<IProps> = ({ testSuite, buttonLabel, onSubmit }) => {

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
      <fieldset>
        <label>
          <span>Title</span>
          <input
            type="text"
            value={_testSuite.title}
            onChange={(event: ChangeEvent<HTMLInputElement>) => updateTestSuite('title', event.target.value)} />
        </label>
        <label>
          <span>Description</span>
          <textarea
            value={_testSuite.description}
            onChange={(event: ChangeEvent<HTMLTextAreaElement>) => updateTestSuite('description', event.target.value)} />
        </label>
        <div>
          <button type="submit">{buttonLabel}</button>
          <button type="reset">Reset</button>
        </div>
      </fieldset>
    </form>
  );
}

TestSuite.defaultProps = {
  buttonLabel: 'Submit'
}

export default TestSuite;
