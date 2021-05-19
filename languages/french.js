const languageData = {
    GENERATION: " Génération en cours...",
    PING_BEFORE: " Calcul en cours...",
    PING_AFTER: " **»** Latence du bot : `",
    PING: "Pong! Latence du bot: {ping}ms",
    LANGUAGE: "Français | FR | French",
};

const translate = (key, ...args) => {
    const translation = languageData[key];
    if(typeof translation === "function") return translation(args);
    else return translation;
};

module.exports = translate;
