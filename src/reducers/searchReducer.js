import { QUERY_UPDATED, FETCH_QUERY, FETCH_ERROR } from '../actions/actionTypes';

const defaultPosts = { new:[] };
const storage = localStorage['redditPWAv1'];

const INIT_STATE = {
  query: 'new',
  error: '',
  posts: (storage && JSON.parse(storage)) || defaultPosts
}

function searchReducer (state = INIT_STATE, action) {
  switch(action.type) {
    case QUERY_UPDATED:
      return { ...state, query: action.query };
    case FETCH_QUERY:
      const currentQuery = state.query;
      return { ...state, posts: { ...state.posts, [currentQuery]: action.posts } };
    case FETCH_ERROR:
      return { ...state, error: action.error }
    default:
      return state;
  }
}

export default searchReducer;
