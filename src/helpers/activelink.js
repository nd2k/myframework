const activeLink = (optionalCurrentActiveLink, targetLink) => {
  if (optionalCurrentActiveLink != undefined || null) {
    optionalCurrentActiveLink.classList.remove('active');
  }
  targetLink.classList.add('active');
};

export default activeLink;
