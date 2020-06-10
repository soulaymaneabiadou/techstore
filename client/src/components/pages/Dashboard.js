import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import AdminDashboard from './admin/Dashboard';
import UserDashboard from './user/Dashboard';
import { loadUser } from '../../actions/authActions';

const Dashboard = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadUser());
    // eslint-disable-next-line
  }, []);

  const { role } = useSelector(state => state.auth.user || {});

  if (role && role === 'admin') {
    return <AdminDashboard />;
  } else {
    return <UserDashboard />;
  }
};

export default Dashboard;
