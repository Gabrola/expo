const scope = Object.prototype.toString.call(self);
let connections = 0;

// Runs in a SharedWorkerGlobalScope: one worker for all tabs, one `connect` event per tab.
self.onconnect = (event) => {
  connections += 1;
  event.ports[0].postMessage(`${scope}, connection #${connections}`);
};

// Runs only in a DedicatedWorkerGlobalScope, where `postMessage` exists on the global scope.
if (typeof self.postMessage === 'function') {
  self.postMessage(`${scope}, not shared`);
}
