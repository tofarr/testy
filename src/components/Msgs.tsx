import React, { FC, useEffect, useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid } from '@material-ui/core';
import { SvgIconProps } from '@material-ui/core/SvgIcon/SvgIcon';
import ErrorIcon from '@material-ui/icons/Error';
import InfoIcon from '@material-ui/icons/Info';
import FeedbackIcon from '@material-ui/icons/Feedback';
import WarningIcon from '@material-ui/icons/Warning';

import useMsg, { MsgType } from '../hooks/useMsg';
import { IMsg } from '../hooks/useMsg';
import ButtonWithIcon from './ButtonWithIcon';
import DeleteButton from './DeleteButton';
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

  function renderType(type: number, iconColor: SvgIconProps['color']){
    switch(type){
      case MsgType.Info:
        return <InfoIcon color={iconColor || "primary"} />;
      case MsgType.Warning:
        return <WarningIcon color={iconColor || "primary"} />;
      case MsgType.Error:
      default:
        return <ErrorIcon color={iconColor || "secondary"} />;
    }
  }

  function renderMsgRow(msg: IMsg, iconColor: SvgIconProps['color']){
    return <Grid
      container
      key={msg.timestamp.getTime()}
      alignItems="center"
      spacing={2}>
      <Grid item>{renderType(msg.type, iconColor)}</Grid>
      <Grid item><Timestamp t={msg.timestamp} /></Grid>
      <Grid item xs>{msg.msg}</Grid>
    </Grid>
  }

  function renderDialog(){
    if(!open){
      return null;
    }
    return <Dialog
      open={open}
      onClose={() => setOpen(false)}>
      <DialogTitle>Messages</DialogTitle>
      <DialogContent>
        {msgs.map((msg) => renderMsgRow(msg, undefined))}
      </DialogContent>
      <DialogActions>
        <DeleteButton onDelete={handleClear} autoFocus>
          Clear Messages
        </DeleteButton>
      </DialogActions>
    </Dialog>
  }

  function renderRecent(){
    if(!visibleMsg){
      return null;
    }
    return renderMsgRow(visibleMsg, "inherit");
  }

  return (
    <Grid container alignItems="center">
      <Grid item>{renderRecent()}</Grid>
      {!!msgs.length && <Grid item>
        <ButtonWithIcon
          onClick={() => setOpen(true)}
          color="inherit"
          icon={<FeedbackIcon />}>
          Messages
        </ButtonWithIcon>
      </Grid>}
      {renderDialog()}
    </Grid>
  );
}

export default Header;
