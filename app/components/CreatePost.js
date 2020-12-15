import Axios from 'axios';
import React, { useContext, useState } from 'react';
import { withRouter } from 'react-router-dom';

import DispatchContext from '../DispatchContext';
import Page from './Page';

function CreatePost(props) {
  const [title, setTitle] = useState();
  const [body, setBody] = useState();

  const appDispatch = useContext(DispatchContext);

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const response = await Axios.post('/create-post', {
        title,
        body,
        token: localStorage.getItem('token'),
      });
      // Redirect to view post page
      appDispatch({
        type: 'flashMessages',
        value: 'Congrat 😎 User created successfully',
      });

      props.history.push(`post/${response.data}`);
    } catch (err) {
      console.log(err);
    }
  }
  return (
    <Page title="Create Post">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="post-title" className="text-muted mb-1">
            <small>Title</small>
          </label>
          <input
            autoFocus
            onChange={(e) => setTitle(e.target.value)}
            name="title"
            id="post-title"
            className="form-control form-control-lg form-control-title"
            type="text"
            placeholder=""
            autoComplete="off"
          />
        </div>
        <div className="form-group">
          <label htmlFor="post-body" className="text-muted mb-1 d-block">
            <small>Body Content</small>
          </label>
          <textarea
            onChange={(e) => setBody(e.target.value)}
            name="body"
            id="post-body"
            className="body-content tall-textarea form-control"
            type="text"
            defaultValue={''}
          />
        </div>
        <button className="btn btn-primary">Save New Post</button>
      </form>
    </Page>
  );
}

export default withRouter(CreatePost);
