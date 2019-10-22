import React, { useEffect, useState } from 'react';
import { create, index, newInstance, ITestCase } from '../services/TestCases';
import useMsg from '../hooks/useMsg';
import useErr from '../hooks/useErr';
import TestCase from './TestCase';

const TestCases: React.FC = () => {

  const { addMsg } = useMsg();
  const [testCases, setTestCases] = useState<ITestCase[]>([]);

  function handleRefresh(){
    index().then(setTestCases, useErr);
  }

  useEffect(() => {
    handleRefresh();
  }, []);

  return (
    <div>
      <TestCase testCase={newInstance()} onSave={handleRefresh} />
      <ul>
        {testCases.map(testCase => (
          <TestCase key={testCase.id} testCase={testCase} onSave={handleRefresh} />
        ))}
      </ul>
    </div>
  );
}

export default TestCases;
