import React, { useState } from 'react';
import { Form, Button, Modal } from 'react-bootstrap';
import { useQuery } from '@apollo/client';
import AddComment from './UserTicketComments.js';
// import { useMutation } from '@apollo/client';
// import Auth from '../utils/auth';

const TicketDetails = ({ props }) => {
    const [showDetails, setShowDetails] = useState(false);
    const hideDetails = () => {
        setShowDetails(false);
    };

    console.log(props);
    return (
        <div>
            {/* <Modal show={showDetails} onHide={hideDetails}> */}
            <Modal.Header closeButton>
                <Modal.Title>Ticket Details: {props.ticketTitle} </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <ul>
                    <li>
                        Ticket Content:<p>{props.ticketContent}</p>
                    </li>
                    <li>Ticket Budget: {props.ticketBudget}</li>
                    <li>
                        Ticket Status: {props.ticketStatus ? 'open' : 'closed'}
                    </li>
                </ul>
                <AddComment props={props._id} />
            </Modal.Body>
            <Modal.Footer>
                {/* <Button variant="Primary" onClick={SaveData}></Button> */}
            </Modal.Footer>
            {/* </Modal> */}
        </div>
    );
};

export default TicketDetails;
