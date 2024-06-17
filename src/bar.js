import {Element} from 'wrench-set'
import * as style from './bar.module.scss'
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

	togglePlayButton(bEn) {
		let el = this.getElement('[data-button="play"]')

		if (bEn)
			el.removeAttribute('data-disabled')
		else
			el.setAttribute('data-disabled', 'true')
	}

	toggleButtons(bEn) {
		let el = this.getElement()
		let buttons = el.querySelectorAll('[data-button]')

		for (let i = 0; i < buttons.length; i++)
			if (bEn)
				buttons[i].removeAttribute('data-disabled')
			else
				buttons[i].setAttribute('data-disabled', 'true')
	}

	onClick(e) {
		let target = e.getTarget('[data-button]')

		if (e.getTarget('[data-disabled]'))
			return

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
