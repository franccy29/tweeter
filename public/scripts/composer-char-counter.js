/* eslint-disable no-undef */
$(document).ready(() => {
  $("#tweet-text").keyup(() => {
    let length = $("#tweet-text").val().length;
    if (140 - length >= 0) {
      $(".counter").text(140 - length).css("color", "black");
    } else {
      $(".counter").text(140 - length).css("color", "red");
    }

  });
});
