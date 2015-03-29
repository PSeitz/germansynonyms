var path = require("path");
var fs = require("fs");
var service = {};
service.convert = function(writeFile) {

    var thesaurus_raw = fs.readFileSync(path.join(__dirname, "./openthesaurus.txt"), "utf8");
    var thesaurus = thesaurus_raw.split("\n");

    thesaurus.splice(0, 18); // comment

    for (var i = 0; i < thesaurus.length; i++) {
        thesaurus[i] = thesaurus[i].split(";");
    }

    var allWords = {};
    for (i = 0; i < thesaurus.length; i++) {
        var line = thesaurus[i];
        for (var j = 0; j < line.length; j++) {
            line[j] = line[j].replace(/ *\([^)]*\) */g, ""); //remove things between parentheses
            line[j] = line[j].trim();
            line[j] = line[j].toLowerCase();
            if (!allWords[line[j]]) {
                allWords[line[j]] = [];
            }
            allWords[line[j]].push(line);
        }
    }
    if (writeFile) {
        fs.writeFile(path.join(__dirname, "./allWords.json"), JSON.stringify(allWords), function(err) {
            if(err) {
                return console.log(err);
            }
            console.log("The file was saved!");
        }); 
    }
    return allWords;

};

module.exports = service;