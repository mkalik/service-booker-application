
import React, { useState } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import Auth from "../utils/auth";
import {ADD_TICKET} from "../utils/mutations"
import { useMutation } from "@apollo/client";
import { redirect } from "react-router-dom";

const AddTicketForm = ({profileId}) => {
  const [ticketFormData, setTicketFormData] = useState({
    ticketTitle: "",
    ticketContent: "",
    ticketBudget: "",
    ticketStatus: true,
    ticketCreator: Auth.getProfile().data._id
  });
  const [validated] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const refresh = () => window.location.reload(true)
  const [addTicket, {error}] = useMutation(ADD_TICKET)


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
        console.log(ticketFormData.ticketTitle);


    try {
      const {data} = await addTicket({
        variables: {...ticketFormData}
      });
      console.log(data)
      if (data) {
        refresh()
      }
    } catch (e) {
      console.error(e);
    }
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
            placeholder="Input your budget for this repair"
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
