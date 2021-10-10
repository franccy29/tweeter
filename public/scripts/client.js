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

// renders all of the tweet we have in the database calling createTweetElement on each of them.
const renderTweets = (tweets) => {
  for (let i = tweets.length - 1; i >= 0; i--) {
    const $tweet = createTweetElement(tweets[i]);
    $('#tweets-container').append($tweet);
  }
};

// gets the tweet from the data base and sending them to renderTweets.
const loadTweets = () => {
  $.get('/tweets', (morePostsHtml) => {
    renderTweets(morePostsHtml);
  });
};

// usend to escape xss attacks.
const escape = function (str) {
  let div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};

/* 
used for the write new tweet in order to roll up and over the text label box because otherwise 
the nav bar would be over the textlabel box.
*/
const offsetAnchor = () => {
  if (location.hash.length !== 0) {
    window.scrollTo(window.scrollX, window.scrollY - 1000);
  }
};



$(() => {
  //listen to the submit event(click the button)
  $("#sendATweet").submit((event) => {
    // prevent the refresh
    event.preventDefault();
    // get the tweet and analyse if it's in a good form, else git a slide down error.
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
        // if all is good remove any error promt, empty the txt box, post it to the database
        $("#error").slideUp("fast", () => {});
        $("#tweet-text").val("");
        $.post("/tweets/", text, () => {
          // empty the tweet ad generate a new page of all the tweets
          $('#tweets-container').empty();
          loadTweets();
        });
      }
    });
  });
  // listen to a click on write a new tweet to scroll up to the textlabel box by calling offsetAnchor
  $(document).on('click', 'a[href^="#tweet-text"]', function(event) {
    window.setTimeout(function() {
      offsetAnchor();
    }, 0);
  });
  // load tweets and slide the error box up
  $("#error").slideUp("fast", () => {});
  loadTweets();
});