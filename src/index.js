import test from './test.js';
import test_wasm from './test.wasm';

console.log('ok, we have the test');
console.log(test);

const ENVIRONMENT_IS_WEB = typeof window === 'object';
const ENVIRONMENT_IS_WORKER = typeof importScripts === 'function';
const ENVIRONMENT_IS_NODE = typeof process === 'object' && typeof require === 'function' && !ENVIRONMENT_IS_WEB && !ENVIRONMENT_IS_WORKER;

export default function() {
  let options = {
    locateFile: function (path) {
      console.log('hey, totally trying to find file ' + path);
      if(path.endsWith('.wasm')) {
        let url = test_wasm;
        if (ENVIRONMENT_IS_NODE) {
          console.log('setting url !!!');
          console.log('dirname is ' + __dirname + ' : ' + __filename);
          url = __dirname + '/' + test_wasm;
        }
        console.log('booom boom boom, returning ' + path + ' : ' + url);
        return url;
      }
      return path;
    }

  };

  console.log('ok, here I am in the default position');
  return test(options);
};


