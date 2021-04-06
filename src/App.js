import './App.css';
import DataTable from './components/DataTable';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';

function App() {
  return (
    <div className="App">
      <Button
        variant="contained"
        color="primary"
        startIcon={<AddIcon />}
        onClick={}
      >
        Book Time
      </Button>
      <DataTable />
    </div>
  );
}

export default App;
