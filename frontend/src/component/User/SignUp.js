import React, { Fragment,useRef, useState,useEffect } from 'react';
import './LoginSignUp.css';
// import {MailOutlineIcon} from "@mui/icons-material";
// import {LockOpenIcon} from "@mui/icons-material";
import { useDispatch, useSelector} from "react-redux"
import {clearErrors,register } from "../../actions/userAction"
import { useNavigate } from 'react-router-dom';




const SignUp = () => {

    const dispatch=useDispatch();
    const {error, loading, isAuthenticated}= useSelector(state=>state.user);
    const navigate=useNavigate();

    useEffect(()=>{
        if(isAuthenticated)
            navigate('/')

    },[dispatch,isAuthenticated])
    const registerSubmit=(e)=>{
        e.preventDefault();
        const data={
            name,
            email,
            password
        }
        dispatch(register(data));
    }
    const [user, setUser] = useState(
        {  name:"",
          email:"",
          password:""}
      )
      const {name, email, password }= user

    const registerDataChange=(e)=>{
        setUser({...user, [e.target.name]: e.target.value});
    }
  return (
    <Fragment>
        <div className='SignUpContainer'>
            <div className='SignUpBox'>
            <form className='signUpForm'
                     
                     encType="multiport/form-data" 
                     onSubmit={registerSubmit}>
                        <div className='signUpName'>
                            {/* <MailOutlineIcon /> */}
                            <input type='text'
                                placeholder="Name"
                                required
                                name="name"
                                value={name}
                                onChange={registerDataChange} />
                        </div>
                        <div className='signUpEmail'>
                            {/* <MailOutlineIcon /> */}
                            <input type='email'
                                placeholder="Email"
                                required
                                name="email"
                                value={email}
                                onChange={registerDataChange} />
                        </div>
                        <div className='signUpPassword'>
                            {/* <LockOpenIcon /> */}
                            <input type='password'
                                placeholder="Password"
                                required
                                name='password'
                                value={password}
                                onChange={registerDataChange} />
                        </div>
                        <input type='submit' 
                        value="register" 
                        className="SignUpBtn"
                        />
                    </form>
            </div>
        </div>
    </Fragment>
  )
}

export default SignUp