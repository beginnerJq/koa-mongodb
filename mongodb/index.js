//DB库
var MongoDB = require('mongodb');
var MongoClient = MongoDB.MongoClient;
const ObjectID = MongoDB.ObjectID;

var Config = require('./config.js');

class Db {
    static getInstance() {
        /*1、单例  多次实例化实例不共享的问题*/
        if (!Db.instance) {
            Db.instance = new Db();
        }
        return Db.instance;
    }
    constructor() {
        this.dbClient = ''; /* 属性 放db对象 */
        this.connect(); /*实例化的时候就连接数据库*/
    }
    /*连接数据库*/
    connect() {
        let _that = this;
        return new Promise((resolve, reject) => {
            if (!_that.dbClient) {
                /*1、解决数据库多次连接的问题*/
                MongoClient.connect(Config.url, (err, client) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(_that.dbClient = client.db(Config.dbName));
                    }
                });
            } else {
                resolve(_that.dbClient);
            }
        });
    }
    /**
     * @param {Strings} collectionName
     * @param {JSON} json
     * @returns
     * @memberof Db
     */
    find(collectionName, json = {}) {
        return new Promise((resolve, reject) => {
            this.connect().then((db) => {
                let result = db.collection(collectionName).find(json);
                result.toArray(function (err, docs) {
                    err ? reject(err) : resolve(docs);
                });
            });
        });
    }
    /**
     *
     *
     * @param {Strings} collectionName
     * @param {JSON} json1
     * @param {JSON} json2
     * @returns
     * @memberof Db
     */
    update(collectionName, json1, json2) {
        return new Promise((resolve, reject) => {
            this.connect().then((db) => {
                db.collection(collectionName).updateOne(json1, {
                    $set: json2
                }, (err, result) => {
                    err ? reject(err) : resolve(result);
                });
            });
        });
    }
    /**
     * @param {Strings} collectionName
     * @param {JSON} json
     * @returns
     * @memberof Db
     */
    insert(collectionName, json) {
        return new Promise((resolve, reject) => {
            this.connect().then((db) => {
                db.collection(collectionName).insertOne(json, (err, result) => {
                    err ? reject(err) : resolve(result);
                });
            });
        });
    }

    /**
     * @param {Strings} collectionName
     * @param {JSON} json
     * @returns
     * @memberof Db
     */
    remove(collectionName, json) {
        return new Promise((resolve, reject) => {
            this.connect().then((db) => {
                db.collection(collectionName).removeOne(json, function (err, result) {
                    err ? reject(err) : resolve(result);
                });
            });
        });
    }
    getObjectId(id) {
        /*mongodb里面查询 _id 把字符串转换成对象*/
        return new ObjectID(id);
    }
}


module.exports = Db.getInstance();