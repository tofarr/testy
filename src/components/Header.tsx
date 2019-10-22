import React from 'react';
import Menu from './Menu';
import Msg from './Msgs';

const Header: React.FC = () => {

  return (
    <div>
      <Menu />
      <Msg />
    </div>
  );
}

export default Header;
