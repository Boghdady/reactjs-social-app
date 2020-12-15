import Axios from 'axios';
import React, { useContext, useState } from 'react';

import AppContext from '../AppContext';

function HeaderLoggedOut(props) {
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();

  const { setIsLoggedIn } = useContext(AppContext);

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const response = await Axios.post('/login', {
        username,
        password,
      });
      if (response.data) {
        // Add user data to local storage
        setIsLoggedIn(true);
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('username', response.data.username);
        localStorage.setItem('avatar', response.data.avatar);
      } else {
        console.log('Incorrect email or password');
      }
    } catch (err) {
      console.log(err);
    }
  }
  return (
    <form onSubmit={handleSubmit} className="mb-0 pt-2 pt-md-0">
      <div className="row align-items-center">
        <div className="col-md mr-0 pr-md-0 mb-3 mb-md-0">
          <input
            onChange={(e) => setUsername(e.target.value)}
            name="username"
            className="form-control form-control-sm input-dark"
            type="text"
            placeholder="Username"
            autoComplete="off"
          />
        </div>
        <div className="col-md mr-0 pr-md-0 mb-3 mb-md-0">
          <input
            onChange={(e) => setPassword(e.target.value)}
            name="password"
            className="form-control form-control-sm input-dark"
            type="password"
            placeholder="Password"
          />
        </div>
        <div className="col-md-auto">
          <button className="btn btn-success btn-sm">Sign In</button>
        </div>
      </div>
    </form>
  );
}

export default HeaderLoggedOut;
