import React, { useState } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import Auth from "../utils/auth";
import addTicket from "../utils/mutations"

const AddTicketForm = ({profileId}) => {
  const [ticketFormData, setTicketFormData] = useState({
    ticketTitle: "",
    ticketContent: "",
    ticketBudget: "",
  });
  const [validated] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setTicketFormData({ ...ticketFormData, [name]: value });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    console.log(ticketFormData);
  };
  return (
    <>
      <Form noValidate validated={validated} onSubmit={handleFormSubmit}>
        <Alert
          dismissible
          onClose={() => setShowAlert(false)}
          show={showAlert}
          variant="danger"
        >
          Something went wrong with your login credentials!
        </Alert>
        <Form.Group>
          <Form.Label htmlFor="ticketTitle">Title</Form.Label>
          <Form.Control
            type="text"
            size="lg"
            placeholder="Input a title for this ticket"
            name="ticketTitle"
            onChange={handleInputChange}
            value={ticketFormData.ticketTitle}
            required
          />
          <Form.Control.Feedback type="invalid">
            A title is required!
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group>
          <Form.Label htmlFor="ticketContent">Problem Description</Form.Label>
          <Form.Control
            as="textarea"
            placeholder="Input the problem with your equipment"
            name="ticketContent"
            onChange={handleInputChange}
            value={ticketFormData.ticketContent}
            required
          />
          <Form.Control.Feedback type="invalid">
            A description of the problem is required!
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group>
          <Form.Label htmlFor="ticketBudget">Budget</Form.Label>
          <Form.Control
            type="text"
            placeholder="Input a Budget for this repair"
            name="ticketBudget"
            onChange={handleInputChange}
            value={ticketFormData.ticketBudget}
            required
          />
        </Form.Group>
        <Button
          disabled={
            !(ticketFormData.ticketTitle && ticketFormData.ticketContent)
          }
          type="submit"
          variant="success"
        >
          Submit
        </Button>
      </Form>
    </>
  );
};

export default AddTicketForm;
