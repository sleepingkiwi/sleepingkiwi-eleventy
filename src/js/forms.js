/** Very basic form validation
 *  ------------------------------------------------------------------------------------------------
 *  just checking if there's a value in all required fields.
**/


/** Action functions
 *  ------------------------------------------------------------------------------------------------
**/
const validate = (form) => {
  const invalid = Array.from((form.querySelectorAll('.js--required') || [])).find(
    // look for elements that are required but have no value
    (el) => !el.value.trim(),
  );

  if (!invalid) {
    form.classList.add('js--validate-me--valid');
    form.classList.remove('js--validate-me--invalid');
  } else {
    form.classList.add('js--validate-me--invalid');
    form.classList.remove('js--validate-me--valid');
  }
};

const validateMyParent = (e) => {
  const parent = e.target.closest('.js--validate-me');
  if (parent) {
    validate(parent);
  }
};

/** Initialise listeners
 *  ------------------------------------------------------------------------------------------------
**/
export const init = () => {
  const forms = document.querySelectorAll('.js--validate-me');
  (forms || []).forEach(
    (form) => {
      validate(form);
      (form.querySelectorAll('.js--required') || []).forEach(
        (required) => required.addEventListener('input', validateMyParent, false),
      );
    },
  );
};

export default init;
