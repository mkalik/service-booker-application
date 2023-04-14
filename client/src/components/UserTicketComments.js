import React, { useState } from 'react';
import { Form, Button, FloatingLabel } from 'react-bootstrap';
import { useMutation, useQuery } from '@apollo/client';
import { ADD_COMMENT } from '../utils/mutations';
// import { GET_COMMENT } from '../utils/queries';
import Auth from '../utils/auth';

const AddComment = ({ props, tryComment, refetch }) => {
    const username = Auth.getProfile().data.username;
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
            {/* <FloatingLabel label="comments"> */}
            <Form.Control
                as="textarea"
                placeholder="leave a comment"
                style={{ height: '30vh' }}
                onChange={handleComment}
                value={commentValue}
                // value={comment}
            />
            <Button
                onClick={
                    (event) => addToTicket(event)
                    // tryComment(true);
                }
            >
                Click to add a Comment
            </Button>
            {/* </FloatingLabel> */}
        </Form>
    );
};

export default AddComment;
