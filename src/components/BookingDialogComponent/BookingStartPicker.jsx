import React from 'react';
import moment from 'moment';
import MomentUtils from '@date-io/moment';
import { DateTimePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import { makeStyles } from '@material-ui/core/styles';
import { useSnackbar } from 'notistack';

const useStyles = makeStyles(theme => ({
  root: {
    marginRight: theme.spacing(3)
  }
}));

const DEFAULT_TIME_RANGE = {
  start: {'hour': 0, 'minute': 0, 'second': 0},
  finish: {'hour': 23, 'minute': 59, 'second': 59}
};

export default function BookingStartPicker({ value, timeRange = DEFAULT_TIME_RANGE, handleChange }) {
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();

  const handleDateChange = date => {
    const startTime = moment(date).set(timeRange.start);
    const endTime = moment(date).set(timeRange.finish).subtract(30, 'minute');

    if (date.isBetween(startTime, endTime, undefined, '[]')) {
      handleChange(date);
    } else {
      enqueueSnackbar('Selected Time is out of booking hours.', {variant: 'warning'});
      handleChange(date, true);
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
        minutesStep={5}
      />
    </MuiPickersUtilsProvider>
  );
}