import React, { FC, MouseEvent, useEffect, useState } from 'react';
import { Redirect } from "react-router-dom";
import { Link } from '@material-ui/core';
import { LinkProps } from '@material-ui/core/Link/Link';

export interface IProps extends LinkProps{
  href: string;
}

//Fixes issue where MUI Links always do a full refresh

const InternalLink: FC<IProps> = (props) => {
  const { href } = props;
  const [clicked, setClicked] = useState(false);

  useEffect(() => {
    if(clicked){
      setClicked(false);
    }
  }, [clicked]);

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
