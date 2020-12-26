import Axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { Link, useParams, withRouter } from 'react-router-dom';
import ReactTooltip from 'react-tooltip';

import DispatchContext from '../DispatchContext';
import StateContext from '../StateContext';
import LoadingDotsIcon from './LoadingDotsIcon';
import NotFound from './NotFound';
import Page from './Page';

function ViewSinglePost(props) {
  const appState = useContext(StateContext);
  const appDispatch = useContext(DispatchContext);

  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [post, setPost] = useState();

  // Fetch Post data
  useEffect(() => {
    const ourRequest = Axios.CancelToken.source();
    async function fetchPost() {
      const response = await Axios.get(`/post/${id}`, {
        cancelToken: ourRequest.token,
      });
      setPost(response.data);
      setIsLoading(false);
    }
    fetchPost();
    return () => {
      ourRequest.cancel();
    };
  }, []);

  if (!isLoading && !post) {
    return <NotFound />;
  }

  if (isLoading)
    return (
      <Page title=".....">
        <LoadingDotsIcon />
      </Page>
    );

  const date = new Date(post.createdDate);
  const formattedDate = `${
    date.getFullYear() + 1
  }/${date.getMonth()}/${date.getDay()}`;

  function isOwner() {
    if (appState.isLoggedIn) {
      return appState.user.username === post.author.username;
    }
    return false;
  }

  async function handleDelete() {
    const confirmDialog = window.confirm(
      'Are realy want to delele this post ?'
    );
    if (confirmDialog) {
      try {
        const response = await Axios.delete(`/post/${id}`, {
          data: { token: appState.user.token },
        });
        console.log(response.data);
        if (response.data === 'Success') {
          // 1. diplay flash message
          appDispatch({
            type: 'flashMessages',
            value: 'Delete Post successfully 👍',
          });
          // 2. redirect to profile
          props.history.push(`/profile/${appState.user.username}`);
        }
      } catch (err) {
        console.log('There are error: ', err);
      }
    }
  }
  return (
    <Page title={post.title}>
      <div>
        <div className="d-flex justify-content-between">
          <h2>{post.title}</h2>
          {isOwner() && (
            <span className="pt-2">
              <Link
                to={`/post/${post._id}/edit`}
                data-tip="Edit"
                data-for="edit"
                className="text-primary mr-2"
              >
                <i className="fas fa-edit" />
              </Link>
              <ReactTooltip id="edit" />{' '}
              <Link
                onClick={handleDelete}
                to="#"
                data-tip="Delete"
                data-for="delete"
                className="delete-post-button text-danger"
                title="Delete"
              >
                <i className="fas fa-trash" />
              </Link>
              <ReactTooltip id="delete" />
            </span>
          )}
        </div>
        <p className="text-muted small mb-4">
          <Link to={`/profile/${post.author.username}`}>
            <img className="avatar-tiny" src={appState.user.avatar} />
          </Link>
          Posted by{' '}
          <Link to={`/profile/${post.author.username}`}>
            {post.author.username}
          </Link>{' '}
          {`on ${formattedDate}`}
        </p>
        <div className="body-content">
          <div>
            <ReactMarkdown
              source={post.body}
              allowedTypes={[
                'paragraph',
                'strong',
                'emphasis',
                'text',
                'heading',
                'list',
                'listItem',
              ]}
            />
          </div>
        </div>
      </div>
    </Page>
  );
}

export default withRouter(ViewSinglePost);
