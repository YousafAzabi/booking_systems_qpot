import React from 'react';
import { FormControl, FormLabel, FormControlLabel, RadioGroup, Radio } from '@material-ui/core';

export default function PeriodSelector({ value, disableHour, handleChange }) {
  return(
    <FormControl component="fieldset">
      <FormLabel component="legend">Duration</FormLabel>
      <RadioGroup aria-label="duration" name="booking-duration" value={value} onChange={handleChange}>
        <FormControlLabel value="30" control={<Radio />} label="Half an hour" />
        <FormControlLabel value="60" control={<Radio />} label="One hour" disabled={disableHour} />
      </RadioGroup>
    </FormControl>
  );
}