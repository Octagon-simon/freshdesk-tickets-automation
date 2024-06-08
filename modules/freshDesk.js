import axios from 'axios';
import { configDotenv } from 'dotenv';
configDotenv();

const FRESHDESK_DOMAIN = "afriex";
const API_KEY = process.env.FRESHDESK_KEY;
const AUTH = Buffer.from(`${API_KEY}:X`).toString('base64');

const getTickets = async () => {
    try {
        const response = await axios.get(`https://${FRESHDESK_DOMAIN}.freshdesk.com/api/v2/tickets`, {
            params: {
                order_by: "created_at",
                order_type: "desc",
                group_id: 69000635656
            },
            headers: {
                'Authorization': `Basic ${AUTH}`,
                'Content-Type': 'application/json'
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching tickets:', error);
        throw error;
    }
};


// Example call to getTickets
// getTickets().then(tickets => console.log(tickets)).catch(err => console.error(err));


const respondToTicket = async (ticketId, responseText) => {
    const responsePayload = {
        body: responseText
    };

    try {
        const response = await axios.post(`https://${FRESHDESK_DOMAIN}.freshdesk.com/api/v2/tickets/${ticketId}/reply`, responsePayload, {
            headers: {
                'Authorization': `Basic ${AUTH}`,
                'Content-Type': 'application/json'
            }
        });

        if (response.status !== 201) {
            throw new Error(`Failed to respond to ticket ${ticketId}`);
        }
    } catch (error) {
        console.error(`Error responding to ticket ${ticketId}:`, error);
        throw error;
    }
};

// Example call to respondToTicket
// respondToTicket(123, 'Your response text').then(() => console.log('Response sent')).catch(err => console.error(err));
const filterTickets = async (properties) => {
    const queryParts = [];

    for (const key in properties) {
        if (Object.hasOwnProperty.call(properties, key)) {
            const value = properties[key];
                queryParts.push(`${key}:${value}`);
        }
    }

    const query = queryParts.join(' AND '); // Using 'AND' to join each key/value pair

    try {
        const response = await axios.get(`https://${FRESHDESK_DOMAIN}.freshdesk.com/api/v2/search/tickets?query="${encodeURIComponent(query)}"`, {
            headers: {
                'Authorization': `Basic ${AUTH}`,
                'Content-Type': 'application/json',
            },
        });

        return response.data.results;
    } catch (error) {
        console.error('Error fetching tickets:', error);
        throw error;
    }
};

// subject include "Conversation with ..." na chat ticket 

// description: "<div>I sent 135 dollars to my Nigerian account on June 6th 2024. It's 24 hours since I made the transaction, I still haven't seen the money in the Nigerian account.</div>",
//     description_text: "I sent 135 dollars to my Nigerian account on June 6th 2024. It's 24 hours since I made the transaction, I still haven't seen the money in the Nigerian account.",

// due_by: '2024-06-08T15:57:33Z',

// created_at: '2024-06-07T15:57:31Z',
// fr_due_by: '2024-06-07T19:57:32Z', +4 hrs


export {
    getTickets,
    respondToTicket,
    filterTickets
}