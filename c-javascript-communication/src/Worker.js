
console.log('before LoadEmscripten');
//import LoadEmscripten from './LoadEmscripten';

//import expose from './expose.js';

console.log('after LoadEmscripten');

console.log('this is the worker, deal with it');

self.postMessage({foo: 'foo'});
//console.log(LoadEmscripten);

