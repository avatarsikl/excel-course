import { $ } from '../../core/dom';

export function reszieHandler($root, e) {
	e.preventDefault();
			const $resizer = $.getDOM(e.target);
			const $parent = $resizer.closest('[data-type="resizable"]');
			const coords = $parent.getCoords(); // статическое значение
			const type = $resizer.data.resize;
			const sideProp = type === 'col' ? 'bottom' : 'right';
			let value;
			$resizer.css({
				opacity: 1,
				[sideProp]: '-5000px',
			});

			document.onmousemove = e => {
				if (type === 'col') {
					const delta = e.pageX - coords.right;
					value = coords.width + delta;
					$resizer.css({
						right: -delta + 'px',
					});
					document.body.style.cursor = 'col-resize';
				} else {
					const delta = e.pageY - coords.bottom;
					value = coords.height + delta;
					$resizer.css({
						bottom: -delta + 'px',
					});
					document.body.style.cursor = 'row-resize';
				}
			};

			document.onmouseup = e => {
				if (type === 'col') {
					$parent.css({width: value + 'px'});
					$root.findAll(`[data-col="${$parent.data.col}"]`)
					.forEach(el => el.style.width = value + 'px' );
				} else {
					$parent.css({height: value + 'px'});
				}
				document.body.style.cursor = '';
				$resizer.css({
					opacity: '',
					bottom: 0,
					right: 0,
				});
				document.onmouseup = document.onmousemove = null;
			};
}
