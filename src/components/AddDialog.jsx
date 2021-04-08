import React, { useState } from 'react';
import { TextField, Dialog, DialogActions, DialogContent, DialogTitle, Button } from '@material-ui/core';
import moment from 'moment';
import '../css/AddDialog.css'
import DateTimePicker from './AddDialog/DateTimePicker';
import PeriodSelector from './AddDialog/PeriodSelector';
import Description from './AddDialog/Description';

const formatDateTime = t => t.format('YYYY-MM-DDTHH:mm').toString();

export default function AddDialog({ open, handleClose, handleSave }) {
  const [bookingStart, setbookingStart] = useState(formatDateTime(moment.utc()));
  const [duration, setDuration] = useState('30');
  const [description, setDescription] = useState('');

  const sendData = () => {
    const bookingEnd = formatDateTime(moment(bookingStart).add(duration, 'minutes'));
    handleSave({ bookingStart, bookingEnd, description });
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
        <Button onClick={sendData} color="primary">Save</Button>
      </DialogActions>
    </Dialog>
  )
}