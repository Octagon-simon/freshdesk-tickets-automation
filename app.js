import { configDotenv } from 'dotenv';
import { filterTickets, getSingleTicket, getTickets, respondToTicket, updateTicket } from './modules/freshDesk.js';
import { extractEnglishWords, getCurrentDateFormatted } from './core/functions.js';
import { generateGoogleAIResponse } from './modules/googleAI.js';

//configure environment variables
configDotenv();

// const main = async () => {
//     try {
//         const tickets = await filterTickets({ status: 2 });

//         for (const ticket of tickets) {
//             const complaint = extractEnglishWords(ticket) ;  // or any other field containing the complaint
//             const aiResponse = await generateAIResponse(complaint);
//             await respondToTicket(ticket.id, aiResponse);
//             console.log(`Responded to ticket ${ticket.id} with this message ${aiResponse}`);
//             break;
//         }
//     } catch (error) {
//         console.error('Error processing tickets:', error);
//     }
// };

// main();


// Example call to getTickets rr7VegS6HiiHD1Hsj4n
// getTickets().then(tickets => console.log(tickets)).catch(err => console.error(err));

const getAndRespondToTicket = async () => {
    try {
        const ticket = await getSingleTicket(2772);
        const complaint = extractEnglishWords(ticket);
        const aiResponse = await generateGoogleAIResponse(complaint);
        await respondToTicket(ticket.id, aiResponse);

        //update ticket
        await updateTicket({ status: 2, ticketId: ticket.id })
        console.log(`Responded to ticket ${ticket.id} with this message ${aiResponse}`);
    } catch (err) {
        console.error(err)
    }
}

getAndRespondToTicket()

//{"description":"I understand you're reaching out with a concern.  To best assist you, could you please provide more details about what you're experiencing?  What issue are you facing, and what steps have you already taken to resolve it?  The more information you can share, the better I can understand your situation and provide you with relevant support. \\n","responder_id":"153006783095"}

const properties = {
    // agent_id: 69043408804, //my agentId 
    // group_id: 69000635656, //my groupId 
    status: 2, //retrieve open tickets https://developers.freshdesk.com/api/
    // frt_due_by: `>${getCurrentDateFormatted()}`
    // frt_due_by: '>2024-06-07'
};

// use fr_due_by to estimate the frt due date

// const tickets = await filterTickets(properties);

// console.log(tickets)