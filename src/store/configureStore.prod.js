import { createStore, applyMiddleware, compose } from 'redux';
import { syncHistoryWithStore, routerMiddleware } from 'react-router-redux';
import { browserHistory } from 'react-router';

import rootReducer from '../reducers';
import thunk from 'redux-thunk';
import browserCache from '../middlewares/browserCache';

const routingMiddleware = routerMiddleware(browserHistory);

export const store = createStore(rootReducer, compose(applyMiddleware(thunk, routingMiddleware, browserCache('redditPWAv1'))));

export const history = syncHistoryWithStore(browserHistory, store);
