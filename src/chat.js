import React, { useState, useRef, useEffect } from 'react';
// import {v4 as uuidv4} from 'uuid' - Switched to using current date/time for message id's
import './App.css';



const LOCAL_STORAGE_KEY = 'chatApp.msgWindow'



export default function Chat() {
    const [messages, msgWindow] = useState([])

    const msgRef = useRef();

    useEffect(() => {
        const storedChat = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))
        if (storedChat)
        msgWindow(storedChat)
      }, [])
     
      useEffect(() => {
       localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(messages))
     }, [messages])
     
       
       function handleAddChat(e) {
         const msg = msgRef.current.value
         var dt = new Date(Date.now())
         var msgTime = new Date(dt.getTime());
         if (msg === '') return
         msgWindow(prevChat => {
           return[...prevChat, { user: 'sender', id: Date.now(), msg: msg}]
         })
         msgRef.current.value = null
         console.log(msg + ': ' + msgTime)
       }

       function clearChat() {
         const newWindow = messages.filter(msg => !msg)
         msgWindow(newWindow)
       }

       
       function MessageList() {
        return (
          <ul className="messageList">
            {messages.map(msg => {
              return (
                <li key={msg.id}>
                  <div>
                    {msg.user}
                  </div>
                  <div>
                    {msg.msg}
                  </div>
                </li>
              )
            })}
          </ul>
        )
        
      }       
      
    return (
        <div id="ChatRoom">
            <h1>Chatroom Name Placeholder</h1>
            <hr />
            <MessageList />
            <input ref={msgRef} type="text" />
            <button onClick={handleAddChat}>Send Message</button>
            <button onClick={clearChat}>Clear Chat</button>
        </div>
    )

}