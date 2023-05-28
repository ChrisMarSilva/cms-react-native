import React, { useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Nav from './components/Nav';
import Login from './components/Login';
import Home from './components/Home';
import Register from './components/Register';
import Portfolio from './components/Portfolio';

import './auth/Authentication';
import firebase from 'firebase/app';

import UserContext from './user-context/user-context';

firebase.initializeApp({
  apiKey: process.env.REACT_APP_FIREBASE_KEY,
  authDomain: process.env.REACT_APP_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_PROJECT_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_PROJECT_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_PROJECT_APP_ID
});

export default function AppRouter() {
  const [user, setUser] = useState(null);
  return (
    <Router>
      <Nav />
      <UserContext.Provider value={{ user, setUser }}>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Route path="/portfolio" component={Portfolio} />
        </Switch>
      </UserContext.Provider>
    </Router>
  );
}


