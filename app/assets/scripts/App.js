// const scss = require('../scss/index.scss');
import '../scss/index.scss';
import MobileMenu from './modules/MobileMenu';

if (module.hot) {
  module.hot.accept();
}

const menu = new MobileMenu();
