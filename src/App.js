import React from 'react';
import Board from './components/Board';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isGameOver: false, /* isGameOver is a prop*/
      restartGame: false,
    }
  }

  setGameOver() {
    this.setState({isGameOver: true});
  }

  setRestartGame() {
    this.setState({restartGame: true, isGameOver: false});
  }

  render() {
    return <div>
      <h5 style={{marginBottom: '1rem'}}>App Component</h5>
      <Board
        gameOver={() => this.setGameOver()}
        isGameOver={this.state.isGameOver} 
        restart={this.state.restartGame}
      />

      {this.state.isGameOver && (
        <>
          <h5 style={{marginTop: '1rem'}}>Game Over!</h5>
          <button onClick={() => this.setRestartGame()}>Start New Game</button>
        </>
      )}
    </div>
  }
}

export default App;



