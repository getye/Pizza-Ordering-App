import React, { useEffect, useState } from 'react';
import { Alert, Box, Button, Snackbar } from '@mui/material';
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
      const token = localStorage.getItem('token'); // Retrieve the token from localStorage
      if (!token) {
        console.log('No token found, please log in');
        return;
      }
  
      const response = await fetch(`${window.location.origin}/users`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}` // Pass the token in the Authorization header
        }
      });
  
      if (!response.ok) {
        throw new Error('Failed to fetch users');
      }
  
      const data = await response.json();
  
      if (!Array.isArray(data)) {
        throw new Error('Data is not an array');
      }
  
      setUsers(data); // Set the users data to state
    } catch (err) {
      setError(err.message); // Handle error
    } finally {
      setLoading(false); // Handle loading state
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

  const columns = React.useMemo(
    () => [
      { accessorKey: 'user_name', header: 'User Name' },
      { accessorKey: 'user_email', header: 'Email' },
      { accessorKey: 'user_type', header: 'Role' },
      {
        header: 'Action',
        Cell: ({ row }) => 
              <ActionButtons 
                     user={row.original} 
                      onNotify={handleNotification} 
                  />,
      },
    ],
    []
  );

  if (loading) return <div>Loading...</div>;
  if (error) return <div style={{ color: 'red', textAlign: 'center' }}>{error}</div>;

  return (
    <>
    {users.length > 0 ? (
      <Box sx={{ padding: 3 }}>
        <MaterialReactTable
          columns={columns}
          data={users}
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
    ) : (
      <div>No records found</div>
    )}
    <Snackbar
        open={showNotification}
        onClose={() => setShowNotification(false)}
        anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
        }}
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
