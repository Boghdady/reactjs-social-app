import Axios from 'axios';
import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useImmerReducer } from 'use-immer';

import About from './components/About';
import CreatePost from './components/CreatePost';
import EditPost from './components/EditPost';
import FlashMessages from './components/FlashMessages';
import Footer from './components/Footer';
import Header from './components/Header';
import Home from './components/Home';
import HomeGuest from './components/HomeGuest';
import NotFound from './components/NotFound';
import Profile from './components/Profile';
import Terms from './components/Terms';
import ViewSinglePost from './components/ViewSinglePost';
import DispatchContext from './DispatchContext';
import StateContext from './StateContext';

Axios.defaults.baseURL = 'http://localhost:8080';

// 1) Context : Help us to share our data throuth out app
// 2) Reducer : Help us to keep logic in a centeral location
// 3) Immer : Give us a copy of state (draft) that we free to modify on it

function Main() {
  const initState = {
    isLoggedIn: Boolean(localStorage.getItem('token')),
    flashMessages: [],
    user: {
      token: localStorage.getItem('token'),
      username: localStorage.getItem('username'),
      avatar: localStorage.getItem('avatar'),
    },
  };

  function ourReducer(draft, action) {
    switch (action.type) {
      case 'login':
        draft.isLoggedIn = true;
        draft.user = action.data;
        return;
      case 'logout':
        draft.isLoggedIn = false;
        return;
      case 'flashMessages':
        draft.flashMessages.push(action.value);
        return;
    }
  }

  const [state, dispatch] = useImmerReducer(ourReducer, initState);

  // When [isLoggedIn] changed the function in the first arg called
  useEffect(() => {
    if (state.isLoggedIn) {
      localStorage.setItem('token', state.user.token);
      localStorage.setItem('username', state.user.username);
      localStorage.setItem('avatar', state.user.avatar);
    } else {
      localStorage.removeItem('token');
      localStorage.removeItem('username');
      localStorage.removeItem('avatar');
    }
  }, [state.isLoggedIn]);

  return (
    <StateContext.Provider value={state}>
      <DispatchContext.Provider value={dispatch}>
        <BrowserRouter>
          <FlashMessages />
          <Header />
          <Switch>
            <Route path="/profile/:username">
              <Profile />
            </Route>
            <Route path="/" exact>
              {state.isLoggedIn ? <Home /> : <HomeGuest />}
            </Route>
            <Route path="/create-post">
              <CreatePost />
            </Route>
            <Route path="/post/:id" exact>
              <ViewSinglePost />
            </Route>
            <Route path="/post/:id/edit" exact>
              <EditPost />
            </Route>
            <Route path="/about-us">
              <About />
            </Route>
            <Route path="/terms">
              <Terms />
            </Route>
            <Route>
              <NotFound />
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
