import Axios from 'axios';
import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import About from './components/About';
import CreatePost from './components/CreatePost';
import Footer from './components/Footer';
import Header from './components/Header';
import Home from './components/Home';
import HomeGuest from './components/HomeGuest';
import Terms from './components/Terms';
import ViewSinglePost from './components/ViewSinglePost';

Axios.defaults.baseURL = 'http://localhost:8080';

function Main() {
  const [isLoggedIn, setIsLoggedIn] = useState(
    Boolean(localStorage.getItem('token'))
  );
  return (
    <BrowserRouter>
      <Header isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      <Switch>
        <Route path="/" exact>
          {isLoggedIn ? <Home /> : <HomeGuest />}
        </Route>
        <Route path="/create-post">
          <CreatePost />
        </Route>
        <Route path="/post/:id">
          <ViewSinglePost />
        </Route>
        <Route path="/about-us">
          <About />
        </Route>
        <Route path="/terms">
          <Terms />
        </Route>
      </Switch>
      <Footer />
    </BrowserRouter>
  );
}

// Render our app
ReactDOM.render(<Main />, document.querySelector('#app'));

// I want the brwoser not do refresh i need only load new javascript automatically to the browser
if (module.hot) module.hot.accept();
