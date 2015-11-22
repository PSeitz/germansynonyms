var syn = require("./germansynonyms.js");
var Promise = require("bluebird");


console.time('Duration');

var req = [];

for (var i = 0; i < 10000; i++) {
	req.push(syn.getAllSynonyms("Liegeplatz"));
}

Promise.all(req).then(function() {
    console.timeEnd('Duration');
});

console.timeEnd('Duration');
