import React from 'react';
import { registerRoute } from 'client/routes';

@registerRoute('*')
export default class NotFoundPage extends React.Component {
  render() {
    return (
      <div>Page not found - 404</div>
    );
  }
}
