import React from 'react';
import ReactDOM from 'react-dom';

function ExampleComponent() {
  return (
    <div>
      <h1>This is our app!!!!</h1>
      <p>The sky is bluess.</p>
      <h3>Welcome to reactjs</h3>
    </div>
  );
}

// Render our app
ReactDOM.render(<ExampleComponent/>, document.querySelector('#app'));

// I want the brwoser not do refresh i need only load new javascript automatically to the browser
if(module.hot) module.hot.accept();