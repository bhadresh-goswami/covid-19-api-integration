import React from 'react';
import logo from './logo.svg';
import './App.css';
import CovidSummary from './Components/covid19/covid19';
import UserLogin from './Components/users/userlogin';


function App() {
  return (
    <div className="App">
      {/* <CovidSummary/> */}
      <UserLogin/>
    </div>
  );
}

export default App;
