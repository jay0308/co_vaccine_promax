const webViewInterface = {
    testMessage:(data) => {
        let obj = {
            "type":"testMessage",
            "data":data
        }
        // window.postMessage = function(data) {
        //     window.__REACT_WEB_VIEW_BRIDGE.postMessage(JSON.stringify(obj));
        // };
        // window.postMessage(JSON.stringify(obj))
        window.postMessage(JSON.stringify(obj));
       
    }

}

function awaitPostMessage() {
    console.log("AAAALERTTTTTTT")
    let isReactNativePostMessageReady = !!window.originalPostMessage;
    const queue = [];
    let currentPostMessageFn = function store(message) {
      if (queue.length > 100) queue.shift();
      queue.push(message);
    };
    if (!isReactNativePostMessageReady) {
      // const originalPostMessage = window.postMessage;
      Object.defineProperty(window, 'postMessage', {
        configurable: true,
        enumerable: true,
        get() {
          return currentPostMessageFn;
        },
        set(fn) {
          currentPostMessageFn = fn;
          isReactNativePostMessageReady = true;
          setTimeout(sendQueue, 0);
        }
      });
    }
  
    function sendQueue() {
      while (queue.length > 0) window.postMessage(queue.shift());
    }
  }

  awaitPostMessage(); 

export default webViewInterface;