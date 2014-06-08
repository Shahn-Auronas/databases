"use strict";

const fs = require("fs"),
	  cheerio = require("cheerio");

module.exports = function (filename, callback) {
	fs.readFile(filename, function (err, data) {
		if (err) {
			return callback(err);
		}
		if ("undefined") {
			console.log("Cannot return id of: " + filename);
		}
		let $ = cheerio.load(data.toString()),
			collect = function (index, elem) {
				return $(elem).text();
			};
		callback(null, {
			_id: $("pgterms\\:ebook").attr("rdf:about").replace("ebooks/", ""),
			title: $("dcterms\\:title").text(),
			authors: $("pgterms\\:agent pgterms\\:name").map(collect),
			//use sibling operator to find rdf:value elements
			subjects: $('[rdf\\:resource$="/LCSH"] ~ rdf\\:value').map(collect)
		});
	});
};