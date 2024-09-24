// closeToggler.js

export const closeToggler = (setters) => {
  // Accepts an array of state setter functions and turns them all off (false)
  setters.forEach((setter) => setter(false));

  // Optionally, remove certain classes if they are tied to the popup logic
  const htmlTag = document.getElementById('html');
  const headerTag = document.getElementById('header');
  const mainTag = document.getElementById('main');
  const footerTag = document.getElementById('footer');
  
  if (htmlTag) htmlTag.classList.remove('popupLeaderboard-show');
  if (headerTag) headerTag.classList.remove('show-blur');
  if (mainTag) mainTag.classList.remove('show-blur');
  if (footerTag) footerTag.classList.remove('show-blur');
};