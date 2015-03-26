# Find German Synonyms
Ultra fast lookup for german synonyms. Uses binary search to find all synonyms or to check for synonymity. The underlying source is from openthesaurus https://www.openthesaurus.de/

### Install

npm install germansynonyms



## Usage

    var syn = require("./germansynonyms.js");
    
    syn.isSynonym("Liegeplatz", "Ankerplatz");
    var synonyms = syn.getAllSynonyms("anschalten");
    
    console.log(synonyms);

