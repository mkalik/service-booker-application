import { CardColumns, Container } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

function UserTicketList(tickets) {

  // const styles = {
  //   "secondary"
  // }
  if (!tickets.tickets.length) {
    return <h1>No Tickets Yet! Press the "Create Ticket" button to get started.</h1>
  }

  return (
    <Container>
      <CardColumns>
      {tickets && tickets.tickets.map((ticket) => (
        <Card key={ticket._id} style={{ width: "18rem" }} bg={ticket.ticketStatus ? "" : "secondary"}>
        <Card.Header>{ticket.ticketTitle}</Card.Header>
        <Card.Body>
          {/* <Card.Title>{ticket.ticketTitle}</Card.Title> */}
          <Card.Text>{ticket.ticketContent}</Card.Text>
          <Card.Text>Budget: {ticket.ticketBudget}</Card.Text>
          <Button variant="primary">View Details</Button>
        </Card.Body>
      </Card>
      ))
      }
      </CardColumns>
    </Container>
  );
}

export default UserTicketList;
