import React, { FC } from 'react';
import { Button } from '@material-ui/core';
import { ButtonProps } from '@material-ui/core/Button/Button';

export interface IButtonWithIconProps extends ButtonProps{
  icon: JSX.Element;
}

//Fixes issue where MUI Links always do a full refresh

const IconWithButton: FC<IButtonWithIconProps> = (props) => {
  return (
    <Button {...props}>
      {props.icon}
      {props.children}
    </Button>
  );
}

export default IconWithButton;
