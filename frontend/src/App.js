import React, { Fragment, useState, useEffect } from 'react';
import ReactDOM from "react-dom";

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

  return (
<Fragment>
    <div className="app">
      <div className="login-form">
        <div className="title">{titleText}</div>
        {isSubmitted ? 
        <section>
          {apiData.map((merchant) => {
                            return (
                                <div className="movie-container" key={String(merchant.id)}>
<link href="https://cdnjs.cloudflare.com/ajax/libs/MaterialDesign-Webfont/4.9.95/css/materialdesignicons.css" rel="stylesheet"/>
<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery-nice-select/1.1.0/js/jquery.nice-select.min.js" integrity="sha256-Zr3vByTlMGQhvMfgkQ5BtWRSKBGa2QlspKYJnkjZTmo=" crossorigin="anonymous"></script>
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/jquery-nice-select/1.1.0/css/nice-select.min.css" integrity="sha256-mLBIhmBvigTFWPSCtvdu6a76T+3Xyt+K571hupeFLg4=" crossorigin="anonymous" />
<div class="container">
        <div class="col-lg-9">
            <div class="candidates-listing-item">
                <div class="list-grid-item mt-4 p-2">
                    <div class="row">
                        <div class="col-md-9">
                            <div class="candidates-img float-left mr-4" className='together'>
                                <img src={merchant.imgurl} alt="" class="img-fluid d-block rounded" className='img'/>
                                <h5 class="mb-2 f-19"><a class="text-dark" className='togetherTwo'>{merchant.name}</a></h5>
                            </div>
                            <div class="candidates-list-desc job-single-meta  pt-2" className='containerInfo'>
                                
                                <ul class="list-inline mb-0">
                                  <div className='set'>
                                    <li class="list-inline-item mr-4">
                                        <p class="text-muted f-15 mb-0"><i class="mdi mdi-account mr-1"></i>{merchant.role}</p>
                                    </li>

                                    <li class="list-inline-item mr-4" className='from'>
                                        <p class="f-15 mb-0"><a class="text-muted"><i class="mdi mdi-map-marker mr-1"></i>{merchant.city}, {merchant.state}</a></p>
                                    </li>
                                    </div>
                                    <li class="list-inline-item">
                                        <p class="text-muted f-15 mb-0" className='hours'><i class="mdi mdi-currency-usd mr-1"></i>{merchant.hourly}/hour</p>
                                    </li>
                                </ul>
                                <p class="text-muted mt-1 mb-0">Skills: {merchant.skills}</p>
                                </div>
                            </div>
                        </div>

                        <div class="col-md-3" className='bottom'>
                            <div class="candidates-list-fav-btn text-right">
                                <div class="fav-icon" className='heart'>
                                    <i class="mdi mdi-heart f-20"></i>
                                </div>
                                <div class="candidates-listing-btn mt-4" className='Hire'>
                                    <a href="#" class="btn btn-outline btn-sm" ><button type="button" class="btn btn-danger">Hire Applicant</button></a>
                                    
                                </div>
                                
                            </div>
                            
                        </div>
                        <hr></hr>
                    

                    <div class="row">
                        <div class="col-lg-11 offset-lg-1">
                            <div class="candidates-item-desc" className='texter'>
                               
                                <p class="text-muted mb-2 f-14">{merchant.bio}</p>
                            </div>
                        </div>
                    </div>
                </div>
                </div>
              </div>
              </div>
              </div>
                            );
                        })}
        </section> : renderForm}
        
    
      </div>
    </div>
    
    </Fragment>
  );
}

export default App;