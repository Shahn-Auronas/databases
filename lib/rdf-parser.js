"use strict";

const fs = require("fs"),
	  cheerio = require("cheerio");

module.exports = function (filename, callback) {
	fs.readFile(filename, function (err, data) {
		if (err) {
			return callback(err);
		}
		let $ = cheerio.load(data.toString(), {
			xmlMode: true
		}),
			//utility method for extracting an array of of text nodes
			//from a set of element nodes
			authorsList = [],
			subjectsList = [],
			collectAuthors = function (index, elem) {
				authorsList.push($(elem).text());
			},
			collectSubjects = function (index, elem) {
				subjectsList.push($(elem).text());
			};
		callback(null, {
			_id: $("pgterms\\:ebook").attr("rdf:about").replace("ebooks/", ""),
			tite: $("dcterms\\:title").text(),
			authors: authorsList,
			//use sibling operator to find rdf:value elements
			subjects: subjectsList
		});
	});
};