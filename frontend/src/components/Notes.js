import React from 'react';  //step 1
import Message from './Message';

const Notes = ({notes, appUser}) => { // step 2 declare component
    //Notes specific logic in here
    return(
        <div className="notes-list">
            {notes.map((item) => {
              return (<Message item={item} appUser={appUser} />);
            })}
        </div>
    );
};

//step 3
export default Notes;