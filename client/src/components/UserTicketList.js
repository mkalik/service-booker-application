import { CardColumns, Container } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import React, { useState } from 'react';

function UserTicketList(tickets) {
    // const styles = {
    //   "secondary"
    // }
    const [modal , showModal] = useState(false);
    const [data, setData] = useState({});
    const showModal =
    const passData = (ticket) => {
        setData({ ticket });
    };

    if (!tickets.tickets.length) {
        return (
            <h1>
                No Tickets Yet! Press the "Create Ticket" button to get started.
            </h1>
        );
    }

    return (
        <Container>
            <CardColumns>
                {tickets &&
                    tickets.tickets.map((ticket) => (
                        <Card
                            key={ticket._id}
                            style={{ width: '18rem' }}
                            bg={ticket.ticketStatus ? '' : 'secondary'}
                        >
                            <Card.Header>{ticket.ticketTitle}</Card.Header>
                            <Card.Body>
                                {/* <Card.Title>{ticket.ticketTitle}</Card.Title> */}
                                <Card.Text>{ticket.ticketContent}</Card.Text>
                                <Card.Text>
                                    Budget: {ticket.ticketBudget}
                                </Card.Text>
                                <Button
                                    variant="primary"
                                    onClick={passData(ticket)}
                                >
                                    View Details
                                </Button>
                                {/*this may be where i call my child function*/}
                            </Card.Body>
                        </Card>
                    ))}
            </CardColumns>
        </Container>
    );
}

export default UserTicketList;
