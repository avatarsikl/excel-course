const CODES = {
	A: 65,
	Z: 90,
};

function toCell() {
	return `
		<div class="column" contenteditable></div>
	`;
}

function createCol(col) {
	return `
		<div class="column">${col}</div>
	`;
}

function createRow(index, content) {
	return `
		<div class="row">
			<div class="row-info">${index ?? ''}</div>
			<div class="row-data">${content ?? 'Не определено'}</div>
		</div>
	`;
}

export function createTable(rowsCount = 15, cellCount = 5) {
	const colsCount = CODES.Z - CODES.A + 1;
	const rows = [];

	const cols = new Array(colsCount)
	.fill('')
	.map( (el, index) => String.fromCharCode(CODES.A + index))
	.map( el => createCol(el))
	.join('');

	rows.push(createRow(null, cols)); // первая строка с особыми значениями

	for (let i = 0; i < rowsCount; i++) {
		const cells = new Array(colsCount)
		.fill('')
		.map( (el, index) => toCell(el))
		.join('');
		rows.push(createRow(i + 1, cells));
	}
	return rows.join('');
}
