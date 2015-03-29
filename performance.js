var syn = require("./germansynonyms.js");


console.time('Duration');

for (var i = 0; i < 10000; i++) {
	syn.getSynonymGroups("Liegeplatz");
}

console.timeEnd('Duration');
