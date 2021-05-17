module.exports = async(client) => {
    console.log("» "+client.user.username+" est prêt, connécté en tant que "+client.user.tag+".");
    await client.db.init();
    client.user.setActivity("Test Bot Online !", {type: "PLAYING"})
}