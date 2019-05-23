# CodeNames
An in-person, party game style implementation of the popular board game "CodeNames" that can be played on any two machines, in the same room, with an internet connection.

To play, both machines need to have the code. One machine will belong to the CodeMakers, the other machine to the CodeBreakers.

The CodeMakers open up RunGame.html, click "Maker" and enter their names. The blue player always goes first.

The CodeBreakers then open the same file, click "Breaker." They can then choose to add additional words to the basic package of words (some categories are given as examples, but users can add categories to words.js).

The playing board then appears. The blue codeMaker's job is to try to get the breakers to guess the blue words, and the red codeMaker's job is to try to get the breakers to guess the red words. If the assassin word is guessed at anytime, that team automatically loses.

On each turn, the codeMaker whose turn it is gives a clue, which must be one noun, and a number. For example, they could say "planets, 2." This communicates to the breakers that there are two words in that codeMaker's color that relate to the clue "planets." The breakers click on words to guess them.

Obviously there are some bugs to be worked out, but the game is ready to play. Enjoy!
