import React, { useState, useEffect, useMemo } from 'react';
import { Box, Button, Snackbar, Alert } from '@mui/material';
import { MaterialReactTable } from 'material-react-table';
import ActionButtons from './ActionButtons';
import { AddUserModal } from './AddUserModal';

export const ViewUsers = () => {
  const [open, setOpen] = useState(false);
  const [newUser, setNewUser] = useState({ userName: '', email: '', location: '', phone: '', role: '' });

  // Snackbar state
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');
  const [messageType, setMessageType] = useState('');

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // Handle input change in the AddUserModal
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewUser({ ...newUser, [name]: value });
  };

  // Fetch users from the API
  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem('token');
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

  // Handle form submission to add new user
  const handleSubmit = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        console.log('No token found, please log in');
        return;
      }

      const response = await fetch(`${window.location.origin}/admin/add/user`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(newUser),
      });

      if (response.ok) {
        setMessageType('Success');
        setNotificationMessage('User Successfully Added');
        setShowNotification(true);
        // Close the modal and reset form
        handleClose();
        setNewUser({ userName: '', email: '', location: '', phone: '', role: '' });
        fetchUsers(); // Refresh the user table
      } else {
        const errorData = await response.json();
        setMessageType('Error');
        setNotificationMessage(`Error: ${errorData.message}`);
        setShowNotification(true);
      }
    } catch (error) {
      setNotificationMessage('An unexpected error occurred');
      setMessageType('Error');
      setShowNotification(true);
    }
  };

  const columns = useMemo(
    () => [
      {
        header: 'No.',
        Cell: ({ row }) => row.index + 1,
      },
      { accessorKey: 'user_name', header: 'User Name' },
      { accessorKey: 'user_email', header: 'Email' },
      { accessorKey: 'user_type', header: 'Role' },
      {
        header: 'Action',
        Cell: ({ row }) => (
          <ActionButtons
            user={row.original}
            onNotify={(message, type) => {
              setNotificationMessage(message);
              setMessageType(type);
              setShowNotification(true);
            }}
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
    <Box sx={{ paddingTop: 2, marginLeft: 32, justifyContent: 'center' }}>
      {/* User Table */}
      <Box sx={{ padding: 3 }}>
        <MaterialReactTable
          key={users.length}
          columns={columns}
          data={memoizedData}
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

      {/* Add User Modal */}
      <AddUserModal
        open={open}
        handleClose={handleClose}
        newUser={newUser}
        handleInputChange={handleInputChange}
        handleSubmit={handleSubmit}
      />

      {/* Snackbar Notification */}
      <Snackbar
        open={showNotification}
        autoHideDuration={6000}
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
    </Box>
  );
};
