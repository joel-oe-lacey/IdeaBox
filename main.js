//target the submit button
var titleInput = document.querySelector('.form-input-title');
var bodyInput = document.querySelector('.form-textarea-body');
var submit = document.querySelector('.form-button-save');
var cardSection = document.querySelector('.section-cards');
var form = document.querySelector('.form');
var allCards = [];

submit.addEventListener('click', function() {
    var titleValue = titleInput.value;
    var bodyValue = bodyInput.value;
    var userCard = new Idea(titleValue, bodyValue);
    allCards.push(userCard);
    //call HTML card addition helper function
    var cardHTML = userCard.saveToStorage(userCard);

    cardSection.innerHTML += cardHTML;

    //create formReset helper
    titleInput.value = "";
    bodyInput.value = "";
    submit.disabled = true;
});

cardSection.addEventListener('click', function() {
    //delete handing helper function
  if (event.target.id === 'delete') {
    event.target.parentNode.parentNode.parentNode.remove();

    //star change helper function
  } else if (event.target.id === 'star') {
    console.log(event);
    var src = event.target.src;
    toggleStar(event);
    if (src.includes('active')) {
      event.target.src = "assets/star.svg";
    } else {
      event.target.src = "assets/star-active.svg";
    }
  }
});

titleInput.addEventListener('keydown', enableButton);
bodyInput.addEventListener('keydown', enableButton);

function enableButton() {
  var titleValue = titleInput.value;
  var bodyValue = bodyInput.value;

  if (titleValue !== "" && bodyValue !== "") {
    submit.disabled = false;
  }
};

function toggleStar(event, id) {
  var id = event.target.parentNode.parentNode.parentNode.id;
  console.log(event);

  for (var i = 0; i < allCards.length; i++) {
    if(allCards[i].id.toString() === id) {
      allCards[i].starred = !allCards[i].starred;
    }
  }
}

function cardRemove(event, id) {
  var id = event.target.parentNode.parentNode.parentNode.id;

  for (var i = 0; i < allCards.length; i++) {
    if(allCards[i].id.toString() === id) {
      //try use filter
      allCards.splice(i, 1);
    }
  }
}
