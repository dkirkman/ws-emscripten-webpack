import ttest from './build/index.mjs';

ttest({'asm.js': true}, cspace => {
  console.log(cspace._add_values(33, 55));
});

