import React, { Fragment,useRef, useState,useEffect } from 'react';
import {Link} from 'react-router-dom'
import './LoginSignUp.css';
import { useNavigate } from 'react-router-dom';
// import {MailOutlineIcon} from "@mui/icons-material";
// import {LockOpenIcon} from "@mui/icons-material";
import { useDispatch, useSelector} from "react-redux"
import {clearErrors,login } from "../../actions/userAction"
import SignUp from './SignUp';



const LoginSignUp = () => {
    const navigate = useNavigate();

    const dispatch=useDispatch();
    const {error, loading, isAuthenticated}= useSelector(state=>state.user);



    const [loginEmail, setLoginEmail] = useState("")
    const [loginPassword, setLoginPassword] = useState("")
    

   

    const loginSubmit =(e)=>{
        
        e.preventDefault();
        dispatch(login(loginEmail,loginPassword))
    }

   
    
    useEffect(() => {
      if(isAuthenticated){
          navigate("/");
      }
    
      
    }, [dispatch,isAuthenticated])
    

    return (
        <Fragment>
            <div className='LogInContainer'>
                <div className='LogInBox'>
                    
                    <form className='loginForm' onSubmit={loginSubmit}>
                        <div className='loginEmail'>
                            {/* <MailOutlineIcon /> */}
                            <input type='email'
                                placeholder="Email"
                                required
                                value={loginEmail}
                                onChange={(e) => setLoginEmail(e.target.value)} />
                        </div>
                        <div className='loginPassword'>
                            {/* <LockOpenIcon /> */}
                            <input type='password'
                                placeholder="Password"
                                required
                                value={loginPassword}
                                onChange={(e) => setLoginPassword(e.target.value)} />
                        </div>
                        <input type='submit' value="Login" className="loginBtn"/>
                        <Link to='/register'>New? Register</Link>
                      
                        
                    </form>
                    
                </div>
            </div>
        </Fragment>
    )
}

export default LoginSignUp