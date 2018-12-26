import {Element} from 'wrench-set'
import Data from './data.js'
import style from './deck.scss'


export default class Deck extends Element {
	constructor(config) {
		super({
			renderTo: document.body,
			className: style.deck,
			innerHTML: `
				<div data-type="showcase">
				</div>
				<div data-type="deck">
				</div>
			`
		})
		this.game = config.game
		this.data = Data
		this.interval = null
		this.iterator = 0
		this.increment = 1
		this.iteratorTarget = 1
		this.maxIteratorTarget = 60
		this.iteratorInitials = {
			iterator: 0,
			increment: 4,
			iteratorTarget: 1
		}
	}

	update(spentCards, deck) {
		this.fillSpent(spentCards)

		if (spentCards.length > 0)
			this.animate(spentCards[spentCards.length -1], deck)
		else
			this.showcase(false)
	}

	animate(targetId, deck) {
		this.iterator = this.iteratorInitials.iterator
		this.increment = this.iteratorInitials.increment
		this.iteratorTarget = this.iteratorInitials.iteratorTarget
		clearInterval(this.interval)
		this.game.toggleButtons(false)
		this.interval = setInterval(() => {
			if (this.iteratorTarget <= this.iterator){
					this.iterator = 0
					this.iteratorTarget += this.increment

					let rand = Math.floor(Math.random(Date.now()) * deck.length)
					requestAnimationFrame(() => {
						this.showcase(deck[rand])
					})
			}
			this.iterator++

			if (this.iteratorTarget > this.maxIteratorTarget) {
				requestAnimationFrame(() => {
					this.showcase(targetId)
				})
				clearInterval(this.interval)
				this.game.toggleButtons(true)
			}
		},1)
	}

	showcase(id) {
		let el = this.getElement('[data-type="showcase"]')

		if (id === false)
			el.innerHTML = ''
		else
			el.innerHTML = this.generateCard(id)
	}

	fillSpent(spentCards) {
		let html = ''

		for (let i = spentCards.length -2; i >= 0; i--)
			html += this.generateCard(spentCards[i])

		this.getElement('[data-type="deck"]').innerHTML = html
	}

	generateCard(id) {
		if (Data.CARDS[id] === undefined)
			console.log(id)

		return `
			<div data-card="${id}">
				<div data-label="true">${Data.CARDS[id]}</div>
				<div data-image="true" style="background-image: url('${Data.IMAGES[id]}')"></div>
			</div>
		`
	}
}
