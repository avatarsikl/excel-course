// if (process.env.NODE_ENV === 'development') {
//   require('./index.html');
// }
import './scss/index.scss';
import {Excel} from './components/excel/Excel';
import {Toolbar} from './components/toolbar/Toolbar';
import {Header} from './components/header/Header';
import {Formula} from './components/formula/Formula';
import {Table} from './components/table/Table';

// таблица рендерится и крепится к DOM элементу #app
// принимает параметры, где указываются элементы для рендера
const excel = new Excel('#app', {
  components: [Header, Toolbar, Formula, Table],
});
console.log(excel);
excel.render();
