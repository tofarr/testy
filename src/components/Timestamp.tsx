import React, { FC, Fragment } from 'react';

export interface IProps{
  t: Date | null;
}

const Timestamp: FC<IProps> = ({ t }) => {
  if(!t){
    return null;
  }

  function pad(n : number){
    return (n < 10) ? `0${n}` : n.toString();
  }

  return <Fragment>
    {t.getFullYear()}-{pad(t.getMonth()+1)}-{pad(t.getDate())} {pad(t.getHours())}:{pad(t.getMinutes())}:{pad(t.getSeconds())}
  </Fragment>
}

export default Timestamp;
