import React from 'react';
import { AppBar, Button, Grid, Link, Toolbar } from '@material-ui/core';

import Msg from './Msgs';


const Header: React.FC = () => {

  return (
    <div>
      <AppBar>
        <Toolbar>
          <Grid container justify="space-between">
            <Grid item>
              <Link href="/">
                <Button>Home</Button>
              </Link>
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
