const classNameWrapper = (...classNames: Array<string | undefined | false>) => {
  return classNames.filter((className) => className).join(" ");
};

export { classNameWrapper };
