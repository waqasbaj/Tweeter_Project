"use strict";

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
      db.collection("tweets").find().sort({"created_at": -1}).toArray((err, tweets) => {
        if (err) {
          return callback(err);
        }
      callback(null, tweets);
      });
    },

    // Update the tweets date in `db` with information about the likes counter and the like status
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
};
