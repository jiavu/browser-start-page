
/**
 * Horizontal Click and Drag Srolling
 * Base code from:
 * https://codepen.io/toddwebdev/pen/yExKoj
 * A pen by ToddWebDev
 * modified by jiavu (me).
 * @param {HTMLElement} element - e. g. React element ref
 */
function dragScroll(element) {
  //const slider = document.querySelector(element);
  const slider = element; // trying out with React element Ref
  let isDown = false;
  let startX;
  let scrollLeft;

  slider.addEventListener('mousedown', e => {
    isDown = true;
    slider.classList.add('active');
    startX = e.pageX - slider.offsetLeft;
    scrollLeft = slider.scrollLeft;
  });
  slider.addEventListener('mouseleave', () => {
    isDown = false;
    slider.classList.remove('active');
  });
  slider.addEventListener('mouseup', () => {
    isDown = false;
    slider.classList.remove('active');
  });
  slider.addEventListener('mousemove', e => {
    if(!isDown) return;
    e.preventDefault();
    const x = e.pageX - slider.offsetLeft;
    const walk = (x - startX) * 1.4; // * x = scroll-tempo
    slider.scrollLeft = scrollLeft - walk;
    hideScrollArrows(slider);
  });
}

/**
 * Same for mobile
 * @param {HTMLElement} element - e. g. React element ref
 */
function touchScroll(element) {
  const slider = element;
  let isDown = false;
  let startX;
  let scrollLeft;

  slider.addEventListener('touchstart', e => {
    isDown = true;
    startX = e.touches[0].clientX - slider.offsetLeft;
    scrollLeft = slider.scrollLeft;
  });
  slider.addEventListener('touchend', () => {
    isDown = false;
  });
  slider.addEventListener('touchmove', e => {
    if(!isDown) return;
    e.preventDefault();
    const x = e.touches[0].clientX - slider.offsetLeft;
    const walk = (x - startX) * 1.4; // * x = scroll-tempo
    slider.scrollLeft = scrollLeft - walk;
    hideScrollArrows(slider);
  });
}

/**
 * Animated carousel movement.
 * @param {HTMLElement} element - e. g. React element ref.
 * @param {string} direction - if not 'right' then it's left.
 */
function spinCarousel(element, direction) {
  const distance = 105,
        time = 0.028;
  let start = 1;
  const xDiff = direction === 'right' ? distance / 10 : -distance / 10;
  const animate = () => {
    let step = Math.sin(start);
    if (step <= 0) {
      window.cancelAnimationFrame(animate);
    } else {
      element.scrollLeft += xDiff * step;
      hideScrollArrows(element);
      start -= time;
      window.requestAnimationFrame(animate);
    }
  };
  animate();
}

/**
 * Adds class inactive to the scroll Arrows of the HourlyForecastData Component.
 * @param {HTMLElement} slider - slider from dragScroll() or touchScroll()
 */
function hideScrollArrows(slider) {
  let maxScroll = slider.scrollWidth - slider.clientWidth;
  if (slider.scrollLeft === 0) {
    document.getElementById("hfc__arrow-left").classList.add("no-button--inactive");
  } else {
    document.getElementById("hfc__arrow-left").classList.remove("no-button--inactive");
  }
  if (slider.scrollLeft === maxScroll) {
    document.getElementById("hfc__arrow-right").classList.add("no-button--inactive");
  } else {
    document.getElementById("hfc__arrow-right").classList.remove("no-button--inactive");
  }
}


export { dragScroll, touchScroll, spinCarousel };