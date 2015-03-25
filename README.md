# German synoyms
uses openthesaurus and nodejs to find german synonyms

Ultra fast lookup for german synonyms. Uses binary search to find all synonyms or to check for synonymity.


## Usage

    var syn = require("./germansynonyms.js");
    
    syn.isSynonym("Liegeplatz", "Ankerplatz");
    var synonyms = syn.getAllSynonyms("anschalten");
    
    console.log(synonyms);

