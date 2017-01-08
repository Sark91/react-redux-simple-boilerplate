import React from 'react';
import {
  Route,
  IndexRoute,
} from 'react-router';
import _ from 'lodash';

const routes = {
  children: {},
};

export const registerRoute = (path, props = {}) => (component) => {
  const _path = path === '/'
      ? './'
      : (`/${path}`)
          .replace(/^\/+/, '/')
          .replace(/\//g, '.');

  const _pathWithChildren = _path
    .split('.')
    .join('.children.')
    .replace(/^\.+/, '')
    .replace(/\.+$/, '');

  if (path) {
    _.set(routes, _pathWithChildren, {
      props,
      component,
      children: _.get(routes, `${_pathWithChildren}.children`) || {},
    });
  } else {
    routes.props = props;
    routes.component = component;
  }

  return component;
};

const returnRouteComponents = (path, props = {}, component = null, children = {}) => {
  if (Object.keys(children).length) {
    return (
      // eslint-disable-next-line react/prop-types
      <Route component={component} path={path} key={props.path || path} {...props}>
        {_.map(children, (child, _path) =>
          returnRouteComponents(_path, child.props, child.component, child.children),
        )}
      </Route>
    );
  }

  return (
    // eslint-disable-next-line react/prop-types
    <Route path={path} key={props.path || path} {...props}>
      <IndexRoute component={component} />
    </Route>
  );
};

export default () => returnRouteComponents('', routes.props, routes.component, routes.children);
