import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';

const candidateId = 'WW91c2FmIEF6YWJp';

const baseUrl = `https://qotp4gi9x5.execute-api.eu-west-2.amazonaws.com/Test/`;

const methods = {
  'add': 'POST',
  'edit': 'PUT',
  'delete': 'DELETE'
};

const Icons = {
  'add': <AddIcon />,
  'edit': <EditIcon />,
  'delete': <DeleteIcon />
};

const columns = [
  { field: 'id', headerName: 'ID', width: 140 },
  { field: 'bookingStart', headerName: 'Start of Booking', width: 160 },
  { field: 'bookingEnd', headerName: 'End of Booking', width: 160 },
  { field: 'description', headerName: 'Description', width: 400 }
];

export {
  candidateId,
  baseUrl,
  methods,
  Icons,
  columns
};