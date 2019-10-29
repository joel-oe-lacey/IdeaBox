//target the submit button
var titleInput = document.querySelector('.form-input-title');
var bodyInput = document.querySelector('.form-textarea-body');
var submit = document.querySelector('.form-button-save');
var cardSection = document.querySelector('.section-cards');
var form = document.querySelector('.form');
var buttonOpen = document.querySelector('.nav-button-open');
var navSection = document.querySelector('.nav-section');
var image = document.getElementById('menu');
var allCards = [];

submit.addEventListener('click', submitNewIdea);
titleInput.addEventListener('keyup', enableButton);
bodyInput.addEventListener('keyup', enableButton);
cardSection.addEventListener('click', function() {
  cardEvent(event.target);
});
window.onload = loadCards;
buttonOpen.addEventListener('click', menuDropdown);

function submitNewIdea() {
  var titleValue = titleInput.value;
  var bodyValue = bodyInput.value;
  var userCard = new Idea(titleValue, bodyValue);
  //Should change var userCard to var newIdea or something similar--should follow suite with idea.js and class Idea
  allCards.push(userCard);
  userCard.saveToStorage(userCard);
  createCard(userCard);
  formReset();
};

function formReset() {
  titleInput.value = "";
  bodyInput.value = "";
  submit.disabled = true;
};

function createCard(idea) {
  return cardSection.innerHTML +=
          `<article class="card" id="${idea.id}">
            <div class="card-header">
              <button class="card-button-star" type="button" name="star-button"><img id="star" src="assets/star.svg"/></button>
              <button class="card-button-delete" type="button" name="delete-button"><img id="delete" src="assets/delete.svg"/></button>
            </div>
            <div class="card-body">
              <h3 class="card-header-title">${idea.title}</h3>
              <p class="card-p-text">${idea.body}</p>
            </div>
            <div class="card-footer">
              <button class="card-button-edit" type="button" name="comment-button"><img id="comment" src="assets/comment.svg"/></button>
              <label class="button-label-edit" for="">Comment</label>
            </div>
          </article>`
}

function loadCards() {
  for (var i = 0; i < localStorage.length; i++) {
    var key = localStorage.key(i);
    var object = localStorage.getItem(key);
    var parsedObject = JSON.parse(object);
    allCards[i] = parsedObject;

    var cardHTML = createCard(parsedObject);
  }
};

function cardEvent(passedEvent) {
  switch (passedEvent.id) {
    case 'delete':
      passedEvent.parentNode.parentNode.parentNode.remove();
      cardRemove(passedEvent);
      break;
    case 'star':
      toggleStar(passedEvent);
      starImgChg(passedEvent);
      break;
  };
};

function starImgChg(passedEvent) {
  var src = passedEvent.src;
  if (src.includes('active')) {
    passedEvent.src = "assets/star.svg";
  } else {
    passedEvent.src = "assets/star-active.svg";
  }
};

function cardStorageRefresh() {
  localStorage.clear();
  for (var i = 0; i < allCards.length; i++) {
    var userCard = allCards[i];
    var jsonObject = JSON.stringify(userCard);
    localStorage.setItem(userCard.id, jsonObject);
  }
}

function enableButton() {
  var titleValue = titleInput.value;
  var bodyValue = bodyInput.value;

  if (titleValue !== "" && bodyValue !== "") {
    submit.disabled = false;
    } if (titleValue === "" || bodyValue === "") {
      submit.disabled = true;
  }
};

function toggleStar(event) {
  var id = event.target.parentNode.parentNode.parentNode.id;

  for (var i = 0; i < allCards.length; i++) {
    if(allCards[i].id.toString() === id) {
      allCards[i].starred = !allCards[i].starred;
    }
  }
  cardStorageRefresh();
}

function menuDropdown() {
  var hide = document.querySelector('.hidden-section');
  navSection.classList.toggle('show');
  buttonOpen.classList.toggle('nav-button-close');
  hide.classList.toggle('hide');

}

function cardRemove(event) {
  allCards = allCards.filter(allCards => {
    var deleteId = event.target.parentNode.parentNode.parentNode.id;
    localStorage.removeItem(deleteId);
    return allCards.id.toString() !== deleteId;
  });
}

function idNoMatchFilter(event) {
  var deleteId = event.target.parentNode.parentNode.parentNode.id;
  localStorage.removeItem(deleteId);
  return allCards.id.toString() !== deleteId;
}
