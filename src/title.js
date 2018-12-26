import {Element} from 'wrench-set'
import style from './title.scss'
export default class Title extends Element {
	constructor() {
		super({
			innerHTML: `Loteria!!`,
			className: style.title,
			renderTo: document.body
		})
	}
}
