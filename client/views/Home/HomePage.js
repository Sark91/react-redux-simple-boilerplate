import React from 'react';
import { asyncConnect } from 'redux-async-connect';
import { connect } from 'react-redux';
import { registerRoute } from 'client/routes';
import { newGame, procCell, flagCell } from 'client/reducers/actions/game';
import MinesGameField from 'common/MinesGame/MinesGameField';

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
    flagCell: (...args) => dispatch(flagCell(...args)),
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

  handleRightClickCell = (row, col, e) => {
    console.log('HomePage.handleRightClickCell', {row, col});
    e.preventDefault();
    this.props.flagCell(row, col);
  };

  getColor(value) {
    switch (parseInt(value)) {
      case 1: return 'blue';
      case 2: return 'green';
      case 3: return 'yellow';
      default: return 'red';
    }
  }

  getText(cell) {
    if (cell.isValueVisible()) {
      return cell.value || '\u00A0';
    }
    else if (cell.isFlag()) {
      return <span style={{color: 'pink'}}>{'\u2691'}</span>;
    }

    return '?'
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
              color: (cell.isValueVisible() && cell.value > 0) ? this.getColor(cell.value) : 'white',
              fontWeight: (cell.isValueVisible() && cell.value > 0) ? 900 : 100,
              fontSize: '12px',
            }}
            key={`game-map--row-${rowIndex}--col-${colIndex}`}
            onClick={this.handleClickCell.bind(this, rowIndex, colIndex)}
            onContextMenu={this.handleRightClickCell.bind(this, rowIndex, colIndex)}
          >{this.getText(cell)}</button>
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