# _Let's Play: Ancient Greek Punishment: Chess Edition_ Closing Statement

(__Note__: throughout this text, I’ll be linking to process materials generated as part of the project in its [code repository](https://github.com/pippinbarr/lets-play-ancient-greek-punishment-chess-edition/blob/master/process/README.md). The links are both to specific moments I added relevant code to the project and wrote notes about it and to the process journal I wrote throughout design and development. This approach to process documentation is part of the [Games as Research](https://gamesasresearch.com/) project.)

[_Let's Play: Ancient Greek Punishment: Chess Edition_](https://pippinbarr.github.io/lets-play-ancient-greek-punishment-chess-edition/) is the eighth addition to my overall series of games based on the mythological punishments of Sisypuhs, Prometheus, Tantalus, the Danaids, and (less canonically) Zeno of Elea. In _Chess Edition_ I sought to tell these stories of punishment through the language of chess (and perhaps specifically computer chess).

As the series accumulates, it continues to please me as a way to think through specifics of design - with the core concepts (the myths) set in place, the decisions to be made a distilled down to close reading of the design implications of a particular conceptual take ("what if you were the boulder resisting Sisyphuhs?") or a specific platform (how do I represent these ideas through the language of chess?). Chess is particularly satisfying in that it represents an almost platonic understanding of a "game", so translating the myths to chess feels like an ultimate game-designer activity. Because chess is such a clear set of rules and representations, you end up getting a kind of extreme clarity on changing those elements "toward" the myths. More specifically, I think it feels very much like an exercise in treating both chess and the myths as powerful _metaphors_ in order to find ways to bring them together.

Beyond this kind of highfalutin design stuff, this project also interests me significantly at the level of the underlying technology. I'm using [chess.js](https://github.com/jhlywa/chess.js), a JavaScript chess library, and [chessboard.js](https://chessboardjs.com/), a JavaScript chessboard, and both naturally have a particular "grain" to how they do their jobs, making some things easier than others. I find it nice to think about chess.js especially as manifestation of "pure chess" in code form, giving chess an almost tangible agency in the project.

In the following, I want to focus in on each of the five sub-games in _Chess Edition_ in order to reflect on the design trajectories followed to reach their final form. It doesn't always look like it at the end, but game design and development is an uncertain road that takes serious time and effort to find your way along. A major part of my documentation process is about exposing those elements of my games openly.

## Sisyphus undone

## The apple king

## What's the right game-feel for having your liver pecked out?

## Chess as a metaphor for water

## Algebraic paradox notation

---



- Sisyphus: the easiest conceptually, working with the grain of the engine produces a very straightforward design and implementation that "just works". The sense of underlying "truth" is nice.
  - Working with the chess system to produce an effect
  - underneath you literally have game.undo() and the fact that board.position() animates produces the effect of Sisyphus, rather than needing to animate it myself.
  - It's "true" in this sense. It "just works" relative to the system of libraries.

- Tantalus: the story of working out the core visual comedy, and then building toward genuinely interactive comedy, metaphohr
  - Comedy and chess, sight gag (king off board),
  - breaks engine [0a08d10](https://github.com/pippinbarr/lets-play-ancient-greek-punishment-chess-edition/commit/0a08d10ec76cd546afcdca85a014dd221adf6631)
  - -> all pieces off the board [4452f40](https://github.com/pippinbarr/lets-play-ancient-greek-punishment-chess-edition/commit/4452f40d6b94f3bdc7c0edfdb3e4d561dc0a7527) [process reflection](https://github.com/pippinbarr/lets-play-ancient-greek-punishment-chess-edition/blob/master/process/process-journal.md#tantalus) "Philosophically this one would be suggesting that part of the point of chess is the destruction of the opposing army, which is less pure than solely thinking in terms of capturing the king"
  - -> king off board functional, "Tantalus looks so much better with just the king gone. The joke is much stronger, and there's something terrible and funny about playing chess in this context, knowing  you cannot possibly win and can at best end up capturing every black piece, only to have the king perpetually out of reach." [8168f81](https://github.com/pippinbarr/lets-play-ancient-greek-punishment-chess-edition/commit/8168f81dbc5966b5b86843a46c6c6c90052e9fdd)
  - -> tuned physical comedy (king steps off the board as Black's first move, followed by first move) [eda45d2](https://github.com/pippinbarr/lets-play-ancient-greek-punishment-chess-edition/commit/eda45d2eed90bfbef7d20695f4a860a91b8b4014)
  - -> missed opportunity (king steps off the board as Black's first move and it's notated - fix now?!). Breaking the rules of the game and engine led to trouble. Not having a king on the board for one side is a problem in the engine that had to be fixed deep down

- Prometheus: the issue of "feel" in relation to this design process - the original prometheus is my favourite because of the sense of "being done to" it produces, getting the right feel is tricky. Small adjustments make big differences.
  - the issue of the "non-move" - chess.js doesn't allow you to play a move that doesn't affect anything, so you have to fool it into changing the current turn.
  - Design process going from king that can move [ec8423d](https://github.com/pippinbarr/lets-play-ancient-greek-punishment-chess-edition/commit/ec8423da8b8bbd0521dba2c1e412822c7e48f6f5) (concerns about stalemate)
  - -> check=checkmate (king can't move) [2110d10](https://github.com/pippinbarr/lets-play-ancient-greek-punishment-chess-edition/commit/2110d10d54966eb9cbd5a4f77f988f3ee4c44064) [journal](https://github.com/pippinbarr/lets-play-ancient-greek-punishment-chess-edition/blob/master/process/process-journal.md#prometheus-bound)
  - -> "pecking" version (from Jonathan) serving as a reference back to the myth and original game + related to our work on Rogess [fe2c3d0](https://github.com/pippinbarr/lets-play-ancient-greek-punishment-chess-edition/commit/fe2c3d07ee057d789982ab99eccf03c6e17edffc) [journal](https://github.com/pippinbarr/lets-play-ancient-greek-punishment-chess-edition/blob/master/process/process-journal.md#feeling-peckish).
  - Importance of black AI being able to checkmate an opponent [80a6d24](https://github.com/pippinbarr/lets-play-ancient-greek-punishment-chess-edition/commit/80a6d24c8e2451989fff9b0704f23e822eb0ccc2)

- Danaids: major idea shift due to unclear metaphor, incorporation of extended understanding of "chess as a game"
  - Initial concept was to have pieces respawn on capture [f68112a](https://github.com/pippinbarr/lets-play-ancient-greek-punishment-chess-edition/commit/f68112a96ac832d648e08504ad4cdedadaced554) - and King teleports out of checkmate [cc1baea](https://github.com/pippinbarr/lets-play-ancient-greek-punishment-chess-edition/commit/cc1baea23279a62c229be3831f723fea744c2623). Issue of risking a white win, which makes no sense in context [journal](https://github.com/pippinbarr/lets-play-ancient-greek-punishment-chess-edition/blob/master/process/process-journal.md#basic-feature-complete-further-design-thoughts-monday-8-april-2019-1211pm)
  - Board set-up as a form of play (Bart and the sociology of chess).
  - Also reflects a specific part of the code itself (board setup is built into board.js). Totally different game-feel and thought process from the others - literally playing a different game. Falling pieces as metaphorical water, a liquid behavior as they "drip" from the board [c356883](https://github.com/pippinbarr/lets-play-ancient-greek-punishment-chess-edition/commit/c35688324f98b3b8d693e84a47b88113ef58795b). [journal](https://github.com/pippinbarr/lets-play-ancient-greek-punishment-chess-edition/blob/master/process/process-journal.md#danaids-overhaul)
  - (Needed custom placement because default is drag-oriented which conflicts with the rest of the game.)
  - Metaphor as a way through the design issues around the abstraction of chess and the "concrete" nature of myth (but perhaps that's the thing: the myths are total metaphors themselves...).

- Zeno: chess notation as a venue to express the core idea (with the board being almost secondary in terms of accurate rendering?)
  - issue of notation perhaps the most interesting here, relationship between algebraic notation and the idea of mathematical notation to reflect an infinite geometric series.
  - Funny that the series actually solves the problem (for infinite steps) but used step by steps is a disaster. This does use the check=checkmate idea. Archimedes as the God in this version (he came up with Geometric series and is using it to punish Zeno which is pretty funny).
  - Issue of PGN particularly when dealing with files (letters) [7c18f8d](https://github.com/pippinbarr/lets-play-ancient-greek-punishment-chess-edition/commit/7c18f8db0161d18b086751a915a3d7dd2eeb04c9),
  - "algebraic" solution [413818d](https://github.com/pippinbarr/lets-play-ancient-greek-punishment-chess-edition/commit/413818dc204bd663f21fa49e5997e806ce8bf9f0) [journal](https://github.com/pippinbarr/lets-play-ancient-greek-punishment-chess-edition/blob/master/process/process-journal.md#the-pgn-of-zeno).
  -  Aside: Conflict with default behaviour of chessboard that uses drag-based movement which wouldn't be possible (need to be able to control the concept of movement through space at the chess level). [df0bc89](https://github.com/pippinbarr/lets-play-ancient-greek-punishment-chess-edition/commit/df0bc89c8bfba4027d7ee5e44a4b374282ba89fc).
  - (Consistent issue of checkmate [journal](https://github.com/pippinbarr/lets-play-ancient-greek-punishment-chess-edition/blob/master/process/process-journal.md#the-checkmating-of-zeno))
