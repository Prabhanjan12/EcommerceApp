//import logo from './logo.svg';
import './App.css';
import Header from "./component/layout/Header/Header.js"
import {BrowserRouter as Router, Route,Routes,Link} from "react-router-dom"
import React,{useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import Footer from "./component/layout/Footer/Footer.js"
import Home from "./component/Home/Home.js"
import ProductDetails from './component/Product/ProductDetails.js'
import Products from './component/Product/Products.js'
import LoginSignUp from './component/User/LoginSignUp';
import SignUp from './component/User/SignUp';
import Profile from '../src/component/User/Profile.js'
import ProtectedRoute  from './component/Route/ProtectedRoute';
import { loadUser } from './actions/userAction';
import {useSelector,useDispatch} from 'react-redux'
import UpdateProfile from './component/User/UpdateProfile.js'

function App() {

  const {isAuthenticated, user,loading} = useSelector((state)=>state.user);

  const dispatch=useDispatch();
 
  useEffect(() => {
    dispatch(loadUser());
  }, [dispatch])

 
  
  return (<div>
    <Router>
    <Header/>
    
    <Routes>
    <Route exact path='/' element={ <Home />}></Route>
    <Route exact path='/product/:id' element={ <ProductDetails />}></Route>
    <Route exact path='/products' element={ <Products />}></Route>
    <Route exact path='/products' element={ <Products />}></Route>
    <Route exact path='/login' element={ <LoginSignUp />}></Route>
    <Route exact path='/register' element={ <SignUp />}></Route>
  

    <Route
         exact path="/account"
          element={
            <ProtectedRoute >
              <Profile/>
            </ProtectedRoute>
          }
        />

    <Route
         exact path="/me/update"
          element={
            <ProtectedRoute >
              <UpdateProfile/>
            </ProtectedRoute>
          }
        />
    </Routes>
    

    <Footer/>
      </Router>  
      
    
   
    
    </div>
  
  );
}

export default App;
