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
