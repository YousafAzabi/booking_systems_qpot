import React, { useState, useRef } from 'react';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import './App.css';
import DataTable from './components/DataTable';
import AddDialog from './components/AddDialog';
import { url, candidateId } from './config';

const addNewBooking = inputData => {
  fetch(`${url}${candidateId}`, { 
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({...inputData, bookingId: new Date(inputData.bookingStart).getTime()})
  }).then(response => {
    response.json();
  }).then(result => {
    alert('Success');
  }).catch(error => {
    alert('There has been a problem with your fetch operation:', error);
  });
}

function App() {
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [rows, setRows] = useState([]);
  fetch(`${url}${candidateId}`).then(response => {
    response.json();
  }).then(result => {
    console.log('Success');
  }).catch(error => {
    console.log('There has been a problem with your fetch operation:', error);
  });

  return (
    <div className="App">
      <Button
        variant="contained"
        color="primary"
        startIcon={<AddIcon />}
        onClick={() => setOpenAddDialog(true)}
      >
        Book Time
      </Button>
      <DataTable rows={rows} />
      <AddDialog
        open={openAddDialog}
        handleClose={() => setOpenAddDialog(false)}
        handleSave={inputData => {
          addNewBooking(inputData);
          setOpenAddDialog(false);
        }}
      />
    </div>
  );
}

export default App;
