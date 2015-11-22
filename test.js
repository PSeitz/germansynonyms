
var syn = require("./germansynonyms.js");
// syn.getAllSynonyms("anschalten").then(function(result){
//     console.log(result);
// });

syn.getRandomSynonyms(["Das", "ist", "ein", "Test", "anschalten"]).then(function(result){
    console.log(result);
});



syn.getRandomSynonymSentence("Nett, schöne Funktion. Das mögen ich gut.").then(function(result){
    console.log(result);
});


