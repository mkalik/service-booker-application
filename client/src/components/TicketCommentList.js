import { GET_COMMENTS } from '../utils/queries';
import { useQuery } from '@apollo/client';
const TicketCommentList = ({ props }) => {
    return (
        <>
            {props.map((comment, index) => {
                console.log(comment);
                return (
                    <div key={comment._id}>
                        <h6 style={{ 'fontSize': '16px' }}>
                            {comment.username}
                        </h6>
                        <p>{comment.commentText}</p>
                    </div>
                );
            })}
        </>
    );
};

export default TicketCommentList;
