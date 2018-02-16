var utility = {

  // Removes class from an element using RegEx to seacrch for class in ClassList
  removeClass: function (el, className) {
    if (el.classList)
      el.classList.remove(className);
    else
      el.className = el.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
  },

  // Adds a class to an element by adding on to ClassList
  addClass: function (el, className) {
    if (el.classList)
      el.classList.add(className);
    else
      el.className += ' ' + className;
  },

  // Gets the full height of the page by getting the heighest element in the page
  getDocumentHeight: function () {
    var body = document.body,
    html = document.documentElement;

    var height = Math.max( body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight );

    return height;
  }

}

// Header shows on scroll up & Hides on scroll down
var header = {
  header: document.getElementById('header'),
  scrolled: null,
  lastScrollTop: 0,
  threshold: 5,
  navbarHeight: null,

  // Initialize function on scroll
  init: function () {
    var self = this;
    this.setOffsetHeight();
    window.addEventListener('scroll', function () {
      self.setScroll();
    })
  },

  // Set OffsetHeight from Header
  setOffsetHeight: function () {
    this.navbarHeight = this.header.offsetHeight;
  },

  // Scroll event evaluated and sets scroll state
  setScroll: function () {
    self = this;
    this.scrolled = true;

    setInterval(function () {
      if (self.scrolled) {
        self.handleScroll();
        self.scrolled = false;
      }
    }, 250);
  },

  // Handles the actual scroll event and ignores if scroll is below threshold
  handleScroll: function () {
    var scrollTop = window.pageYOffset;

    if (Math.abs(this.lastScrollTop - scrollTop) <= this.threshold) {
      return;
    }

    if (scrollTop > this.lastScrollTop && scrollTop > this.navbarHeight) {
      utility.removeClass(this.header, 'header-down');
      utility.addClass(this.header, 'header-up');
    } else {
      if(scrollTop + window.outerHeight < utility.getDocumentHeight()) {
        utility.removeClass(this.header, 'header-up');
        utility.addClass(this.header, 'header-down');
      }
    }

    this.lastScrollTop = scrollTop;
  }
}

// Initialize Module
header.init();