/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

  function createTweetElement(tweet){

let userName= tweet.user.name;
let userAvatar=tweet.user.avatars.regular;
let userHandle=tweet.user.handle;
let userContent=tweet.content.text;
let userCreated=new Date(tweet.created_at);

let output = "<article class=existing-tweet><header class=tweetHeader><img class=tweet-logo src="+userAvatar+"><p class=header-text-one>"+userName+"</p><p class=header-text-two>"+userHandle+"</p></header><span class=middle>"+userContent+"</spam><footer class=footer><span class=bottom-text>"+userCreated+"</span><span class=icons><i class=\"fa fa-flag\"aria-hidden=\"true\"></i><i class=\"fa fa-retweet\" aria-hidden=\"true\"></i><i class=\"fa fa-heart\" aria-hidden=\"true\"></i></span></footer></article>"


return output;
};


function renderTweets(tweet){

  for (x of tweet){

    let outputTweet= createTweetElement(x);

    $(document).ready(function(){

    $('.container').append(outputTweet);

    });
    // console.log(outputTweet);

  }

}



const data = [
  {
    "user": {
      "name": "Newton",
      "avatars": {
        "small":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_50.png",
        "regular": "https://vanillicon.com/788e533873e80d2002fa14e1412b4188.png",
        "large":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_200.png"
      },
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": {
        "small":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_50.png",
        "regular": "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc.png",
        "large":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_200.png"
      },
      "handle": "@rd" },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  },
  {
    "user": {
      "name": "Johann von Goethe",
      "avatars": {
        "small":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_50.png",
        "regular": "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1.png",
        "large":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_200.png"
      },
      "handle": "@johann49"
    },
    "content": {
      "text": "Es ist nichts schrecklicher als eine tätige Unwissenheit."
    },
    "created_at": 1461113796368
  }
];


renderTweets(data);
