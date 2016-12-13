import { Router, browserHistory } from 'react-router';
import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux';
import { ReduxAsyncConnect } from 'redux-async-connect';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import routes from 'client/routes';
import reducers from 'client/reducers/all';

require('react-tap-event-plugin')();

// 4. Render `Router` with ReduxAsyncConnect middleware
render((
  <Provider store={reducers} key="provider">
    <MuiThemeProvider>
      <Router render={(props) => <ReduxAsyncConnect {...props} />} history={browserHistory}>
        {routes(reducers)}
      </Router>
    </MuiThemeProvider>
  </Provider>
), document.querySelector('#app'));
