import Axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import StateContext from '../StateContext';
import Page from './Page';

function EditPost() {
  const appState = useContext(StateContext);
  const { id } = useParams();
  const [post, setPost] = useState();

  // Fetch Post data
  useEffect(() => {
    const ourRequest = Axios.CancelToken.source();
    async function fetchPost() {
      const response = await Axios.get(`/post/${id}`, {
        cancelToken: ourRequest.token,
      });
      setPost(response.data);
      console.log(response.data);
      // setIsLoading(false);
    }
    fetchPost();
    return () => {
      ourRequest.cancel();
    };
  }, []);
  return (
    <Page title="Eidt Post">
      <form>
        <div className="form-group">
          <label htmlFor="post-title" className="text-muted mb-1">
            <small>Title</small>
          </label>
          <input
            autoFocus
            // value={post.title}
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
            name="body"
            id="post-body"
            className="body-content tall-textarea form-control"
            type="text"
            defaultValue={''}
          />
        </div>
        <button className="btn btn-primary">Save Updates</button>
      </form>
    </Page>
  );
}

export default EditPost;
