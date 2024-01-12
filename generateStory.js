require("dotenv").config();
const { OpenAIClient, AzureKeyCredential } = require("@azure/openai");
const endpoint = process.env.ENDPOINT;
const azureApiKey = process.env.API_KEY;

const generateKanjiStory = async ({ radical, kanji, type }) => {
  const client = new OpenAIClient(
    endpoint,
    new AzureKeyCredential(azureApiKey)
  );
  const deploymentId = "GPT35TURBO";
  const message = [
    {
      role: "user",
      content: `Generate a ${type} story fewer 20 words and contain ${radical.join(
        ", "
      )} word and ${kanji.join(", ")} word`,
    },
  ];
  const result = await client.getChatCompletions(deploymentId, message);
  const story = result.choices.map((choice) => choice.message.content);
  return story;
};

module.exports = { generateKanjiStory };
