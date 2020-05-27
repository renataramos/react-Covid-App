import React from 'react';
import Home from './Home.js'
import Country from './CountryDetails.js'
import {
  BrowserRouter,
  Route,
  Switch
} from 'react-router-dom'

function App() {


  return (
    <BrowserRouter>
    <div>
    <div id="Title">
        <h1><strong>_COVID WATCH!</strong></h1>
        <h6>an <strong>unfortunate name</strong> for an <strong>awesome app</strong></h6>
    </div>
    
    <Switch>
      <Route exact path='/' component={Home}/>
      <Route path='/:countryID' component={Country}/>   
    </Switch>
      
    
    </div>
    </BrowserRouter>
  
  );
}

export default App;

