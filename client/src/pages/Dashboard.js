import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import AdminDashboard from './admin/Dashboard';
import UserDashboard from './user/Dashboard';
import { loadUser } from '../actions/authActions';

const Dashboard = (props) => {
  const dispatch = useDispatch();
  const { role } = useSelector((state) => state.auth.user || {});
  const { isAuthenticated } = useSelector((state) => state.auth);

  useEffect(() => {
    !isAuthenticated && props.history.push('/login');
    dispatch(loadUser());
    // eslint-disable-next-line
  }, []);

  if (role === 'admin') {
    return <AdminDashboard />;
  } else {
    return <UserDashboard />;
  }
};

export default Dashboard;
