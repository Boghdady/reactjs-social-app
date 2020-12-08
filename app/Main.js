import React from 'react';
import ReactDOM from 'react-dom';

import Footer from './components/Footer';
import Header from './components/Header';
import HomeGuest from './components/HomeGuest';

function Main() {
  return (
    <>
      <Header />
      <HomeGuest />
      <Footer />
    </>
  );
}

// Render our app
ReactDOM.render(<Main />, document.querySelector('#app'));

// I want the brwoser not do refresh i need only load new javascript automatically to the browser
if (module.hot) module.hot.accept();
