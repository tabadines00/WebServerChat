import React from 'react';
import axios from 'axios';

const Message = ({item, appUser, fetchNotes}) => {

    const [likes, setLikes] = React.useState([]);

    const likeFunction = () => {
        // If the user has not already liked the post, then like the post
        if(!likes.includes(appUser)) {
            console.log("Post ID: " + item.postId + ": " + item.message + " was liked by " + appUser);
            // Update the database
            const body = {
                username: appUser,
                postId: item.postId
            };
            axios.post('/api/like', body)
            .then( () => fetchNotes() )
            .catch(console.log);
        } else {
            console.log("already liked the post!");
            // If the user has liked the post, then unlike
            console.log("Post ID: " + item.postId + ": " + item.message + " was unliked by " + appUser);
            // Update the database
            const body = {
                username: appUser,
                postId: item.postId
            };
            axios.post('/api/unlike', body)
            .then( () => fetchNotes() )
            .catch(console.log);
        }
    }

    React.useEffect(() => {
        setLikes(item.likes);
    }, [item.likes]);

    return(
        <div className="notes-item" onDoubleClick={likeFunction}>
            <div className="item-username">{item.username}</div>
            <div className="item-date">{item.date}</div>
            <p className="item-message">{item.message}</p>
            {(likes.length > 0) && <p style={{float: "right", margin: 0}}>{likes.length + "❤️"}</p>}
        </div>
    );
};

export default Message;