import axios from 'axios';
import * as types from './actionTypes';

export function initApp() {
  return {
    type: types.INIT_APP
  }
}

export function updateQuery(query) {
  return {
    type: types.QUERY_UPDATED,
    query
  }
}

export function searchQuery(query) {
  const subreddit = query !== 'new' && query !== 'hot' ? `r/${query}` : query;
  const api = `https://www.reddit.com/${subreddit}.json?limit=10`;
  return dispatch => {
    if ('caches' in window) {
      caches.match(api)
        .then(resp => {
          if (resp) {
            console.log('response found', resp)
            // TODO: Send dispatch with jsonified resp
            // No Reponse given => Response not properly saved in cache
          } else {
            console.log('NO RESPONSE', resp);
          }
        })
    }
    fetch(api)
      .then(resp => resp.json())
      .then(({data}) => dispatch({ type: types.FETCH_QUERY, posts: data.children }))
      .catch(error => dispatch({ type: types.FETCH_ERROR, error }));
  }
}
