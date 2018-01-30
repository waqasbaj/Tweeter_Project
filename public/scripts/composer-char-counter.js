
$(document).ready(function(){

  $(".new-tweet").on("keyup", "textarea", function() {

  var val = $(this).val().length;

  var remaining_char = 140-val;

  console.log(remaining_char);

  $(this).parent().children('.counter').html(remaining_char);

  if (remaining_char < 0){

    $(this).parent().children('.counter').css("color", 'red');
  }

});

});

