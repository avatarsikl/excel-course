import {capitalize} from './utlis';

// абстрактный класс для добавления слушателей к элементам
export class DomListener {
	constructor($root, listeners = []) {
	if (!$root) {
		throw new Error('No such provided for DomListener');
	}
		this.$root = $root;
		this.listeners = listeners;
	}

	// метод для добавления слушателей
	initDOMListeners() {
		this.listeners.forEach(listener => {
			const method = getMethodName(listener);
			
			if (!this[method]) {
			throw new Error(`Method 
			${method} is not implemented in 
			${this.name || ''} Component`);
			}
			// предотвращяем потерю контекста
			this[method] = this[method].bind(this);
			this.$root.on(listener, this[method]);
		});
	}
	// метод для удаления слушателей
	removeDOMListeners() {
		this.listeners.forEach(listener => {
			const method = getMethodName(listener);
			this.$root.off(listener, this[method]);
		});
	}
}

// input => onImput
function getMethodName(eventName) {
	return 'on' + capitalize(eventName);
}


