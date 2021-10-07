/*
* Client-side JS logic goes here
* jQuery is already loaded
* Reminder: Use (and do all your DOM work in) jQuery's document ready function
*/
/* eslint-disable no-undef */

const createTweetElement = (tweetData) => {
  return $(`
  <article>
  <header>
  <div>
  <img src=${tweetData.user.avatars}></img>
  <h4>${escape(tweetData.user.name)}</h4>
  </div>
  <h5>${escape(tweetData.user.handle)}</h5>
  </header>
  <p>${escape(tweetData.content.text)}</p>
  <footer>
  <h6>${timeago.format(tweetData.created_at)}</h6>
  <div>
  <i class="fas fa-flag"></i>
  <i class="fas fa-retweet"></i>
  <i class="fas fa-heart"></i>
  </div>
  </footer>
  </article>`);
};

const renderTweets = (tweets) => {
  for (let i = tweets.length - 1; i >= 0; i--) {
    const $tweet = createTweetElement(tweets[i]);
    $('#tweets-container').append($tweet);
  }
};

const loadTweets = () => {
  $.get('/tweets', (morePostsHtml) => {
    renderTweets(morePostsHtml);
  });
};

const escape = function (str) {
  let div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};

const offsetAnchor = () => {
  if (location.hash.length !== 0) {
    window.scrollTo(window.scrollX, window.scrollY - 1000);
  }
};



$(() => {
  $("#sendATweet").submit((event) => {
    event.preventDefault();
    $.get("#tweet-text", () => {
      const text = $("#tweet-text").serialize();
      const textTest = $("#tweet-text").val();
      if (textTest === null) {
        alert("the text is null");
      } else if (textTest === "") {
        $("#error").slideDown("fast", () => {
          $('#error').empty();
          $('#error').append("the tweet is empty! tell us what you are thinking about!");
        });
      } else if (textTest.length > 140) {
        $("#error").slideDown("fast", () => {
          $('#error').empty();
          $('#error').append("the tweet is too long! stay in the 140 character randge!!");
        });
      } else {
        $("#error").slideUp("fast", () => {});
        $("#tweet-text").val("");
        $.post("/tweets/", text, () => {
          $('#tweets-container').empty();
          loadTweets();
        });
      }
    });
  });

  $(document).on('click', 'a[href^="#tweet-text"]', function(event) {
    window.setTimeout(function() {
      offsetAnchor();
    }, 0);
  });

  $("#error").slideUp("fast", () => {});
  loadTweets();
});