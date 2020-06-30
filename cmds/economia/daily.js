const { MessageEmbed } = require("discord.js");
const db = require("megadb");
const dinero = new db.crearDB("dinero");
const cooldown = new db.crearDB("cooldown");
const ms = require("pretty-ms");

module.exports = {
  config: {
    nombre: "daily",
    alias: ["diario"],
    descripcion: "Cada 24h recibes 250c",
    category: "economia"
  },
  run: async (client, message, args) => {
    let tiempo = 86400000

    if (cooldown.tiene(message.author.id)) {
      var m = await cooldown.obtener(message.author.id);
      let mm = await ms(m - Date.now());
      let msg = "Debes esperar `" + mm + "` para tu proximo pago";
      message.channel.send(msg)
      
      setTimeout(() => {
        cooldown.eliminar(message.author.id) 
      }, m - Date.now()) 
        
      
    }

    if (!cooldown.tiene(message.author.id)) {
      cooldown.establecer(message.author.id, Date.now() + tiempo);
      if (!dinero.tiene(message.author.id)) {
        dinero.establecer(message.author.id, 250);
      }
      if (dinero.tiene(message.author.id)) {
        dinero.sumar(message.author.id, 250);
      }
      message.channel.send("Acabas de recoger tu dinero diario <a:a7:715787660207325245> **250**");
    }
  }
};
