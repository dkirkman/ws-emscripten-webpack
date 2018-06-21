import React, {Component} from 'react';

class AddValues extends Component {
  constructor(props) {
    super(props);

    this.onclick = this.onclick.bind(this);

    let asmjs = false;
    if (props.asmjs === 'true') asmjs = true;
    this.state = {asmjs: asmjs};
  }

  onclick() {   
    console.log('hey dude, it\'s me, onclick');
    console.log('hey, worker in place, all fun and games now');

    if (this.state.cspace) return;  // already loaded

    let worker = new Worker('index.js');
    worker.postMessage(12);
    
    worker.addEventListener('message', event => {
      console.log('holy crap, got a message from the worker!');
      console.log(event);
      
    });
  }

  render() {
    let result = 'unloaded';
    if (this.state.cspace) {
      result = this.state.cspace._add_values(12, 11);
    }

    let loadText = "12 + 11 via WebAssembly";
    if (this.state.asmjs) {
      loadText = "12 + 11 via AsmJS";
    }

    return (
      <div style={{width: 400, margin: 'auto', display: 'block'}}>
      <button type="button" onClick={this.onclick}>{loadText}</button>
      <div style={{float: 'right'}}>
      Result = {result} 
      </div>
      </div>
    );
  }
}

export {AddValues};
