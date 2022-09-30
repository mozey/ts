document.addEventListener('DOMContentLoaded', () => {
  const go = new Go(); // Defined in wasm_exec.js
  const WASM_URL = "tinygo.wasm";

  var wasm;

  function init() {
    // Providing the environment object, used in WebAssembly.instantiateStreaming.
    // This part goes after "const go = new Go();" declaration.
    go.importObject.env = {
      'main.add': function (x, y) {
        msg = "adding two numbers:"
        result = x + y;
        log = document.createElement("p")
        log.textContent = msg + " " + String(result)
        document.getElementById("logs").appendChild(log)
        return result
      }
      // TODO Add more functions here...
    }
  }

  function start() {
    // Calling Go from Javascript:
    msg = "multiplied two numbers:"
    result = wasm.exports.multiply(5, 3)
    log = document.createElement("p")
    log.textContent = msg + " " + result
    document.getElementById("logs").appendChild(log)
    console.log(msg, result);
  }

  init();

  // Run the WebAssembly file
  if ('instantiateStreaming' in WebAssembly) {
    WebAssembly.instantiateStreaming(fetch(WASM_URL), go.importObject).then(function (obj) {
      wasm = obj.instance;
      go.run(wasm);
      start();
    })
  } else {
    // Some browsers don't support instantiateStreaming
    fetch(WASM_URL).then(resp =>
      resp.arrayBuffer()
    ).then(bytes =>
      WebAssembly.instantiate(bytes, go.importObject).then(function (obj) {
        wasm = obj.instance;
        go.run(wasm);
        start();
      })
    )
  }
});
