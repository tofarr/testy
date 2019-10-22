import React, { ChangeEvent, FC, FormEvent, useState } from 'react';
import { create, destroy, update, ITestCase } from '../services/TestCases';
import useErr from '../hooks/useErr';
import useMsg from '../hooks/useMsg';

export interface IProps {
  testCase: ITestCase;
  onSave: () => void;
}

const TestCase: FC<IProps> = ({ testCase, onSave }) => {

  const [_testCase, setTestCase] = useState(testCase);
  const { addMsg } = useMsg();

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    if (_testCase.id) {
      handleUpdate();
    } else {
      handleCreate();
    }
  }

  function handleReset() {
    setTestCase(testCase);
  }

  function handleCreate() {
    create({... _testCase }).then(() => {
      addMsg("Test Case Created");
      handleReset();
      onSave();
    }, useErr);
  }

  function handleUpdate() {
    update(_testCase).then(() => {
      addMsg("Test Case Updated");
      onSave();
    }, useErr);
  }

  function handleDestroy() {
    destroy(_testCase.id as number).then(() => {
      addMsg("Test Case Deleted");
      onSave();
    }, useErr);
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
          <button type="submit">{_testCase.id ? 'Update' : 'Create'}</button>
          <button type="reset">Reset</button>
          {!!_testCase.id && <button type="button" onClick={handleDestroy}>Delete</button>}
        </div>
      </fieldset>
    </form>
  );
}

export default TestCase;
