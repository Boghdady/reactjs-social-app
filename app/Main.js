import Axios from 'axios';
import React, { useReducer, useState } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import About from './components/About';
import CreatePost from './components/CreatePost';
import FlashMessages from './components/FlashMessages';
import Footer from './components/Footer';
import Header from './components/Header';
import Home from './components/Home';
import HomeGuest from './components/HomeGuest';
import Terms from './components/Terms';
import ViewSinglePost from './components/ViewSinglePost';
import DispatchContext from './DispatchContext';
import StateContext from './StateContext';

Axios.defaults.baseURL = 'http://localhost:8080';

function Main() {
  const initState = {
    isLoggedIn: Boolean(localStorage.getItem('token')),
    flashMessages: [],
  };

  function ourReducer(state, action) {
    switch (action.type) {
      case 'login':
        return {
          isLoggedIn: true,
          flashMessages: state.flashMessages,
        };
      case 'logout':
        return { isLoggedIn: false, flashMessages: state.flashMessages };
      case 'flashMessages':
        return {
          isLoggedIn: state.isLoggedIn,
          flashMessages: state.flashMessages.concat(action.value),
        };
    }
  }

  const [state, dispatch] = useReducer(ourReducer, initState);

  return (
    <StateContext.Provider value={state}>
      <DispatchContext.Provider value={dispatch}>
        <BrowserRouter>
          <FlashMessages />
          <Header />
          <Switch>
            <Route path="/" exact>
              {state.isLoggedIn ? <Home /> : <HomeGuest />}
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
      </DispatchContext.Provider>
    </StateContext.Provider>
  );
}

// Render our app
ReactDOM.render(<Main />, document.querySelector('#app'));

// I want the brwoser not do refresh i need only load new javascript automatically to the browser
if (module.hot) module.hot.accept();
