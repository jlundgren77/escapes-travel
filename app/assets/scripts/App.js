// const scss = require('../scss/index.scss');
import '../scss/index.scss';
import MobileMenu from './modules/MobileMenu';
import ScrollReveal from './modules/Scroll';
import StickyHeader from './modules/StickyHeader';

if (module.hot) {
  module.hot.accept();
}

let stickyHeader = new StickyHeader();
new ScrollReveal(document.querySelectorAll('.feature-item'), 75);
new ScrollReveal(document.querySelectorAll('.testimonial'), 60);
const menu = new MobileMenu();
