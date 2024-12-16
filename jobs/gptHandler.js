import { Configuration, OpenAIApi } from "openai";

export const handleGPTResponse = async (message, apiKey, userState) => {
  const configuration = new Configuration({ apiKey });
  const openai = new OpenAIApi(configuration);

  const prompts = {
    initial:
      "I'd be happy to help you explore health insurance options. Would you like to proceed? (yes/no)",
    familySize:
      "Great! To find the best plan for you, I'll need some information. How many people will be covered under this insurance? Please enter a number.",
    income:
      "Thank you. Now, what is your annual household income? This helps determine potential subsidies and plan options.",
    gender:
      "Almost done! For demographic purposes, what is your gender? (male/female/other)",
    complete:
      "Thank you for providing all the information. I'll analyze the best insurance options for you.",
  };

  try {
    const completion = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: `You are a friendly health insurance assistant. Current step: ${
            userState.step
          }. Previous answers: ${JSON.stringify(userState)}`,
        },
        {
          role: "user",
          content: message,
        },
      ],
    });

    const nextStep =
      userState.step === "initial" && message.toLowerCase() === "yes"
        ? "familySize"
        : userState.step === "familySize"
        ? "income"
        : userState.step === "income"
        ? "gender"
        : "complete";

    return {
      response: completion.data.choices[0].message.content,
      nextPrompt: prompts[nextStep] || null,
    };
  } catch (error) {
    console.error("GPT API error:", error);

    const nextStep =
      userState.step === "initial" && message.toLowerCase() === "yes"
        ? "familySize"
        : userState.step === "familySize"
        ? "income"
        : userState.step === "income"
        ? "gender"
        : "complete";

    return {
      response: prompts[userState.step],
      nextPrompt: prompts[nextStep] || null,
    };
  }
};
