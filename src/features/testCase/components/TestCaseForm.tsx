import React, { ChangeEvent, FC, FormEvent, useState } from 'react';
import { ITestCase } from '../TestCaseService';

export interface IProps {
  testCase: ITestCase;
  buttonLabel: string;
  onSubmit: (testCase: ITestCase) => void;
}

const TestCase: FC<IProps> = ({ testCase, buttonLabel, onSubmit }) => {

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
      <fieldset>
        <label>
          <span>Title</span>
          <input
            type="text"
            value={_testCase.title}
            onChange={(event: ChangeEvent<HTMLInputElement>) => updateTestCase('title', event.target.value)} />
        </label>
        <label>
          <span>Description</span>
          <textarea
            value={_testCase.description}
            onChange={(event: ChangeEvent<HTMLTextAreaElement>) => updateTestCase('description', event.target.value)} />
        </label>
        <div>
          <button type="submit">{buttonLabel}</button>
          <button type="reset">Reset</button>
        </div>
      </fieldset>
    </form>
  );
}

TestCase.defaultProps = {
  buttonLabel: 'Submit'
}

export default TestCase;
