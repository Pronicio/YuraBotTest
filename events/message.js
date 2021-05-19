module.exports = async(client, message) => {

    if(message.author.bot || !message.channel.guild) return;

    if (message.guild.member(client.user).hasPermission("SEND_MESSAGES") === false)  { return; }
    if (message.guild.id === "110373943822540800") return;

    let db = await client.db.getGuild(message.guild.id)

    let prefix = !db.prefix ? config.prefix : db.prefix;
    let guildLanguage = !db.lang ? "english": db.lang;
    let language = require(`../languages/${guildLanguage}`);

    if(message.content.match(new RegExp(`^<@!?${client.user.id}>( |)$`))){
        if(message.guild){
            return message.channel.send(prefix).catch(e => {});
        } else return;
    }

    if(!message.content.startsWith(prefix)) return;
    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const command = client.commands.find(cmd => cmd.aliases.includes(args[0])) || client.commands.get(args[0]);
    if(!command) return;

    if(command.permission !== 'everyone') {
        if(!message.member.hasPermission(command.permission)) {
            return message.channel.send(client.snippet.insufficientPermissions(message.author));
        }
    }

    if(command.category === 'secret') {
        if(message.member.id != "477582590329749504") return;
    }

    try { command.run(client, message, args, db) }
    catch (e) { client.emit('error',e); }
};