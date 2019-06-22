"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fetchTodos = require("../fetchTodos");
test('fetch all items', function () {
    //arrange
    var requestParams = {
        startDate: "2019-01-01"
    };
    //act
    var response = fetchTodos(requestParams);
    //assert
    expect(response).toBe("2019-01-02");
});
