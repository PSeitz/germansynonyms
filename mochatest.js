var assert = require("assert");
var expect = require('chai').expect;
var syn = require("./germansynonyms.js");

describe('germansynonyms service', function() {

	it('should report Liegeplatz and Ankerplatz as synonym ', function() {
		expect(syn.isSynonym("Liegeplatz", "Ankerplatz")).to.be.true;
	});

	it('should report Giebeldach and Atemwurzel not as synonym ', function() {
		expect(syn.isSynonym("Giebeldach", "Atemwurzel")).not.to.be.true;
	});

	it('should contain einschalten in the anschalten synonym list', function() {
		var synonyms = syn.getAllSynonyms("anschalten");
		expect(synonyms).to.contain('einschalten');
	});

	it('should handle words not in list', function() {
		var synonyms = syn.isSynonym('blablubb', 'einschalten');
		expect(synonyms).to.be.false;

		var allSynonyms = syn.getAllSynonyms('blablubb');
		expect(allSynonyms).to.be.empty;
	});

});