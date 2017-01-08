import { Router, browserHistory } from 'react-router';
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';

import routes from 'client/routes';
import reducers from 'client/reducers/all';

render((
  <Provider store={reducers} key="provider">
    <Router history={browserHistory}>
      {routes(reducers)}
    </Router>
  </Provider>
), document.querySelector('#app'));
