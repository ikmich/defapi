export function sendEvent(eventName, data = {}) {
  window.dispatchEvent(
    new CustomEvent(eventName, {
      detail: data
    })
  );
}


export function observeEvent(eventName, cb) {
  window.addEventListener(eventName, cb);
}
