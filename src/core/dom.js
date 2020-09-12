// вызов функции -> объект Dom с набором методов для манипуляции с DOM node
export const $ = {
	getDOM: function(selector) {
		return new Dom(selector);
	},
	create: function(tagname, classes = '') {
	const el = document.createElement(tagname); // DOM node
		if (classes) {
			el.classList.add(classes);
		}
		return this.getDOM(el); // return Dom object с node
	}
};

class Dom {
	constructor(selector) {
		this.$el = typeof selector === 'string'
		? document.querySelector(selector)
		: selector;
	}
	// get/set html в $el
	html(html) {
		// строка которую нужно вставить в элемент get/set
		if (typeof html === 'string') {
			this.$el.insertAdjacentHTML('afterbegin', html);
			return this;
		}
		return this.$el.outerHTML.trim();
	}

	// clear innerHTML of $el
	clear() {
		this.html('');
	}

	// insert node into $el
	append(position, node) {
		if (node instanceof Dom) {
			node = node.$el;
		}
		if (typeof node === 'string') {
			this.$el.insertAdjacentHTML(position, node);
		} else {
			this.$el.insertAdjacentElement(position, node);
		}
		return this;
	}

	closest(selector) {
		return $.getDOM(this.$el.closest(selector));
	}

	getCoords() {
		return this.$el.getBoundingClientRect();
	}

	get data() {
		return this.$el.dataset;
	}

	findAll(selector) {
		return this.$el.querySelectorAll(selector);
	}

	css(params = {}) {
		Object.keys(params).forEach(key => {
			this.$el.style[key] = params[key];
		});
	}

	on(eType, callback) {
		this.$el.addEventListener(eType, callback);
	}

	off(eType, callback) {
		this.$el.removeEventListener(eType, callback);
	}
}

