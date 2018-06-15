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
    if (this.state.cspace) return;  // already loaded

    let script = document.createElement("script");
    script.type = "text/javascript";
    script.src = 'index.js';
    script.addEventListener('load', (e, f) => {
      window.EmscriptenWebpack.default({'asm.js': this.state.asmjs, 
                                        'url_prefix': './'}, 
                                       cspace => {
                                         this.setState({cspace: cspace});
                                       });
      
    });
    
    document.head.appendChild(script);
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
