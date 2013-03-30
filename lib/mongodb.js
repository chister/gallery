var mongodb = require('mongodb');
var objectId = require('mongodb').ObjectID;
var dbRef = require('mongodb').DBRef;
var ReplSetServers = mongodb.ReplSetServers;
var conf = require('../config/settings.js').settings(process.env.NODE_ENV);

var conn;

if (!conf.isDbReplSet) {
  var server = new mongodb.Server(conf.db.mongoDbHostName, conf.db.mongoDbPort, {'auto_reconnect': true, 'poolSize':50});
  conn = new mongodb.Db(conf.mongoDatabaseName, server);
} else {
  var servers = [];
  for (var i=0; i<conf.db.length; i++) {
    servers.push(new mongodb.Server(conf.db[i].mongoDbHostName, conf.db[i].mongoDbPort, {'auto_reconnect': true, 'poolSize': 20}));
  }
  var replset = new ReplSetServers(servers, {rs_name: 'rs0'});
  conn = new mongodb.Db(conf.mongoDatabaseName, replset);
  conn.open(function(){});
}

function getCollection(collectionName, callback) {
  conn.collection(collectionName, function(err, collection) {
    if (err) {
      conn.createCollection(collectionName, function(err, collection) {
        if (err) callback(err);
        callback(null, collection);
      });
    } else {
      callback(null, collection);
    }
  });
}

exports.getLatestVideos = function(callback) {
  getCollection('full', function(err, collection) {
    if (err) callback(err);
    var cursor = collection.find({}, null, null);
    cursor.limit(20).toArray(function(err, docs) {
      if (err) callback(err);
      callback(null, docs);
    });
  });
};

exports.getVideoById = function(id, callback) {
  getCollection('full', function(err, collection) {
    if (err) callback(err);
    collection.findOne({_id: id}, function(err, video) {
      if (err) callback(err);
      callback(null, video);
    });
  });
}