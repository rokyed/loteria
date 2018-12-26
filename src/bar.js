import {Element} from 'wrench-set'
import style from './bar.scss'
export default class Bar extends Element {
	constructor(config) {
		super({
			renderTo: document.body,
			className: style.bar,
			innerHTML: `
				<div data-button="play">Jugar</div>
				<div data-button="reset">Reinitiar</div>
			`
		})

		this.game = config.game

		this.on('click', this.onClick)
	}

	onClick(e) {
		let target = e.getTarget('[data-button]')

		if (!target)
			return

		let action = target.getAttribute('data-button')

		switch (action) {
			case 'play':
				this.game.play()
				break
			case 'reset':
				this.game.reset()
				break
		}
	}
}
