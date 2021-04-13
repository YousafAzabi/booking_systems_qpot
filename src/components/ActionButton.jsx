import React from 'react';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import { Icons } from '../config';

const useStyles = makeStyles(theme => ({
  root: {
    marginRight: theme.spacing(1),
    marginBottom: theme.spacing(2)
  }
}));

export default function ActionButton({ action, handleClick, disabled=false }) {
  const classes = useStyles();

  return(
    <Button
      className={classes.root}
      variant="contained"
      color="primary"
      startIcon={Icons[action]}
      onClick={() => handleClick(action)}
      disabled={disabled}
    >
      {action}
    </Button>
  );
}