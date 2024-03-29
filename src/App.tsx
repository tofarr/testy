import React from 'react';
import './App.css';
import { BrowserRouter as Router } from "react-router-dom";
import { Box, Container, Paper } from '@material-ui/core';

import CustomTheme from './components/CustomTheme';
import Header from './components/Header';
import AppController from './AppController';

const App: React.FC = () => {
  return (
    <Router>
      <CustomTheme>
        <Container>
          <Header />
          <Paper>
            <Box p={2} mt={10}>
              <AppController />
            </Box>
          </Paper>
        </Container>
      </CustomTheme>
    </Router>
  );
}

export default App;
