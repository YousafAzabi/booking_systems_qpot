import React, { useState } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button } from '@material-ui/core';
import moment from 'moment';
import DateTimePicker from './BookingDialogComponent/DateTimePicker';
import PeriodSelector from './BookingDialogComponent/PeriodSelector';
import Description from './BookingDialogComponent/Description';
import { url, candidateId } from '../config';
import '../css/AddDialog.css'

const formatDateTime = t => t.format('YYYY-MM-DDTHH:mm').toString();

export default function AddDialog({ open, handleUpdate, handleClose }) {
  const [bookingStart, setbookingStart] = useState(formatDateTime(moment.utc()));
  const [duration, setDuration] = useState('30');
  const [description, setDescription] = useState('');

  const handleSave = () => {
    const bookingEnd = (moment(bookingStart).add(duration, 'minutes'));
    const bookingId = new Date(bookingStart).getTime();
    const data = { bookingStart, bookingEnd, description, bookingId };

    fetch(`${url}${candidateId}`, { 
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    })
    .then(response => {
      if (response.status === 200) {
        console.log('Success');
        handleUpdate(data);
      } else {
        console.log('There has been a problem with adding booking');
      }
    });
  }

  return(
    <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">Booking Time Slot</DialogTitle>
      <DialogContent>
        <div className="date-time-container">
          <DateTimePicker value={bookingStart} handleChange={e => setbookingStart(e.target.value)}/>
          <PeriodSelector value={duration} handleChange={e => setDuration(e.target.value)} />
        </div>
        <Description handleChange={e => setDescription(e.target.value)} />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">Cancel</Button>
        <Button onClick={handleSave} color="primary">Save</Button>
      </DialogActions>
    </Dialog>
  );
}