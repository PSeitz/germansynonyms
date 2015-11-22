var sqlite3 = require('sqlite3');

var converter = require("./converter");
var allWords = converter.convert({smallversion:true});
var _ = require('lodash');

var db = new sqlite3.Database('germ_syn.sqlite');
db.serialize(function() {

    db.run("DROP TABLE IF EXISTS entries");
    db.run("DROP TABLE IF EXISTS connections");
    db.run("DROP TABLE IF EXISTS mapping");

    // db.run("CREATE TABLE entries (id INTEGER PRIMARY KEY, word TEXT NOT NULL UNIQUE collate nocase)");

    // db.run("CREATE TABLE connections (id1 INTEGER, id2 INTEGER)");

    db.run("CREATE TABLE mapping (word1 TEXT NOT NULL collate nocase, word2 TEXT NOT NULL collate nocase, PRIMARY KEY (word1, word2))");

    db.run("CREATE INDEX mapping_index ON mapping(word1, word2)");

    // var allUniqWords =_.uniq(_.flatten(_.map(allWords), true));

    // console.log(allUniqWords[150]);
    // console.log(allWords.length);
    // console.log(allUniqWords.length);

    // insert(db, { table: "entries", data: allUniqWords, tablefields:["word"]});

    // insert(db, { table: "connections", data: allUniqWords, tablefields:["word"]});


    db.run("BEGIN TRANSACTION");
    for(var prop in allWords){
        var name = prop;
        var synonyms = _.flatten(allWords[prop]);
        for (var i = 0; i < synonyms.length; i++) {
            var synonym = synonyms[i];
            // console.log(synonym);
            var argumentos = [name, synonym];
            db.run("INSERT OR IGNORE INTO mapping VALUES (?,?)", argumentos);
        }
    }
    db.run("END");

    // insert(db, {
    //     table: "kanji_conjugations",
    //     tablefields: ["_id", "kanji_id", "form"],
    //     data: data.getAllKanjiWithConjugations(),
    //     properties: ["stem", "form"],
    //     fk: {
    //         "stem": {
    //             table: "kanjis",
    //             field: "_id",
    //             value: "kanji"
    //         }
    //     }
    // });


    // for (var i = 0; i < allUniqWords.length; i++) {
    //     var allUniqWords = allUniqWords[i];

    //     db.run("INSERT ", argumentos);
    // }


});


function insert(db, options){

    db.run("BEGIN TRANSACTION");
    console.time('Db inserts');
    // properties

    var databinding = Array(1);

    // var questionmarks = " ?, ? ";
    if (options.properties) {
        databinding = Array(options.properties.length + 1);
    }
    _.fill(databinding, '?');

    // stmt = db.prepare( "INSERT INTO "+options.table+" VALUES ("+questionmarks+")");
    for (var i = 0; i < options.data.length; i++) {
        var entry = options.data[i];
        var argumentos = [];
        if (options.id_is_position) argumentos.push(i);
        if (options.properties) {
            for (var k = 0; k < options.properties.length; k++) {
                var property = options.properties[k];
                if (options.fk && options.fk[property]) {
                    var value = entry[property];
                    value = value.replace(/'/g, "''");
                    var select = "(SELECT "+options.fk[property].field+" from "+options.fk[property].table+" WHERE "+options.fk[property].value+"='"+value+"')";

                    databinding[k+1] = select;
                }else{
                    argumentos.push(entry[property]);
                }
            } 
        }else{
            argumentos.push(entry);
        }
        
        // (_id, meaning, lang, ent_seq )
        var query;
        if (options.tablefields) query = "INSERT INTO "+options.table + "("+options.tablefields.join(",")+")" +" VALUES ("+databinding.join(",")+")";
        else query = "INSERT INTO "+options.table +" VALUES ("+databinding.join(",")+")";

        if (options.log) console.log(query);
        db.run(query, argumentos);

        // stmt.run.apply(stmt, argumentos);
    }
    // stmt.finalize();
    db.run("END");

    console.timeEnd('Db inserts');
}


db.close();

