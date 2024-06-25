import axios from 'axios';
import { configDotenv } from 'dotenv';
configDotenv();

//afriex
const FRESHDESK_DOMAIN = "kabocash";
const API_KEY = process.env.FRESHDESK_KEY;
const AUTH = Buffer.from(`${API_KEY}:X`).toString('base64');
const agent_id = Number(process.env.AGENT_ID);
const group_id = Number(process.env.GROUP_ID);

const allTicketStatus = {
    "open": 2,
    "pending": 3,
    "resolved": 4,
    "closed": 5
}

const getTickets = async ({ params }) => {
    try {
        const response = await axios.get(`https://${FRESHDESK_DOMAIN}.freshdesk.com/api/v2/tickets`, {
            params: {
                order_by: "created_at",
                order_type: "desc",
                ...params
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


const getSingleTicket = async (ticketId) => {
    try {
        const response = await axios.get(`https://${FRESHDESK_DOMAIN}.freshdesk.com/api/v2/tickets/${ticketId}`, {
            params: {},
            headers: {
                'Authorization': `Basic ${AUTH}`,
                'Content-Type': 'application/json'
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching ticket:', error);
        throw error;
    }
};


// Example call to getTickets
// getTickets().then(tickets => console.log(tickets)).catch(err => console.error(err));


const updateTicket = async (param) => {
    try {
        const { ticketId, status } = param;

        const response = await axios.put(`https://${FRESHDESK_DOMAIN}.freshdesk.com/api/v2/tickets/${ticketId}`, { status }, {
            headers: {
                'Authorization': `Basic ${AUTH}`,
                'Content-Type': 'application/json'
            }
        });

        if (response.status !== 200) {
            throw new Error(`Failed to update ticket ${ticketId}`);
        }
    } catch (error) {
        throw error;
    }
};

const respondToTicket = async (ticketId, responseText) => {
    const responsePayload = {
        body: responseText,
        user_id: agent_id,
        // group_id
    };

    try {
        const response = await axios.post(`https://${FRESHDESK_DOMAIN}.freshdesk.com/api/v2/tickets/${ticketId}/reply`, responsePayload, {
            headers: {
                'Authorization': `Basic ${AUTH}`,
                'Content-Type': 'application/json'
            }
        });

        console.log(response)

        if (response.status !== 201) {
            throw new Error(`Failed to respond to ticket ${ticketId}`);
        }
    } catch (error) {
        throw error;
    }
};

// Example call to respondToTicket
// respondToTicket(123, 'Your response text').then(() => console.log('Response sent')).catch(err => console.error(err));
const filterTickets = async (properties) => {
    const queryParts = [];

    for (const key in { ...properties, agent_id, group_id }) {
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
    getSingleTicket,
    getTickets,
    respondToTicket,
    updateTicket,
    filterTickets
}