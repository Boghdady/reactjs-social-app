import Axios from 'axios';
import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useImmer } from 'use-immer';

import DispatchContext from '../DispatchContext';

function Search() {
  const appDispatch = useContext(DispatchContext);

  // useImmer like useState but useImmer take mutable object
  const [state, setState] = useImmer({
    searchTerm: '',
    results: [],
    show: 'neither',
    requestCount: 0,
  });

  useEffect(() => {
    // will listen for any key
    document.addEventListener('keyup', searchKeyPressHandler);
    // clean up
    return () => document.removeEventListener('keyup', searchKeyPressHandler);
  }, []);

  useEffect(() => {
    const delay = setTimeout(() => {
      setState((draft) => {
        draft.requestCount++;
      });
    }, 3000);
    // clenup
    return () => clearTimeout(delay);
  }, [state.searchTerm]);

  useEffect(() => {
    if (state.requestCount) {
      const ourRequest = Axios.CancelToken.source();
      async function fetchResults() {
        try {
          const response = await Axios.post(
            '/search',
            {
              searchTerm: state.searchTerm,
            },
            { cancelToken: ourRequest.token }
          );
          setState((draft) => {
            draft.results = response.data;
          });
        } catch (e) {
          console.log('There is a problem or the request has been cancelled');
        }
      }
      fetchResults();

      return () => ourRequest.cancel();
    }
  }, [state.requestCount]);

  function searchKeyPressHandler(e) {
    if (e.keyCode == 27) {
      appDispatch({ type: 'closeSearch' });
    }
  }

  function handleInput(e) {
    const value = e.target.value;
    setState((draft) => {
      draft.searchTerm = value;
    });
  }

  // react-transition-group
  return (
    <div className="search-overlay">
      <div className="search-overlay-top shadow-sm">
        <div className="container container--narrow">
          <label htmlFor="live-search-field" className="search-overlay-icon">
            <i className="fas fa-search" />
          </label>
          <input
            onChange={handleInput}
            autoFocus
            type="text"
            autoComplete="off"
            id="live-search-field"
            className="live-search-field"
            placeholder="What are you interested in?"
          />
          <span
            onClick={() => appDispatch({ type: 'closeSearch' })}
            className="close-live-search"
          >
            <i className="fas fa-times-circle" />
          </span>
        </div>
      </div>
      <div className="search-overlay-bottom">
        <div className="container container--narrow py-3">
          <div className="live-search-results live-search-results--visible">
            <div className="list-group shadow-sm">
              <div className="list-group-item active">
                <strong>Search Results</strong> ({state.results.length}{' '}
                {state.results.length > 1 ? 'items' : 'item'}
                found)
              </div>
              {state.results.map((post) => {
                const createdDate = new Date(post.createdDate);
                const convertedData = `${
                  createdDate.getFullYear() + 1
                }/ ${createdDate.getMonth()}/ ${createdDate.getDay()}`;
                return (
                  <Link
                    onClick={() => appDispatch({ type: 'closeSearch' })}
                    key={post._id}
                    to={`/post/${post._id}`}
                    className="list-group-item list-group-item-action"
                  >
                    <img className="avatar-tiny" src={post.author.avatar} />
                    {post.author.username}
                    <strong>{post.body}</strong>
                    <span className="text-muted small">
                      {`by ${post.author.username} on ${convertedData}`}{' '}
                    </span>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Search;
