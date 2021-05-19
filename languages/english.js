const languageData = {
    GENERATION: " Generation in progress...",
    PING_BEFORE: " Calculation in progress...",
    PING_AFTER: "Bot latency : `",
    PING: "Pong! Bot latency: {ping}ms",
    LANGUAGE: "Anglais | EN | English",
};


const translate = (key, ...args) => {
    const translation = languageData[key]; 
    if(typeof translation === "function") return translation(args);
    else return translation;
};

module.exports = translate;