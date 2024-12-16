export const createUserState = () => ({
  step: "initial",
  familySize: null,
  householdIncome: null,
  gender: null,
  completed: false,
});

export const updateUserState = (currentState, input) => {
  const nextSteps = {
    initial: input.toLowerCase() === "yes" ? "familySize" : "complete",
    familySize: "income",
    income: "gender",
    gender: "complete",
  };

  return {
    ...currentState,
    [currentState.step]: input,
    step: nextSteps[currentState.step] || currentState.step,
    completed: nextSteps[currentState.step] === "complete",
  };
};
