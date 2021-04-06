import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';

import './App.css';
import DataTable from './components/DataTable';
import AddDialog from './components/AddDialog';

function App() {
  const [openAddDialog, setOpenAddDialog] = useState(false);

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
      <DataTable />
      <AddDialog
        open={openAddDialog}
        handleClose={() => setOpenAddDialog(false)}
        handleSave={() => setOpenAddDialog(true)}
      />
    </div>
  );
}

export default App;
