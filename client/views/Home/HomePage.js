import React from 'react';
import { connect } from 'react-redux';
import { registerRoute } from 'client/routes';

@registerRoute('/')
@connect(
  null,
  null,
)
class HomePage extends React.Component {

  render() {
    return (
      <div>
        HOMEPAGE
      </div>
    );
  }
}
