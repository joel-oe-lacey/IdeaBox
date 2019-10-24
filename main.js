//target the submit button
var titleInput = document.querySelector('.form-input-title');
var bodyInput = document.querySelector('.form-textarea-body');
var submit = document.querySelector('.form-button-save');
var cardSection = document.querySelector('.section-cards');

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
  } else if (event.target.id === 'star') {
    console.log(event);
    var src = event.target.src;
    if (src.includes('active')) {
      event.target.src = "assets/star.svg";
    } else {
      event.target.src = "assets/star-active.svg";
    }
  }
});
