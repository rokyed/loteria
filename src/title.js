import {Element} from 'wrench-set'
import * as style from './title.module.scss'
export default class Title extends Element {
	constructor() {
		super({
			innerHTML: `Loteria!!`,
			className: style.title,
			renderTo: document.body
		})
	}
}
