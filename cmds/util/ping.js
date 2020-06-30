module.exports = {
  config: {
    nombre: "ping",
    alias: [""],
    descripcion: "Mira la latencia del bot",
    uso: "c!ping",
    category: "util"
  },
  run: async (client, message, args) => {
    const { MessageEmbed } = require("discord.js");
    const c = require("../../colores.json");

    let ping = Math.floor(message.client.ws.ping);
    let embed = new MessageEmbed()
      .setColor("64ffc4")
      .setDescription("**Ping**: " + ping + "ms");

    message.channel.send("<a:a2:708873679269920797> Cargando... ").then(e => {
      setTimeout(() => {
        e.edit("", embed);
      }, 2000);
    });
  }
};
