import React, { FC, useEffect, useState } from 'react';
import { Link } from "react-router-dom";

import useErr from '../../../hooks/useErr';
import EntityLink from '../../../components/EntityLink';
import Loader from '../../../components/Loader';
import { index, ITestSuite } from '../TestSuiteService';

const TestSuiteList: FC = () => {

  const [testSuites, setTestSuites] = useState<ITestSuite[]>([]);
  const [working, setWorking] = useState(false);
  const { err } = useErr();

  function handleRefresh(){
    setWorking(true);
    index().then((testSuites: ITestSuite[]) => {
      setWorking(false);
      setTestSuites(testSuites);
    }, (e: any) => {
      setWorking(false);
      err(e);
    });
  }

  useEffect(() => {
    handleRefresh();
  }, []);

  if(working){
    return <Loader />
  }

  return (
    <div>
      <Link to="/test-suite-create">Create</Link>
      {testSuites.map(testSuite => (
        <EntityLink key={testSuite.id} title={testSuite.title} description={testSuite.description} href={`/test-suite-update/${testSuite.id}`} />
      ))}
    </div>
  );
}

export default TestSuiteList;
