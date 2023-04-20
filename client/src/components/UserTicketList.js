import { CardColumns, Container, Modal } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import React, { useState } from 'react';
import TicketDetails from './UserTicketDetails.js';
function UserTicketList(tickets) {
    // const styles = {
    //   "secondary"
    // }
    const [showDetails, setShowDetails] = useState(false);
    const openDetails = (event) => {
        console.log(event.target);
        const index = event.target.dataset.index;
        console.log(index);
        console.log(
            'console logging ticket with index',
            tickets.tickets[index]
        );
        const { _id, ticketTitle, ticketContent, ticketBudget, ticketStatus } =
            tickets.tickets[index];
        setData({
            _id,
            ticketTitle,
            ticketContent,
            ticketBudget,
            ticketStatus,
        });
        setShowDetails(true);
    };
    const hideDetails = () => setShowDetails(false);
    const [data, setData] = useState({
        _id: null,
        ticketTitle: null,
        ticketContent: null,
        ticketBudget: null,
        ticketStatus: null,
    });

    if (!tickets.tickets.length) {
        return (
            <h1>
                No Tickets Yet! Press the "Create Ticket" button to get started.
            </h1>
        );
    }

    return (
        <>
            <Container>
                <CardColumns>
                    {tickets &&
                        tickets.tickets.map((ticket, index) => (
                            <Card
                                key={ticket._id}
                                style={{ width: '18rem' }}
                                bg={ticket.ticketStatus == 1 ? '' : 'secondary'}
                            >
                                <Card.Header key={ticket.ticketTitle}>
                                    {ticket.ticketTitle}
                                </Card.Header>
                                <Card.Body>
                                    {/* <Card.Title>{ticket.ticketTitle}</Card.Title> */}
                                    <Card.Text>
                                        {ticket.ticketContent}
                                    </Card.Text>
                                    <Card.Text>
                                        Budget: {ticket.ticketBudget}
                                    </Card.Text>
                                    <Button
                                        data-index={index}
                                        variant="primary"
                                        onClick={openDetails}
                                    >
                                        View Details
                                    </Button>
                                    {/*this may be where i call my child function*/}
                                </Card.Body>
                            </Card>
                        ))}
                </CardColumns>
            </Container>
            <>
                <Modal show={showDetails} onHide={hideDetails}>
                    <Modal.Body>
                        <TicketDetails props={data} />
                    </Modal.Body>
                </Modal>
            </>
        </>
    );
}

export default UserTicketList;
