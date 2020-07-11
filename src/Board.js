import React from 'react';
import './Board.css';

const userSymbol ='X';
const compSymbol = 'O';

export class Board extends React.Component {
  constructor(props) {
    super(props)

    this.setSymbol = this.setSymbol.bind(this);
    this.getComputerChoice = this.getComputerChoice.bind(this);
  }
     
  setSymbol(box) {
    if (this.props.winner){
      return
    }
    if(this.props.board[box] !== ''){
      return;
    }
    const newBoard = [ ...this.props.board ];
    newBoard[box] = userSymbol;
    this.props.updateBoard(newBoard);
    setTimeout(() => this.getComputerChoice(), 100);
  }

  getComputerChoice(){
    if (this.props.defineWinner()) {
      return
    }
    let arr = this.props.board;
    let newArr = [];
    arr.forEach((value, index) => {
      if(value === ''){
        newArr.push(index)
      }
    })
    const randomBoxIndex = Math.floor(Math.random() * newArr.length);
    const randomBox = newArr[randomBoxIndex];
    const newBoard = [ ...this.props.board ];
    newBoard[randomBox] = compSymbol;

    this.props.updateBoard(newBoard);
    this.props.defineWinner();
  }


  render() {
    const cells = [0,1,2,3,4,5,6,7,8].map((id) => (
      <div className="box" key={id} onClick={() => this.setSymbol(id)}>
        {this.props.board[id]}
      </div>
    ));
    return (
    <div id="board">
      {[0,1,2].map((rowNum) => {
        return (
          <div className="row" key={rowNum}>
            {cells.slice(rowNum * 3, rowNum * 3 + 3)}
          </div>
        );  
      })}
    </div>    
    )
  }
}

