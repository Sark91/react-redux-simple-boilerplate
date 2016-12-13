import React from 'react';
import {
  Route,
  IndexRoute,
} from 'react-router';
import _ from 'lodash';

// import HomePage from 'client/views/Home/HomePage';

const routes = {
  children: {},
};

export const registerRoute = (path, props) => (component) => {
  const _path = path
    .replace(/^\/+/, '')
    .replace(/\//g, '.');

  const _pathWithChildren = _path
    .split('.')
    .join('.children.');

  if (_path) {
    _.set(routes, 'children.' + _pathWithChildren, {
      props,
      component,
      children: _.get(routes, 'children.' + _pathWithChildren + '.children') || {},
    });
  } else {
    routes.props = props;
    routes.component = component;
  }

  console.log(routes);
};

const returnRouteComponents = (path, props, component, children) => {
  console.log(Object.keys(children).length ? 'Route' : 'IndexRoute', {path, props, children} );

  if (Object.keys(children).length) {
    return (
      <Route {...props} component={component} path={path} key={path}>
        {_.map(children, (child, _path) => returnRouteComponents(_path, child.props, child.component, child.children))}
      </Route>
    );
  } else {
    return (
      <Route {...props} path={path} key={path}>
        <IndexRoute component={component} />
      </Route>
    );
  }

};

export default (store) => returnRouteComponents('/', routes.props, routes.component, routes.children);