import {Element} from 'wrench-set'
import Data from './data.js'
import style from './deck.scss'


export default class Deck extends Element {
	constructor() {
		super({
			renderTo: document.body,
			className: style.deck,
			innerHTML: `
				<div data-type="deck">
				</div>
			`
		})
	}

	update(spentCards) {
		let html = ''
		for (let i = spentCards.length -1; i >= 0; i--)
			html += this.generateCard(spentCards[i])

		this.getElement('[data-type="deck"]').innerHTML = html
	}

	generateCard(id) {
		return `
		<div data-card="${id}">
			<img src="${Data.IMAGES[id]}"/>
			<div>${Data.CARDS[id]}</div>
		</div>
		`
	}
}
