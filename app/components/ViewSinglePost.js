import Axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

import StateContext from '../StateContext';
import LoadingDotsIcon from './LoadingDotsIcon';
import Page from './Page';

function ViewSinglePost() {
  const appState = useContext(StateContext);

  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [post, setPost] = useState();

  // Fetch Post data
  useEffect(() => {
    async function fetchPost() {
      const response = await Axios.get(`/post/${id}`);
      setPost(response.data);
      setIsLoading(false);
      console.log(response.data);
    }
    fetchPost();
  }, []);

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

  return (
    <Page title={post.title}>
      <div>
        <div className="d-flex justify-content-between">
          <h2>{post.title}</h2>
          <span className="pt-2">
            <Link
              to={`profile/${id}`}
              className="text-primary mr-2"
              title="Edit"
            >
              <i className="fas fa-edit" />
            </Link>
            <a className="delete-post-button text-danger" title="Delete">
              <i className="fas fa-trash" />
            </a>
          </span>
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
          <p>{post.body}</p>
        </div>
      </div>
    </Page>
  );
}

export default ViewSinglePost;
