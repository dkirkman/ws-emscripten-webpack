import loadEmscripten from './build/LoadEmscripten.mjs';

import fs from 'fs';
import path from 'path';

let filename = path.normalize("./build/libTest.wasm");
let wasmBytes = fs.readFileSync(filename);

import {performance} from 'perf_hooks';

function allocCSpaceArray(cSpace, arrayConstructor, ndat) {
  let size = ndat * arrayConstructor.BYTES_PER_ELEMENT;
  let cPtr = cSpace._malloc(size);
  let jsArray = new arrayConstructor(cSpace.HEAPU8.buffer, cPtr, ndat);

  return {cPtr: cPtr, jsArray: jsArray, cSpace: cSpace};
}

function freeCSpaceArray(arr) {
  arr.cSpace._free(arr.cSpace.cPtr);
  arr.cPtr = arr.jsArray = null;
}

function initializeArray(array) {
  let arr = array.jsArray;
  let i = 0;
  for (i=0; i<arr.length; ++i) {
    arr[i] = i;
  }
}

let pre_compile = performance.now();
WebAssembly.compile(wasmBytes).then(wasmModule => {
  let post_compile = performance.now();
  function instantiateWasm(info, callback) {
    let pre_instantiate = performance.now();
    WebAssembly.instantiate(wasmModule, info).then(instance => {
      let post_instantiate = performance.now();
      console.log('compile: ' + (post_compile - pre_compile));
      console.log('instantiate: ' + (post_instantiate - pre_instantiate));
      callback(instance);
    });

    return {};
  }

  function single_run() {
    loadEmscripten({'asm.js': false, instantiateWasm: instantiateWasm}, cspace => {
      let ndat = 100;
      let darr = allocCSpaceArray(cspace, Float64Array, ndat);

      initializeArray(darr);

      cspace._inc_array(darr.cPtr, ndat);
      
      console.log('\n##########################');
      console.log(JSON.stringify(darr.jsArray));
      
      freeCSpaceArray(darr);
    });
  }


  single_run();
//  setTimeout(single_run, 3000);  // load it a second time, but don't reparse
//                                 // bytecode.
});




