import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import React, {useState} from 'react';
import Home from './pages/Home.jsx';
import Nav from './components/Nav/Nav.jsx';
import Footer from './components/Footer/Footer.jsx'
import './App.css';

function About() {
  return <p>About Page</p>
}

function Page404() {
  return <h1>Page Not Found</h1>
}

function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <div>
      <Router>
        <div>
          <Nav isLoggedIn={isLoggedIn}/>
          <Switch>
            <Route exact path='/' component={Home} />
            <Route exact path='/about' component={About} />
            <Route component={Page404}/>
          </Switch>
        </div>
          <Footer />
      </Router>
    </div>


  );
}

export default App;
