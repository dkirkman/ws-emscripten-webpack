import ttest from './build/index.mjs';

ttest({'asm.js': true}, cspace => {
  console.log('33 + 55 is ' + cspace._add_values(33, 55));
});

