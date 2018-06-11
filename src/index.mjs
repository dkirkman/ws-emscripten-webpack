
// This little dance is to get __dirname, which isn't exposed in ES6 modules from
// node, but it's needed so I can figure out where the .wasm files are
import expose from './expose.js';
const {__dirname} = expose;

const nodep = typeof process === 'object' && typeof window !== 'object';

let module_options = function(url_prefix) {
  return new Promise(function(resolve, reject) {
    let wasm_name = new Promise(function(resolve, reject) {
      if (nodep) resolve('libTest.wasm');
      else resolve(import(/* webpackChunkName: "wasmName" */ "./libTest.wasm"));
    });
    
    resolve(wasm_name.then(name => {
      if (typeof name == 'object') name = name.default;
      console.log('attempting to use name as a promise ... ');
      console.log(name);
      console.log(typeof name);
      console.log('hhdolow');

      console.log('done trying to use name as a promise ...');
      console.log('name = ' + name);
      console.log(name);
      return {
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
    }));
  });
};

export default function(options, cb) {
  let url_prefix = '';
  if (typeof options === 'object' && options.url_prefix)
    url_prefix = options.url_prefix;
  if (url_prefix.slice(-1) !== '/')
    url_prefix += '/';
  
  if (typeof options === 'object'
      && options['asm.js'] === true) {
    console.log('loading asm.js version of libTest');

    module_options(url_prefix).then(mopts => {
      import(/* webpackChunkName: "libTestAsm" */ 
        './libTestAsm.js').then(module => {
          module.default(mopts).then(cspace => cb(cspace));
        });
    });

  } else {
    // loading webpack
    console.log('loading webpack version of libTest boot boot toot toot');

    module_options(url_prefix).then(mopts => {
      import(/* webpackChunkName: "libTest" */ 
        './libTest.js').then(module => {
        module.default(mopts).then(cspace => cb(cspace));
      });
    });
  }
};


