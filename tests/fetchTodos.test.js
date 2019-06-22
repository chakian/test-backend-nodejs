const fetchTodos = require('../fetchTodos');

test('fetch all items', () => {
    //arrange
    const requestParams = {
        startDate: "2019-01-01"
    };

    //act
    const response = fetchTodos(requestParams);

    //assert
    expect(response).toBe("2019-01-02");
});
