const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectID;


class DB {
    constructor() {
        this.url = 'mongodb+srv://vad:vad@cluster0.xkvl0.mongodb.net/';
        this.client = new MongoClient(this.url, {useNewUrlParser: true, useUnifiedTopology: true});
        this.client = this.client.connect().then(connection => {return connection.db("BSTU")});
        console.log("Connected to MongoDB");
    }

    GetRecordsByTableName(tableName) {
        return this.client.then(db => {
            return db.collection(tableName).find({}).toArray();
        });
    }

    InsertRecords(tableName, fields) {
        return this.client
            .then(async db => {
                await db.collection(tableName).insertOne(fields, (err, r) =>{
                    if(err) console.log(err);
                    else {
                        console.log(r.insertedCount);
                    }
                });
                return this.GetField(tableName, fields);
            });
    }

    UpdateRecords(tableName, id, fields) {
        return this.client
            .then(async db => {
                console.log(id);
                if (!id) {
                    throw "Wrong ID";
                }
                delete fields._id;
                await db.collection(tableName).updateOne({_id: ObjectId(id)}, {$set: fields});
                return this.GetField(tableName, fields);
            })
    }

    GetField(tableName, fields) {
        return this.client
            .then(db => {
                return db.collection(tableName).findOne(fields);
            })
            .then(record => {
                if (!record) throw 'No records';
                return record;
            });
    }

    DeleteField(tableName, id) {
        return this.client
            .then(async db => {
                if (!id) {
                    throw 'Wrong ID';
                }
                console.log("DB delete");
                let removedRecord = await this.GetField(tableName, {_id: ObjectId(id)});
                await db.collection(tableName).deleteOne({_id: ObjectId(id)});
                return removedRecord;
            });
    }

}

module.exports = DB;
