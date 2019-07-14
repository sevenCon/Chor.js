/**
 * Chor.js
 * author:quanlincong
 * date: 2019-07-10
 * Licensed under the MIT license.
 *
 */
(function(global) {
  let Chor = {
    version: '0.0.1'
  };
  let i = -1;

  const normalReg = /(.*?)(?=<%)/; // qlc<%
  const evaluateReg = /<%=(.*?)%>/; // <%= user %>
  const interpolateReg = /<%(.*?)%>/; // <% for(let i=0;length=10;i<length;i++)%>

  Chor.complie = function(str) {
    let sourceMapUrl = `//# sourceURL=Chor[${++i}].js\n\t`;
    let source =
      sourceMapUrl +
      `;return (function (){
          let __s ='';
          let print = function(){ __s += [].join.call(Array.from(arguments).map(item=>{let type = typeof item; return type!=null && type=='object' && JSON.stringify(item) || item; }), '');};
          with (obj) {\n\t` +
      __complie(str, normalReg, evaluateReg, interpolateReg) +
      '}})()';

    function __complie() {
      let coreSource = '';
      let reg = new RegExp(evaluateReg.source + '|' + interpolateReg.source + '|' + normalReg.source, 'g');

      str.replace(reg, function(str, evaluate, interpolate, normal) {
        // normal tag and char, like <li>qlc</li>
        if (normal) {
          coreSource += '__s += \'' + normal + '\'' + ';\n\t';
        }

        // <%= user %>
        if (evaluate) {
          coreSource += '__s += ' + evaluate + ';\n\t';
        }

        // <% for(let i=0;length=10;i<length;i++)%>
        if (interpolate) {
          coreSource += interpolate + ';\n\t';
        }

        return coreSource;
      });

      return coreSource + 'return __s';
    }

    return source;
  };

  Chor.run = function(template, params) {
    return new Function('obj', template).call(null, params);
  };

  if (module && module.exports) {
    module.exports = Chor;
  } else if (typeof window == 'object') {
    window.Chor = Chor;
  }
})();
