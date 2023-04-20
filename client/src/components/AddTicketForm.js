import React, { useState } from 'react';
import { Form, Button, Alert, Modal } from 'react-bootstrap';
import Auth from '../utils/auth';
import { ADD_TICKET } from '../utils/mutations';
import { useMutation } from '@apollo/client';
// import { useNavigate } from "react-router";

const styles = {
    theme: {
        paddingBottom: 80,
    },
    button: {
        marginBottom: 20,
        marginInline: 15,
    },
    header: {
        color: 'white',
        marginTop: 20,
    },
};

const AddTicketForm = (props) => {
    const [ticketFormData, setTicketFormData] = useState({
        ticketTitle: '',
        ticketContent: '',
        ticketBudget: '',
        ticketStatus: true,
        ticketCreator: Auth.getProfile().data._id,
    });
    const [validated] = useState(false);
    const [showAlert, setShowAlert] = useState(false);
    const [showModal, setShowModal] = useState(props.showModal);
    // const handleModalClose = () => setShowModal(false);
    // const handleModalShow = () => setShowModal(true);
    function refreshPage() {
        window.location.reload(false);
    }
    const [addTicket, { error }] = useMutation(ADD_TICKET);

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
            const { data } = await addTicket({
                variables: { ...ticketFormData },
            });
            console.log(data);
            if (data) {
                // navigate('/')
                alert('Your ticket has been created!');
                props.toggleShow();
                refreshPage();
            }
        } catch (e) {
            console.error(e);
        }
    };
    return (
        <>
            <Button onClick={props.toggleShow} style={styles.button}>
                Create a Repair Request
            </Button>

            <Modal size="lg" show={props.showModal} onHide={props.toggleShow}>
                <Modal.Header closeButton></Modal.Header>
                <Modal.Body>
                    <Form
                        noValidate
                        validated={validated}
                        onSubmit={handleFormSubmit}
                    >
                        <Alert
                            dismissible
                            onClose={() => setShowAlert(false)}
                            show={showAlert}
                            variant="danger"
                        >
                            Something went wrong with your login credentials!
                        </Alert>
                        <Form.Group>
                            <Form.Label htmlFor="ticketTitle">
                                Repair Request Title
                            </Form.Label>
                            <Form.Control
                                type="text"
                                size="lg"
                                placeholder="Input a breif title for your repair request ticket"
                                name="ticketTitle"
                                onChange={handleInputChange}
                                value={ticketFormData.ticketTitle}
                                required
                            />
                            <Form.Control.Feedback type="invalid">
                                A title is required for us to understand what
                                repair you would like!
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label htmlFor="ticketContent">
                                Problem Description
                            </Form.Label>
                            <Form.Control
                                as="textarea"
                                placeholder="Input a breif description of your repair request"
                                name="ticketContent"
                                onChange={handleInputChange}
                                value={ticketFormData.ticketContent}
                                required
                            />
                            <Form.Control.Feedback type="invalid">
                                A description of the problem is required for us
                                to better assist you!
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label htmlFor="ticketBudget">
                                Budget
                            </Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Please provide your budget for this repair"
                                name="ticketBudget"
                                onChange={handleInputChange}
                                value={ticketFormData.ticketBudget}
                                required
                            />
                        </Form.Group>
                        <Button
                            disabled={
                                !(
                                    ticketFormData.ticketTitle &&
                                    ticketFormData.ticketContent
                                )
                            }
                            type="submit"
                            variant="success"
                        >
                            Submit
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>
        </>
    );
};

export default AddTicketForm;
