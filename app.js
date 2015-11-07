var ant = require('./AntolojiContext');

//ant.getPoem('http://www.antoloji.com/balkon-siiri/', function (poem) {
//    console.log('');
//    console.log(poem.title);
//    console.log('------------------------------------------');
//    console.log(poem.text);
//});

//ant.getAllPoemLinkOfPoet('http://www.antoloji.com/necip-fazil-kisakurek/', function(link) {
//    console.log(link);
//});

ant.getAllPoemOfPoet('http://www.antoloji.com/necip-fazil-kisakurek/', function (poem) {
    console.log();
    console.log(poem.title);
    console.log('========================================');
    console.log(poem.text);
});