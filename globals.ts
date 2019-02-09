import url from "url";
const randomBytes = require("./randombytes");

global.URL = class URL {
  constructor(inputUrl) {
    return url.parse(inputUrl);
  }
};

if (typeof btoa === "undefined") {
  global.btoa = function(str) {
    return new Buffer(str, "binary").toString("base64");
  };
}

if (typeof atob === "undefined") {
  global.atob = function(b64Encoded) {
    return new Buffer(b64Encoded, "base64").toString("binary");
  };
}

if (window.nacl) {
  window.nacl.setPRNG(function(x, n) {
    var i,
      v = new Uint8Array(n);
    crypto.getRandomValues(v);
    for (i = 0; i < n; i++) x[i] = v[i];
    window.nacl.cleanup(v);
  });
}
