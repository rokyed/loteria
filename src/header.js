import {Element} from 'wrench-set'
import * as style from './header.module.scss'
export default class Header extends Element {
	constructor(config) {
		super({
			renderTo: document.body,
			className: style.header,
			innerHTML: `
				<button data-button="reset">Reiniciar</button>
			`
		})

		this.game = config.game

		this.on('click', this.onClick)
	}

	togglePlayButton(bEn) {
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
