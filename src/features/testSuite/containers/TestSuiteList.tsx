import React, { FC, useEffect, useState } from 'react';
import { Link } from "react-router-dom";

import useErr from '../../../hooks/useErr';
import EntityLink from '../../../components/EntityLink';
import Loader from '../../../components/Loader';
import { testSuiteCreatePath, testSuiteUpdatePath } from '../TestSuiteController';
import { list, ITestSuite } from '../TestSuiteService';


const TestSuiteList: FC = () => {

  const [testSuites, setTestSuites] = useState<ITestSuite[]>([]);
  const [working, setWorking] = useState(false);
  const { err } = useErr();

  useEffect(() => {
    setWorking(true);
    list().then((testSuites: ITestSuite[]) => {
      setWorking(false);
      setTestSuites(testSuites);
    }, (e: any) => {
      setWorking(false);
      err(e);
    });
  }, [err]);

  if(working){
    return <Loader />
  }

  return (
    <div>
    <h1>Test Suites</h1>
      <Link to={testSuiteCreatePath()}>Create Test Suite</Link>
      {testSuites.map(testSuite => (
        <EntityLink
          key={testSuite.id}
          title={testSuite.title}
          description={testSuite.description}
          href={testSuiteUpdatePath(testSuite.id as number)} />
      ))}
    </div>
  );
}

export default TestSuiteList;
