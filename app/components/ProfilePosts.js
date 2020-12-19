import Axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import ContextState from '../StateContext';

function ProfilePosts() {
  const { username } = useParams();
  const appState = useContext(ContextState);

  const [isLoading, setIsloading] = useState(true);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    async function fetchProfilePosts() {
      const response = await Axios.get(`/profile/${username}/posts`, {
        token: appState.user.token,
      });
      setPosts(response.data);
      setIsloading(false);
      console.log(posts);
    }
    fetchProfilePosts();
  }, []);

  if (isLoading) return <div>Loading...</div>;
  return (
    <div className="list-group">
      <a href="#" className="list-group-item list-group-item-action">
        <img
          className="avatar-tiny"
          src="https://gravatar.com/avatar/b9408a09298632b5151200f3449434ef?s=128"
        />
        {'{'}' '{'}'}
        <strong>Example Post #1</strong>
        <span className="text-muted small">on 2/10/2020 </span>
      </a>
    </div>
  );
}

export default ProfilePosts;
