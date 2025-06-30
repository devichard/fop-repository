import React, { Component } from 'react';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      nome: 'Arthur',
      contador: 0
    };

    this.aumentar = this.aumentar.bind(this);
  }

  aumentar(){
    let state = this.state;
    state.contador += +1;
    this.setState(state)
  }

  diminuir(){
    console.log('Deu bom papai!')
  }

  render() {
    return (
      <div>
        <h2>Contador</h2>
        <h3> <button onClick={this.diminuir}>-</button>
          {this.state.contador}
          <button onClick={this.aumentar}>+</button> </h3>
      </div>
    );
  }
}




export default App;