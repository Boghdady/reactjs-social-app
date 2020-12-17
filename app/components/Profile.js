import Axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import StateContext from '../StateContext';
import Page from './Page';

function Profile() {
  const appState = useContext(StateContext);
  const { username } = useParams();

  // Init value for profile data before fetching it via network
  const [profileData, setProfileData] = useState({
    profileUsername: '...',
    profileAvatar: '...',
    isFollowing: false,
    counts: {
      followerCount: '',
      followingCount: '',
      postCount: '',
    },
  });

  // [] means Fetch profile data only once
  useEffect(() => {
    async function fetchProfileData() {
      const response = await Axios.post(`/profile/${username}`, {
        token: appState.user.token,
      });

      setProfileData(response.data);
    }
    fetchProfileData();
  }, []);

  return (
    <Page title="Profile">
      <div>
        <h2>
          <img className="avatar-small" src={profileData.profileAvatar} />
          {profileData.profileUsername}
          <button className="btn btn-primary btn-sm ml-2">
            Follow <i className="fas fa-user-plus" />
          </button>
        </h2>
        <div className="profile-nav nav nav-tabs pt-2 mb-4">
          <a href="#" className="active nav-item nav-link">
            Posts: {profileData.counts.postCount}
          </a>
          <a href="#" className="nav-item nav-link">
            Followers: {profileData.counts.followerCount}
          </a>
          <a href="#" className="nav-item nav-link">
            Following: {profileData.counts.followingCount}
          </a>
        </div>
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
          <a href="#" className="list-group-item list-group-item-action">
            <img
              className="avatar-tiny"
              src="https://gravatar.com/avatar/b9408a09298632b5151200f3449434ef?s=128"
            />
            {'{'}' '{'}'}
            <strong>Example Post #2</strong>
            <span className="text-muted small">on 2/10/2020 </span>
          </a>
          <a href="#" className="list-group-item list-group-item-action">
            <img
              className="avatar-tiny"
              src="https://gravatar.com/avatar/b9408a09298632b5151200f3449434ef?s=128"
            />
            {'{'}' '{'}'}
            <strong>Example Post #3</strong>
            <span className="text-muted small">on 2/10/2020 </span>
          </a>
        </div>
      </div>
    </Page>
  );
}

export default Profile;
