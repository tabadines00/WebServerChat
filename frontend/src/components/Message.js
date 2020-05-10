import React from 'react';

const Message = ({item, appUser}) => {

    const [likes, setLikes] = React.useState(0);

    const likeFunction = () => {
        console.log(item + " was liked by " + appUser);
        setLikes(likes + 1);
        // Update the database
        /*
        const body = {
            likes: likes,
            username: appUser, 
        };
        axios.post('/api/like', body)
        .then( ()=> setName(''))
        .catch(console.log);
        */
    }

    // Fetch likes from database and update state
    /*
    const fetchLikes = () => {
        // utility to get all notes
        axios.get('/api/getLikes', {params: {

        }})
            .then((res) => {
            console.log(res);
            setLikes(res.data.notes); // update state variable
            })
            .catch(console.log);
    };

    // this is a hook
    React.useEffect(() => {
        // this will load notes when the page loads
        fetchLikes();
    }, []); // pass empty array
    */

    return(
        <div className="notes-item" onDoubleClick={likeFunction}>
            {item}
            {(likes > 0) && <p style={{float: "right", margin: 0}}>{"❤️"}</p>}
        </div>
    );
};

//step 3
export default Message;