const candidateId = 'WW91c2FmIEF6YWJp';

const url = `https://qotp4gi9x5.execute-api.eu-west-2.amazonaws.com/Test/`;

const columns = [
  { field: 'id', headerName: 'ID', type: 'number', width: 70 },
  { field: 'start', headerName: 'Start of Booking', width: 200 },
  { field: 'end', headerName: 'End of Booking', width: 200 },
  { field: 'description', headerName: 'Description', width: 500 }
];

export {
  url,
  candidateId,
  columns
};