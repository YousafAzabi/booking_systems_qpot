const candidateId = 'WW91c2FmIEF6YWJp';

const url = `https://qotp4gi9x5.execute-api.eu-west-2.amazonaws.com/Test/`;

const columns = [
  { field: 'id', headerName: 'ID', width: 140 },
  { field: 'bookingStart', headerName: 'Start of Booking', width: 160 },
  { field: 'bookingEnd', headerName: 'End of Booking', width: 160 },
  { field: 'description', headerName: 'Description', width: 400 }
];

export {
  url,
  candidateId,
  columns
};