import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { prompt } = req.body;

    try {
      const completion = await openai.createChatCompletion({
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'user', content: prompt }],
      });

      const response = completion.data.choices[0].message.content;
      res.status(200).json({ response });
    } catch (error) {
      console.error('Error generating response:', error);
      res.status(500).json({ error: 'Error generating response' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}