const classNameWrapper = (...classNames: Array<string | undefined>) => {
  return classNames.filter((className) => className).join(" ");
};

export { classNameWrapper };
