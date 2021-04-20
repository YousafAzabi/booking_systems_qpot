import React from 'react';
import { SnackbarProvider } from 'notistack';
import Home from './components/Home';

export default function App() {
  return(
    <SnackbarProvider maxSnack={3}>
      <Home />
    </SnackbarProvider>
  );
}
