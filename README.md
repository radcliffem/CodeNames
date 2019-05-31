# CodeNames
An in-person, party game style implementation of the popular board game "CodeNames" that can be played on any two machines, in the same room, with an internet connection. The connection uses the peerJS library, which can be found at https://peerjs.com/index.html. My greatest thanks to tantalor (tantalor.github.com) for his help in getting this project moving.

To play, you need two machines. One machine will belong to the CodeMakers, the other machine to the CodeBreakers.

Both parties agree on a name for their game. It must be entered exactly the same way on both computers to work, including capitalization.

The CodeMakers enter the name of the game, then click "Maker" and enter their names. The blue player always goes first.

The CodeBreakers then enter the name of the game, and click "Breaker." They can then choose to add additional words to the basic package of words (some categories are given as examples, but users can add categories to words.js).

The playing board then appears. The blue codeMaker's job is to try to get the breakers to guess the blue words, and the red codeMaker's job is to try to get the breakers to guess the red words. If the assassin word is guessed at anytime, that team automatically loses.

On each turn, the codeMaker whose turn it is gives a clue, which must be one word (two words are permitted if they are part of a common noun, like "outer space" or "Gordon Ramsay"), and a number. For example, they could say "planets, 2." This communicates to the breakers that there are two words in that codeMaker's color that relate to the clue "planets." The breakers click on words to guess them. Breakers can make as many guesses as they like in a turn, or they can end their turn when they feel they have all the words. Guessing a word that does not belong to the correct color automatically ends their turn. Guessing the assassin word ends the game.

A player wins if all their words are guessed, or if the other team clicks on the assassin.
