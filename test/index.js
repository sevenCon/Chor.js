// import assert from 'assert';
let Chor = require("./Chor.js");
let strs = [
  'start<%= users[0].name %>start-one<% for ( var i = 0; i < users.length; i++ ){ %><li><a href="<%=users[i].name%>"><%=users[i].name%></a></li><% } %><%= users.length %>end'
];

// let c = /(.*?)(?!<%)|<%=(.*?)%>|<%(.*?)%>/.test(strs[0]);
let c = Chor.complie(strs[0]);
console.log(Chor.run(c, { users: [{ name: "qlc" }, { name: "quanlincong" }] }));
// complie(strs, [{ name: 'qlc' }, { name: 'quanlincong' }]);
