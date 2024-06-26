import Title from './title.js'
import Deck from './deck.js'
import Bar from './bar.js'
import Header from './header.js'
import './main.scss'

class Game {
	constructor() {
    this.header = new Header({
      game: this
    });
		this.title = new Title({

		})
		this.deckView = new Deck({
			game: this
		})
		this.bar = new Bar({
			game: this
		})
		this.reset()
	}
	togglePlayButton(bEn) {
		this.bar.togglePlayButton(bEn)
    this.header.togglePlayButton(bEn)
	}

	toggleButtons(bEn, bInit) {
		this.bar.toggleButtons(bEn, bInit)
    this.header.toggleButtons(bEn, bInit)
	}

	prepareDeck() {
		this.deck = []

		for (let i = 1; i <= 54; i++)
			this.deck.push(i)
	}

	moveCardFromDeck(index) {
		if (this.deck.length == 0)
			return

		this.spentCards.push(this.deck[index])
		this.deck.splice(index, 1)
	}

	reset() {
		this.spentCards = []
		this.prepareDeck()
		this.deckView.update(this.spentCards)
		this.toggleButtons(true, true)
	}

	play() {
		let rand = Math.floor(Math.random(Date.now()) * this.deck.length)

		this.moveCardFromDeck(rand)

		this.deckView.update(this.spentCards, this.deck)
	}
}

window.game = new Game()
