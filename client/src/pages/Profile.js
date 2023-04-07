import React, { useState } from "react";
import { Container, CardColumns, Card, Button, Modal } from "react-bootstrap";
import { useQuery } from "@apollo/client";
import { Navigate, useParams } from "react-router-dom";
import { QUERY_ME } from "../utils/queries";
import addTicketForm from "../components/AddTicketForm";

const Profile = () => {
  const [showModal, setShowModal] = useState(false);
  // const {username: userParam } = useParams();
  // const {loading, data} = useQuery(QUERY_ME)

  return (
    <>
      <Container>
        <Button onClick={() => setShowModal(true)}>
          Create a Service Request
        </Button>
      </Container>

      <Modal size="lg" show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>
          <addTicketForm handleModalClose={() => setShowModal(false)} />
        </Modal.Body>
      </Modal>
    </>
  );
};

export default Profile;
