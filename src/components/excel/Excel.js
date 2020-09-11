import {$} from '@core/dom';

export class Excel {
  constructor(selector, options) {
    this.$el = $.getDOM(selector); 
    this.components = options.components ?? [];
  }
  render() {
	this.$el.append('afterbegin', this.__getRoot());

	this.components.forEach(component => {
		component.init();
	});
  }

  __getRoot() {
	const $root = $.create('div', 'excel'); // obj Dom с selector = div.excel
	this.components = this.components.map(Component => {
		// корневой div для каждого компонента
		const $elDOM = $.create('div', Component.className);
		const component = new Component($elDOM);
		console.log(component);
		$elDOM.html(component.toHTML());
		$root.$el.append($elDOM.$el);
		return component;
	});
	return $root;
  }
}
