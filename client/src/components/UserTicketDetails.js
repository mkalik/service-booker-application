import React, { useState } from 'react';
import { Form, Button, Modal } from 'react-bootstrap';
import { useQuery } from '@apollo/client';
import { AddComment } from './userTicketComments.js';
// import { useMutation } from '@apollo/client';

import Auth from '../utils/auth';

const TicketDetails = (props) => {
    const [showDetails, setShowDetails] = useState(false);

    const openDetails = () => setShowDetails(true);
    const hideDetails = () => setShowDetails(false);

    return (
        <div>
            <Modal show={showDetails} onHide={hideDetails}>
                <Modal.Header closeButton>
                    <Modal.Title>Ticket Details ( title ) </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <ul>
                        <li>Ticket Content: {props.ticketContent}</li>
                        <li>Ticket Budget: {props.ticketBudget}</li>
                        <li>Ticket Status: {props.ticketStatus}</li>
                        {/* <li>Created at: {props.ticketStatus}</li> */}
                    </ul>
                    <AddComment value={props} />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="Secondary" onClick={hideDetails}>
                        Close Modal
                    </Button>
                    {/* <Button variant="Primary" onClick={SaveData}></Button> */}
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default TicketDetails;
