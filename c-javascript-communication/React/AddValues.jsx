import React, {Component} from 'react';

class AddValues extends Component {
  constructor(props) {
    super(props);

    this.onclick = this.onclick.bind(this);

    let asmjs = false;
    if (props.asmjs === 'true') asmjs = true;
    this.state = {asmjs: asmjs, result: 'unloaded'};
  }

  onclick() {   
    let worker = new Worker('index.js');
    
    worker.addEventListener('message', event => {
      this.setState({result: event.data});
      worker.terminate();
    });

    let emcc_options = {'asm.js': this.state.asmjs,
                        'url_prefix': './'};
    worker.postMessage(emcc_options);
  }

  render() {
    let result = this.state.result;

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
