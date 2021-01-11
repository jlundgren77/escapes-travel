// const scss = require('../scss/index.scss');
import '../scss/index.scss';
import MobileMenu from './modules/MobileMenu';
import ScrollReveal from './modules/Scroll';

if (module.hot) {
  module.hot.accept();
}

new ScrollReveal(document.querySelectorAll('.feature-item'), 75);
new ScrollReveal(document.querySelectorAll('.testimonial'), 60);
const menu = new MobileMenu();
