const { Client, Collection, MessageEmbed  } = require('discord.js');

const Config = require('./configs/config.json');
const Snippet = require('./configs/Snippet');
const Handler = require('./structure/Handler');

class Class extends Client {
    constructor() {
        super({ 
            disableMentions: "everyone" , 
            ws : { intents: [ "GUILDS", "GUILD_MEMBERS", "GUILD_VOICE_STATES", "GUILD_MESSAGES", "GUILD_MESSAGE_REACTIONS" ] },
            partials: ['MESSAGE', 'CHANNEL', 'REACTION'] 
        });

        this.default_prefix = Config.prefix;
        this.url = Config.url;
        this.color = Config.color;
        this.footer = Config.footer;

        this.db = require("./structure/Mongoose.js");

        require("./structure/Fonctions")(this);

        try { this.launch().then(() => { console.log("• Lancement du robot réussi, connexion à Discord.."); }); }
        catch (e) { throw new Error(e); }

        this.login(Config.token).then(() => { console.log("• Connexion à Discord réussi !"); });
    }

    async launch() {
        this.config = Config;
        this.snippet = Snippet;

        this.commands = new Collection();

        const handlers = new Handler(this);
        handlers.commands(); handlers.events(); handlers.musicEvents(); handlers.giveawayEvents();
    }
}

module.exports = new Class();
