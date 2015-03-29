console.time('Timer Title');
var converter = require("./converter");
var allWords = converter.convert();
var path = require("path");

// var allWords = require(path.join(__dirname, "./allWords.json"));

console.timeEnd('Timer Title');

function getSynonymGroups(word){
    word = word.toLowerCase();
    if (allWords[word]) {
        console.log(allWords[word]);
        return allWords[word];
    }
    return undefined;
}

function getAllSynonyms(word){
    word = word.toLowerCase();
    var lines = getSynonymGroups(word);
    var merged = [];
    merged = merged.concat.apply(merged, lines);
    return merged;
}

function isSynonym(word1, word2){
    word1 = word1.toLowerCase();
    word2 = word2.toLowerCase();
    var lines = getSynonymGroups(word1);
    if (!lines) 
        return false;
    for (var i = 0; i < lines.length; i++) {
        var line = lines[i];
        for (var j = 0; j < line.length; j++) {
            var lineWord = line[j];
            if(lineWord == word2) return true;
        }
    }
    return false;
}

var service = {};
service.allWords = allWords;
service.getSynonymGroups = getSynonymGroups;
service.isSynonym = isSynonym;
service.getAllSynonyms = getAllSynonyms;

module.exports = service;