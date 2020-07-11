import React from 'react';
import './App.css';
import { Board } from './Board';

const userSymbol ='X';
const compSymbol = 'O';

class App extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      board: ['','','','','','','','',''],
      winner: false,
      winResult:''
    }
    this.updateBoard = this.updateBoard.bind(this);
    this.defineWinner = this.defineWinner.bind(this);
  }

  updateBoard(newBoard){
    this.setState({
      board: newBoard
    })
  }

  defineWinner(){
    const winIndices = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ]

    let arr = this.state.board;
    let winner = false;
    winIndices.forEach((el) => {
      if (arr[el[0]] !== '' && arr[el[0]] === arr[el[1]] && arr[el[1]] === arr[el[2]]){
        if(arr[el[0]] === userSymbol){
          this.setState({ winResult: 'You', winner:true})
          winner = true;
        } else if (arr[el[0]] === compSymbol) {
          this.setState({ winResult: 'Computer', winner:true })
          winner = true;
        }
      }
    })
    return winner;
  }

  resetFunction(){
    this.setState({
      board: ['','','','','','','','',''],
      winner: false,
      winResult:''
    })
  }

  render() {
    const youWon = this.state.winResult === 'You';
    const computerWon = this.state.winResult === 'Computer';

    return(
      <div className="App">
        <header className="App-header">
          <h1>Tick, tack, toe</h1>
            <p>User (X) starts. The first one to make three in a line wins.</p>
        </header>

        <div className="board-div">
          <Board winner={this.state.winner} 
                updateBoard={this.updateBoard}
                board={this.state.board}
                defineWinner={this.defineWinner}
          />
          <div className='result-div'>
            {youWon && (
            <p>{this.state.winResult} win!</p> )}
            {computerWon && (
            <p>{this.state.winResult} wins :(</p> )}
          </div>

          <button className="reset" onClick={() => this.resetFunction()}>Reset</button>
        </div>
      </div>
    )
  }
}

export default App;
