import { configDotenv } from 'dotenv';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { removeCodeBlockIdentifiers } from '../core/functions.js';

configDotenv();
// Replace with your actual API key (store securely on server)
const apiKey = process.env.GOOGLE_AI_KEY;

const generativeAI = new GoogleGenerativeAI(apiKey);

const generateGoogleAIResponse = async (complaint) => {
    try {
        const model = generativeAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        //send request to AI
        const result = await model.generateContent(`You are now a customer support agent for a fintech company - Afriex (You can search online for more information about this company). Your responses should be professional, empathetic, and helpful. When handling complaints, acknowledge the issue, apologize if necessary, and provide clear steps for resolution. DO NOT request for any information from the customer. For complaints like that, please say request for some time to review the issue and get back to him. To start, I need you to address the customer as "Hi Afriexer", then thank him for reaching out to us. For all that has been said, now handle the following complaint without any additional text like the coding language used. I just need your response in HTML format as a string: ${complaint}`)
        //get response from AI
        const response = result.response;
        //
        return removeCodeBlockIdentifiers(response.text());
    } catch (error) {
        console.error('Error generating AI response:', error);
        throw error;
    }
};

/**
 * {"body":"Please provide me with more context! \\"Iamtestingsir\\" doesn't give me any information about what your customer is complaining about. To help you respond effectively, please tell me:\\n\\n* **What is the product or service involved?** \\n* **What is the specific issue the customer is facing?**\\n* **What is the customer's desired outcome?**\\n\\nOnce I have this information, I can help you craft a helpful and empathetic response. \\n","responder_id":"153006783095"}
 */

export {
    generateGoogleAIResponse
}