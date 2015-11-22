var fs = require('fs');
var Promise = require("bluebird");

var sqlite3 = require('sqlite3');
var _ = require('lodash');

var db = new sqlite3.Database('germ_syn.sqlite', sqlite3.OPEN_READONLY, function (err) {
    if(err) throw err;
});

var dbPromise = Promise.promisifyAll(db);

function createDb(overwrite){
    var exists = fs.existsSync('germ_syn.sqlite');
    if (overwrite || !exists)
        require("./create_sqlite");
}

var query = "SELECT word2 FROM mapping WHERE word1 = ?";
var stmt = db.prepare(query);
var stmtPromise = Promise.promisifyAll(stmt);
var args = new Array(1);
function getAllSynonyms(word){
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

module.exports = service;