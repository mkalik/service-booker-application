import React from "react";

const wellcome = {
  mane: 'Home',
  theme: {
    backgroundColor: '',
    color: 'black',
    textAlign: 'center',
    padding: '15px',
  
  
  }
};

const Home = () => {
  return (
    <div style={wellcome.theme} className='home' > 
    <h1> WELLCOME</h1>
    <h4> SBA</h4>
   
       <p >
         Service Booker Application an app
          created by Josh Augsburger, Malik Kouyate, Beena Robert and Wilfredo Recinos Recinos
          students of UC Berkeley  coding bootcapm. This website application allows users to create 
          an account, request tickets, delete them and also allows employee  be able to send email 
          to the users.
   
      </p>
     </div>
  )
};

export default Home;
