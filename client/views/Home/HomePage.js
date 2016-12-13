import React from 'react';
import { asyncConnect } from 'redux-async-connect';
import { connect } from 'react-redux';
import { registerRoute } from 'client/routes';
import { newGame, procCell } from 'client/reducers/actions/game';

import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';

@registerRoute('/')
@connect(
  state => ({
    gameMap: state.game.map
  }),
  dispatch => ({
    newGame: (...args) => dispatch(newGame(...args)),
    procCell: (...args) => dispatch(procCell(...args)),
  })
)
class HomePage extends React.Component {

  handleClickStart = () => {
    this.props.newGame(
      this.widthRef.getValue(),
      this.heightRef.getValue(),
      this.minesRef.getValue(),
    );
  };

  handleClickCell = (row, col) => {
    console.log('HomePage.handleClickCell', {row, col});
    this.props.procCell(row, col);
  };

  getColor(value) {
    switch (parseInt(value)) {
      case 1: return 'blue';
      case 2: return 'green';
      case 3: return 'yellow';
      default: return 'red';
    }
  }

  renderMap (gameMap) {
    return gameMap.map((row, rowIndex) => (
      <div key={`game-map--row-${rowIndex}`}>
        {row.map((cell, colIndex) => (
          <button
            style={{
              height: 36,
              width: 36,
              background: '#888',
              border: '1px dotted white',
              color: (cell.visible && cell.value > 0) ? this.getColor(cell.value) : 'white',
              fontWeight: (cell.visible && cell.value > 0) ? 900 : 100
            }}
            key={`game-map--row-${rowIndex}--col-${colIndex}`}
            onClick={this.handleClickCell.bind(this, rowIndex, colIndex)}
          >{cell.visible ? (cell.value || '\u00A0') : '?'}</button>
        ))}
      </div>
    ));
  }

  render() {
    return (
      <div>
        <div>
          <TextField hintText="Width" ref={width => this.widthRef = width} defaultValue="10" />
          <TextField hintText="Height" ref={height => this.heightRef = height} defaultValue="10" />
          <TextField hintText="Mines" ref={mines => this.minesRef = mines} defaultValue="10" />
          <FlatButton label="Start" onClick={this.handleClickStart} />
        </div>
        <div>
          {this.renderMap(this.props.gameMap)}
        </div>
      </div>
    );
  }
};