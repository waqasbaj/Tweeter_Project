"use strict";

// Simulates the kind of delay we see with network or filesystem operations
const simulateDelay = require("./util/simulate-delay");

var ObjectId = require("mongojs").ObjectId;

// Defines helper functions for saving and getting tweets, using the database `db`
module.exports = function makeDataHelpers(db) {
  return {

    // Saves a tweet to `db`
    saveTweet: function(newTweet, callback) {
      db.collection("tweets").insertOne(newTweet, (err, tweets) => {
        if (err) {
          return callback(err);
        }
      callback(null, true);
      });

    },

    // Get all tweets in `db`, sorted by newest first
    getTweets: function(callback) {

        // const sortNewestFirst = (a, b) => a.created_at - b.created_at;
        // callback(null, db.collection("tweets").find().sort(sortNewestFirst));

      db.collection("tweets").find().sort({"created_at": -1}).toArray((err, tweets) => {
        if (err) {
          return callback(err);
        }
      //sortNewestFirst = (a, b) => a.created_at - b.created_at;

      callback(null, tweets);
    });

    },

    updateTweet: function(updateLikes, callback) {

      db.collection("tweets").update({"_id":ObjectId(updateLikes.Id)},
                                     {$set : {likes: updateLikes.count,
                                      color: updateLikes.color}}, (err, tweets) => {

        if (err) {
          return callback(err);
        }
      callback(null, true);
    });

    }


  };
}
