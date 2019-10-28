class Idea {
  constructor(title, body) {
    this.id = Date.now();
    this.title = title;
    this.body = body;
    //should be false by default
    this.starred = false;
  }

//use this for local storage
//move HTML card insert to helper function
  saveToStorage(userCard) {
    var jsonObject = JSON.stringify(userCard);
    localStorage.setItem(this.id, jsonObject);
  }
}
