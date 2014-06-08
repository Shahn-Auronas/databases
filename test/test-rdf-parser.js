"use strict";

const rdfParser = require("/Users/shahnauronas/databases/lib/rdf-parser.js"),
	  expectedValue = require("./pg1020.json");

exports.testRDFParser = function (test) {
	rdfParser(__dirname + "/pg1020.rdf", function (err, book) {
		test.expect(2);
		test.ifError(err);
		test.deepEqual(book, expectedValue, "book should match expected");
		test.done();
	});
};