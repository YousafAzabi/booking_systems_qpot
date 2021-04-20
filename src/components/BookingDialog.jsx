import React, { useState, useEffect } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, DialogContentText, Button } from '@material-ui/core';
import moment from 'moment';
import { useSnackbar } from 'notistack';
import BookingStartPicker from './BookingDialogComponent/BookingStartPicker';
import PeriodSelector from './BookingDialogComponent/PeriodSelector';
import Description from './BookingDialogComponent/Description';
import Loading from './Loading';
import { baseUrl, candidateId, methods, workingHours } from '../config';
import '../css/AddDialog.css'

const formatDateTime = t => t.format('YYYY-MM-DDTHH:mm').toString();

export default function AddDialog({ open, action, rowData, handleUpdate, handleClose }) {
  const { enqueueSnackbar } = useSnackbar();
  const [bookingStart, setBookingStart] = useState();
  const [duration, setDuration] = useState();
  const [description, setDescription] = useState();
  const [disbaledHourTimeSlot, setDisbaledHourTimeSlot] = useState(false);
  const [disableSave, setDisableSave] = useState(false);
  const [saving, setSaving] = useState(false);

  const url = `${baseUrl}${candidateId}/${action === 'edit' ? rowData.id : ''}`;

  useEffect(() => {
    if (rowData) {
      const end = moment(rowData.bookingEnd).diff(rowData.bookingStart);
      setBookingStart(rowData.bookingStart);
      setDuration(moment.duration(end).asMinutes().toString());
      setDescription(rowData.description);
      checkHourTimeSlotAvailability(rowData.bookingStart);
    } else {
      const start = formatDateTime(moment.utc().set(workingHours.start));
      setBookingStart(start);
      setDuration('30');
      setDescription('');
      checkHourTimeSlotAvailability(start);
    }
    setDisableSave(false);
  }, [action, rowData]);

  const checkHourTimeSlotAvailability = date => {
    if (moment(date).isAfter(moment(date).set(workingHours.finish).subtract(60, 'minute'))) {
      setDuration('30');
      setDisbaledHourTimeSlot(true);
    } else if (disbaledHourTimeSlot) {
      setDisbaledHourTimeSlot(false);
    }
  }

  const handleDateChange = (date, flag = false) => {
    setDisableSave(flag);
    checkHourTimeSlotAvailability(date);
    setBookingStart(formatDateTime(date));
  }

  const handleSave = () => {
    const bookingEnd = formatDateTime(moment(bookingStart).add(duration, 'minutes'));
    const bookingId = action === 'edit' ? rowData.id : new Date(bookingStart).getTime().toString();
    apiCall({ bookingStart, bookingEnd, description, bookingId })
  }

  const apiCall = data => {
    setSaving(true);
    fetch(url, {
      method: methods[action],
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    }).then(res => {
      setSaving(false);
      if (res.status === 200) {
        enqueueSnackbar('Booking has been saved.', {variant: 'success'});
        handleUpdate(data);
      } else {
        enqueueSnackbar('There is a problem saving the booking. Please try again...', {variant: 'info'});
      }
    });
  }

  return(
    <Dialog open={open} disableBackdropClick aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">Booking Time Slot</DialogTitle>
      <DialogContent>
        <DialogContentText>
            Please fill in the form below to book.
            <br/>
            Bookings are only allowed in weekdays from 9:00am - 17:00pm.
        </DialogContentText>
        <div className="date-time-container">
          <BookingStartPicker value={bookingStart} timeRange={workingHours} handleChange={handleDateChange} />
          <PeriodSelector value={duration} disableHour={disbaledHourTimeSlot} handleChange={e => setDuration(e.target.value)} />
        </div>
        <Description value={description} handleChange={e => setDescription(e.target.value)} />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">Cancel</Button>
        <Button onClick={handleSave} color="primary" disabled={disableSave}>Save</Button>
      </DialogActions>
      {saving && <Loading />}
    </Dialog>
  );
}