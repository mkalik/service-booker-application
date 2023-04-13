import React, { useState } from 'react';
import { Form, Button, FloatingLabel } from 'react-bootstrap';
import { useMutation, useQuery } from '@apollo/client';
import { ADD_COMMENT } from '../utils/mutations';
// import { GET_COMMENT } from '../utils/queries';
import Auth from '../utils/auth';

const AddComment = ({ props, tryComment }) => {
    const username = Auth.getProfile().data.username;
    const [addComment, { error }] = useMutation(ADD_COMMENT);
    const [comment, setComment] = useState({
        commentValue: '',
    });
    // console.log(username);
    console.log(`props : ${props}`);

    console.log(tryComment);
    const addToTicket = (event) => {
        event.preventDefault();
        // console.log(comment);
        addComment({
            variables: {
                ticketId: props,
                username,
                commentText: comment.commentValue,
            },
        });
        setComment({ commentValue: '' });
    };
    const handleComment = (event) => {
        const value = event.target.value;
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
                // value={comment}
            />
            <Button
                type="submit"
                onClick={() => {
                    tryComment(true);
                }}
            >
                Click to add a Comment
            </Button>
            {/* </FloatingLabel> */}
        </Form>
    );
};

export default AddComment;
