export const validateUserInput = (input, step) => {
  switch (step) {
    case "initial":
      return ["yes", "no"].includes(input.toLowerCase());
    case "familySize":
      const size = parseInt(input);
      return !isNaN(size) && size > 0;
    case "income":
      const income = parseFloat(input.replace(/[,$]/g, ""));
      return !isNaN(income) && income >= 0;
    case "gender":
      return ["male", "female", "other"].includes(input.toLowerCase());
    default:
      return true;
  }
};
