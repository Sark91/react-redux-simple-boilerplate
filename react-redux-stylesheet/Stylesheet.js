const React = require('react');
const { connect } = require('react-redux');

class Stylesheet extends React.Component {

  render() {
    return (
      <style type="text/stylesheet">

      </style>
    );
  }
}

Stylesheet.propTypes = {};

module.exports = connect(
  null,
  null
)(Stylesheet);