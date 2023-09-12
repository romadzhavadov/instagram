import Alert from '@mui/material/Alert';

export default function OutlinedAlerts({ error }) {
  return (
    <Alert
      className="mb-6 text-center text-sm"
      style={{ fontSize: '13px', color: 'red' }}
      variant="outlined"
      severity="error"
    >
      {error}
    </Alert>
  );
}
