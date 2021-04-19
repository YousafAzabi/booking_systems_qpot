import React from 'react';
import moment from 'moment';
import MomentUtils from '@date-io/moment';
// import {LocalizationProvider, DateTimePicker, AdapterDateFns} from "@material-ui/lab/";
import { DateTimePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {
    marginRight: theme.spacing(3)
  }
}));

const TIME_FORMAT = 'HH:mm';

export default function BookingStartPicker({ value, timeRange, handleChange }) {
  const classes = useStyles();
  
  const handleDateChange = date => {
    const startTime = moment(date, TIME_FORMAT).hour(timeRange.min.h).minute(timeRange.min.m);
    const endTime = moment(date, TIME_FORMAT).hour(timeRange.max.h).minute(timeRange.max.m);

    if (date.isBetween(startTime, endTime, undefined, '[]')) {
      handleChange(date);
    } else {
      alert('Selected Time is not in the working office hours. Time has been adjested. Please re-select.');
      handleChange(date.startOf('day').add(9, 'hours'));
    }
  }
  
  return(
    <MuiPickersUtilsProvider utils={MomentUtils}>
      <DateTimePicker
        className={classes.root}
        label="Start Time"
        value={value}
        onChange={handleDateChange}
        disablePast
        shouldDisableDate={date => date.day() === 0 || date.day() === 6}
        minutesStep={10}
        ampm={false}
        minTime={"10:00"}

      />
    </MuiPickersUtilsProvider>
  );
}