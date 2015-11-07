var http = require("http");
var cheerio = require('cheerio');

function getPoem(url, callback) {
    http.get(url, function (res) {
        var poem = {};
        var data = '';
        res.on("data", function (chunk) {
            data += chunk;
        });
        res.on('end', function () {
            var $ = cheerio.load(data);
            poem.title = $('.Siir_baslik').text();
            poem.text = $('.Siir_metin').text();
            callback(poem);
        });
    }).on("error", function (e) {
        console.log("Got error: " + e.message);
    });
}

function getAllPoemLinkOfPoet(poetLink, callback, pagenumber) {
    pagenumber = pagenumber || 1;
    http.get(poetLink + 'siirleri/ara-/sirala-/sayfa-' + pagenumber + '/', function (res) {
        var data = '';
        res.on("data", function (chunk) {
            data += chunk;
        });
        res.on('end', function () {
            var $ = cheerio.load(data);
            var poemLinks = $('.liste_border a').not('.liste_baslik .liste_border');
            if (poemLinks.length > 0) {
                getAllPoemLinkOfPoet(poetLink, callback, ++pagenumber);
                poemLinks.each(
                    function () {
                        callback('http://www.antoloji.com' + $(this).attr('href'));
                    });
            }
        });
    }).on("error", function (e) {
        console.log("Got error: " + e.message);
    });
}

function getAllPoemOfPoet(poetLink, callback) {
    getAllPoemLinkOfPoet(poetLink, function (link) {
        getPoem(link, function (poem) {
            callback(poem);
        });
    });
}

exports.getAllPoemLinkOfPoet = getAllPoemLinkOfPoet;
exports.getPoem = getPoem;
exports.getAllPoemOfPoet = getAllPoemOfPoet; 