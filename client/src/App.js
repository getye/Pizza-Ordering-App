
import { MainBar } from './navigations/mainbar';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import {Signin} from './components/signin'
import { Signup } from './components/signup';
import { Home } from './components/home'
import { ViewUsers } from './components/admin/AddUsers';
import { KichenManagerDashboard } from './components/kitchen-Manager/kichen_manager_dashboard'
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
import React, { useContext } from 'react';
import { Unauthorized } from './components/unauthorized';
import { OrdersInfo } from './components/cashier/orders';
import { Report } from './components/admin/Report';

const ProtectedRoute = ({ action, subject, element }) => {
  const ability = useContext(AbilityContext);

  return (
    <Can I={action} a={subject} ability={ability}>
      {(allowed) => (allowed ? element : <Navigate to="/unauthorized" />)}
    </Can>
  );
};

function App() {

  return (
    <BrowserRouter>
      <AbilityProvider>
        <MainBar/>
        <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/signin' element={<Signin/>}/>
            <Route path='/signup' element={<Signup/>}/> 

            <Route
              path="/superadmin/view/admins"
              element={<AddAdmins />} 
            />
            <Route
              path="/admin/users"
              element={<ViewUsers />} 
            />
            <Route
              path="/admin/reports"
              element={<Report />} 
            />
            <Route
              path="/admin/roles"
               element={<AddRoles />} 
            />

            <Route
              path="/kichen-manager/dashboard"
              element={<KichenManagerDashboard />} 
            />

            <Route
              path="/kichen-manager/add/menu"
              element={<AddMenu />} 
            />

            <Route
              path="/kichen-manager/view/orders"
              element={<CustomerOrders />} 
            />

            <Route
              path="/branch-manager/dashboard"
              element={<BranchManagerDashboard />} 
            />
            <Route
              path="/branch-manager/view/orders"
              element={<OrderRequests />} 
            />
            
            <Route
              path="/cashier/view/orders"
              element={<OrdersInfo />} 
            />
            
            <Route
              path="/users/update/profile"
              element={<UpdateProfile />} 
            />
            
            <Route
              path="/customer/menu"
               element={<Menus />} 
            /> 
            <Route
              path="/customer/view/orders"
              element={<Order />} 
            />               

                    
            <Route path='/orders' element={<Orders/>}/>
            <Route path="/unauthorized" element={<Unauthorized />} />
        </Routes>
      </AbilityProvider> 
    </BrowserRouter>
  );
}

export default App;
