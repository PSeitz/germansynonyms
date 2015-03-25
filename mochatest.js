var assert = require("assert");
var expect = require('chai').expect;
var syn = require("./germansynonyms.js");

// Tests For Yamaha RV-775
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


});