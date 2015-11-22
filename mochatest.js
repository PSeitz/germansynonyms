var assert = require("assert");
var chai = require('chai');
var chaiAsPromised = require("chai-as-promised");
chai.use(chaiAsPromised);
var expect = chai.expect;
var syn = require("./germansynonyms.js");

describe('germansynonyms service', function() {

    it('should report Liegeplatz and Ankerplatz as synonym ', function() {
        return expect(syn.isSynonym("Liegeplatz", "Ankerplatz")).to.eventually.be.true;

    });

    it('should report Ankerplatz and Liegeplatz as synonym ', function() {
        return expect(syn.isSynonym("Ankerplatz", "Liegeplatz")).to.eventually.be.true;
    });

    it('should report Giebeldach and Atemwurzel not as synonym ', function() {
        return expect(syn.isSynonym("Giebeldach", "Atemwurzel")).not.to.eventually.be.true;
    });

    it('should contain einschalten in the anschalten synonym list', function() {
        return expect(syn.getAllSynonyms("anschalten")).to.eventually.contain('einschalten')
    });

    it('should handle words not in list', function() {
        return expect(syn.isSynonym('blablubb', 'einschalten')).to.eventually.be.false
    });

    it('should handle words not in list 2', function() {
        return expect(syn.getAllSynonyms('blablubb')).to.eventually.be.empty;
    });

    it('should return a random synonym', function(done) {
        syn.getRandomSynonym("anschalten").then(function(synonym){
            console.log("anschalten:"+synonym);
            done();
        });
        
    });

});