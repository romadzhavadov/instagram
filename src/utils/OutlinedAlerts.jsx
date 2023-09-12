import Alert from '@mui/material/Alert';

export default function OutlinedAlerts({ errValue }) {
  return (
    <Alert
      className="mb-4 text-center text-red-600"
      style={{ fontSize: '13px', color: 'red' }}
      variant="outlined"
      severity="error"
    >
      {`Sorry, you entered ${errValue.current}.
        Please check it again.`}
    </Alert>
  );
}
