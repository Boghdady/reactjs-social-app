import React from 'react';
import ReactDOM from 'react-dom';

import Header from './components/Footer';
import Footer from './components/Header';

function Main() {
  return (
    <BrowserRouter>
      <Header />
      <Switch>
        <Route path="/" exact>
          <HomeGuest />
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
