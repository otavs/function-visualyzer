(this["webpackJsonpfunction-visualyzer"]=this["webpackJsonpfunction-visualyzer"]||[]).push([[0],{34:function(n,e,o){},35:function(n,e,o){"use strict";o.r(e);var t=o(1),r=o.n(t),a=o(20),i=o.n(a),c=o(12),s=o(6),u=o.n(s),d=o(10),f=o(2),m=o(13),l=o(16),w=o(21),g={x:"x",y:"y",t:"t",Pi:"PI",ExponentialE:"E"},h=function(n){try{var e=Object(w.a)(n);console.log(e);var o=v(e);return console.log(o),o}catch(t){console.log(t)}},v=function n(e){if(""===e||null===e||void 0===e)throw new Error("Invalid empty token");if(Array.isArray(e)){var o=e[0];switch(o){case"Parentheses":return"(".concat(n(e[1]),")");case"Add":return"(".concat(e.slice(1).map((function(e){return n(e)})).join(" + "),")");case"Subtract":return"(".concat(n(e[1])," - ").concat(n(e[2]),")");case"Multiply":switch(e[1]){case"\\ln":return e.length<=3?"log(".concat(n(e[2]),")"):"(log(".concat(n(e[2]),") * ").concat(e.slice(3).map((function(e){return n(e)})).join(" * "),")");default:return"(".concat(e.slice(1).map((function(e){return n(e)})).join(" * "),")")}case"Divide":return"(".concat(n(e[1])," / ").concat(n(e[2]),")");case"Sqrt":return"sqrt(".concat(n(e[1]),")");case"Power":return"pow(".concat(n(e[1]),", ").concat(n(e[2]),")");case"Sin":return"sin(".concat(n(e[1]),")");case"Cos":return"cos(".concat(n(e[1]),")");case"Tan":return"tan(".concat(n(e[1]),")");case"Arcsin":return"asin(".concat(n(e[1]),")");case"Arccos":return"acos(".concat(n(e[1]),")");case"Arctan":return"atan(".concat(n(e[1]),")");case"Abs":return"abs(".concat(n(e[1]),")");case"Negate":return"-(".concat(n(e[1]),")");default:throw new Error("Invalid operation token '".concat(o,"'"))}}if("number"==typeof e)return x(e);if("object"==typeof e)return x(e.num);if(e in g)return g[e];throw new Error("Invalid token '".concat(e,"'"))};function x(n){switch((n=n.toString()).indexOf(".")){case-1:return"".concat(n,".0");case n.length-1:return"".concat(n,"0");default:return n}}var p,b={autoCommands:"pi sqrt",autoOperatorNames:"sin cos tan arcsin arccos arctan ln"},j=function(){return"#version 300 es\n\nprecision highp float;\n\nout vec2 texCoord;\n\nvoid main(void) {\n    vec2 u = vec2(float((gl_VertexID & 1) << 2), float((gl_VertexID & 2) << 1));\n    texCoord = u * .5;\n    gl_Position = vec4(u - 1.0, 0, 1);\n}\n"},S=function(n){return"#version 300 es\n\n#define PI 3.1415926535897932384626433832795\n#define E 2.718281828459045235360287471352662\n\nprecision highp float;\n\nuniform vec2 u_mouse;\nuniform vec2 u_resolution;\nuniform float u_time;\n\nin vec2 texCoord;\n\nout vec4 fragmentColor;\n\n#define zoom 10.0\n#define isMouseEnabled false\n\nvec3 hsv2rgb(vec3 c)\n{\n    vec4 K = vec4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0);\n    vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);\n    return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);\n}\n\nfloat f(vec2 p, float t) {\n    float x = p.x;\n    float y = p.y;\n    return ".concat(n,";\n}\n\nvoid main(void) {\n    vec2 p = (gl_FragCoord.xy / u_resolution.xy - .5) * zoom;\n    vec2 mouse = (u_mouse.xy / u_resolution.xy - .5) * zoom;\n    if(!isMouseEnabled)\n        mouse = vec2(0.0, 0.0);\n    p.x *= 1.0 * u_resolution.x / u_resolution.y;\n    mouse.x *= 1.0 * u_resolution.x / u_resolution.y;\n    \n    vec3 color = vec3(f(p - mouse, u_time), 1.0, 1.0);\n    fragmentColor = vec4(hsv2rgb(color), 1.0);\n}\n")},L=o(5);function y(n){var e=n.expression,o=Object(t.useRef)(null);return Object(t.useEffect)((function(){var n=o.current,t=n.getContext("webgl2");t||alert("No WebGL :("),n.width=n.clientWidth,n.height=n.clientHeight,t.viewport(0,0,t.canvas.width,t.canvas.height),window.vertexShader=O(t,t.VERTEX_SHADER,j()),window.fragmentShader=O(t,t.FRAGMENT_SHADER,S(e)),window.program=function(n,e,o){var t=n.createProgram();if(n.attachShader(t,e),n.attachShader(t,o),n.linkProgram(t),n.getProgramParameter(t,n.LINK_STATUS))return t;console.error(n.getProgramInfoLog(t)),n.deleteProgram(t)}(t,window.vertexShader,window.fragmentShader),t.useProgram(window.program),window.resolutionUniformLocation=t.getUniformLocation(window.program,"u_resolution"),t.uniform2f(window.resolutionUniformLocation,t.canvas.width,t.canvas.height),window.mouseUniformLocation=t.getUniformLocation(window.program,"u_mouse"),t.uniform2f(window.mouseUniformLocation,0,0),window.timeUniformLocation=t.getUniformLocation(window.program,"u_time"),t.uniform1f(window.timeUniformLocation,0);var r=Date.now();!function n(){t.uniform1f(window.timeUniformLocation,(Date.now()-r)/1e3),t.drawArrays(t.TRIANGLE_FAN,0,3),requestAnimationFrame(n)}(),window.addEventListener("resize",(function(){n.width=n.clientWidth,n.height=n.clientHeight,t.viewport(0,0,t.canvas.width,t.canvas.height),t.uniform2f(window.resolutionUniformLocation,t.canvas.width,t.canvas.height)})),window.addEventListener("mousemove",(function(e){t.uniform2f(window.mouseUniformLocation,e.x,n.height-e.y,1)}))}),[]),Object(t.useEffect)((function(){var n=o.current.getContext("webgl2");n.detachShader(window.program,window.fragmentShader),n.deleteShader(window.fragmentShader),window.fragmentShader=O(n,n.FRAGMENT_SHADER,S(e)),n.attachShader(window.program,window.fragmentShader),n.linkProgram(window.program),window.resolutionUniformLocation=n.getUniformLocation(window.program,"u_resolution"),n.uniform2f(window.resolutionUniformLocation,n.canvas.width,n.canvas.height),window.mouseUniformLocation=n.getUniformLocation(window.program,"u_mouse"),n.uniform2f(window.mouseUniformLocation,0,0),window.timeUniformLocation=n.getUniformLocation(window.program,"u_time"),n.uniform1f(window.timeUniformLocation,0)}),[e]),Object(L.jsx)(E,{ref:o})}var _,E=m.a.canvas(p||(p=Object(c.a)(["\n    width: 100%;\n    height: 100%;\n    position: absolute;\n    z-index: 0;\n    background-color: aqua;\n"])));function O(n,e,o){var t=n.createShader(e);if(n.shaderSource(t,o),n.compileShader(t),n.getShaderParameter(t,n.COMPILE_STATUS))return t;console.error(n.getShaderInfoLog(t)),n.deleteShader(t)}Object(l.addStyles)();var U="\\frac{\\left(x^2+y^2\\right)}{x}-0.7t",A=h(U),P=function(n){var e=n.setLatex,o=n.setExpression,r=(n.latex,n.expression,Object(t.useState)(!1)),a=Object(f.a)(r,2),i=a[0],c=a[1],s=function(){var n=Object(d.a)(u.a.mark((function n(t){var r;return u.a.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:e(t.latex()),(r=h(t.latex()))&&o(r),c(!r);case 4:case"end":return n.stop()}}),n)})));return function(e){return n.apply(this,arguments)}}();return Object(L.jsx)(L.Fragment,{children:Object(L.jsx)(C,{children:Object(L.jsx)(l.EditableMathField,{latex:U,config:b,onChange:s,style:{fontSize:"20px",width:"200px",margin:"30px 6px 6px 6px",textAlign:"center",backgroundColor:i?"rgba(255, 204, 204, 1)":"rgba(255, 255, 255, 0.9)"}})})})},C=m.a.div(_||(_=Object(c.a)(["\n    position: relative;\n    z-index: 1;\n    /* background-color: red; */\n    display: flex;\n    flex-direction: column;\n    justify-content: center;\n    align-items: center;\n"])));function I(){var n=Object(t.useState)(U),e=Object(f.a)(n,2),o=e[0],r=e[1],a=Object(t.useState)(A),i=Object(f.a)(a,2),c=i[0],s=i[1];return Object(L.jsxs)(L.Fragment,{children:[Object(L.jsx)(y,{expression:c}),Object(L.jsx)(P,{latex:o,setLatex:r,expression:c,setExpression:s})]})}o(34);i.a.render(Object(L.jsx)(r.a.StrictMode,{children:Object(L.jsx)(I,{})}),document.getElementById("root"))}},[[35,1,2]]]);
//# sourceMappingURL=main.15946111.chunk.js.map