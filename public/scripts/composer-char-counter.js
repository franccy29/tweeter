// the ltweet lenght counter and turning the counnter as red when more than 140 caracter is in the box

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
