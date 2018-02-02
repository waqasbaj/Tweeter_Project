
//This file has a few event handlers:



$(document).ready(function(){
  $('.new-tweet').hide();

  // When the user types in the Compose Tweet box, if the length of the input goes above 140, the counter turns red
  // If text above 140 character is submitted then an alert is shown of invalid input
  // Also, if the user does not enter any input and presses submit then agian the an alert is sent

  $(".new-tweet").on("keyup", "textarea", function() {
    var val = $(this).val().length;
    var remaining_char = 140 - val;
    $(this).parent().children('.counter').html(remaining_char);

    if (remaining_char < 0){
      $(this).parent().children('.counter').css("color", 'red');
    }else{
      $(this).parent().children('.counter').css("color", 'black');
    }
  });

  $("#input_button").on("click", function() {
    if($("textarea").val().length === 0){
      event.preventDefault();
      alert("You have not entered any text");
    }
    if($("textarea").val().length > 140){
      event.preventDefault();
      alert("You have entered longer than acceptable tweet");
    }
  });

//This is for the Compose button. It toggles its colors when clicked for input
  let count = 0;

  $(".nav-button").on("click", function() {
    count++;
    if(count%2 ===1){
      $(".nav-button").css('background-color', '#D5F5E3')
      $(".nav-button").css('color', 'green')
      $('.new-tweet').slideToggle();
      $('textarea').focus();

    } else {
      $('.new-tweet').slideToggle();
      $(".nav-button").css('background-color', 'white')
      $(".nav-button").css('color', 'black')
    }
  });
});

