import React, { useState, useEffect } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button } from '@material-ui/core';
import moment from 'moment';
import DateTimePicker from './BookingDialogComponent/DateTimePicker';
import PeriodSelector from './BookingDialogComponent/PeriodSelector';
import Description from './BookingDialogComponent/Description';
import Loading from './Loading';
import { baseUrl, candidateId, methods } from '../config';
import '../css/AddDialog.css'

const formatDateTime = t => t.format('YYYY-MM-DDTHH:mm').toString();

export default function AddDialog({ open, action, rowData, handleUpdate, handleClose }) {
  const [bookingStart, setbookingStart] = useState();
  const [duration, setDuration] = useState();
  const [description, setDescription] = useState();
  const [saving, setSaving] = useState(false);

  const url = `${baseUrl}${candidateId}/${action === 'edit' ? rowData.id : ''}`;

  useEffect(() => {
    if (rowData) {
      const end = moment(rowData.bookingEnd).diff(rowData.bookingStart);
      setbookingStart(rowData.bookingStart);
      setDuration(moment.duration(end).asMinutes().toString());
      setDescription(rowData.description);
    } else {
      setbookingStart(formatDateTime(moment.utc()));
      setDuration('30');
      setDescription('');
    }
  }, [action, rowData]);

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

  const handleSave = () => {
    const bookingEnd = formatDateTime(moment(bookingStart).add(duration, 'minutes'));
    const bookingId = new Date(bookingStart).getTime().toString();
    apiCall({ bookingStart, bookingEnd, description, bookingId })
  }

  return(
    <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">Booking Time Slot</DialogTitle>
      <DialogContent>
        <div className="date-time-container">
          <DateTimePicker value={bookingStart} handleChange={e => setbookingStart(e.target.value)}/>
          <PeriodSelector value={duration} handleChange={e => setDuration(e.target.value)} />
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