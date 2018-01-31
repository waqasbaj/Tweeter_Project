
$(document).ready(function(){

  $(".new-tweet").on("keyup", "textarea", function() {
    var val = $(this).val().length;
    var remaining_char = 140 - val;

    console.log(remaining_char);

    $(this).parent().children('.counter').html(remaining_char);

    if (remaining_char < 0){
      $(this).parent().children('.counter').css("color", 'red');
    }
  });

  $("#input_button").on("click", function() {

    if($("textarea").val().length === 0){

      event.preventDefault();

      alert("You have not entered any text");
    }
  });

  $("#input_button").on("click", function() {

    if($("textarea").val().length > 140){

      event.preventDefault();

      alert("You have entered longer than acceptable tweet");
    }
  });




});

