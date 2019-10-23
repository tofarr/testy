import React, { FC, Fragment, useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@material-ui/core';

export interface IProps {
  onDelete: () => void;
}

const EntityLink: FC<IProps> = ({ onDelete }) => {

  const [open, setOpen] = useState(false);

  function handleDelete(){
    setOpen(false);
    onDelete();
  }

  return <Fragment>
    <Button variant="contained" color="secondary" onClick={() => setOpen(true)}>Delete</Button>
    <Dialog
      open={open}
      onClose={() => setOpen(false)}>
      <DialogTitle>Are you sure?</DialogTitle>
      <DialogContent>Deleted items cannot be retrieved!</DialogContent>
      <DialogActions>
        <Button onClick={() => setOpen(false)} variant="contained">
          Cancel
        </Button>
        <Button onClick={handleDelete} variant="contained" color="secondary" autoFocus>
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  </Fragment>
}

export default EntityLink;
