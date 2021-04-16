import React, { useState, useEffect } from 'react';
import DataTable from './components/DataTable';
import BookingDialog from './components/BookingDialog';
import ActionButton from './components/ActionButton';
import Loading from './components/Loading';
import { baseUrl, candidateId } from './config';
import './App.css';

export default function App() {
  const [action, setAction] = useState('');
  const [rows, setRows] = useState(null);
  const [selectedRowsIds, setSelectedRowsIds] = useState([]);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    fetch(`${baseUrl}${candidateId}`)
    .then(response => response.json())
    .then(result => {
      const rows = result.map(row => ({...row, id: row.bookingId}));
      setRows(rows);
    }).catch(error => {
      setRows([]);
      alert('There has been a problem loading data:', error);
    });
  }, []);

  const handleRowsSelection = e => setSelectedRowsIds(e.selectionModel);

  const deleteRow = id => fetch(`${baseUrl}${candidateId}/${id}`, {method: 'DELETE'});

  const handleDelete = action => {
    setAction(action);
    Promise.all(selectedRowsIds.map(id => deleteRow(id)))
    .then(val => {
      updateTable('delete');
      alert('Success deleted all selected booking(s).');
    }).catch(err => {
      updateTable('delete');
      alert(`Error deleting booking(s): ${err}`);
    });
  }

  const updateTable = data => {
    if (action === 'delete') {
      setSelectedRowsIds([]);
      setRows(rows.filter(r => !selectedRowsIds.includes(r)));
    } else {
      const newRow = {...data, id: data.bookingId};
      const oldRows = (action === 'edit') ? rows.filter(r => r.id !== data.bookingId) : rows;
      setRows([newRow, ...oldRows]);
    }
    setAction('');
  }

  return (
    <div className="App">
      <ActionButton handleClick={a => setAction(a)} action="add" />
      <ActionButton handleClick={a => setAction(a)} action="edit" disabled={selectedRowsIds.length !== 1} />
      <ActionButton handleClick={handleDelete} action="delete" disabled={selectedRowsIds.length < 1} />
      <DataTable rows={rows} handleSelection={handleRowsSelection} />
      <BookingDialog
        open={action === 'edit' || action === 'add'}
        action={action}
        rowData={action === 'edit' && rows.find(row => row.id === selectedRowsIds[0])}
        handleClose={() => setAction('')}
        handleUpdate={updateTable}
      />
      {action && <Loading />}
    </div>
  );
}
