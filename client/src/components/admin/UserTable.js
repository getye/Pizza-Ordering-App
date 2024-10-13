import React, { useEffect, useState, useMemo } from 'react';
import { Box, Button, Snackbar, Alert } from '@mui/material';
import { MaterialReactTable } from 'material-react-table';
import ActionButtons from './ActionButtons.js';

export const UserTable = ({ handleOpen }) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');
  const [messageType, setMessageType] = useState('');

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem('token');
      console.log('Token: ', token);
      if (!token) {
        console.log('No token found, please log in');
        return;
      }

      const response = await fetch(`${window.location.origin}/admin/users`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (!Array.isArray(data)) {
        throw new Error('Data is not an array');
      }

      setUsers(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleNotification = (message, type) => {
    setNotificationMessage(message);
    setMessageType(type);
    setShowNotification(true);
  };

  const columns = useMemo(
    () => [
      { accessorKey: 'user_name', header: 'User Name' },
      { accessorKey: 'user_email', header: 'Email' },
      { accessorKey: 'user_type', header: 'Role' },
      {
        header: 'Action',
        Cell: ({ row }) => (
          <ActionButtons
            user={row.original}
            onNotify={handleNotification}
          />
        ),
      },
    ],
    []
  );

  const memoizedData = useMemo(() => users, [users]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div style={{ color: 'red', textAlign: 'center' }}>{error}</div>;

  return (
    <>
      <Box sx={{ padding: 3 }}>
        <MaterialReactTable
          columns={columns}
          data={memoizedData}
          memoizeRows
          enablePagination
          enableSorting
          enableColumnFiltering
          initialState={{ pagination: { pageSize: 3 } }}
          renderTopToolbarCustomActions={() => (
            <Button
              onClick={handleOpen}
              sx={{
                bgcolor: '#FF8C00',
                paddingLeft: 3,
                paddingRight: 3,
                borderRadius: 1,
                color: 'white',
                textTransform: 'none',
                '&:hover': {
                  bgcolor: '#FF6700',
                  opacity: 0.9,
                },
              }}
            >
              Add User
            </Button>
          )}
        />
      </Box>

      <Snackbar
        open={showNotification}
        onClose={() => setShowNotification(false)}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert
          onClose={() => setShowNotification(false)}
          severity={String(messageType).includes('Success') ? 'success' : 'error'}
          sx={{ width: '100%' }}
        >
          {notificationMessage}
        </Alert>
      </Snackbar>
    </>
  );
};
