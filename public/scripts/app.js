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


  function createTweetElement(tweet){

let userName= tweet.user.name;
let userAvatar=tweet.user.avatars.regular;
let userHandle=tweet.user.handle;
let userContent=tweet.content.text;
let userCreated=new Date(tweet.created_at);

let output = "<article class=existing-tweet><header class=tweetHeader><img class=tweet-logo src="+userAvatar+"><p class=header-text-one>"+userName+"</p><p class=header-text-two>"+userHandle+"</p></header><span class=middle>"+escape(userContent)+"</spam><footer class=footer><span class=bottom-text>"+userCreated+"</span><span class=icons><i class=\"fa fa-flag\"aria-hidden=\"true\"></i><i class=\"fa fa-retweet\" aria-hidden=\"true\"></i><i class=\"fa fa-heart\" aria-hidden=\"true\"></i></span></footer></article>"


// const safeHTML = `<p>${escape(textFromUser)}</p>`;

// if($("p").text()=== userName){

//   $(this).parent().next().text(userContent);
// }


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

        // var $button = $('#input_button');
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
        });
      });

loadTweets();
