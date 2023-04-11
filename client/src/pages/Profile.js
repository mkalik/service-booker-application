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
import { QUERY_USER, QUERY_ME } from "../utils/queries";
import AddTicketForm from "../components/AddTicketForm";
import UserTicketList from "../components/UserTicketList";
import Auth from "../utils/auth";

const Profile = () => {
  const { profileId } = useParams();
  const [showModal, setShowModal] = useState(false);
  console.log(profileId)
  const {loading, data} = useQuery(profileId ? QUERY_USER : QUERY_ME, {
    variables: {profileId: profileId}
  })

  // console.log(user.data.username)
  console.log(data)

  const profile = data?.me || data?.profile || {};

  // console.log(profile.tickets)

  if (Auth.loggedIn() && Auth.getProfile().data._id === profileId) {
    return <Navigate to="/me" />;
  }

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
      <Container>
        <Button onClick={() => setShowModal(true)}>
          Create a Service Request
        </Button>
          <UserTicketList
          tickets={profile.tickets}
          />
      </Container>

      <Modal size="lg" show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>
          <AddTicketForm handleModalClose={() => setShowModal(false)} />
        </Modal.Body>
      </Modal>
    </>
  );
};

export default Profile;
