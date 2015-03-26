var path = require("path");
var fs = require("fs");
var service = {};
service.convert = function() {

    var thesaurus_raw = fs.readFileSync(path.join(__dirname, "./openthesaurus.txt"), "utf8");
    var thesaurus = thesaurus_raw.split("\n");

    thesaurus.splice(0, 18); // comment

    for (var i = 0; i < thesaurus.length; i++) {
        thesaurus[i] = thesaurus[i].split(";");
    }

    var allWords = [];
    for (i = 0; i < thesaurus.length; i++) {
        var line = thesaurus[i];
        for (var j = 0; j < line.length; j++) {
            line[j] = line[j].replace(/ *\([^)]*\) */g, "");
            line[j] = line[j].trim();
            line[j] = line[j].toLowerCase();
            allWords.push({
                word: line[j],
                line: line
            });
        }
    }

    

    allWords.sort(function(a, b) {
        return a.word.localeCompare(b.word);
    });

    return allWords;


};

module.exports = service;