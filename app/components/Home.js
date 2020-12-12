import React from 'react';

import Page from './Page';

function Home() {
  return (
    <Page>
      <div>
        <h2 className="text-center">
          Hello <strong>{localStorage.getItem('username')}</strong>, your feed
          is empty.
        </h2>
        <p className="lead text-muted text-center">
          Your feed displays the latest posts from the people you follow. If you
          don’t have any friends to follow that’s okay; you can use the “Search”
          feature in the top menu bar to find content written by people with
          similar interests and then follow them.
        </p>
      </div>
    </Page>
  );
}

export default Home;
