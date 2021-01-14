// const scss = require('../scss/index.scss');
import '../scss/index.scss';
import MobileMenu from './modules/MobileMenu';
import ScrollReveal from './modules/Scroll';
import StickyHeader from './modules/StickyHeader';

if (module.hot) {
  module.hot.accept();
}

new StickyHeader();
new ScrollReveal(document.querySelectorAll('.feature-item'), 75);
new ScrollReveal(document.querySelectorAll('.testimonial'), 60);
new MobileMenu();

let modal;

document.querySelectorAll('.open-modal').forEach((el) => {
  el.addEventListener('click', (e) => {
    e.preventDefault();
    if (typeof modal == 'undefined') {
      import(/* webpackChunkName: "modal" */ './modules/Modal')
        .then((x) => {
          modal = new x.default();
          setTimeout(() => modal.openModal(), 20);
        })
        .catch(() => console.log('error loading'));
    } else {
      modal.openModal();
    }
  });
});
