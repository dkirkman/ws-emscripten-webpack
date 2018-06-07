import test from './test.js';
import test_wasm from './test.wasm';

// Same set of tests emscripten uses to work out where it is
const ENVIRONMENT_IS_WEB = typeof window === 'object';
const ENVIRONMENT_IS_WORKER = typeof importScripts === 'function';
const ENVIRONMENT_IS_NODE = typeof process === 'object' && typeof require === 'function' && !ENVIRONMENT_IS_WEB && !ENVIRONMENT_IS_WORKER;

export default function(options) {
  let url_prefix = '';
  if (typeof options === 'object' 
      && options['url_prefix'] !== undefined) {
    url_prefix = options['url_prefix'];
    if (url_prefix.slice(-1) !== '/') url_prefix += '/';
  }

  let module_options = {
    locateFile: function (path) {
      if(path.endsWith('.wasm')) {
        console.log('looking for ' + path);
        if (ENVIRONMENT_IS_NODE) {
          console.log('returing a dirname');
          return (__dirname + '/' + test_wasm);
        } else {
          console.log('returning url ' + (url_prefix + test_wasm));
          return (url_prefix + test_wasm);
        }
      }
      return path;
    }

  };

  return test(module_options);
};


