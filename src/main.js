import Deck from './deck.js'
import Bar from './bar.js'
import './main.scss'

class Game {
	constructor() {
		this.deckView = new Deck({
			game: this
		})
		this.bar = new Bar({
			game: this
		})
		this.reset()
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
	}

	play() {
		let rand = Math.floor(Math.random(Date.now()) * this.deck.length)

		this.moveCardFromDeck(rand)

		this.deckView.update(this.spentCards)
	}
}

window.game = new Game()
