var config = {
    development: {
        database: {
            host: 'localhost',
            port: '27017',
            db: 'test-case-study',
            user: '',
            password: ''
        }
    },
    production: {
        database: {
            use_env_variable: 'MONGODB_URI'
        }
    }
};
module.exports = config;
