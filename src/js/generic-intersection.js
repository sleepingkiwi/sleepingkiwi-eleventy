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
const imageLoaded = (img, container) => {
  img.classList.add('js--has-loaded');
  container.classList.add('js--has-loaded-image');
};

const intersected = (observed, observer) => {
  // activate the new one
  observed.target.classList.add('js--has-intersected');

  // if there's img/s in the observed target we add a class once it loads
  // useful for triggering image transitions
  // this is very basic and doesn't work super well for multiple images
  // it's best to stick to one image per container for reliable results!
  const imgs = observed.target.querySelectorAll('img');

  (imgs || []).forEach(
    (img) => {
      // check if it's already loaded
      if (img.complete || img.naturalHeight !== 0) {
        imageLoaded(img, observed.target);
      } else {
        // add listeners if not
        img.addEventListener('load', () => { imageLoaded(img, observed.target); }, false);
        img.addEventListener('error', () => { imageLoaded(img, observed.target); }, false);
      }
    },
  );

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
  const gotIntersction = (
    ('IntersectionObserver' in window)
    && ('IntersectionObserverEntry' in window)
    && ('intersectionRatio' in window.IntersectionObserverEntry.prototype)
    && ('isIntersecting' in window.IntersectionObserverEntry.prototype)
  );

  if (!gotIntersction) {
    return;
  }

  const targets = document.querySelectorAll('.js--wants-intersection:not(.js--has-observer)');

  if (targets.length > 0) {
    // console.log(`adding ${targets.length} new observer/s`);
    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          // > 0 means it has entered our rootMargin box
          if (entry.intersectionRatio > 0) {
            window.setTimeout(() => {
              intersected(entry, obs);
            }, 100);
          }
        });
      },
      config,
    );

    targets.forEach((target) => {
      // makes it safe to run this multiple times as we don't catch ones we've already observed
      target.classList.add('js--has-observer');
      observer.observe(target);
    });
  }
};

export default init;
