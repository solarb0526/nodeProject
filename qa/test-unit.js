/**
 * Created by jihyun on 2017. 1. 14..
 */
var fortune = require('../lib/fortune.js');
var expect = require('chai').expect;

suite('Fortuen cookie tests', function(){
    test('getFortune() should return a fortune', function(){
        expect(typeof fortune.getFortune() === 'string');
    });
});