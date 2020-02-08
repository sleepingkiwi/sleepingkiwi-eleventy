/** Intersection Observer that can be easily opted in to
 *  ------------------------------------------------------------------------------------------------
 *  This is a generic module which allows elements to opt in to being observed by adding a
 *  utility class (js--wants-intersection).
 *  -
 *  generic intesection:
 *    - fires only once per element and adds the .js--has-intersected class
 *    - fires when an element enters any part of the viewport by more than 2px
 *  -
 *  ref: https://alligator.io/js/intersection-observer/
 *  ref: https://blog.arnellebalane.com/the-intersection-observer-api-d441be0b088d
**/
const intersected = (observed, observer) => {
  // activate the new one
  observed.target.classList.add('js--has-intersected');

  // stop watching me.
  observer.unobserve(observed.target);
};

/** For generic intersection we count intersection as crossing any part of the screen by 2px
 *  ------------------------------------------------------------------------------------------------
**/
const config = {
  rootMargin: '-2px -2px -2px -2px',
  threshold: [0],
};

export const init = () => {
  const targets = document.querySelectorAll('.js--wants-intersection');

  if (targets.length > 0) {
    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          // > 0 means it has entered our rootMargin box
          if (entry.intersectionRatio > 0) {
            intersected(entry, obs);
          }
        });
      },
      config,
    );

    targets.forEach((target) => {
      observer.observe(target);
    });
  }
};

export default init;
