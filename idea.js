class Idea {
  constructor(card) {
    this.id = card.id;
    this.title = card.title;
    this.body = card.body;
    this.starred = card.starred;
  }

//use this for local storage
//move HTML card insert to helper function
  saveToStorage(userCard) {
    var jsonObject = JSON.stringify(userCard);
    localStorage.setItem(this.id, jsonObject);
  };

  deleteFromStorage(passedEvent) {

  };

  updateIdea(passedEvent) {

  };
}
