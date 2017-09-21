var sinon = require('sinon');
var proxyquire = require('proxyquire');
var express = require('express');
var mongoClient = require('mongodb').MongoClient;
var app= express();
var expect = require('chai').expect;
var Q = require('q');
var callback = sinon.spy();
var MongoMock = require("mongomock");
var dealerCollection = {"dealer":[{"dealerName" : "Usharani Kotyada","type" : "dealer","dealerId" : "d002","Email" : "ukotyada@miraclesoft.com","Password" : "Ukotyada","Phone" : "7660917458","marketSegment" : "Residential","country" : "United States","state" : "Washington"}],
"order":[{
	"customerId" : "110929",
	"dealerId" : "d004",
	"invoiceNo" : "1023805",
	"orderDate" : "08/22/2017",
	"orderId" : "785412",
	"orderType" : "Material",
	"PoNumber" : "243124-3",
	"projectName" : "MARYLAND AVIATION ADMINISTRATION",
	"requestedDate" : "08/30/2017",
	"ShipTo" : [
		{
			"mailingName" : "MARYLAND AVIATION ADMINISTRATION",
			"addressline" : "Fund for UNICEF 125 Maiden Lane, 11th Floor",
			"zipCode" : "NY 10038",
			"state" : "New York",
			"country" : "United States"
		}
	],
	"SoldTo" : [
		{
			"mailingName" : "MARYLAND AVIATION ADMINISTRATION",
			"addressline" : "Fund for UNICEF 125 Maiden Lane, 11th Floor",
			"zipCode" : "NY 10038",
			"state" : "New York",
			"country" : "United States"
		}
	],
	"status" : "Completed"
}], "invoiceDetails":[{
	"invoiceType" : "Credit",
	"invoiceNo" : "1023805",
	"remitTo" : "",
	"lockBoxAddress" : "P.O. Box 743162, Atlanta, GA 30374-3162",
	"phone" : "706.882.1891",
	"swiftBIC" : "BOFAAUS3N",
	"wireTransfer" : "Bank of America Merrill Lynch, 100 West 33rd St., New York NY 10001, RTN # 026009593, Account # 334037101508",
	"ACH" : "Bank of America Merrill Lynch, 100 West 33rd St., New York NY 10001, RTN # 0610000052, Account # 334037101508",
	"invoiceDate" : "06/09/17",
	"blNum" : "",
	"invoiceCode" : "001",
	"customerNum" : "110929",
	"FOB" : "FOB Mill",
	"customerOrder" : "377213",
	"CQR" : "",
	"salesPerson" : "100432    RICHMAN, LINDA",
	"carrier" : "XPO LOGISTICS FREIGHT, INC",
	"freightType" : "Prepay & Add",
	"terms" : "Net 30",
	"taxExmpNum" : "",
	"jobName" : "COLUMBIA-LERNER PIANO LOUNGE",
	"tinNum" : "58-2132517",
	"busNum" : "85882 3461"
}]};
var mongo = new MongoMock(dealerCollection);

var cb = function(err,val)
{
    return val;
};

var request = require('supertest');

var MongoStub = {
    MongoClient:{
        connect: function(err,cb){
            cb(null,mongo);
        }
    
}
    
};
var appStub  = proxyquire("../.././app.js",{'mongodb':MongoStub}); 

describe('Services Test', function () {

    describe('Test Login', function () {


        it('should validate login users', function(done)
        {
           //var result= appStub.post(authenticateCustomer');
           request(appStub).post('/authenticateCustomer').send({Email:'ukotyada@miraclesoft.com',Password:'Ukotyada'})
           .end(function(err,res){
              expect(JSON.parse(res.text).output).to.be.not.null;
              expect(JSON.parse(res.text).output).to.be.an('array');
              done();
           });
        });

        it('should fail for invalid  users', function(done)
        {
           //var result= appStub.post(authenticateCustomer');
           request(appStub).post('/authenticateCustomer').send({Email:'test',Password:'test'})
           .end(function(err,res){
               
              expect(JSON.parse(res.text).output).to.be.empty;
              done();
           });
        });
    });


});