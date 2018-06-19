
// This little dance is to get __dirname, which isn't exposed in ES6 modules from
// node, but it's needed so I can figure out where the .wasm files are
import expose from './expose.js';
const {__dirname} = expose;

const nodep = typeof process === 'object' && typeof window !== 'object';

let module_options = function(options) {
  // translate our options (options) into emscripten options (emccOpts)
  let url_prefix = '';
  if (typeof options === 'object' && options.url_prefix)
    url_prefix = options.url_prefix;
  if (url_prefix.slice(-1) !== '/')
    url_prefix += '/';
  
  return new Promise(function(resolve, reject) {
    let wasm_name = new Promise(function(resolve, reject) {
      if (nodep) resolve('libTest.wasm');
      else resolve(import(/* webpackChunkName: "wasmName" */ "./libTest.wasm"));
    });
    
    resolve(wasm_name.then(name => {
      // name will have resolved to either a string, or a module.  If it's a 
      // module, get the name from .default
      if (typeof name == 'object') name = name.default;

      let emccOpts = {       
        locateFile: function (path) {
          if(path.endsWith('.wasm')) {
            if (nodep) {
              return (__dirname + '/' + name);
            } else {
              return (url_prefix + name);
            }
          }
          return path;
        }
      };

      if (options.instantiateWasm) {
        emccOpts.instantiateWasm = options.instantiateWasm;
      }
      return emccOpts;       
    }));
  });
};

export default function(options, cb) {
  if (typeof options === 'object'
      && options['asm.js'] === true) {
    console.log('loading asm.js version of libTest');

    module_options(options).then(mopts => {
      import(/* webpackChunkName: "libTestAsm" */ 
        './libTestAsm.js').then(module => {
          module.default(mopts).then(cspace => cb(cspace));
        });
    });

  } else {
    // loading webpack
    console.log('loading webpack version of libTest');

    module_options(options).then(mopts => {
      import(/* webpackChunkName: "libTest" */ 
        './libTest.js').then(module => {
        module.default(mopts).then(cspace => cb(cspace));
      });
    });
  }
};
