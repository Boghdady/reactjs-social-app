import Axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useImmerReducer } from 'use-immer';

import DispatchContext from '../DispatchContext';
import StateContext from '../StateContext';
import Page from './Page';

function EditPost() {
  const appState = useContext(StateContext);
  const appDispatch = useContext(DispatchContext);

  const [post, setPost] = useState();
  const [isLoading, setIsLoading] = useState(true);

  const InitState = {
    title: {
      value: '',
      hasError: false,
      errorMsg: '',
    },
    body: {
      value: '',
      hasError: false,
      errorMsg: '',
    },
    isFetching: true,
    isPostSaved: false,
    id: useParams().id,
    sendCount: 0,
  };
  function ourReducer(draftOfState, action) {
    switch (action.type) {
      case 'fetchPostComplete':
        return;
    }
  }

  const [state, dispatch] = useImmerReducer(ourReducer, InitState);

  function submitHandler(e) {
    e.preventDefault();
    dispatch('submitRequest');
  }

  // Fetch Post data
  useEffect(() => {
    const ourRequest = Axios.CancelToken.source();
    async function fetchPost() {
      const response = await Axios.get(`/post/${id}`, {
        cancelToken: ourRequest.token,
      });
      setPost(response.data);
      console.log(response.data);
      setPost(response.data);
      setIsLoading(false);
    }
    fetchPost();
    return () => {
      ourRequest.cancel();
    };
  }, []);

  if (isLoading) return <div>Loading.....</div>;
  return (
    <Page title="Eidt Post">
      <form onSubmit={submitHandler}>
        <div className="form-group">
          <label htmlFor="post-title" className="text-muted mb-1">
            <small>Title</small>
          </label>
          <input
            autoFocus
            value={post.title}
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
            value={post.body}
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
