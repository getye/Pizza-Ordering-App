import React, { useEffect, useState, useMemo } from 'react';
import { Box, Button, Snackbar, Alert } from '@mui/material';
import { MaterialReactTable } from 'material-react-table';
import ActionButtons from './ActionButtons.js';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers } from '../../services/action.js';

export const ViewUsers = ({ handleOpen }) => {
  const dispatch = useDispatch();

  // Get users and loading state from Redux store
  const { users, loading, error } = useSelector((state) => state.user);
;
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');
  const [messageType, setMessageType] = useState('');

 
  useEffect(() => {
    dispatch(fetchUsers());  // Fetch users on component mount
  }, [dispatch]);

  const handleNotification = (message, type) => {
    setNotificationMessage(message);
    setMessageType(type);
    setShowNotification(true);
  };

  const columns = useMemo(
    () => [
      {
        header: 'No.', // Header for the row number column
        Cell: ({ row }) => row.index + 1, // Row index starts from 0, so add 1 for display
      },
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
  console.log("Users: ", memoizedData)
  if (loading) {
    return <div>Loading...</div>; // You can replace this with a spinner or a better loading indicator
  }

  if (error) {
    return <div style={{ color: 'red', textAlign: 'center' }}>{error}</div>;
  }

  return (
    <>
      <Box sx={{ paddingLeft:32, paddingTop: 3, paddingRight:2 }}>
        <MaterialReactTable 
          key={memoizedData.length} // Force re-render when data length changes
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
