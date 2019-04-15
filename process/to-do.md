## General

- ~~Get basic interactive chess board working (chessboard.js)~~
- ~~Get some version of chess.js doing something~~
- ~~Implement [Chess AI](https://medium.freecodecamp.org/simple-chess-ai-step-by-step-1d55a9266977)~~
- ~~__YUP. IT CAN BEAT YOU IN 8__ Can this chess beat you in 53 moves?~~
- ~~__UH DUMMY, THEY ARE.__ Consider whether to implement the piece location tables (which aren't in their final example)~~
- ~~Think about how to make this a non-disgusting coding experience (OOP???)~~
- ~~All games need SFX for movement, captures~~
- ~~__IT DID__ Move SFX to Howler in case that gets it working better on mobile?~~
- ~~Do something about the background stuff because it looks a bit unmoored in desktop, esp. in menu (the menu still looks a bit non-amazing in general?)~~

## Menu

- ~~Frame it as matches between the punished and the god~~
- ~~Add logo~~

- ~~Have interstitial information that frames that encounter? (look at some chess references)~~

## Header

- ~~Track wins and losses?~~

## Sisyphus

- ~~Undo the move right after it's made~~
- ~~__IT'S FINE. THERE'S A NATURAL PURITY TO MAINTAINING EXISTING "CHESS" SPEEDS PER CHESSBOARD.JS__ Think about animation speeds (jQuery.animate() myself? Bleagh.)~~
- ~~Show PGN and undo it~~

## Prometheus

- ~~Remove all white pieces except king and let the game run normally~~
- ~~__I THINK I'VE DONE SOMETHING REASONABLE__ Handle stalemate in the move calculations (should avoid unless it's the only move?) (IT IS SURPRISINGLY EASY TO MAKE IT STALEMATE YOU. BOO.)~~
- ~~Handle PGN (can be totally standard)~~
- ~~Handle checkmate by restarting the game~~
- ~~Yes I should add a stalemate check even though it should never happen~~
- ~~Change over so that white can't move, only does a little struggle animation (how would you notate this? Maybe just Ke1 over and over? Hehe.)~~

## Zeno

- ~~Handle piece animation outside chessboard.js (remove the piece from the board once they move it so that the game doesn't think about it - what about e3? Doesn't matter as no response could cause a problem?)~~
- ~~__NOT SURE WHAT THAT WAS, BUT SEEMS OK NOW__ Why does it seem like the AI grinds to a halt in this version???~~
- ~~Work on how it looks (does it look too weird when black pieces overlap the square that the Zeno piece is trying to get to?)~~
- ~~Implement PGN esp. here since it will help a huge amount to clarify  what's going on? Particularly  at tinier amounts of distance. (Maybe once the distance hits 1px we stop "animating" to avoid weirdness)~~
- ~~__MATHEMATICS MY FRIEND!__ How will PGN work for movement between columns?~~
- ~~Handle checkmate (notably we may need black to capture white's king since white is both helpless and could have a king move once the game gets going - but ACTUALLY no because any check would simply be checkmate as white's pieces can't move. Hah.)~~
- ~~Restart game on checkmate~~

## Tantalus

- ~~__LET'S TAKE THE EASY ROUTE FOR NOW__ Fix the fact that chess.js seems to break when you play with no kings (perhaps it's to do with attempting to castle? Or otherwise move something involving the king's square? How to fix this? One option is to move ALL pieces off the board and not have any... the other is to actively change chess.js for this project. Yiiikes.)~~
- ~~Show the black pieces off the top of the board~~
- ~~__LESS OF A PROBLEM NOW? Styling of black pieces isn't great__~~
- ~~__I VASTLY  PREFER JUST THE KING__ How do I feel about this "all the pieces" versus "just the king" approach??? (Maybe we could go with no piece but just the king visible off the board as the "apple"?)~~
- ~~__THIS IS CUTE BUT SOUNDS REALLY COMPLEX AND IS SUCH A DELAYED GAG I'm GOING TO  GUESS NOBODY WOULD SEE IT__ King steps off the board when in check? (And back on when he wouldn't be in check?)~~
- ~~__FUNNY, BUT A BIT UNWEILDY?__ Two separate chessboards one with black one with white? (Bit weird because it's implying black has the same problem - but maybe if it's just the king...)~~
- ~~__I AM A PROGRAMMING GOD__ Fix chess.js to deal with the situation where black has no king~~
- ~~Improve styling of the king off the board (proper alignment etc.)~~
- ~~Handle PGN (can be 100% standard)~~
- ~~I broke the styling~~
- ~~Handle black checkmates white~~
- ~~Yes I should add a stalemate check even though it should never happen~~
- ~~Should the king just step off the board on check? Is that funnerer? What do you do if someone moves onto his square? Can he capture white if they play to e8? Seems like it might introduce too many complexities having it be dynamic? Just animate the king off the board after white's first move?~~

## Danaids

- ~~__JUST A SIMPLE RESPAWN ACTUALLY LOOKS QUITE GOOD, NO PARTICULAR NEED TO ANIMATE IN FANCY WAYS?__ Get a basic version of respawning pieces when captured going~~
- ~~__I WAS AND NOW IT IS FIXED__ Am I seeing some weird behaviour in terms of placement?~~
- ~~PGN (need notation for placement of piece in new position)~~
- ~~__STALEMATE CANNOT HAPPEN TO BLACK BECAUSE BLACK WILL ALWAYS HAVE PIECES__ Handle checkmate (and stalemate even though we think it shouldn't happen)~~
- ~~__THERE WAS A BUG AND I FIXED IT__ Test black checkmated to make sure the king moves away~~
- ~~Handle black checkmates white~~
- ~~Yes I should add a stalemate check even though it should never happen~~
- ~~Uh oh I think this needs to be reworked to have white's pieces fall off the board like water, and need to be replaced (maybe they fall all the way off the screen)~~
- ~~Re-highlight other squares as they become available due to falling pieces? (if that piece is still selected?)~~
- ~~SFX~~
- ~~Do the initial pieces fall fast enough? (Delay clickability of the spares?)~~

## Mobile?

- ~~__THEY ARE. IT'S STILL HELL.__ No reason why not? Are those libraries mobile compatible? I think they are?~~
- ~~Keep going kid~~
- ~~Work on the sizing of the PGN section~~
- ~~__LOOKS LIKE IT WAS A LOCAL HOST THING__ The entire board flickers on every move which is: bad. Might just be a local hosting thing though.~~

## Test

- ~~Send to J+M and Jonathan and...?~~

## Release

- ~~Make press kit~~

- Send to press
- Make webpage for my site
- Sigh about it

## Bugs

- ~~The margin at the top is really irritating and my css sucks~~
- ~~Tantalus black king vanishes on first move~~
- ~~Tantalus black doesn't move~~
