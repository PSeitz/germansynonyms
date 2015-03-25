
var converter = require("./converter");
var allWords = converter.convert();

function lowerBound(arr, ele)
{
    ele = ele.toLowerCase();
    var mid;
    var half;
    var beginning = 0;
    var len = arr.length;

    while(len> 0)
    {
        half   = len>> 1;
        mid = beginning;
        mid += half;
        if(ele.localeCompare(arr[mid].word) > 0)
        {
            beginning= mid;
            ++beginning;
            len-= (half+ 1);
        }
        else
            len= half;
    }
    return beginning;
}

function getSynonymGroups(word){
    word = word.toLowerCase();
    var lines = [];
    var position = lowerBound(allWords, word);
    while (allWords[position].word == word) {
        lines.push(allWords[position].line);
        position++;
    }
    return lines;
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
service.getSynonymGroups = getSynonymGroups;
service.isSynonym = isSynonym;
service.getAllSynonyms = getAllSynonyms;

module.exports = service;