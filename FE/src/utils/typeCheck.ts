const isString: (value: unknown) => asserts value is string = (value) => {
  if (typeof value !== "string") throw new Error("value is not string");
};

export { isString };
