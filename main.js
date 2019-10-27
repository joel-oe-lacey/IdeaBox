//target the submit button
var titleInput = document.querySelector('.form-input-title');
var bodyInput = document.querySelector('.form-textarea-body');
var submit = document.querySelector('.form-button-save');
var cardSection = document.querySelector('.section-cards');
var form = document.querySelector('.form');
var allCards = [];
var buttonOpen = document.querySelector('.nav-button-open');
var buttonClose = document.querySelector('.nav-button-close');
var navSection = document.querySelector('.nav-section');
var image = document.getElementById('menu');

submit.addEventListener('click', function() {
    var titleValue = titleInput.value;
    var bodyValue = bodyInput.value;
    var userCard = new Idea(titleValue, bodyValue);
    allCards.push(userCard);

    var jsonObject = JSON.stringify(userCard);
    localStorage.setItem(userCard.id, jsonObject);

    //call HTML card addition helper function
    var cardHTML = createCard(userCard);
    cardSection.innerHTML += cardHTML;
    formReset();
});

function formReset() {
  titleInput.value = "";
  bodyInput.value = "";
  submit.disabled = true;
};

window.onload = loadCards;

function createCard(idea) {
  return `<article class="card" id="${idea.id}">
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
    cardSection.innerHTML += cardHTML;
  }
};

cardSection.addEventListener('click', function() {
    //delete handing helper function
  if (event.target.id === 'delete') {
    event.target.parentNode.parentNode.parentNode.remove();
    cardRemove(event);
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

function toggleStar(event) {
  var id = event.target.parentNode.parentNode.parentNode.id;
  console.log(event);

  for (var i = 0; i < allCards.length; i++) {
    if(allCards[i].id.toString() === id) {
      allCards[i].starred = !allCards[i].starred;
    }
  }
}

buttonOpen.addEventListener('click', menuDropdown);
function menuDropdown() {
  var hide = document.querySelector('.hidden-section');
  navSection.classList.toggle('show');
  buttonOpen.classList.toggle('nav-button-close');
  hide.classList.toggle('hide');

}

// if (image.src = "assets/menu.svg") {
//   console.log('1');
//   image.src = "assets/menu-close.svg"
// } if (image.src = "assets/menu-close.svg") {
//   console.log('2');
//   image.src = "assets/menu.svg";
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
