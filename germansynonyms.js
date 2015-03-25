var fs = require("fs");

var thesaurus_raw = fs.readFileSync("openthesaurus.txt", "utf8");
var thesaurus = thesaurus_raw.split("\n");

thesaurus.splice(0,18);

for (var i = 0; i < thesaurus.length; i++) {
    thesaurus[i] = thesaurus[i].split(";");
}

var allWords = [];

for (var i = 0; i < thesaurus.length; i++) {
    var line = thesaurus[i];
    for (var j = 0; j < line.length; j++) {
        line[j] = line[j].replace(/ *\([^)]*\) */g, "");
        line[j] = line[j].trim();
        line[j] = line[j].toLowerCase();
        // allWords.push(line[j]);

        allWords.push({
            word: line[j],
            line: line
        });
    }
}

function binary_wordlist_search(arr, ele) {
    ele = ele.toLowerCase();
    var beginning = 0;
    var end = arr.length;
    var target;
    while (end !== beginning) {
        target = ((beginning + end) >> 1);
        if ((target === end || target === beginning) && arr[target].word !== ele) {
            return -1;
        }
        var comp = ele.localeCompare(arr[target].word);
        console.log(target +":"+ beginning +":"  +arr[target].word +":"+comp);

        if (comp < 0) {
            end = target;
        } else if (comp >= 0) {
            beginning = target;
        }
    }
    return target;
}

function lowerBound(arr, ele)
{
    var mid;
    var half;
    var beginning = 0;
    var len = arr.length;

    while(len> 0)
    {
        half   = len>> 1;
        mid = beginning;
        mid += half;
        var comp = ele.localeCompare(arr[mid].word);
        if(comp < arr[mid])
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


// function ASM_Module(stdlib, foreign, buffer){
//     "use asm";

//     function lowerBound_asm(arr, ele)
//     {
//         ele = ele|0;
//         var mid = 0|0;
//         var half = 0|0;
//         var beginning = 0|0;
//         var len = arr.length|0;

//         while(len|0> 0)
//         {
//             half   = (len|0)>> 1|0;
//             mid = beginning|0;
//             mid += half|0;
//             // ltt::advance(mid, half);
//             // var comp = (ele.localeCompare(arr[mid].word))|0;
//             if((ele|0) > (arr[mid]|0))
//             {
//                 beginning= mid|0;
//                 ++beginning|0;
//                 len-= ((half|0)+ 1|0);
//             }
//             else
//                 len= half|0;
//         }
//         // ele.localeCompare();
//         return beginning|0;
//     }
//     return { lowerBound_asm: lowerBound_asm };
// }





allWords.sort(function(a, b) {
    return a.word.localeCompare(b.word);
});

// console.log(allWords[500]);
// console.log(allWords[501]);

var service = {};

function getSynonymGroups(word){
    word.toLowerCase();
    var lines = [];
    for (var i = 0; i < allWords.length; i++) {
        if(allWords[i].word == word) lines.push(allWords[i].lines);
    }
    return lines;
}

function isSynonym(word1, word2){
    var groups = getSynonymGroups(word1);
    for (var i = 0; i < groups.length; i++) {
        var group = groups[i];
        for (var j = 0; j < group.length; j++) {
            var groupWord = group[j];
            if(groupWord == word2) return true;
        }
    }
    return false;
}
console.time('Check');
isSynonym("word1", "word2");

console.timeEnd('Check');

service.getSynonymGroups = getSynonymGroups;
service.isSynonym = isSynonym;

console.time('binary');
var position = lowerBound(allWords, "exposee");
console.timeEnd('binary');

console.log(allWords[position]);


console.log(allWords[position-1]);

console.log(allWords[position+1]);

console.log(allWords[position+2]);










