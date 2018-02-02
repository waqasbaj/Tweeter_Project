
  let check = 0; // This will be used to count mouse clicks for the event handlers

  //Escape function is only used to avoid any input from user that can potentially be malicious

  function escape(str) {
    let div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  }

  //calcDay calculates how old the tweet is. This number is displayed at the bottom left of the tweets

  function calcDay(dateInput){

    let date1 = new Date(dateInput);
    let date2 = Date.now();
    let date3 = new Date(date2);

    let timeDiff = Math.abs(date3.getTime() - date1.getTime());
    let dayDifference = Math.ceil(timeDiff / (1000 * 3600 * 24));
    return dayDifference;
  }

  //createTweetElement function creates the tweets from the data received from the server.

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

//renderTweets function is used to render the tweets on the main page.
//If website is loaded for the first time, all the tweets recieved from the database are rendered.
//However, if a new tweet is POST'ed by the used, then only the newly add tweetd is appended to the existing tweets

  function renderTweets(tweet, x){
  if (x !==0){
     for (y of tweet){
      let outputTweet = createTweetElement(y);
        $('.container').append(outputTweet);
    }
  }else{
    let outputTweet = createTweetElement(tweet[x]);
        $('section').after(outputTweet);
    }
  }

//loadTweets is where the AJAX request is made to GET the tweets from the server/database
  function loadTweets(x){
    $.ajax({
      url: 'http://localhost:8080/tweets',
      method: 'GET',
      success: function (userTweets) {
        renderTweets(userTweets, x);
      }
    });
  }

//When the webpage it loaded, following event handlers are enabled

  $(document).ready(function(){
    loadTweets();

    $("form").on('submit', function (event) {
      event.preventDefault();
      $.ajax({
        url: 'http://localhost:8080/tweets',
        method: 'POST',
        data : $(this).serialize(),
        success: function () {
          // $(".existing-tweet").remove();
          $('.counter').html('140');
          loadTweets(0);
          $('textarea').val('');
        }
      });
    });

    $(".container").on('click', ".fa-heart", function() {
      check++;
      let ID = $(this).parent().parent().parent().attr('id');
      let counter = $(this).parent().children("span").html();
      let color = 'grey';

      if(check%2 ===1){
        counter = Number(counter)+ 1;
        $(this).css("color", 'red');
        $(this).parent().children("span").html(counter);
        color = 'red';

      }else{
        counter = Number(counter)- 1;
        $(this).parent().children("span").html(counter);
        $(this).css("color", 'grey');
        color = 'grey';
      }

      let likesUpdate = {Id : ID, count: counter, color: color};

      $.ajax({
        url: 'http://localhost:8080/tweets',
        method: 'PUT',
        data : likesUpdate,
        success: function () {
        }
      });
    });
  });




