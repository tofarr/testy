import React, { FC, Fragment, useState } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle } from '@material-ui/core';
import CancelIcon from '@material-ui/icons/Cancel';
import DeleteIcon from '@material-ui/icons/Delete';

import ButtonWithIcon from './ButtonWithIcon';

export interface IProps {
  autoFocus?: boolean
  onDelete: () => void;
}

const DeleteButton: FC<IProps> = (props) => {
  const { onDelete } = props;
  const [open, setOpen] = useState(false);

  const copiedProps = { ...props };
  delete copiedProps.onDelete;

  function handleDelete(){
    setOpen(false);
    onDelete();
  }

  return <Fragment>
    <ButtonWithIcon
      variant="contained"
      color="secondary"
      icon={<DeleteIcon />}
      {...copiedProps}
      onClick={() => setOpen(true)}>
      Delete
    </ButtonWithIcon>
    <Dialog
      open={open}
      onClose={() => setOpen(false)}>
      <DialogTitle>Are you sure?</DialogTitle>
      <DialogContent>Deleted items cannot be retrieved!</DialogContent>
      <DialogActions>
        <ButtonWithIcon
          onClick={() => setOpen(false)}
          variant="contained"
          icon={<CancelIcon />}>
          Cancel
        </ButtonWithIcon>
        <ButtonWithIcon
          onClick={handleDelete}
          variant="contained"
          color="secondary"
          icon={<DeleteIcon />}
          autoFocus>
          Confirm
        </ButtonWithIcon>
      </DialogActions>
    </Dialog>
  </Fragment>
}

export default DeleteButton;
