import React, { FC, useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";

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
    <div>
      <h3>Test Cases</h3>
      <Link to={testCaseCreatePath(parseInt(params.id))}>Create Test Case</Link>
      {testCases.map(testCase => (
        <EntityLink key={testCase.id} title={testCase.title} description={testCase.description} href={testCaseUpdatePath(testCase.id as number)} />
      ))}
    </div>
  );
}

export default TestCaseList;
