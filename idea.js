class Idea {
  constructor(title, body) {
    this.id = Date.now();
    this.title = title;
    this.body = body;
    //should be false by default
    this.starred = false;
  }

  saveToStorage() {
    return `<article class="card" id="${this.id}">
              <div class="card-header">
                <button class="card-button-star" type="button" name="star-button"><img id="star" src="assets/star.svg"/></button>
                <button class="card-button-delete" type="button" name="delete-button"><img id="delete" src="assets/delete.svg"/></button>
              </div>
              <div class="card-body">
                <h3 class="card-header-title">${this.title}</h3>
                <p class="card-p-text">${this.body}</p>
              </div>
              <div class="card-footer">
                <button class="card-button-edit" type="button" name="comment-button"><img id="comment" src="assets/comment.svg"/></button>
                <label class="button-label-edit" for="">Comment</label>
              </div>
            </article>`
  }
}
