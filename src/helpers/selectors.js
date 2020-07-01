let $$ = (selector, parent) => {
  return Array.prototype.slice.call(
    (parent ? parent : document).querySelectorAll(selector)
  );
};

export default $$;
