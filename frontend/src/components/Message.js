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
            .then( () => fetchLikes() )
            .catch(console.log);
        } else {
            console.log("already liked the post!");
        }
    }

    const fetchLikes = () => {
        if(item.likes != null) {
            setLikes(item.likes);
        }
    }

    React.useEffect(() => {
        fetchLikes();
    }, []);

    return(
        <div className="notes-item" onDoubleClick={likeFunction}>
            <div className="item-username">{item.username}</div>
            <p className="item-message">{item.message}</p>
            {(likes.length > 0) && <p style={{float: "right", margin: 0}}>{likes.length + "❤️"}</p>}
        </div>
    );
};

export default Message;