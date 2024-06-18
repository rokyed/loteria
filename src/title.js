import {Element} from 'wrench-set'
import * as style from './title.module.scss'
export default class Title extends Element {
	constructor() {
		super({
      innerHTML: `<h1>Loteria!!</h1>`,
			className: style.title,
			renderTo: document.body
		})
	}
}
