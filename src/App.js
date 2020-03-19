import React, { useState, useRef } from 'react';
import Chat from './chat';
// import Login from './login';
import './App.css';
import { Strategy } from 'passport-local';

const express = require('express')
const app = express()
const cors = require('cors')
const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth')
const keys = require('../config')

let user = {}

passport.serializeUser( fn: (user, cb) => {
  cb(null, user)
});

passport.deserializeUser( fn: (user, cb) => {
  cb(null, user)
});

passport.use(new GoogleStrategy({
  clientID: keys.GOOGLE.clientID,
  clientSecret: keys.GOOGLE.clientSecret,
  callbackURL: "/auth/google/callback"
}, (accessToken, refreshToken, profile, cb) => {
  console.log(JSON.stringify(profile))
  user = {...profile}
  return cb(null, profile)
}))



app.use(cors());
app.use(passport.initialize())

app.get('/auth/google', passport.authenticate( strategy: 'google', options: {
  scope: ['profile', 'email']
} ));
app.get('/auth/google/callback',
        passport.authenticate(('google'),
        options: (req, res) => {
          res.redirect('/chat')
        }))

app.get('/user', (req, res) => {
  console.log('getting user data..')
  res.send(user)
})

app.get('/auth/logout', (req, res) => {
  console.log('logging out..')
  user = {}
  res.redirect('/login')
})

function ChatApp() {
  
  
 
  
  return (
    <div className="ChatApp">
      {/* <ChatHeader /> */}
      <Chat />
      <input ref={sendRef} type="text" />
      <button>Send</button>
    </div>
  );
}

export default ChatApp;
