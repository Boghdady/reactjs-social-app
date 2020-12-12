import React from 'react';

function HeaderLoggedIn(props) {
  function handleLoggedOut() {
    props.setIsLoggedIn(false);
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    localStorage.removeItem('avatar');
  }

  return (
    <div className="flex-row my-3 my-md-0">
      <a href="#" className="text-white mr-2 header-search-icon">
        <i className="fas fa-search" />
      </a>
      <span className="mr-2 header-chat-icon text-white">
        <i className="fas fa-comment" />
        <span className="chat-count-badge text-white"> </span>
      </span>
      <a href="#" className="mr-2">
        <img
          className="small-header-avatar"
          src="https://en.gravatar.com/userimage/99340211/9eed838f80f9f210e2b81da61be538be.jpg"
        />
      </a>
      <a className="btn btn-sm btn-success mr-2" href="/create-post">
        Create Post
      </a>
      <button onClick={handleLoggedOut} className="btn btn-sm btn-secondary">
        Sign Out
      </button>
    </div>
  );
}

export default HeaderLoggedIn;
