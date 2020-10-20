const http = require('http');
const {graphql, buildSchema} = require('graphql');
const schema = buildSchema(require('fs').readFileSync('./schema.gql').toString());
const { DB } = require('./DB/DB');
const resolver = require('./resolver');
const { Error400, Error200, IsError } = require('./errors/module');

const server = http.createServer();

const context = DB((err, connect) => {
    if (err) {
        console.error('Database connection failed');
    }
    else {
        console.log('Database connection successful');
        server.listen(3000, () => {
            console.log('Server running at http://localhost:3000/')})
            .on('error', (err) => { console.log('Error:', err.code); })
            .on('request', handler);
    }
});

const handler = (request, response) => {
    if (request.method === 'POST') {
        let result = '';
        request.on('data', (data) => { result += data; });
        request.on('end', () => {
            try {
                let obj = JSON.parse(result);
                if (obj.mutation) {
                    graphql(schema, obj.mutation, resolver, context, obj.variables?obj.variables:{})
                        .then((result) => {
                            new IsError(result)
                                .then((json) => { Error400(response, '', json) })
                                .else((json) => { Error200(response, '', json) });
                        })
                }
                if (obj.query) {
                    graphql(schema, obj.query, resolver, context, obj.variables ? obj.variables : {})
                        .then((result) => {
                            new IsError(result)
                                .then((json) => { Error400(response, '', json) })
                                .else((json) => { Error200(response, '', json) });
                        })
                }
            }
            catch (e) {
                Error400(response, JSON.stringify({error: 'Bad Request'}));
            }
        })
    }
};
