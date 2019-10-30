//target the submit button
var titleInput = document.querySelector('.form-input-title');
var bodyInput = document.querySelector('.form-textarea-body');
var submit = document.querySelector('.form-button-save');
var cardSection = document.querySelector('.section-cards');
var form = document.querySelector('.form');
var buttonOpen = document.querySelector('.nav-button-open');
var navSection = document.querySelector('.nav-section');
var image = document.getElementById('menu');
var searchBtn = document.querySelector('.form-button-search');
var searchInput = document.querySelector('.form-input-search');
var allCards = [];
var showStarBtn = document.querySelector('.nav-button-starbutton');

submit.addEventListener('click', submitNewIdea);
titleInput.addEventListener('keyup', enableButton);
bodyInput.addEventListener('keyup', enableButton);
window.onload = loadCards;
cardSection.addEventListener('click', function() {
  cardEvent(event.target);
});
buttonOpen.addEventListener('click', menuDropdown);

showStarBtn.addEventListener('click', showStarred);

searchInput.addEventListener('keyup', search);

function showStarred() {
  cardSection.innerHTML = '';
  if(showStarBtn.innerText === 'Show Starred Ideas') {
    showStarBtn.innerText = 'Show All';
    for (var i = 0; i < allCards.length; i++) {
      if (allCards[i].starred) {
        createCard(allCards[i]);
      }
    }
  } else {
    showStarBtn.innerText = 'Show Starred Ideas';
    for (var i = 0; i < allCards.length; i++) {
        createCard(allCards[i]);
    }
  }
};

function submitNewIdea() {
  var card = createCardObject();
  createCard(card);
  formReset();
};

function createCardObject() {
  var titleValue = titleInput.value;
  var bodyValue = bodyInput.value;
  var cardObj = {
    id:Date.now(),
    title:titleValue,
    body:bodyValue,
    starred:false,
  };
  var userCard = new Idea(cardObj);
  allCards.push(userCard);
  userCard.saveToStorage(userCard);
  return userCard;
};

function formReset() {
  titleInput.value = "";
  bodyInput.value = "";
  submit.disabled = true;
};

function createCard(idea) {
  var starStatus = starLoad(idea);
  return cardSection.innerHTML +=
          `<article class="card" data-id="${idea.id}">
            <div class="card-header">
              <button class="card-button-star" type="button" name="star-button"><img id="star" src="${starStatus}"/></button>
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
};

function loadCards() {
  for (var i = 0; i < localStorage.length; i++) {
    var key = localStorage.key(i);
    var object = localStorage.getItem(key);
    var card = JSON.parse(object);
    var instanciatedIdea = new Idea(card);
    allCards[i] = instanciatedIdea;
  };
  orderLoadedCards();
};

function starLoad(idea) {
  if (idea.starred) {
    return "assets/star-active.svg";
  } else {
    return "assets/star.svg";
  }
}

function orderLoadedCards() {
  allCards.sort(function(a, b) {
    return a.id - b.id;
  });
  for (var i = 0; i < allCards.length; i++) {
    createCard(allCards[i]);
  };
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
};

function enableButton() {
  var titleValue = titleInput.value;
  var bodyValue = bodyInput.value;
  if (titleValue !== "" && bodyValue !== "") {
    submit.disabled = false;
    } if (titleValue === "" || bodyValue === "") {
      submit.disabled = true;
  }
};

function toggleStar(passedEvent) {
  var id = passedEvent.parentNode.parentNode.parentNode.dataset.id;
  for (var i = 0; i < allCards.length; i++) {
    if(allCards[i].id.toString() === id) {
      allCards[i].starred = !allCards[i].starred;
    };
  };
  cardStorageRefresh();
};

function menuDropdown() {
  var hide = document.querySelector('.hidden-section');
  navSection.classList.toggle('show');
  buttonOpen.classList.toggle('nav-button-close');
  hide.classList.toggle('hide');
};

function cardRemove(passedEvent) {
  allCards = allCards.filter(allCards => {
    var deleteId = passedEvent.parentNode.parentNode.parentNode.dataset.id;
    localStorage.removeItem(deleteId);
    return allCards.id.toString() !== deleteId;
  });
};

function search() {
  var searchValue = searchInput.value.toLowerCase();
  cardSection.innerHTML = "";
  for (var i = 0; i < allCards.length; i++) {
    if (allCards[i].title.toLowerCase().includes(searchValue) || allCards[i].body.toLowerCase().includes(searchValue)) {
      createCard(allCards[i]);
    }
  }
};
