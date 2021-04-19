import React, { useState, useEffect } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, DialogContentText, Button } from '@material-ui/core';
import moment from 'moment';
import BookingStartPicker from './BookingDialogComponent/BookingStartPicker';
import PeriodSelector from './BookingDialogComponent/PeriodSelector';
import Description from './BookingDialogComponent/Description';
import Loading from './Loading';
import { baseUrl, candidateId, methods, workingHours } from '../config';
import '../css/AddDialog.css'

const formatDateTime = t => t.format('YYYY-MM-DDTHH:mm').toString();

export default function AddDialog({ open, action, rowData, handleUpdate, handleClose }) {
  const [bookingStart, setBookingStart] = useState();
  const [duration, setDuration] = useState();
  const [description, setDescription] = useState();
  const [disbaledHourTimeSlot, setDisbaledHourTimeSlot] = useState(false);
  const [saving, setSaving] = useState(false);

  const url = `${baseUrl}${candidateId}/${action === 'edit' ? rowData.id : ''}`;

  useEffect(() => {
    if (rowData) {
      const end = moment(rowData.bookingEnd).diff(rowData.bookingStart);
      setBookingStart(rowData.bookingStart);
      setDuration(moment.duration(end).asMinutes().toString());
      setDescription(rowData.description);
    } else {
      setBookingStart(formatDateTime(moment.utc().set(workingHours.start)));
      setDuration('30');
      setDescription('');
    }
  }, [action, rowData]);

  const handleDateChange = date => {
    setBookingStart(formatDateTime(date));
    if (date.isAfter(moment(date).set(workingHours.start).subtract(60, 'minute'))) {
      setDuration('30');
      setDisbaledHourTimeSlot(true);
    } else {
      setDisbaledHourTimeSlot(false);
    }
  }

  const handleSave = () => {
    const bookingEnd = formatDateTime(moment(bookingStart).add(duration, 'minutes'));
    const bookingId = new Date(bookingStart).getTime().toString();
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
        console.log('Success');
        handleUpdate(data);
      } else {
        console.log('There has been a problem saving the booking');
      }
    });
  }

  return(
    <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
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
        <Button onClick={handleSave} color="primary">Save</Button>
      </DialogActions>
      {saving && <Loading />}
    </Dialog>
  );
}