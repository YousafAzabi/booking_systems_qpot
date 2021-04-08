import * as React from 'react';
import { DataGrid } from '@material-ui/data-grid';
import { columns } from '../config';

export default function DataTable({ rows }) {
  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid rows={rows} columns={columns} pageSize={5} checkboxSelection />
    </div>
  );
}