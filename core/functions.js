function getCurrentDateFormatted(date = new Date()) {
    return date.toISOString().slice(0, 19) + 'Z';
}

// console.log(getCurrentDateFormatted()); // Output: "YYYY-MM-DDTHH:MM:SSZ"


// console.log(getCurrentDateFormatted()); // Output: "YYYY-MM-DD"

function extractEnglishWords(ticketObj) {
    // Helper function to strip HTML tags
    function stripHtml(html) {
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = html;
        return tempDiv.textContent || tempDiv.innerText || '';
    }

    // Determine which property to use
    const text = ticketObj.description_text || stripHtml(ticketObj.description);

    // Remove special characters and split into words
    const words = text.replace(/[^a-zA-Z\s]/g, '').split(/\s+/);

    // Filter out any empty strings that may result from splitting
    return words.filter(word => word.length > 0)?.join('');
}

function removeCodeBlockIdentifiers(str) {
    return str.replace(/```html/g, '').replace(/```/g, '');
}

export {
    extractEnglishWords,
    getCurrentDateFormatted,
    removeCodeBlockIdentifiers
}