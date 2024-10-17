import React, { useEffect, useState } from 'react';
import { Box, Button, Snackbar, Alert } from '@mui/material';
import { MaterialReactTable } from 'material-react-table';
import ActionButtons from './ActionButtons.js';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers } from '../../services/action.js';
import { AddUserModal } from './AddUserModal'; 

export const ViewUsers = () => {
  const dispatch = useDispatch();
  const { users, loading, error } = useSelector((state) => state.user);

  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');
  const [messageType, setMessageType] = useState('');
  
  const [modalOpen, setModalOpen] = useState(false); 
  const [newUser, setNewUser] = useState({
    userName: '',
    email: '',
    location: '',
    phone: '',
    role: ''
  });

  useEffect(() => {
    dispatch(fetchUsers());  
  }, [dispatch]);

  const handleNotification = (message, type) => {
    setNotificationMessage(message);
    setMessageType(type);
    setShowNotification(true);
  };

  const handleOpen = () => setModalOpen(true); // Open modal
  const handleClose = () => setModalOpen(false); // Close modal

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewUser(prevState => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = () => {
    // Logic to submit new user
    handleNotification('User added successfully', 'Success');
    handleClose(); // Close the modal after submission
  };

  if (loading) {
    return <div>Loading...</div>; 
  }

  if (error) {
    return <div style={{ color: 'red', textAlign: 'center' }}>{error}</div>;
  }

  return (
    <>
      <Box sx={{ paddingTop: 3, 
        ml: {xs: '5%', sm: '10%', md: '15%', lg: '20%'},
        mr: {xs: '1%', sm: '3%', md: '5%', lg: '7%'},
        mb: {xs: 1, sm: 2, md: 3, lg: 4},
       }}>
        <MaterialReactTable 
          key={users.length}
          columns={[
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
          ]}
          data={users}
          enableSorting
          enableColumnFiltering
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

      <AddUserModal
        open={modalOpen}
        handleClose={handleClose}
        newUser={newUser}
        handleInputChange={handleInputChange}
        handleSubmit={handleSubmit}
      />
    </>
  );
};