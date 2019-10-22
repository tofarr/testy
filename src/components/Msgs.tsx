import React, { FC, useEffect, useState } from 'react';

import useMsg from '../hooks/useMsg';
import { IMsg } from '../hooks/useMsg';
import Timestamp from './Timestamp';

const EXPAND_TIMEOUT = 3000;

const Header: FC = () => {

  const [expanded, setExpanded] = useState(false);
  const [msgs, setMsgs] = useState<IMsg[]>([]);
  const [timeoutId, setTimeoutId] = useState<any>(null);
  const [visibleMsg, setVisibleMsg] = useState<IMsg|null>(null);
  const { subscribeToMsgs, unsubscribeFromMsgs, clearMsgs } = useMsg();

  function handleMsgs(msgs: IMsg[]){
    setMsgs(msgs);
    if(!expanded){
      setVisibleMsg(getVisibleMsg(msgs));
      clearTimeout(timeoutId);
      setTimeoutId(setTimeout(() => setVisibleMsg(null), EXPAND_TIMEOUT));
    }
  }

  function handleClear(){
    clearMsgs();
    setExpanded(false);
  }

  function getVisibleMsg(msgs: IMsg[]){
    let visibleMsg: IMsg|null = null;
    msgs.forEach((msg) => {
      if((!visibleMsg) || msg.timestamp > visibleMsg.timestamp){
        visibleMsg = msg;
      }
    })
    return visibleMsg;
  }

  useEffect(() => {
    subscribeToMsgs(handleMsgs);
    return () => {
      unsubscribeFromMsgs(handleMsgs);
    }
  })

  function renderExpanded(){
    if(!expanded){
      return null;
    }
    return <div>
      <button onClick={handleClear}>Clear Messages</button>
      <ul>
        {msgs.map((msg) => <li key={msg.timestamp.getTime()}>
          <Timestamp t={msg.timestamp} /> : {msg.type} : {msg.msg}
        </li>)}
      </ul>
    </div>
  }

  function renderCompressed(){
    if(expanded || (!visibleMsg)){
      return null;
    }
    return <div>
      <Timestamp t={visibleMsg.timestamp} /> : {visibleMsg.type} : {visibleMsg.msg}
    </div>
  }

  return (
    <div>
      {renderExpanded()}
      {renderCompressed()}
      <button onClick={() => setExpanded(!expanded)}>{expanded ? 'Hide Messages' : 'Show Messages'}</button>
    </div>
  );
}

export default Header;
