import React from 'react';
import { TextField } from '@material-ui/core';

export default function Description({ value, handleChange }) {
  return(
    <TextField
      id="description"
      label="Descritption"
      variant="outlined"
      multiline
      rows={2}
      value={value}
      onChange={handleChange}
    />
  );
}