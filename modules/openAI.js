import { configDotenv } from 'dotenv';
import OpenAI  from "openai";

configDotenv();

const openai = new OpenAI({
    apiKey: process.env.OPENAI_KEY,
});

const generateOpenAIResponse = async (complaint) => {
    try {
        const chatCompletion = await openai.chat.completions.create({
            messages: [{ role: 'user', content: `Respond to the following customer complaint: ${complaint}` }],
            model: 'gpt-3.5-turbo',
        });
        return chatCompletion.choices[0].message.content.trim();
    } catch (error) {
        console.error('Error generating AI response:', error);
        throw error;
    }
};

export {
    generateOpenAIResponse
}