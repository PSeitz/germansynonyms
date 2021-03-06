var fs = require('fs');
var Promise = require("bluebird");
var path = require('path');
var sqlite3 = require('sqlite3');
var _ = require('lodash');

var stmtPromise;
var query = "SELECT word2 FROM mapping WHERE word1 = ?";
var dbPath = path.resolve(__dirname, './germ_syn.sqlite');

function openDb(){
    if (stmtPromise) return;
    var db = new sqlite3.Database(dbPath, sqlite3.OPEN_READONLY, function (err) {
        if(err) throw err;
    });
    var dbPromise = Promise.promisifyAll(db);
    var stmt = db.prepare(query);
    stmtPromise = Promise.promisifyAll(stmt);
}

function createDb(overwrite){
    var exists = fs.existsSync(dbPath);
    if (overwrite || !exists)
        require("./create_sqlite");
}

var args = new Array(1);
function getAllSynonyms(word){
    openDb();
    args[0] = word;
    return stmtPromise.allAsync(args).then(function(result) {
        return _.pluck(result, 'word2');
    }).catch(function(e) {
        console.log("Error in query", e);
    });
}

function getRandomSynonym(word){
    return getAllSynonyms(word).then(function(result) {
        return _.sample(result);
    });
}

function getRandomSynonyms(wordos){
    var words = wordos;

    return Promise.reduce(wordos, function(worders, word, index) {
        return getRandomSynonym(word).then(function(result) {
            words[index] = result?result:word;
            return words;
        });
    }, 0);

}

function getRandomSynonymSentence(sentence){
    var resultSentence = sentence;
    var regex = /(\w|ä|ü|ö|ß)+/g;
    var match = sentence.match(regex);
    var origMatch = sentence.match(regex);
    return getRandomSynonyms(match).then(function (result) {
        for (var i = 0; i < origMatch.length; i++) {
            var word = origMatch[i];
            resultSentence = resultSentence.replace(word, result[i]);
        }
        return resultSentence;
    })

}


function isSynonym(word1, word2){

    return getAllSynonyms(word1).then(function (words) {
        if (!words) return false;
        for (var i = 0; i < words.length; i++) {
            var word = words[i];
            if(word.toLowerCase() == word2.toLowerCase()) return true;
        }
        return false;
    })

}

var service = {};
service.createDb = createDb;
service.isSynonym = isSynonym;
service.getAllSynonyms = getAllSynonyms;
service.getRandomSynonym= getRandomSynonym;
service.getRandomSynonyms= getRandomSynonyms;
service.getRandomSynonymSentence= getRandomSynonymSentence;
module.exports = service;