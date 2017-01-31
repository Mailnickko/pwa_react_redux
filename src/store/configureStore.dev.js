import { createStore, applyMiddleware, compose } from 'redux';
import { syncHistoryWithStore, routerMiddleware } from 'react-router-redux';
import { browserHistory } from 'react-router';

import rootReducer from '../reducers';
import thunk from 'redux-thunk';

const enhancers = compose(
  window.devToolsExtension ? window.devToolsExtension() : f => f
)
const routingMiddleware = routerMiddleware(browserHistory);

export const store = createStore(rootReducer, compose( applyMiddleware(thunk, routingMiddleware), enhancers));

export const history = syncHistoryWithStore(browserHistory, store);
