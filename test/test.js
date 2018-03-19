var expect = require("chai").expect;
var app = require("../server.js");

// test get_adtype_breakdown()
describe("Reads an array of ad types and returns an object with the total number of each ad type", function() {
  it("Returns { classic: 1, standout: 1, premium: 1 } when the input is [ 'classic', 'standout', 'premium' ]", function() {
    let input = [ 'classic', 'standout', 'premium' ];
    let result = { classic: 1, standout: 1, premium: 1 };
    expect(app.get_adtype_breakdown(input)).to.deep.equal(result);
  });

  it("Returns { classic: 2, standout: 0, premium: 3 } when the input is [ 'classic', 'classic', 'premium', 'premium', 'premium' ]", function() {
    let input = [ 'classic', 'classic', 'premium', 'premium', 'premium' ];
    let result = { classic: 2, standout: 0, premium: 3 };
    expect(app.get_adtype_breakdown(input)).to.deep.equal(result);
  });

  it("Returns { classic: 1, standout: 4, premium: 2 } when the input is [ 'classic', 'standout', 'standout', 'standout', 'standout', 'premium', 'premium' ]", function() {
    let input =  [ 'classic', 'standout', 'standout', 'standout', 'standout', 'premium', 'premium' ];
    let result = { classic: 1, standout: 4, premium: 2 };
    expect(app.get_adtype_breakdown(input)).to.deep.equal(result);
  });
})

// test get_default_total()
describe("Returns the checkout total based on the default ad pricing", function() {
  it("Returns 269.99 when the input is [ 'classic' ]", function () {
    let input = [ 'classic' ];
    let result = 269.99;
    expect(app.get_default_total(input)).to.equal(result);
  });

  it("Returns 322.99 when the input is [ 'standout' ]", function () {
    let input = [ 'standout' ];
    let result = 322.99;
    expect(app.get_default_total(input)).to.equal(result);
  });

  it("Returns 394.99 when the input is [ 'premium' ]", function () {
    let input = [ 'premium' ];
    let result = 394.99;
    expect(app.get_default_total(input)).to.equal(result);
  });

  it("Returns 987.97 when the input is [ 'classic', 'standout', 'premium' ]", function () {
    let input = [ 'classic', 'standout', 'premium' ];
    let result = 987.97;
    expect(app.get_default_total(input)).to.equal(result);
  });

  it("Returns 2047.94 when the input is [ 'classic', 'classic', 'standout', 'premium', 'premium', 'premium' ]", function () {
    let input = [ 'classic', 'classic', 'standout', 'premium', 'premium', 'premium' ];
    let result = 2047.94;
    expect(app.get_default_total(input)).to.equal(result);
  });
});

// test get_unilever_total()
describe("Returns the checkout total based on Unilever's ad pricing", function() {
  it("Returns 934.97 when the input is [ 'classic', 'classic', 'classic', 'premium' ]", function () {
    let input = [ 'classic', 'classic', 'classic', 'premium' ];
    let result = 934.97;
    expect(app.get_unilever_total(input)).to.equal(result);
  });
});

// test get_apple_total()
describe("Returns the checkout total based on Apple's ad pricing", function() {
  it("Returns 1294.96 when the input is [ 'standout', 'standout', 'standout', 'premium' ]", function () {
    let input = [ 'standout', 'standout', 'standout', 'premium' ];
    let result = 1294.96;
    expect(app.get_apple_total(input)).to.equal(result);
  });
});

// test get_nike_total()
describe("Returns the checkout total based on Nike's ad pricing", function() {
  it("Returns 1519.96 when the input is [ 'premium', 'premium', 'premium', 'premium' ]", function () {
    let input = [ 'premium', 'premium', 'premium', 'premium' ];
    let result = 1519.96;
    expect(app.get_nike_total(input)).to.equal(result);
  });
});

// test get_ford_total()
describe("Returns the checkout total based on Ford's ad pricing", function() {
  it("Returns 2559.92 when the input is [ 'classic', 'classic', 'classic', 'classic', 'classic', 'standout', 'premium', 'premium', 'premium' ]", function () {
    let input = [ 'classic', 'classic', 'classic', 'classic', 'classic', 'standout', 'premium', 'premium', 'premium' ];
    let result = 2559.92;
    expect(app.get_ford_total(input)).to.equal(result);
  });
});

// test get_total()
describe("Returns the checkout total based on given customer's ad pricing", function() {
  it("Returns 987.97 when the customer is 'default' and the ad types are 'classic', 'standout', 'premium'", function () {
    let customer = 'default';
    let adtypes = [ 'classic', 'standout', 'premium' ];
    let result = 987.97;
    expect(app.get_total(customer, adtypes)).to.equal(result);
  });

  it("Returns 934.97 when the customer is 'Unilever' and the ad types are 'classic', 'classic', 'classic', 'premium'", function () {
    let customer = 'Unilever';
    let adtypes = [ 'classic', 'classic', 'classic', 'premium' ];
    let result = 934.97;
    expect(app.get_total(customer, adtypes)).to.equal(result);
  });

  it("Returns 1294.96 when the customer is 'Apple' and the ad types are 'standout', 'standout', 'standout', 'premium'", function () {
    let customer = 'Apple';
    let adtypes = [ 'standout', 'standout', 'standout', 'premium' ];
    let result = 1294.96;
    expect(app.get_total(customer, adtypes)).to.equal(result);
  });

  it("Returns 1519.96 when the customer is 'Nike' and the ad types are 'premium', 'premium', 'premium', 'premium'", function () {
    let customer = 'Nike';
    let adtypes = [ 'premium', 'premium', 'premium', 'premium' ];
    let result = 1519.96;
    expect(app.get_total(customer, adtypes)).to.equal(result);
  });

  it("Returns 2559.92 when the customer is 'Ford' and the ad types are 'classic', 'classic', 'classic', 'classic', 'classic', 'standout', 'premium', 'premium', 'premium'", function () {
    let customer = 'Ford';
    let adtypes = [ 'classic', 'classic', 'classic', 'classic', 'classic', 'standout', 'premium', 'premium', 'premium' ];
    let result = 2559.92;
    expect(app.get_total(customer, adtypes)).to.equal(result);
  });
});
