import Axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { Link, useParams } from 'react-router-dom';
import ReactTooltip from 'react-tooltip';

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
              to={`/post/${post._id}/edit`}
              data-tip="Edit"
              data-for="edit"
              className="text-primary mr-2"
            >
              <i className="fas fa-edit" />
            </Link>
            <ReactTooltip id="edit" />{' '}
            <Link
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

export default ViewSinglePost;
