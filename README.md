# IdeaBox

Ideabox was an introductory group project, intended to build upon our abilities at comp recreation, and javascript functionality. 

## The Comp
![the_comp](https://frontend.turing.io/projects/module-1/assets/ideabox-group/desktop.jpg)
![mobile_comp](https://frontend.turing.io/projects/module-1/assets/ideabox-group/mobile.jpg)

We were looking to recreate the design specs provided as closely as possible. The page was to allow for smooth responsive transitions between screen sizes, and was intended to support both mobile and desktop viewing.

Functionally the page should allow users to enter in details on cards which would display in the card section towards the bottom of the page. These cards were to persist on page load, and could be favorited or deleted. Users could live filter by typing into the search bar, and could also click a button to display only the starred cards. 

## Result
Ultimate the page ended closely aligned to the comp. The functionality matched with intended functions. The project itself was managed in an agile like workflow, tracked through Github Projects. Regular code reviews were conducted and all changes were filed with a PR template to outline the scope and approach of the change.

Several problems were encountered when trying match functionality. As an example of one, all cards created were instantiations of an Idea class, those card objects were then used to dynamically input and pull data as needed. However when pushed to local storage, the class instantiation was lost, as such the object had to be reinstantiated on load which created ID conflicts. 

The end result can be viewed below:
https://joel-oe-lacey.github.io/IdeaBox/

## Contributors
https://github.com/ryan-novak
https://github.com/joel-oe-lacey
