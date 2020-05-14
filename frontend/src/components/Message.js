import React from 'react';
import axios from 'axios';
import Like from './Like.js'

const Message = ({item, appUser, fetchNotes}) => {

    const [likes, setLikes] = React.useState([]);
    const [names, setNames] = React.useState('');


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

    const displayLikes = (l) => {
        if(l.length > 1) {
            let listLikes = '';
            for(let i = 0; i < l.length - 1; i++) {
                listLikes += '' + l[i] + ", ";
            }
            setNames("Liked by " + listLikes + l[l.length - 1]);

        } else if (l.length === 1) {
            setNames("Liked by " + l[0]);
        } else {
            setNames('');
        }
    }

    React.useEffect(() => {
        displayLikes(item.likes);
        setLikes(item.likes);
    }, [item.likes]);

    return(
        <div className="notes-container" onDoubleClick={likeFunction}>
            <div className="item-username">{item.username}</div> 
            <div className="item-date">{item.date} </div> 
            <span className="item-message">{item.message}
                <Like likes={likes} appUser={appUser} />
            </span>
            <div className="item-date">
                {names}
            </div>
        </div>
    );
};

export default Message;