import React from 'react';
import { AppBar, Button, Grid, Link, Toolbar } from '@material-ui/core';
import HomeIcon from '@material-ui/icons/Home';

import ButtonWithIcon from './ButtonWithIcon';
import InternalLink from './InternalLink';
import Msg from './Msgs';


const Header: React.FC = () => {

  return (
    <div>
      <AppBar>
        <Toolbar>
          <Grid container justify="space-between">
            <Grid item>
              <InternalLink href="/" color="inherit">
                <ButtonWithIcon icon={<HomeIcon />} color="inherit">Home</ButtonWithIcon>
              </InternalLink>
            </Grid>
            <Grid item>
              <Msg />
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default Header;
