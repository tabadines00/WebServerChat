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
        <div className="notes-container" onDoubleClick={likeFunction}>
            <div className="item-username">{item.username}</div> 
            <div className="item-date">{item.date} </div> 
            <span className="item-message">{item.message}
            {(likes.length > 0) && <p style={{float: "right", margin: 0}}>{likes.length}<svg class="bi bi-heart-fill" width="1em" height="1em" viewBox="0 0 16 16" fill="rgb(0, 140, 255)" xmlns="http://www.w3.org/2000/svg">
  <path fill-rule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z" clip-rule="evenodd"/>
</svg></p>}
            {(likes.length === 0) && <p style={{float: "right", margin: 0}}><svg class="bi bi-heart" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
  <path fill-rule="evenodd" d="M8 2.748l-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 01.176-.17C12.72-3.042 23.333 4.867 8 15z" clip-rule="evenodd"/>
</svg></p>}
            </span>
        </div>
    );
};

export default Message;