import React, { FC, Fragment, useEffect, useState } from 'react';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, Typography } from '@material-ui/core';

import useMsg from '../hooks/useMsg';
import { IMsg } from '../hooks/useMsg';
import Timestamp from './Timestamp';

const EXPAND_TIMEOUT = 3000;

const Header: FC = () => {

  const [open, setOpen] = useState(false);
  const [msgs, setMsgs] = useState<IMsg[]>([]);
  const [timeoutId, setTimeoutId] = useState<any>(null);
  const [visibleMsg, setVisibleMsg] = useState<IMsg|null>(null);
  const { subscribeToMsgs, unsubscribeFromMsgs, clearMsgs } = useMsg();

  function handleMsgs(msgs: IMsg[]){
    setMsgs(msgs);
    if(!open){
      setVisibleMsg(getVisibleMsg(msgs));
      clearTimeout(timeoutId);
      setTimeoutId(setTimeout(() => setVisibleMsg(null), EXPAND_TIMEOUT));
    }
  }

  function handleClear(){
    clearMsgs();
    setOpen(false);
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

  function renderDialog(){
    if(!open){
      return null;
    }
    return <Dialog
      open={open}
      onClose={() => setOpen(false)}>
      <DialogTitle>Messages</DialogTitle>
      <DialogContent>
        {msgs.map((msg) => <div key={msg.timestamp.getTime()}>
          <Timestamp t={msg.timestamp} /> : {msg.type} : {msg.msg}
        </div>)}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClear} variant="contained" color="secondary" autoFocus>
          Clear Messages
        </Button>
      </DialogActions>
    </Dialog>
  }

  function renderRecent(){
    if(!visibleMsg){
      return null;
    }
    return <Fragment>
      <Timestamp t={visibleMsg.timestamp} /> : {visibleMsg.type} : {visibleMsg.msg}
    </Fragment>
  }

  return (
    <Fragment>
      {renderRecent()}
      {!!msgs.length && <Button onClick={() => setOpen(true)}>Messages</Button>}
      {renderDialog()}
    </Fragment>
  );
}

export default Header;
