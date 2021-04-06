import * as React from 'react';
import { DataGrid } from '@material-ui/data-grid';

const columns = [
  { field: 'id', headerName: 'ID', type: 'number', width: 70 },
  { field: 'start', headerName: 'Booking Start', width: 130 },
  { field: 'end', headerName: 'Booking End', width: 130 },
  { field: 'description', headerName: 'Description', width: 200 }
  // valueGetter: (params) =>`${params.getValue('firstName') || ''} ${params.getValue('lastName') || ''}`
];

const rows = [
  { id: 1, start: 'Snow', end: 'Jon', description: 35 },
  { id: 2, start: 'Lannister', end: 'Cersei', description: 42 },
  { id: 3, start: 'Lannister', end: 'Jaime', description: 45 },
  { id: 4, start: 'Stark', end: 'Arya', description: 16 },
  { id: 5, start: 'Targaryen', end: 'Daenerys', description: null },
  { id: 6, start: 'Melisandre', end: null, description: 150 },
];

export default function DataTable() {
  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid rows={rows} columns={columns} pageSize={5} checkboxSelection />
    </div>
  );
}