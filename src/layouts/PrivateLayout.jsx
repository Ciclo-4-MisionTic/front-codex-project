import Sidebar from 'components/Sidebar';
import { Outlet } from 'react-router';
import React, {useEffect} from 'react';
import { ToastContainer } from 'react-toastify';
import { useMutation } from '@apollo/client';
import { useAuth } from 'context/authContext';
import { REFRESH_TOKEN } from 'graphql/auth/mutations';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import PrivateRoute from 'components/PrivateRoute';


const PrivateLayout = () => {
  const navigate = useNavigate();
  const { authToken, setToken, } = useAuth();
  const [loadingAuth, setLoadingAuth] = useState(true);

  const [refreshToken, { data: dataMutation, loading: loadingMutation, error: errorMutation }] =
  useMutation(REFRESH_TOKEN);

  useEffect(()=>{
    refreshToken()
  },[refreshToken]);

  useEffect(()=>{
    if(dataMutation){
      if(dataMutation.refreshToken.token){
        setToken(dataMutation.refreshToken.token);
      } else{
        setToken(null);
        navigate('/auth/login');
      }
      setLoadingAuth(false);
    }
  },[dataMutation, setToken, loadingAuth]);

  if(loadingMutation || loadingAuth) return <div>loading...</div>

  return (
    <div className='flex flex-col md:flex-row flex-no-wrap h-screen'>
      <Sidebar />
      <div className='flex w-full h-full'>
        <div className='w-full h-full  overflow-y-scroll'>
          <Outlet />
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default PrivateLayout;