# Find German Synonyms
Ultra fast lookup for german synonyms. The underlying data is from openthesaurus https://www.openthesaurus.de/

### Install

npm install germansynonyms



## Usage

    var syn = require("./germansynonyms.js");
    
    syn.isSynonym("Liegeplatz", "Ankerplatz");
    var synonyms = syn.getAllSynonyms("anschalten");
    
    console.log(synonyms);

