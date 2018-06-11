let ttest = require('./dist/index.js');

ttest.default({'asm.js': false}, cspace => {
  console.log(cspace._add_values(33, 55));
});

