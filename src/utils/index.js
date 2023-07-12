// The validateEmail function validates the email
export const validateEmail = (email) => {
  // The regex checks for a valid email pattern
  return email.match(
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  );
};

// The validateName function validates the name
export const validateName = (name) => {
  // The regex checks if the name contains only alphabets, whitespaces, hyphens and apostrophes
  return name.match(/^[a-zA-Z\s-']+$/);
};
