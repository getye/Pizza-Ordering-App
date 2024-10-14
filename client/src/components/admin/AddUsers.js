import React, { useEffect, useState } from 'react';
import { Box, Button, Snackbar, Alert } from '@mui/material';
import { MaterialReactTable } from 'material-react-table';
import ActionButtons from './ActionButtons.js';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers } from '../../services/action.js';

export const ViewUsers = ({ handleOpen }) => {
  const dispatch = useDispatch();

  // Get users and loading state from Redux store
  //const { users, loading, error } = useSelector((state) => state.user);
  const [users, setUsers] = useState(
    [
      { user_name: 'John Doe', user_email: 'john@example.com', user_type: 'Admin' },
      { user_name: 'Jane Doe', user_email: 'jane@example.com', user_type: 'User' }
    ]
    
  )
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');
  const [messageType, setMessageType] = useState('');

 
  useEffect(() => {
    dispatch(fetchUsers());  
  }, [dispatch]);

  const handleNotification = () => {
    setNotificationMessage(notificationMessage);
    setMessageType(messageType);
    setShowNotification(true);
  };

  console.log("Users: ", users)


  return (
    <>
      <Box sx={{ paddingLeft:32, paddingTop: 3, paddingRight:2 }}>
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
          initialState={{ pagination: { pageSize: 4 } }}
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
