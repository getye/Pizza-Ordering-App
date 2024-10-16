import React, { useState } from 'react';
import { Box, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button, Alert, Snackbar } from '@mui/material';
import RoleTable from './RoleTable';
import PermissionsForm from './PermissionsForm';
import Axios from 'axios';

export const AddRoles = () => {
  const [open, setOpen] = useState(false);
  const [roleData, setRoleData] = useState({ roleName: '', permissions: {} });
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

const handleInputChange = (event) => {
    const { name, value } = event.target;
    setRoleData({ ...roleData, [name]: value });
  };

const handlePermissionChange = (event) => {
    const { name, checked } = event.target;
    setRoleData((prevData) => ({
      ...prevData,
      permissions: { ...prevData.permissions, [name]: checked },
    }));
  };

const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await Axios.post(`${window.location.origin}/admin/add/roles`, roleData);
      console.log("Response:", response.data.message);

      if (response.status === 201) {
        setNotificationMessage('Successfully registered');
        setShowNotification(true);
        setRoleData({ roleName: '', permissions: {} }); // Reset form
      } else {
        setNotificationMessage('Error in registration');
        setShowNotification(true);
      }
    } catch (err) {
      if (err.response) {
        const errorMessage = err.response.data.message;
        setNotificationMessage(errorMessage);
        setShowNotification(true);
      } else {
        setNotificationMessage('An unexpected error occurred');
        setShowNotification(true);
        console.error(err);
      }
    }
  };

  return (
    <Box sx={{ paddingTop: 2, justifyContent: 'center',
      ml: {xs: '5%', sm: '10%', md: '15%', lg: '20%'},
      mr: {xs: '1%', sm: '3%', md: '5%', lg: '7%'},
      mb: {xs: 1, sm: 2, md: 3, lg: 4},
     }}>
      <RoleTable handleOpen={handleOpen} />

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add Role</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Role Name"
            name='roleName'
            type="text"
            size='small'
            fullWidth
            value={roleData.roleName}
            onChange={handleInputChange}
          />
          <PermissionsForm permissions={roleData.permissions} onPermissionChange={handlePermissionChange} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} sx={{ bgcolor: 'red', color: 'white', textTransform: 'none' }}>Cancel</Button>
          <Button onClick={handleSubmit} sx={{ bgcolor: '#FF8C00', color: 'white', fontWeight:'bold', textTransform: 'none' }}>Add</Button>
        </DialogActions>
      </Dialog>

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
            severity={String(notificationMessage).includes('Successfully registered') ? 'success' : 'error'}
            sx={{ width: '100%' }}
        >
            {notificationMessage}
        </Alert>
      </Snackbar>

    </Box>
  );
};
