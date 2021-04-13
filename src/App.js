import React, { useState, useEffect } from 'react';
import DataTable from './components/DataTable';
import BookingDialog from './components/BookingDialog';
import ActionButton from './components/ActionButton';
import { baseUrl, candidateId } from './config';
import './App.css';

export default function App() {
  const [action, setAction] = useState('');
  const [rows, setRows] = useState(null);
  const [selectedRows, setSelectedRows] = useState([]);

  useEffect(() => {
    fetch(`${baseUrl}${candidateId}`)
    .then(response => response.json())
    .then(result => {
      const rows = result.map(row => ({...row, id: row.bookingId}));
      setRows(rows);
    }).catch(error => {
      alert('There has been a problem with loading data:', error);
    });
  }, []);

  const handleRowSelected = row => {
      setSelectedRows(row.isSelected ? [...selectedRows, row.data] : selectedRows.filter(r => r.id !== row.data.id));
  }

  return (
    <div className="App">
      <ActionButton handleClick={a => setAction(a)} action="add" />
      <ActionButton handleClick={a => setAction(a)} action="edit" disabled={selectedRows.length !== 1} />
      <DataTable rows={rows} handleRowSelected={handleRowSelected} />
      <BookingDialog
        action={action}
        rowData={action === 'edit' && selectedRows[0]}
        handleClose={() => setAction('')}
        handleUpdate={data => {
          setRows([...rows, {...data, id: data.bookingId}]);
          setAction('');
        }}
      />
    </div>
  );
}
