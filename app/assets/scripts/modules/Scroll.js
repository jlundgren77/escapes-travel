import throttle from 'lodash/throttle';
import debounce from 'lodash/debounce';
class ScrollReveal {
  constructor(els, threshold) {
    this.itemsToReveal = els;
    this.threshold = threshold;
    this.browserHeight = window.innerHeight;
    this.hideInitial();
    this.scrollThrottle = throttle(this.calcCaller, 200).bind(this);
    this.events();
  }

  events() {
    window.addEventListener('scroll', this.scrollThrottle);
    window.addEventListener(
      'resize',
      debounce(() => {
        this.browserHeight = window.innerHeight;
      }, 333)
    );
  }

  calcCaller() {
    this.itemsToReveal.forEach((el) => {
      if (el.isRevealed == false) {
        this.isScrolledTo(el);
      }
    });
  }

  isScrolledTo(el) {
    if (window.scrollY + this.browserHeight > el.offsetTop) {
      let scrollY = (el.getBoundingClientRect().top / this.browserHeight) * 100;
      if (scrollY < this.threshold) {
        el.classList.add('reveal-item--is-visible');
        el.isRevealed = true;

        if (el.isLastItem) {
          window.removeEventListener('scroll', this.scrollThrottle);
        }
      }
    }
  }
  hideInitial() {
    this.itemsToReveal.forEach((el) => {
      el.classList.add('reveal-item');
      el.isRevealed = false;
    });
    this.itemsToReveal[this.itemsToReveal.length - 1].isLastItem = true;
  }
}

export default ScrollReveal;
