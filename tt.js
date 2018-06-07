let ttest = require('./dist/index.js');

console.log('ttest = ' + ttest);

for (var key in ttest) {
  console.log('key = ' + key);
}

ttest.default().then((mod) => {
  console.log('we have a mod!');
  console.log(mod._add_values(33, 55));
});

/*
ttest.onRuntimeInitialized = function() {
  console.log('ttest ...');
  let result = ttest._add_values(3, 5);
  console.log('result = ' + result);
};
*/

//console.log('ttest = ' + ttest);

/*
ttest().then( (mod) => {
  console.log('ttest ...');
  let result = mod._add_values(3, 5);
  console.log('result = ' + result);
});
*/
