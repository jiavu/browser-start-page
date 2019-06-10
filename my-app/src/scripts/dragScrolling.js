
/**
 * Horizontal Click and Drag Srolling
 * from:
 * https://codepen.io/toddwebdev/pen/yExKoj
 * A pen by ToddWebDev
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

  document.getElementById("hfc-arrow-left").style.visibility = "hidden";

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
 * Hides the scroll Arrows of the HourlyForecastData Component.
 * @param {HTMLElement} slider - slider from dragScroll() or touchScroll()
 */
function hideScrollArrows(slider) {
  let maxScroll = slider.scrollWidth - slider.clientWidth;
  if (slider.scrollLeft === 0) {
    document.getElementById("hfc-arrow-left").style.visibility = "hidden";
  } else {
    document.getElementById("hfc-arrow-left").style.visibility = "visible";
  }
  if (slider.scrollLeft === maxScroll) {
    document.getElementById("hfc-arrow-right").style.visibility = "hidden";
  } else {
    document.getElementById("hfc-arrow-right").style.visibility = "visible";
  }
}

export { dragScroll, touchScroll };