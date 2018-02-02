
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

var existingData = [];


function createTweetElement(tweet){

  let userID = tweet._id;
  let userName= tweet.user.name;
  let userAvatar=tweet.user.avatars.regular;
  let userHandle=tweet.user.handle;
  let userContent=tweet.content.text;
  let userLike = tweet.likes;
  let userCreated= calcDay(tweet.created_at);
  let userColor= tweet.color;

  let output = "<article class=existing-tweet id="+userID+"><header class=tweetHeader><img class=tweet-logo src="+userAvatar+"><p class=header-text-one>"+userName+"</p><p class=header-text-two>"+userHandle+"</p></header><span class=middle>"+escape(userContent)+"</span><footer class=footer><span class=bottom-text>"+userCreated+"</span><span class=icons><i class=\"fa fa-flag\" style=color:grey aria-hidden=\"true\"></i><i class=\"fa fa-retweet\" style=color:grey aria-hidden=\"true\"></i><i class=\"fa fa-heart \" style=\"color:"+userColor+";\" aria-hidden=\"true\"></i><span class=counterLike>"+userLike+"</span></span></footer></article>"

  return output;
};

var check = 0;

function renderTweets(tweet){

  for (x of tweet){
    let outputTweet = createTweetElement(x);
      $('.container').append(outputTweet);
  }

  $("article").hover (function() {
    $(this).find(".icons").show();

    }, function() {
    $(this).find(".icons").hide();
  });


  $(".fa-heart").on('click', function () {

    check++;

    var click = $(this).data('clicks');
    var ID = $(this).parent().parent().parent().attr('id');
    var counter = $(this).parent().children("span").html();

    if(check%2 ===1){
      counter = Number(counter)+ 1;
      var color = 'red';

    }else{
      counter = Number(counter)- 1;
      var color = 'grey';
    }

    var likesUpdate = {Id : ID, count: counter, color: color};

    $.ajax({
      url: 'http://localhost:8080/tweets',
      method: 'PUT',
      data : likesUpdate,
      success: function () {
       $(".existing-tweet").remove();
        loadTweets();

        if(check%2 ===1){
          counter = Number(counter)+ 1;
          $(this).removeClass('.likeButton').addClass('.likeButtonRed');

         }else{
          counter = Number(counter)- 1;
          $(this).removeClass('.likeButtonRed').addClass('.likeButton');

        }
      }
    });
  });
}

function loadTweets(){
  $.ajax({
    url: 'http://localhost:8080/tweets',
    method: 'GET',
    success: function (userTweets) {
      renderTweets(userTweets);
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
        $(".existing-tweet").remove();
        $('.counter').html('140');
        loadTweets();
        $('textarea').val('');
      }
    });

  });
});


loadTweets();

