import React from 'react';
import axios from 'axios'; // don't forget this
import Notes from '../components/Notes';
import { Redirect } from 'react-router-dom';

const ws = new WebSocket("ws://localhost:1235/chat");

const UserPage = ({appUser, setAppUser}) => {
  // pass in default value into useState
  const [note, setNote] = React.useState(''); // create a state variable + setter
  const [notes, setNotes] = React.useState([ ]); // if map of undefined

  ws.onopen = () => {
    console.log('WebSocket connected');
  };
  ws.onmessage = (stringMessage) => {
    console.log('WebSocket message recieved: ' + stringMessage.data);
    fetchNotes();
  };

  const fetchNotes = () => {
    // utility to get all notes
    axios.get('/api/getAllNotes')
      .then((res) => {
        console.log(res);
        setNotes(res.data.notes); // update state variable
      })
      .catch(console.log);
  };

  const submitNote = () => { // arrow/lambda function\
    if(note !== '') {
      console.log("user: " + appUser)
      console.log("note: " + note)
      const body = {
        note: note,
        username: appUser, 
      };
      axios.post('/api/addNote', body)
        .then( () => setNote(''))
        .then( () => fetchNotes()) // fetch after submit
        .catch(console.log);
      document.getElementById("bottomPage").scrollIntoView();
    }
  };

  const keyPressed = (event) => {
    if (event.key === "Enter") {
      submitNote();
      ws.send(note);
    }
  }

  // this is a hook
  React.useEffect(() => {
    // this will load notes when the page loads
    fetchNotes();
   
    ws.addEventListener("message",(stringMessage) => {
      console.log('WebSocket message recieved: ' + stringMessage.data);
      fetchNotes();
    });
    ws.addEventListener("close",() => {
      console.log('WebSocket closed');
    });
  }, []); // pass empty array

  if(!appUser){
    return <Redirect to= "/login" />; // stop user from vising without being logined in
  }
  // jsx
  return (
    <div className="notes-container"> 
      <div>
        <div>
          <Notes notes={notes} appUser={appUser} fetchNotes={fetchNotes} />
        </div>
      </div>
      <footer className="footer">
        <input 
        className="inputNote" 
        value={note} 
        placeholder="Type your message here..."
        onKeyPress={keyPressed}
        onChange={e => setNote(e.target.value)} />
        <button className="send-button" onClick={submitNote}>
          <svg width="1.5em" height="1.5em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
          <path fillRule="evenodd" d="M2.678 11.894a1 1 0 01.287.801 10.97 10.97 0 01-.398 2c1.395-.323 2.247-.697 2.634-.893a1 1 0 01.71-.074A8.06 8.06 0 008 14c3.996 0 7-2.807 7-6 0-3.192-3.004-6-7-6S1 4.808 1 8c0 1.468.617 2.83 1.678 3.894zm-.493 3.905a21.682 21.682 0 01-.713.129c-.2.032-.352-.176-.273-.362a9.68 9.68 0 00.244-.637l.003-.01c.248-.72.45-1.548.524-2.319C.743 11.37 0 9.76 0 8c0-3.866 3.582-7 8-7s8 3.134 8 7-3.582 7-8 7a9.06 9.06 0 01-2.347-.306c-.52.263-1.639.742-3.468 1.105z" clipRule="evenodd"/>
          </svg>
        </button>
      </footer>
    </div>



  );
};

export default UserPage;