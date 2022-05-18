import React, { Fragment, useState, useEffect } from 'react';
import ReactDOM from "react-dom";
import { FaEnvelope } from "react-icons/fa";
import { FaSearchLocation } from "react-icons/fa";
import { FaPhone} from "react-icons/fa";
import {GoogleLogin} from 'react-google-login'

import "./App.css";
import "./styles.css"

const App = () => {
  useEffect(() => {
      const getAPI = () => {
          // Change this endpoint to whatever local or online address you have
          // Local PostgreSQL Database
          const API = 'http://127.0.0.1:2000/online/harperdb/';
          fetch(API)
              .then((response) => {
                  console.log(response);
                  return response.json();
              })
              .then((data) => {
                  console.log(data);
                  setLoading(false);
                  setApiData(data);
              });
      };
      getAPI();
  }, []);
  const [apiData, setApiData] = useState([]);
  const [loading, setLoading] = useState(true);
  // React States
  const [errorMessages, setErrorMessages] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  // User Login info
  const database = [
    {
      username: "user1",
      password: "pass1"
    },
    {
      username: "user2",
      password: "pass2"
    }
  ];

  const errors = {
    uname: "invalid username",
    pass: "invalid password"
  };

  const handleSubmit = (event) => {
    //Prevent page reload
    event.preventDefault();

    var { uname, pass } = document.forms[0];

    // Find user login info
    const userData = database.find((user) => user.username === uname.value);

    // Compare user info
    if (userData) {
      if (userData.password !== pass.value) {
        // Invalid password
        setErrorMessages({ name: "pass", message: errors.pass });
      } else {
        setIsSubmitted(true);
      }
    } else {
      // Username not found
      setErrorMessages({ name: "uname", message: errors.uname });
    }
  };

  // Generate JSX code for error message
  const renderErrorMessage = (name) =>
    name === errorMessages.name && (
      <div className="error">{errorMessages.message}</div>
    );

  // JSX code for login form
  const renderForm = (
    <div className="form">
      <form onSubmit={handleSubmit}>
        <div className="input-container">
          <label>Username </label>
          <input type="text" name="uname" required />
          {renderErrorMessage("uname")}
        </div>
        <div className="input-container">
          <label>Password </label>
          <input type="password" name="pass" required />
          {renderErrorMessage("pass")}
        </div>
        <div className="button-container">
          <input type="submit" />
        </div>
      </form>
    </div>
  );

  let titleText = "Sign In"
  if(isSubmitted == true){
    titleText = "Applicants"
  }
  // const responseGoogle = response =>{
  //   console.log(response)
  //   const{code}=response
  // }
  // const responseError = error =>{
  //   console.log(error)
  // }

  return (
<Fragment>
      {/* <div>
        <GoogleLogin clientId='246332284177-r9mpglt6s9bg02jfqgae789g9q4vclmn.apps.googleusercontent.com'
        buttonText='Sign in to Authorize Calendar'
        onSuccess={responseGoogle}
        onFailure={responseError}
        cookiePolicy={'single_host_origin'}
        //
        responseType='code'
        accessType='offline'
        scope='openid email profile https://www.googleapis.com/auth/calendar'
        />
      </div> */}
      <div className="login-form">
        
        <div className="title">{titleText}</div>
        {isSubmitted ? 
        <section>
          {apiData.map((merchant) => {
                            return (
                              <div className='carder'>
                              <div class="card-container">
                              <span class="pro">{merchant.role}: ${merchant.hourly} / hour </span>
                              
                              <img class="round" src= {merchant.imgurl} alt="user" />
                              <h3>{merchant.name} {merchant.lname}</h3>
                             
                            
                              <h6><FaSearchLocation />&nbsp; {merchant.city}, {merchant.state}</h6>
                              <h6><FaEnvelope />&nbsp;  {merchant.email}</h6>
                              <h6><FaPhone /> &nbsp; {merchant.number}</h6>
                               <p>{merchant.bio}</p>
                              <div class="buttons">
                               
                                <form action={merchant.resume} method="get" target="_blank">
                                <button class="primary">
                                  Set Meeting
                                </button>
                                  &nbsp;&nbsp;
                                <button class="primary ghost">
                                  Resume
                                </button>
                                </form>
                              </div>
                              <div class="skills">
                                <h6>Skills</h6>
                                <ul>
                                  <li>{merchant.skills}</li>
                                </ul>
                              </div>
                              <div>
                              <hr></hr>
                            </div>
                            </div>
                            </div>
                            
                            );
                        })}
        </section> : renderForm}
        
    
      </div>
   
    </Fragment>
  );
}

export default App;