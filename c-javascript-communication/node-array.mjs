import ttest from './build/index.mjs';

import fs from 'fs';
import path from 'path';

let filename = path.normalize("./build/libTest.wasm");
let wasmBytes = fs.readFileSync(filename);


function allocCSpaceArray(cSpace, arrayConstructor, ndat) {
  let size = ndat * 8;
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

WebAssembly.compile(wasmBytes).then(wasmModule => {
  function instantiateWasm(info, callback) {
    WebAssembly.instantiate(wasmModule, info).then(instance => {
      callback(instance);
    });

    return {};
  }

  function single_run() {
    ttest({'asm.js': false, instantiateWasm: instantiateWasm}, cspace => {
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
  setTimeout(single_run, 3000);  // load it a second time, but don't reparse
                                 // bytecode.
});




