var config = {
    development: {
        database: {
            host: 'localhost',
            port: '27017',
            db: 'test-case-study',
            user: '',
            password: ''
        },
        server: {
            host: '127.0.0.1',
            port: '3000'
        }
    },
    production: {
        database: {
            host: 'localhost',
            port: '27017',
            db: 'test-case-study',
            user: '',
            password: ''
        },
        server: {
            host: '127.0.0.1',
            port: '1234'
        }
    }
};
module.exports = config;
