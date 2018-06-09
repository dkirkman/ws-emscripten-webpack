//import libTest from './libTest.js';
import libTest_wasm from './libTest.wasm';
//import libTestAsm from './libTestAsm.js';

// Same set of tests emscripten uses to work out where it is
const ENVIRONMENT_IS_WEB = typeof window === 'object';
const ENVIRONMENT_IS_WORKER = typeof importScripts === 'function';
const ENVIRONMENT_IS_NODE = typeof process === 'object' && typeof require === 'function' && !ENVIRONMENT_IS_WEB && !ENVIRONMENT_IS_WORKER;

export default function(options, cb) {

  let module_options = {
    locateFile: function (path) {
      if(path.endsWith('.wasm')) {
        if (ENVIRONMENT_IS_NODE) {
          return (__dirname + '/' + libTest_wasm);
        } else {
          return (libTest_wasm);
        }
      }
      return path;
    }
  };

  if (typeof options === 'object'
      && options['asm.js'] === true) {
    console.log('loading asm.js version of libTest');

    import(/* webpackChunkName: "libTestAsm" */ 
      './libTestAsm.js').then(module => {
        let cons = module.default ? module.default : module;
        cons(module_options).then(cspace => cb(cspace));
      });

  } else {
    // loading webpack
    console.log('loading webpack version of libTest boot boot toot');

    import(/* webpackChunkName: "libTest" */ 
      './libTest.js').then(module => {
        let cons = module.default ? module.default : module;
        cons(module_options).then(cspace => cb(cspace));
      });
  }
};


