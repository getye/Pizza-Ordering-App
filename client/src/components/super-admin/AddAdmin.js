import React, { useState } from 'react';
import { Alert, Box, Snackbar } from '@mui/material';
import { AdminTable } from './AdminTable';
import { AddAdminModal } from './AddAdminModal';

export const AddAdmins = () => {
  const [open, setOpen] = useState(false);
  const [newUser, setNewUser] = useState({ userName: '', email: '', phone: '', restaurant: '', location: '' });
  
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');
  const [messageType, setMessageType] = useState('');

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewUser({ ...newUser, [name]: value });
  };

const handleSubmit = async () => {
    try {
        const token = localStorage.getItem('token'); // Retrieve the token from storage
      if (!token) {
        console.log('No token found, please log in');
        return;
      }
      // API call to add admin
      const response = await fetch(`${window.location.origin}/superadmin/add/admins`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`, // Include the JWT token
        },
        body: JSON.stringify(newUser),
      });

      if (response.ok) {
        setMessageType('Success');
        setNotificationMessage('User Successfully Added');
        setShowNotification(true);
      // Close the modal and reset form
      handleClose();
      setNewUser({ userName: '', email: '', phone: '', restaurant: '', location: '' });
    }else{
      // Handle error response
      const errorData = await response.json();
      setMessageType('Error');
      setNotificationMessage(`Error: ${errorData.message}`);
      setShowNotification(true);
    }
    } catch (error) {
      setNotificationMessage('An unexpected error occurred');
      setShowNotification(true);
      console.error('Error adding user:', error);
    }
  };

  return (
    <Box sx={{ paddingTop: 2, justifyContent: 'center',
      ml: {xs: '5%', sm: '10%', md: '15%', lg: '20%'},
      mr: {xs: '1%', sm: '3%', md: '5%', lg: '7%'},
      mb: {xs: 1, sm: 2, md: 3, lg: 4},
    }}>
      <AdminTable handleOpen={handleOpen} />
      <AddAdminModal
        open={open}
        handleClose={handleClose}
        newUser={newUser}
        handleInputChange={handleInputChange}
        handleSubmit={handleSubmit}
      />

    <Snackbar
        open={showNotification}
        autoHideDuration={6000}
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
    </Box>
  );
};
