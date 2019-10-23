import React, { FC, MouseEvent, useState } from 'react';
import { Redirect } from "react-router-dom";
import { Link } from '@material-ui/core';
import { ThemeStyle } from '@material-ui/core/styles/createTypography';

export interface IProps {
  href: string;
  variant?: ThemeStyle;
}

//Fixes issue where MUI Links always do a full refresh

const InternalLink: FC<IProps> = (props) => {
  const { href } = props;
  const [clicked, setClicked] = useState(false);

  if(clicked){
    return <Redirect to={href} />
  }

  function handleClick(e: MouseEvent){
    e.preventDefault();
    setClicked(true);
  }

  return (
    <Link {...props} onClick={handleClick} />
  );
}

export default InternalLink;
