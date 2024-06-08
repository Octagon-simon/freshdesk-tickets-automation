function getCurrentDateFormatted(date = new Date()) {
    return date.toISOString().slice(0, 19) + 'Z';
}

// console.log(getCurrentDateFormatted()); // Output: "YYYY-MM-DDTHH:MM:SSZ"


// console.log(getCurrentDateFormatted()); // Output: "YYYY-MM-DD"


export {
    getCurrentDateFormatted
}