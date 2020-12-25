"use strict";

var isScrolling = false;
window.addEventListener("scroll", throttleScroll, false);

function throttleScroll(e) {
  if (isScrolling == false) {
    window.requestAnimationFrame(function () {
      scrolling(e);
      isScrolling = false;
    });
  }

  isScrolling = true;
}

document.addEventListener("DOMContentLoaded", scrolling, false);

function isPartiallyVisible(el) {
  var elementBoundary = el.getBoundingClientRect();
  var top = elementBoundary.top;
  var bottom = elementBoundary.bottom;
  var height = elementBoundary.height;
  return top + height >= 0 && height + window.innerHeight >= bottom;
}

function isFullyVisible(el) {
  var check = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  var elementBoundary = el.getBoundingClientRect();
  var top = elementBoundary.top;
  var bottom = elementBoundary.bottom;
  var right = elementBoundary.right;
  var left = elementBoundary.left;

  if (check) {
    console.log(top, bottom, right, left);
  }

  return top >= 0 && bottom <= window.innerHeight && right <= window.innerWidth && left >= 0;
}

function heightVisible(el) {
  var elementBoundary = el.getBoundingClientRect();
  var top = elementBoundary.top;
  var bottom = elementBoundary.bottom;
  return top >= 0 && bottom <= window.innerHeight;
}

var foundationBlock = document.getElementById('foundation-block');
var foundationItems = foundationBlock.querySelectorAll('.foundation-item-wrap');
var itemsCount = foundationItems.length - 1;
var left = 0;

function scrolling(e) {
  if (heightVisible(foundationBlock)) {
    foundationBlock.addEventListener('mousewheel', foundationBlockAnimation);
  } else {
    foundationBlock.removeEventListener('mousewheel', foundationBlockAnimation);
  }
}

function foundationBlockAnimation(event) {
  var delta = 0;

  if (event.wheelDelta) {
    delta = event.wheelDelta / 120;
  }

  var i = 0;
  console.log(left);

  if (!isFullyVisible(foundationItems[itemsCount]) && left >= 0) {
    var timer;
    var step = 100;

    while (i++ < step) {
      foundationBlock.setAttribute('style', "left: -".concat(left, "px"));

      if (delta < 0) {
        left += .5;
      } else {
        if (left > step) {
          left -= .5;
        }
      }

      i++;
    }
  }
}