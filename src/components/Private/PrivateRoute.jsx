import React, { use } from 'react';
import { AuthContext } from '../../Contexts/AuthContext/AuthContext';
import { Navigate, useLocation } from 'react-router';
import Loading from '../Loading/Loading';

const PrivateRoute = ({children}) => {
    const {loginUser,loading} = use(AuthContext);
    const location = useLocation()
    if(loading){
        return <Loading></Loading>
    }
    if(loginUser){
        return children;
    }
    return <Navigate state={location?.pathname} to= '/Login'></Navigate>
};

export default PrivateRoute;