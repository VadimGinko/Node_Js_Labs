const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

// Connection URL
const url = 'mongodb+srv://vad:vad@cluster0.xkvl0.mongodb.net/';

// Database Name
const dbName = 'BSTU';

// Use connect method to connect to the server
MongoClient.connect(url, function(err, client) {
    assert.equal(null, err);
    console.log("Connected successfully to server");

    const db = client.db(dbName);
    const collection = db.collection('faculty');

    const insertDocuments = function(db, callback) {
        // Get the documents collection
        const collection = db.collection('faculty');
        // Insert some documents
        collection.insertMany([
            {a : 1}, {a : 2}, {a : 3, b:4}
        ], function(err, result) {
            assert.equal(err, null);
            assert.equal(3, result.result.n);
            assert.equal(3, result.ops.length);
            console.log("Inserted 3 documents into the collection");
            callback(result);
        });
    }
    const findDocuments = function(db, callback) {
        // Get the documents collection
        const collection = db.collection('faculty');
        // Find some documents
        collection.find({}).toArray(function(err, docs) {
            assert.equal(err, null);
            console.log("Found the following records");
            console.log(docs)
            callback(docs);
        });
    }
    insertDocuments(db, function() {
        findDocuments(db, function() {
            client.close();
        });
     });
    findDocuments(db, function() {
        client.close();
    });
});
