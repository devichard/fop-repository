import React, { Component } from 'react';
import Feed from './components/feed';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
        feed:[
          {id:1, username: 'Arthur', curtidas:126, comentarios:6},
          {id:2, username: 'Mariana', curtidas:342, comentarios:23},
          {id:3, username: 'Thiago', curtidas:600, comentarios:54},
          {id:4, username: 'Inngrid', curtidas:1, comentarios:0},
        ]
    };
  }

  render() {
    return (
      <div>
       
      {this.state.feed.map((item)=>{
        return(
          <Feed id={item.id} username={item.username}
          curtidas={item.curtidas} comentarios={item.comentarios} />
        );
      })}

      </div>
    );
  }
}




export default App;