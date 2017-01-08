import React, { PropTypes } from 'react';
import { registerRoute } from 'client/routes';

@registerRoute('')
export default class App extends React.Component {
  static propTypes = {
    children: PropTypes.node,
  };

  render() {
    return (
      <div className="App">
        {this.props.children}
      </div>
    );
  }
}
