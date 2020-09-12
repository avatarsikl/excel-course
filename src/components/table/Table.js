import { ExcelComponent } from '@core/ExcelComponent';
import { shouldResize } from './table.functions';
import { reszieHandler } from './table.resize';
import { createTable } from './table.template';


export class Table extends ExcelComponent {
	static className = `excel__table`;
	constructor($root) {
		super($root, {
			listeners: ['mousedown']
		});
	}
	toHTML() {
		return createTable();
	}

	onMousedown(e) {
		if (shouldResize(e)) {
			reszieHandler(this.$root, e);
		}
		this.ondrugstart = e => false;
	}
}
