import React, { useState } from 'react';
import { Form, Button, FloatingLabel } from 'react-bootstrap';
import { useMutation, useQuery } from '@apollo/client';
import { ADD_COMMENT } from '../utils/mutations';
import { GET_COMMENT } from '../utils/queries';
import Auth from '../utils/auth';

const AddComment = ({ props }) => {
    const username = Auth.getProfile().data.username;
    const [addComment, { data, loading, error }] = useMutation(ADD_COMMENT);
    const [comment, setComment] = useState({
        commentValue: '',
    });
    const addToTicket = async (event) => {
        event.preventDefault();
        const data = await addComment({
            ticketId: props._id,
            username,
            comment,
        });
        console.log(data);
        setComment('');
    };
    const handleComment = (event) => {
        const value = event.target;
        setComment({ ...comment, commentValue: value });
    };

    return (
        <Form onSubmit={addToTicket}>
            {/* <FloatingLabel label="comments"> */}
            <Form.Control
                as="textarea"
                placeholder="leave a comment"
                style={{ height: '30vh' }}
                onChange={handleComment}
                value={comment.CommentValue}
            />
            <Button type="submit">Click to add a Comment</Button>
            {/* </FloatingLabel> */}
        </Form>
    );
};

export default AddComment;
