import React, { useState, useEffect } from 'react';
import { Dropdown, Form, Button, Modal } from 'react-bootstrap';
import AddComment from './UserTicketComments.js';
import TicketCommentList from './TicketCommentList.js';
import { useQuery, useMutation } from '@apollo/client';
import { GET_COMMENTS } from '../utils/queries';
import { TICKET_STATUS } from '../utils/mutations';
import { useUserContext } from '../utils/UserContext';
import Auth from '../utils/auth.js';

const TicketDetails = ({ props }) => {
    const [showDetails, setShowDetails] = useState(false);
    // const hideDetails = () => {
    //     setShowDetails(false);
    // };
    console.log('userTicketDetails', props);
    console.log('ticketStatus', props.ticketStatus);
    // const [comments, setComments] = useState([]);
    const [stat, setStatus] = useState();
    const role = Auth.getProfile().data.privilege;
    const [ticketStatus] = useMutation(TICKET_STATUS);
    const { loading, error, data, refetch } = useQuery(GET_COMMENTS, {
        variables: {
            ticketId: props._id,
        },
    });
    const changeStatus = (status) => {
        console.log('status', status);

        setStatus(Number(status));
        ticketStatus({
            variables: {
                ticketId: props._id,
                status: Number(status),
            },
        }).then(() => refetch());
    };
    // console.log(loading);
    // console.log(data);
    const statusColors = {
        1: { color: '#32cd32' },
        2: { color: '#ffff66' },
        3: { color: '#00ffff' },
        4: { color: '#ff0000' },
    };
    console.log('stat', stat);

    const statusReturn = function () {
        const status = stat == undefined ? props.ticketStatus : stat;
        switch (status) {
            case 1:
                return 'open';
            case 2:
                return 'in progress';
            case 3:
                return 'finished';
            case 4:
                return 'closed';
            default:
                return;
        }
    };
    const show = role == 'admin' ? false : true;
    if (loading) {
        return '...loading';
    }
    console.log(data);

    return (
        <div>
            <Modal.Header closeButton>
                <Modal.Title>Ticket Details: {props.ticketTitle} </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <h3 style={{ 'fontSize': '16px' }}>Ticket Content: </h3>
                <p style={{ 'textAlign': 'center' }}>{props.ticketContent}</p>

                <ul style={{ 'listStyle': 'none' }}>
                    <li>Budget: {props.ticketBudget}</li>
                    <li>
                        Status:
                        <p
                            style={
                                statusColors[
                                    stat == undefined
                                        ? props.ticketStatus
                                        : stat
                                ]
                            }
                        >
                            {statusReturn(stat)}
                        </p>
                    </li>
                </ul>
                <TicketCommentList
                    props={data.getSingleTicket.ticketComments}
                />
                <AddComment props={props._id} refetch={refetch} />
                <Dropdown onSelect={(event) => changeStatus(event)}>
                    <Dropdown.Toggle variant="success" id="dropdown-basic">
                        ChangeStatus
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                        <Dropdown.Item eventKey="1">Open</Dropdown.Item>
                        <Dropdown.Item disabled={show} eventKey="2">
                            In Progress
                        </Dropdown.Item>
                        <Dropdown.Item disabled={show} eventKey="3">
                            Finished
                        </Dropdown.Item>
                        <Dropdown.Item eventKey="4">Closed</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
                {/* <Button */}
                {/*     onClick={() => */}
                {/*         changeStatus(data.getSingleTicket.ticketStatus) */}
                {/*     } */}
                {/* > */}
                {/*     Click to toggle status */}
                {/* </Button> */}
            </Modal.Body>
            <Modal.Footer></Modal.Footer>
        </div>
    );
};

export default TicketDetails;
