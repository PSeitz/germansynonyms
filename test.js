
var syn = require("./germansynonyms.js");
syn.getAllSynonyms("anschalten").then(function(result){
    console.log(result);
});