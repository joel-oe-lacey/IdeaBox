//target the submit button
var titleInput = document.querySelector('.form-input-title');
var bodyInput = document.querySelector('.form-textarea-body');
var submit = document.querySelector('.form-button-save');
var cardSection = document.querySelector('.section-cards');

//add event listner for click
submit.addEventListener('click', function() {
    var titleValue = titleInput.value;
    var bodyValue = bodyInput.value;

    var userCard = new Card(titleValue, bodyValue);
    var cardHTML = userCard.saveToStorage();

    cardSection.innerHTML += cardHTML;
});

cardSection.addEventListener('click', function() {
  if (event.target.id === 'delete') {
    event.target.parentNode.parentNode.parentNode.remove();
  }
});
