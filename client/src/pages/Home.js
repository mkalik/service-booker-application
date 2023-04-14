import React from "react";

import background from "../assets/auto-1868726__480.jpg";

const styles = {
  mane: "Home",
  theme: {
    color: "white",
    textAlign: "center",
    padding: "15px",
    paddingBottom: 80,
  },
  pStyles: {},
  imgStyles: {
    padding: 20,
    height: 200,
  },
};

const Home = () => {
  return (
    <div
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.9)), url(${background})`,
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        height: "50vw",
        width: "100vw",
        alignItems: "center",
      }}
    >
      <div style={styles.theme} className="home">
        <h1> WELCOME</h1>
        <h4> Service Booker</h4>

        <p style={styles.pStyles}>
          Repair Service Booker is an application that can be used by car and
          power equipment repair shops to provide better visibility of their
          current and upcoming workflow status. <br></br>
          Shop customers can create a profile and login to create service
          tickets, notifying the shop that they will have a new car or piece of
          equipment to work on before it arrives. The shop owner can then login
          and see all of the open and closed service tickets for their shop.
          <br></br>
          <br></br>
          Created by Josh Augsburger, Malik Kouyate, Beena Robert, and Wilfredo
          Recinos Recinos students of UC Berkeley Extension coding bootcamp.
        </p>
      </div>
    </div>
  );
};

export default Home;
