import React from 'react';
import { TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {
    marginRight: theme.spacing(3)
  }
}));

export default function DateTimePicker({ value, handleChange }) {
  const classes = useStyles();
  return(
    <TextField
      className={classes.root}
      required
      id="datetime-local"
      label="Start Time"
      type="datetime-local"
      defaultValue={value}
      InputLabelProps={{shrink: true}}
      onChange={handleChange}
    />
  );
}