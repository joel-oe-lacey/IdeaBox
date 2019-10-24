When user clicks submit
  1) capture user input
    1.1) assign value of input and text area to variables
  2) instantiate new instance of class Card
    2.1) call Unique ID function
      2.1.1) create random string/number
      2.1.2) check if that string/number exists in array of all IDs
      2.1.3) if so generate new one
      2.1.4) if not return ID, push to total ID array
    2.2) assign title and body based on input variables
  3) call saveToStorage method
    3.1) injects inner html into cards-section


For star functionality
//need to store an array of objects of all cards
//need to add card object to array otherwise it's lost after click
//also need to store ID value somewhere in the HTML of the card so it can be referenced back later
//to change star value need to change image based on star status
//but also need to go into total card array list, reference ID value of card, and set this.starred to true, do inverse if unchecking.
