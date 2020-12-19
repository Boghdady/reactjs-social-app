import Axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

import ContextState from '../StateContext';

function ProfilePosts() {
  const appState = useContext(ContextState);
  const { username } = useParams();

  const [isLoading, setIsloading] = useState(true);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    async function fetchProfilePosts() {
      const response = await Axios.get(`/profile/${username}/posts`, {
        token: appState.user.token,
      });

      setPosts(response.data);
      setIsloading(false);
    }
    fetchProfilePosts();
  }, []);

  if (isLoading) return <div>Loading...</div>;
  return (
    <div className="list-group">
      {posts.map(function (post) {
        console.log(post);
        const createdDate = new Date(post.createdDate);
        const convertedData = `${createdDate.getFullYear()}/ ${createdDate.getMonth()}/ ${createdDate.getDay()}`;
        return (
          <Link
            key={post._id}
            to={`/post/:${post._id}`}
            className="list-group-item list-group-item-action"
          >
            <img
              className="avatar-tiny"
              src="https://gravatar.com/avatar/b9408a09298632b5151200f3449434ef?s=128"
            />
            {post.author.username}
            <strong>post.body</strong>
            <span className="text-muted small">{` on ${convertedData}`} </span>
          </Link>
        );
      })}
    </div>
  );
}

export default ProfilePosts;
