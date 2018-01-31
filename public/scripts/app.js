/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
function escape(str) {
  var div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
}

function calcDay(dateInput){

  var date1 = new Date(dateInput);
  var date2 = Date.now();
  var date3 = new Date(date2);

  var timeDiff = Math.abs(date3.getTime() - date1.getTime());
  var dayDifference = Math.ceil(timeDiff / (1000 * 3600 * 24));
  return dayDifference;
}


function createTweetElement(tweet){

  let userName= tweet.user.name;
  let userAvatar=tweet.user.avatars.regular;
  let userHandle=tweet.user.handle;
  let userContent=tweet.content.text;
  let userCreated= calcDay(tweet.created_at);



  let output = "<article class=existing-tweet><header class=tweetHeader><img class=tweet-logo src="+userAvatar+"><p class=header-text-one>"+userName+"</p><p class=header-text-two>"+userHandle+"</p></header><span class=middle>"+escape(userContent)+"</span><footer class=footer><span class=bottom-text>"+userCreated+"</span><span class=icons><i class=\"fa fa-flag\"aria-hidden=\"true\"></i><i class=\"fa fa-retweet\" aria-hidden=\"true\"></i><i class=\"fa fa-heart\" aria-hidden=\"true\"></i></span></footer></article>"

  return output;
};


function renderTweets(tweet){

  for (x of tweet){
    let outputTweet= createTweetElement(x);
    $(document).ready(function(){
      $('.container').append(outputTweet);
    });
  }
}

function loadTweets(){
  $.ajax({
      url: 'http://localhost:8080/tweets',
      method: 'GET',
      success: function (userTweets) {
        renderTweets(userTweets)
      }
    });
}


$(document).ready(function(){
  $("form").on('submit', function () {
    event.preventDefault();
    $.ajax({
      url: 'http://localhost:8080/tweets',
      method: 'POST',
      data : $(this).serialize(),
      success: function () {
        console.log('Success: ');
        loadTweets();
      }
    });
    $('textarea').val('');
  });
});

loadTweets();
