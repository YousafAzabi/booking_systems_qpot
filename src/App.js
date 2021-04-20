import React from 'react';
import { SnackbarProvider } from 'notistack';
import CloseIcon from '@material-ui/icons/Close';
import Home from './components/Home';

export default function App() {
  const notistackRef = React.createRef();

  return(
    <SnackbarProvider
      maxSnack={3}
      ref={notistackRef}
      action={key => <CloseIcon onClick={() => notistackRef.current.closeSnackbar(key)} />}
    >
      <Home />
    </SnackbarProvider>
  );
}
