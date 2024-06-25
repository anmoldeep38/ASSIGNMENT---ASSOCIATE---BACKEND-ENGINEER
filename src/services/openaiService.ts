import { OpenAI, Configuration, CreateCompletionRequest } from 'openai';

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAI(configuration);

export async function analyzeEmailContent(content: string) {
  const completionRequest: CreateCompletionRequest = {
    model: 'text-davinci-003',
    prompt: `Categorize the following email content: ${content}\nCategories: Interested, Not Interested, More Information`,
    max_tokens: 60,
  };

  const response = await openai.completions.create(completionRequest);
  const category = response.choices[0].text.trim();
  return category;
}

export async function generateResponse(category: string) {
  let prompt = '';
  switch (category) {
    case 'Interested':
      prompt = 'Generate a response asking for a demo call time.';
      break;
    case 'Not Interested':
      prompt = 'Generate a polite response acknowledging their decision.';
      break;
    case 'More Information':
      prompt = 'Generate a response providing more information about the product.';
      break;
  }
  
  const completionRequest: CreateCompletionRequest = {
    model: 'text-davinci-003',
    prompt: prompt,
    max_tokens: 100,
  };

  const response = await openai.completions.create(completionRequest);
  return response.choices[0].text.trim();
}
