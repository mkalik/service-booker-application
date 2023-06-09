import React, { useState } from "react";
import {
  Container,
  CardColumns,
  Card,
  Button,
  Modal,
  Tab,
} from "react-bootstrap";
import { useQuery } from "@apollo/client";
import { Navigate, useParams } from "react-router-dom";
import { QUERY_USER, QUERY_ME, QUERY_TICKETS } from "../utils/queries";
import AddTicketForm from "../components/AddTicketForm";
import UserTicketList from "../components/UserTicketList";
import Auth from "../utils/auth";
import { useEffect } from "react";
import { visitWithTypeInfo } from "graphql";

const styles = {
  theme: {
    paddingBottom: 80,
  },
  button: {
    marginBottom: 20,
  },
  header: {
    color: "white",
    marginTop: 20,
    textAlign: 'right',
  }
};

const Profile = () => {
  const { profileId } = useParams();
  const [showModal, setShowModal] = useState(false);
  const [ticketsArray, setTicketsArray] = useState([]);
  console.log(profileId);
  function toggleShow() {
    setShowModal(!showModal);
  }
  const profile = Auth.getProfile().data;

  const {loading, data} = useQuery(QUERY_TICKETS, {
    variables: {ticketCreator: profile._id, privilege: profile.privilege}
  })
  console.log(data);

  // useEffect(() => {
  //   setTicketsArray(data);
  // }, [data]);
console.log(ticketsArray.tickets)
  console.log(profile.tickets)

  // if (Auth.loggedIn()) {
  //   return <Navigate to="/me" />;
  // }

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!profile?.username) {
    return (
      <h4>
        You need to be logged in to see this. Use the navigation links above to
        sign up or log in!
      </h4>
    );
  }

  return (
    <>
      <Container style={styles.theme}>
        <Container style={styles.header}>
        <p>Welcome {profile.username}</p>
        </Container>
        <AddTicketForm 
        showModal={showModal}
        toggleShow={toggleShow}
        />
        <UserTicketList tickets={data.tickets} />
      </Container>
    </>
  );
};

export default Profile;
