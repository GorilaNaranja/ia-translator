import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY || "test",
});

const openai = new OpenAIApi(configuration);

export const chatgptTranslation = async (textBlock) => {

  console.log('OPENAI CALL');

  const response = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "system",
        content:
          "You will be provided with a sentence in English, and your task is to translate it into Spanish.",
      },
      {
        role: "user",
        content: textBlock,
      },
    ],
    temperature: 0,
    max_tokens: 256,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
  });

  console.log('response: ', response);

  // return 'Prueba pagina traducida al español';
  return response;
};
