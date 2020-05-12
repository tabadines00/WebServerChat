import React from 'react';  //step 1
import Message from './Message';

const Notes = ({notes, appUser, fetchNotes}) => { // step 2 declare component
    //Notes specific logic in here
    return(
        <div className='container'>
            {notes.map((item) => {
              return (<Message item={item} key={item.postId} appUser={appUser} fetchNotes={fetchNotes} />);
            })}
        </div>
    );
};

//step 3
export default Notes;