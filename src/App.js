import React, { Component } from 'react'
import './App.css';
import axios from 'axios';
import {BrowserRouter as Router, Route ,Switch} from 'react-router-dom';
import Navbar from "./components/Navbar";
import home from "./pages/home";
import login from "./pages/login";
import signup from "./pages/signup";
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';
import createMuiTheme from '@material-ui/core/styles/createMuiTheme';
import jwtDecode from 'jwt-decode';
import AuthRoute from './util/AuthRoute';

import { Provider} from 'react-redux';
import store from './redux/store'; 
import {SET_AUTHENTICATED} from './redux/types';
import {logoutUser, getUserData} from './redux/actions/userActions'


const theme = createMuiTheme({
   palette: {
     primary: {
       light: '#33c9dc',
       main: '#00bcd4',
       dark: '#00894',
       contrastText: '#fff'
     },
     secondary:{
       light: '#ff6333',
       main: '#ff3d00',
       dark: '#b22a00',
       contrastTexr: '#fff'
     }
   },
   typography: {
     useNextVariants: true
   },
   form: {
    testAlign: 'center',
     
 },
 image:{
     margin: '20px auto 20px auto'
 },
 pageTitle:{
     fontSize: '1.75rem',
     margin: '10px auto 10px auto'
 },
 textfield:{
     margin: '10px auto 10px auto'
 },
 button:{
     margin: '10px auto 10px auto',
     position: 'relative'
 },
 app:{
     textAlign: 'center'
 },
 customError: {
     color: 'red',
     fontSize: '0.8rem',
     marginTop: 10
 },
 progress:{
     position: 'absolute'
 }  
})

const token = localStorage.FBIdToken;
if (token) {
  const decodedToken = jwtDecode(token);
  if (decodedToken.exp * 1000 < Date.now()) {
    store.dispatch(logoutUser());
    window.location.href = '/login';
  } else {
    store.dispatch({ type: SET_AUTHENTICATED });
    axios.defaults.headers.common['Authorization'] = token;
    store.dispatch(getUserData());
  }
}

class App extends Component {
  render(){
    return (
      <MuiThemeProvider theme={theme}>
        <Provider store={store}>
          
            <Router>
            <Navbar />
            <div className = "container">
              <Switch>
                <Route exact path="/" component={home} />
                <AuthRoute exact path="/login" component={login} />
                <AuthRoute exact path="/signup" component={signup} />
              </Switch>
            </div>    
          </Router>

      </Provider>
    </MuiThemeProvider> 
  );
}
}

export default App;
