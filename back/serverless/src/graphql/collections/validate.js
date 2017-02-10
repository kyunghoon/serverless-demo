module.exports = (object, validations) => {
  const errors = [];
  Object.entries(object).forEach(([key, value]) => {
    const validate = validations[key];
    if (validate) {
      const error = validate(value);
      if (error) {
        errors.push(error);
      }
    }
  });
  return errors;
};
