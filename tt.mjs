import ttest from './build/index.mjs';

//import ttest from './mod.mjs';
//console.log(ttest(5));

//ttest.default({'asm.js': true}, cspace => {
ttest({'asm.js': false}, cspace => {
  console.log(cspace._add_values(33, 55));
});

