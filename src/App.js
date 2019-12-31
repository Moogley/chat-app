import React, { useState, useRef } from 'react';
import Chat from './chat';
import Login from './login';
import './App.css';

function App() {
  const [msgWindow, sendMsg] = useState([])

  const sendRef = useRef();
  
 

  


  return (
    <div className="App">
      <Chat />
      <input ref={sendRef} type="text" />
      <button>Send</button>
    </div>
  );
}

export default App;
