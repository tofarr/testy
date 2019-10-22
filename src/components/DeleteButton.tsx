import React, { FC } from 'react';

export interface IProps {
  onDelete: () => void;
}

const EntityLink: FC<IProps> = ({ onDelete }) => {

  function handleDelete(){
    if(window.confirm('Are you sure?')){
      onDelete();
    }
  }

  return (
    <button onClick={handleDelete}>Delete</button>
  );
}

export default EntityLink;
