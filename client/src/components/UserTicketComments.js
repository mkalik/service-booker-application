import React, { useState } from 'react';
import { Form, Button, FloatingLabel } from 'react-bootstrap';
import { useMutation, useQuery } from '@apollo/client';
import { ADD_COMMENT } from '../utils/mutations';
import { useUserContext } from '../utils/UserContext';
// import { GET_COMMENT } from '../utils/queries';
import Auth from '../utils/auth';
const AddComment = ({ props, refetch }) => {
    const username = Auth.getProfile().data.username;
    const elevated = Auth.getProfile().data.privilege == 'admin' ? true : false;
    const [addComment, { error }] = useMutation(ADD_COMMENT);

    const textComment = { commentValue: '' };
    const [{ commentValue }, setComment] = useState(textComment);

    const clearComment = () => {
        setComment({ ...textComment });
    };
    const addToTicket = (event) => {
        event.preventDefault();
        addComment({
            variables: {
                ticketId: props,
                username,
                commentText: commentValue,
                isElevated: elevated,
            },
        })
            .then(() => {
                clearComment();
            })
            .then(() => refetch());
    };
    const handleComment = (event) => {
        event.preventDefault();
        const { value } = event.target;
        setComment({ ...commentValue, commentValue: value });
    };

    return (
        <Form>
            <Form.Control
                as="textarea"
                placeholder="leave a comment"
                style={{ height: '30vh' }}
                onChange={handleComment}
                value={commentValue}
            />
            <Button onClick={(event) => addToTicket(event)}>
                Click to add a Comment
            </Button>
        </Form>
    );
};

export default AddComment;
