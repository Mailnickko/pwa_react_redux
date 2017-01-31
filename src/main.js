// From dependencies
import { render } from 'react-dom';
import React from 'react';
import { Router } from 'react-router';
import injectTapEventPlugin from 'react-tap-event-plugin';
import { Provider } from 'react-redux';

import { store, history } from './store/configureStore';

// From App
import './styles/styles.css';
import rootReducer from './reducers';
import routes from './routes';

injectTapEventPlugin();

if (process.env.NODE_ENV === 'production' && 'serviceWorker' in navigator) {
  // SW will only get registered to set path, so keep it on root to extend benefits
  navigator.serviceWorker.register('../service-worker.js')
    .then(() => console.log('Registered Service Worker'))
    .catch( err => console.log('Error: ', err));
}

const router = (
  <Provider store={store}>
    <Router history={history} >
      {routes}
    </Router>
  </Provider>
);

render(router, document.querySelector('#app'));
