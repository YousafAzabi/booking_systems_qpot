import React, { useState, useEffect } from 'react';
import DataTable from './components/DataTable';
import AddDialog from './components/BookingDialog';
import AddButton from './components/AddButton';
import { url, candidateId } from './config';
import './App.css';

export default function App() {
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [rows, setRows] = useState(null);
  let selectedRows = [];

  useEffect(() => {
    fetch(`${url}${candidateId}`)
    .then(response => response.json())
    .then(result => {
      const rows = result.map(row => ({...row, id: row.bookingId}));
      setRows(rows);
    }).catch(error => {
      alert('There has been a problem with loading data:', error);
    });
  }, []);

  const handleRowSelected = row => {
    if (row.isSelected) {
      selectedRows.push(row.data);
    } else {
      selectedRows = selectedRows.filter(r => r.id !== row.data.id);
    }
  }

  return (
    <div className="App">
      <AddButton handleClick={() => setOpenAddDialog(true)} />
      <DataTable rows={rows} handleRowSelected={handleRowSelected} />
      <AddDialog
        open={openAddDialog}
        handleClose={() => setOpenAddDialog(false)}
        handleUpdate={data => {
          setRows([...rows, {...data, id: data.bookingId}]);
          setOpenAddDialog(false);
        }}
      />
    </div>
  );
}
