const db = require("megadb")
const logS = new db.crearDB("logsS")
const { MessageEmbed } = require("discord.js")

module.exports = {
  config: {
    nombre: "setsuggestlog",
    alias: ["set-suggest-log"],
    descripcion: "Establece un canal para aceptar o denegar sugerencias",
    category : "con" 
  },

  run: async (client, message, args) => {
try{ 
	if (!message.member.hasPermission('ADMINISTRATOR'))
			return message.channel.send('No tienes permisos <a:a5:708890598110658652>')
	let canal = message.mentions.channels.first()
	if(!canal) return message.channel.send("debes mencionar un canal")
  let embed = new MessageEmbed()
	.addField("> Nuevo canal de logs-sugerencias", canal.name)
	.addField("> Moderador", message.author.tag)
	.setColor("77ff00")
	.setTimestamp()
	message.channel.send(embed)
	logS.establecer(message.guild.id, canal.id)
} catch (err) {
message.channel.send(err) 
  } 
 }
};