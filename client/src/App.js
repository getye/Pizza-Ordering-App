import { MainBar } from './navigations/mainbar';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Signin } from './components/signin';
import { Signup } from './components/signup';
import { Home } from './components/home';
import { ViewUsers } from './components/admin/AddUsers';
import { KichenManagerDashboard } from './components/kitchen-Manager/kichen_manager_dashboard';
import { BranchManagerDashboard } from './components/branch-Manager/branch_manager_dashboard';
import { AddRoles } from './components/admin/AddRoles';
import { AddAdmins } from './components/super-admin/AddAdmin';
import { AddMenu } from './components/kitchen-Manager/AddMenu';
import { Order } from './components/customer/order';
import { Menus } from './components/customer/menu';
import { Orders } from './components/orders';
import { OrderRequests } from './components/branch-Manager/ordersRequests';
import { CustomerOrders } from './components/kitchen-Manager/customerOrders';
import { UpdateProfile } from './components/updateProfile';
import { AbilityProvider } from './AbilityProvider'; 
import { AbilityContext } from './AbilityProvider';
import { Can } from '@casl/react';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import React, { useContext, useEffect, useState } from 'react';
import { Unauthorized } from './components/unauthorized';
import { OrdersInfo } from './components/cashier/orders';
import { Report } from './components/admin/Report';
import { EarningsChart } from './components/super-admin/Earnings';

const ProtectedRoute = ({ action, subject, element }) => {
  const ability = useContext(AbilityContext);

  return (
    <Can I={action} a={subject} ability={ability}>
      {(allowed) => (allowed ? element : <Navigate to="/unauthorized" />)}
    </Can>
  );
};

const theme = createTheme();

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    // Check if the token exists to determine if the user is authenticated
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  return (
    <>
      <ThemeProvider theme={theme}>
        <MainBar />
      </ThemeProvider>
      {!isAuthenticated ? (
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signin" element={<Signin setIsAuthenticated={setIsAuthenticated} />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/customer/view/orders" element={<Order />} />
            <Route path='/orders' element={<Orders />} />
            <Route path="/unauthorized" element={<Unauthorized />} />
          </Routes>
        ) : (
        <AbilityProvider>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signin" element={<Signin setIsAuthenticated={setIsAuthenticated} />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/customer/view/orders" element={<Order />} />
            <Route path='/orders' element={<Orders />} />
            <Route
              path="/superadmin/view/earnings"
              element={<ProtectedRoute action="read" subject="Earnings" element={<EarningsChart />} />}
            />
            <Route
              path="/superadmin/view/admins"
              element={<ProtectedRoute action="create" subject="Admins" element={<AddAdmins />} />}
            />
            <Route
              path="/admin/users"
              element={<ProtectedRoute action="create" subject="User" element={<ViewUsers />} />}
            />
            <Route
              path="/admin/reports"
              element={<ProtectedRoute action="read" subject="Reports" element={<Report />} />}
            />
            <Route
              path="/admin/roles"
              element={<ProtectedRoute action="create" subject="Role" element={<AddRoles />} />}
            />
            <Route
              path="/kichen-manager/dashboard"
              element={<ProtectedRoute action="read" subject="Menu" element={<KichenManagerDashboard />} />}
            />
            <Route
              path="/kichen-manager/add/menu"
              element={<ProtectedRoute action="create" subject="Menu" element={<AddMenu />} />}
            />
            <Route
              path="/kichen-manager/view/orders"
              element={<ProtectedRoute action="update" subject="OrderStatus" element={<CustomerOrders />} />}
            />
            <Route
              path="/branch-manager/dashboard"
              element={<ProtectedRoute action="read" subject="Menu" element={<BranchManagerDashboard />} />}
            />
            <Route
              path="/branch-manager/view/orders"
              element={<ProtectedRoute action="read" subject="Orders" element={<OrderRequests />} />}
            />
            <Route
              path="/cashier/view/orders"
              element={<ProtectedRoute action="read" subject="Orders" element={<OrdersInfo />} />}
            />
            <Route
              path="/users/update/profile"
              element={<ProtectedRoute action="update" subject="Profile" element={<UpdateProfile />} />}
            />
            <Route
              path="/customer/menu"
              element={<ProtectedRoute action="create" subject="Order" element={<Menus />} />}
            />
          </Routes>
        </AbilityProvider>
        )}
      

      </>
  );
}

export default App;
