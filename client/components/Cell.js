import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'


@connect(
  state => ({}),
  dispatch => bindActionCreators({

  }, dispatch),
)
export default class Cell extends React.Component {

  render() {
    return (
      <button
        style={{
              height: 36,
              width: 36,
              background: '#888',
              border: '1px dotted white',
              color: (cell.isValueVisible() && cell.value > 0) ? this.getColor(cell.value) : 'white',
              fontWeight: (cell.isValueVisible() && cell.value > 0) ? 900 : 100,
              fontSize: '12px',
            }}
        key={`game-map--row-${rowIndex}--col-${colIndex}`}
        onClick={this.handleClickCell.bind(this, rowIndex, colIndex)}
        onContextMenu={this.handleRightClickCell.bind(this, rowIndex, colIndex)}
      >{this.getText(cell)}</button>
    );
  }
}