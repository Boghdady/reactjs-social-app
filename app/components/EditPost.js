import Axios from 'axios';
import React, { useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useImmerReducer } from 'use-immer';

import DispatchContext from '../DispatchContext';
import StateContext from '../StateContext';
import LoadingDotsIcon from './LoadingDotsIcon';
import Page from './Page';

function EditPost() {
  const appState = useContext(StateContext);
  const appDispatch = useContext(DispatchContext);

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
    isPostFetching: true,
    isPostSaved: false,
    id: useParams().id,
    sendCount: 0,
  };

  function ourReducer(draftOfState, action) {
    switch (action.type) {
      case 'fetchPostComplete':
        draftOfState.title.value = action.value.title;
        draftOfState.body.value = action.value.body;
        draftOfState.isPostFetching = false;
        return;
      case 'titleChange':
        draftOfState.title.value = action.value;
        return;
      case 'bodyChange':
        draftOfState.body.value = action.value;
        return;
      case 'submitRequest':
        draftOfState.sendCount++;
        return;
      case 'updateRequestStarted':
        draftOfState.isPostSaved = false;
        return;
      case 'updateRequestFinished':
        draftOfState.isPostSaved = true;
        return;
    }
  }

  const [state, dispatch] = useImmerReducer(ourReducer, InitState);

  function submitHandler(e) {
    e.preventDefault();
    dispatch({ type: 'submitRequest' });
  }

  // Fetch Post data
  useEffect(() => {
    const ourRequest = Axios.CancelToken.source();
    async function fetchPost() {
      try {
        const response = await Axios.get(`/post/${state.id}`, {
          cancelToken: ourRequest.token,
        });
        dispatch({ type: 'fetchPostComplete', value: response.data });
      } catch (err) {
        console.log('There was a problem or the request was cancelled');
      }
    }
    fetchPost();
    return () => {
      ourRequest.cancel();
    };
  }, []);

  // Update post
  useEffect(() => {
    if (state.sendCount) {
      dispatch({ type: 'updateRequestStarted' });
      const ourRequest = Axios.CancelToken.source();
      async function updatePost() {
        try {
          const response = await Axios.post(
            `/post/${state.id}/edit`,
            {
              title: state.title.value,
              body: state.body.value,
              token: appState.user.token,
            },
            { cancelToken: ourRequest.token }
          );
          dispatch({ type: 'updateRequestFinished', value: response.data });
          appDispatch({
            type: 'flashMessage',
            value: 'Post updated successfully',
          });
        } catch (err) {
          console.log('There are a problem or request are canceled');
        }
      }
      updatePost();
      return () => {
        ourRequest.cancel();
      };
    }
  }, [state.sendCount]);

  if (state.isPostFetching) {
    return (
      <Page title="...">
        <LoadingDotsIcon />
      </Page>
    );
  }
  return (
    <Page title="Eidt Post">
      <form onSubmit={submitHandler}>
        <div className="form-group">
          <label htmlFor="post-title" className="text-muted mb-1">
            <small>Title</small>
          </label>
          <input
            autoFocus
            onChange={(e) =>
              dispatch({ type: 'titleChange', value: e.target.value })
            }
            value={state.title.value}
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
            value={state.body.value}
            onChange={(e) =>
              dispatch({ type: 'bodyChange', value: e.target.value })
            }
            name="body"
            id="post-body"
            className="body-content tall-textarea form-control"
            type="text"
            // defaultValue={''}
          />
        </div>
        <button className="btn btn-primary" disabled={state.isPostSaved}>
          Save Updates
        </button>
      </form>
    </Page>
  );
}

export default EditPost;
