import React, { Fragment,useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import {useSelector,useDispatch} from 'react-redux'
import { loadUser } from "../../actions/userAction";


const ProtectedRoute = ({
  
  children,
  adminRoute,
  

}) => {

  const {isAuthenticated, user,loading} = useSelector((state)=>state.user);

  const dispatch=useDispatch();
 
  useEffect(() => {
    dispatch(loadUser());
  }, [dispatch])

  return <Fragment>
  {loading === false && (isAuthenticated === false) ?
    (
      <Navigate to="/login" replace />
    )
    :
    (loading === false &&
      (adminRoute === true ?
        (user.userRole !== 'admin' ?
          (
            <Navigate to="/" replace />
          )
          :
          (
            children
          )
        )
        :
        (children)

      )
    )
  }
</Fragment>

};

export default ProtectedRoute;