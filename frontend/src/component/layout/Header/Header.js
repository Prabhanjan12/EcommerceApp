import React from 'react'
import { ReactNavbar } from "overlay-navbar"
import { BrowserRouter as Router, Route } from "react-router-dom"
import { useDispatch,useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../../actions/userAction'
const Header = () => {
  const navigate = useNavigate();
  const { error, loading, isAuthenticated } = useSelector(state => state.user);
  const dispatch = useDispatch();

  function logoutUser() {
    dispatch(logout());
    navigate("/")
  }

  //    return <ReactNavbar/>
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <a className="navbar-brand" href="#">Navbar</a>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item active">
            <a className="nav-link" href="/">Home <span className="sr-only"></span></a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/products">Products</a>
          </li>
          {isAuthenticated ?
            <li className="nav-item-login">
                 <a className="nav-link" onClick={logoutUser}>Logout</a>
              
            </li> :
            <li className="nav-item-login">
              <a className="nav-link" href="/login">Login</a>
            </li>
          }


          <li className="nav-item dropdown">
            <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              Dropdown
            </a>
            <div className="dropdown-menu" aria-labelledby="navbarDropdown">
              <a className="dropdown-item" href="#">Action</a>
              <a className="dropdown-item" href="#">Another action</a>
              <div className="dropdown-divider"></div>
              <a className="dropdown-item" href="#">Something else here</a>
            </div>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/account">Profile</a>
          </li>
          <li className="nav-item">
            <a className="nav-link disabled" href="#">Disabled</a>
          </li>
        </ul>

      </div>
    </nav>
  )

}

export default Header