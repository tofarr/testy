import React, { ChangeEvent, FC, FormEvent, useState } from 'react';
import { ITestStep } from '../TestStepService';

export interface IProps {
  testStep: ITestStep;
  buttonLabel: string;
  onSubmit: (testStep: ITestStep) => void;
}

const TestStep: FC<IProps> = ({ testStep, buttonLabel, onSubmit }) => {

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
      <fieldset>
        <label>
          <span>Title</span>
          <input
            type="text"
            value={_testStep.title}
            onChange={(event: ChangeEvent<HTMLInputElement>) => updateTestStep('title', event.target.value)} />
        </label>
        <label>
          <span>Description</span>
          <textarea
            value={_testStep.description}
            onChange={(event: ChangeEvent<HTMLTextAreaElement>) => updateTestStep('description', event.target.value)} />
        </label>
        <div>
          <button type="submit">{buttonLabel}</button>
          <button type="reset">Reset</button>
        </div>
      </fieldset>
    </form>
  );
}

TestStep.defaultProps = {
  buttonLabel: 'Submit'
}

export default TestStep;
