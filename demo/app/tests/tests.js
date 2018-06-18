var AcceptSdk = require("nativescript-accept-sdk").AcceptSdk;
var acceptSdk = new AcceptSdk();

describe("greet function", function() {
    it("exists", function() {
        expect(acceptSdk.greet).toBeDefined();
    });

    it("returns a string", function() {
        expect(acceptSdk.greet()).toEqual("Hello, NS");
    });
});