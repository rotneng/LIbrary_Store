import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const AdminRoute = () => {
  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role');

  if (!token || role !== 'admin') {
    alert("Access Denied: Admins only!");
    return <Navigate to="/" />;
  }

  return <Outlet />;
};

export default AdminRoute;