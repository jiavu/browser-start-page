
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

  slider.addEventListener('mousedown', (e) => {
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
  slider.addEventListener('mousemove', (e) => {
    if(!isDown) return;
    e.preventDefault();
    const x = e.pageX - slider.offsetLeft;
    const walk = (x - startX) * 1.4; // * x = scroll-tempo
    slider.scrollLeft = scrollLeft - walk;
  });
}

export { dragScroll };