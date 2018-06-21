/*
import threads from 'threads';
*/
import LoadEmscripten from './LoadEmscripten.mjs';

/*
export default function() {
  const thread = threads.spawn(function(input, done, progress) {
    LoadEmscripten(input, cspace => {
      let sum = cspace._add_values(12, 11);
      done(sum);
    });
  });
  console.log('hey dude, here I am.  FUCK  FUCK FUCK');

  return thread;
}
*/

console.log('HEY HEY HEY HEY HEY');
LoadEmscripten({'asm.js': false, url_prefix: './'}, cspace => {
  console.log('holy crap, cspace');
  console.log(cspace);
  console.log(cspace._add_values(11, 22));
});


/*import Worker from './Worker.worker.js';

function worker() {
  console.log('ok, getting a worker now ... toot');
  return new Worker();
}

export {worker};
*/
