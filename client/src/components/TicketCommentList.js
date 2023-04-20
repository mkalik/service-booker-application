import { GET_COMMENTS } from '../utils/queries';
import { useQuery } from '@apollo/client';

const TicketCommentList = ({ props }) => {
    const admin = { color: '#daa520' };

    return (
        <>
            {props.map((comment, index) => {
                const elevated = comment.isElevated
                    ? { color: '#daa520', fontSize: '15px' }
                    : { color: '#d1cdc7', fontSize: '15px' };
                console.log(comment);
                return (
                    <div
                        key={comment._id}
                        style={{
                            margin: '5px',
                            background: '#696969',
                            opacity: '0.6',
                            borderRadius: '5px',
                        }}
                    >
                        <h6 style={elevated}>{comment.username}:</h6>
                        <div
                            style={{
                                display: 'flex',
                                justifyContent: 'center',
                                background: '#212529',
                                borderRadius: '0px 0px 5px 5px',
                            }}
                        >
                            <p style={elevated}>{comment.commentText}</p>
                        </div>
                    </div>
                );
            })}
        </>
    );
};

export default TicketCommentList;
