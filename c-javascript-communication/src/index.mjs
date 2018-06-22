
import LoadEmscripten from './LoadEmscripten.mjs';

self.addEventListener('message', event => {
  LoadEmscripten(event.data, cspace => {
    self.postMessage(cspace._add_values(11, 22));
  });
});

