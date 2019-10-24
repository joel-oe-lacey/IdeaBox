//target the submit button
var titleInput = document.querySelector('.form-input-title');
var bodyInput = document.querySelector('.form-textarea-body');
var submit = document.querySelector('.form-button-save');
var cardSection = document.querySelector('.section-cards');
var form = document.querySelector('.form');

submit.addEventListener('click', function() {
    var titleValue = titleInput.value;
    var bodyValue = bodyInput.value;
    var userCard = new Card(titleValue, bodyValue);
    var cardHTML = userCard.saveToStorage();

    cardSection.innerHTML += cardHTML;
    titleInput.value = "";
    bodyInput.value = "";
    submit.disabled = true;
})

titleInput.addEventListener('keydown', enableButton);
bodyInput.addEventListener('keydown', enableButton);

function enableButton() {
  var titleValue = titleInput.value;
  var bodyValue = bodyInput.value;

  if (titleValue !== "" && bodyValue !== "") {
    submit.disabled = false;
  }
}
