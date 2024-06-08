import { configDotenv } from 'dotenv';
import { filterTickets, getTickets, respondToTicket } from './modules/freshDesk.js';
import { generateAIResponse } from './modules/openAI.js';
import { getCurrentDateFormatted } from './core/functions.js';

//configure environment variables
configDotenv();

// const main = async () => {
//     try {
//         const tickets = await getTickets();

//         for (const ticket of tickets) {
//             const complaint = ticket.description_text;  // or any other field containing the complaint
//             const aiResponse = await generateAIResponse(complaint);
//             await respondToTicket(ticket.id, aiResponse);
//             console.log(`Responded to ticket ${ticket.id}`);
//         }
//     } catch (error) {
//         console.error('Error processing tickets:', error);
//     }
// };

// main();


// Example call to getTickets
// getTickets().then(tickets => console.log(tickets)).catch(err => console.error(err));


const properties = {
    agent_id: 69043408804,
    group_id: 69000635656,
    status: 2,
    // frt_due_by: `>${getCurrentDateFormatted()}`
    frt_due_by: '>2024-06-07'
};

// use fr_due_by to estimate the frt due date

const tickets = await filterTickets(properties);

console.log(tickets)