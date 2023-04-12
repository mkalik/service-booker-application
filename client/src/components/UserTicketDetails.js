import React, { useState } from 'react';
import { Form, Button, Modal } from 'react-bootstrap';
import { useQuery } from '@apollo/client';
import AddComment from './UserTicketComments.js';
import { GET_COMMENTS } from '../utils/queries';
// import { useMutation } from '@apollo/client';
// import Auth from '../utils/auth';

const TicketDetails = ({ props }) => {
    const [showDetails, setShowDetails] = useState(false);
    const hideDetails = () => {
        setShowDetails(false);
    };
    const { loading, error, data } = useQuery(GET_COMMENTS, {
        variables: {
            ticketId: props._id,
        },
    });
    console.log(loading);
    console.log(data);
    const showComments = () => {
        if (loading) {
            return <h2>loading</h2>;
        }
        const commentList = data.getSingleTicket.ticketComments;
        console.log('comment list', commentList);
        if (commentList.length == 0) {
            return <h4>no comments</h4>;
        } else {
            return commentList.map((comment, index) => {
                <div>
                    <h6>{comment.username}</h6>
                    <p>{comment.commentText}</p>
                </div>;
            });
        }
    };

    console.log(props);
    return (
        <div>
            <Modal.Header closeButton>
                <Modal.Title>Ticket Details: {props.ticketTitle} </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <h3 style={{ 'font-size': '16px' }}>Ticket Content: </h3>
                <p style={{ 'text-align': 'center' }}>{props.ticketContent}</p>

                <ul style={{ 'list-style': 'none' }}>
                    <li>Ticket Budget: {props.ticketBudget}</li>
                    <li>
                        Ticket Status: {props.ticketStatus ? 'open' : 'closed'}
                    </li>
                </ul>
                {/* {showComments} */}
                <AddComment props={props._id} />
                {/*need to add some sort of  list of comments here*/}
            </Modal.Body>
            <Modal.Footer></Modal.Footer>
        </div>
    );
};

export default TicketDetails;
