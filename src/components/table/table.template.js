const CODES = {
	A: 65,
	Z: 90,
};

function toCell(_, col) {
	return `
		<div class="column" contenteditable data-col="${col}"></div>
	`;
}

function createCol(col, index) {
	console.log(index);
	return `
		<div class="column" data-type="resizable" data-col="${index}">
		${col}
		<div class="col-resize" data-resize="col"></div>
		</div>
		
	`;
}

function createRow(index, content) {
	const resize = index ? 
	'<div class="row-resize" data-resize="row"></div>' 
	: '';
	return `
		<div class="row" data-type="resizable">
			<div class="row-info">
			${index ?? ''}
			${resize}
			</div>
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
	.map( (el, index)=> createCol(el, index))
	.join('');

	rows.push(createRow(null, cols)); // первая строка с особыми значениями

	for (let i = 0; i < rowsCount; i++) {
		const cells = new Array(colsCount)
		.fill('')
		.map( (el, index) => toCell(el, index))
		.join('');
		rows.push(createRow(i + 1, cells));
	}
	return rows.join('');
}
