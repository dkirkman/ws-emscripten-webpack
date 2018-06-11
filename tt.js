let ttest = require('./dist/index.js');

ttest.default({'asm.js': true}, cspace => {
  console.log(cspace._add_values(33, 55));
});

