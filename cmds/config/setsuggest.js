const db = require("megadb")
const sugerencia_db = new db.crearDB("sugerencia")
const { MessageEmbed } = require("discord.js")

module.exports = {
  config: {
    nombre: "set-sugerencia",
    alias: ["set-suggest"],
    descripcion: "Establece un canal para las sugerencias",
    category : "con" 
  },

  run: async (client, message, args) => {
try{ 

	if(!"493063208576483329".includes(message.author.id)) return;

	let permisos = message.member.hasPermission('ADMINISTRATOR');
		if (!permisos) {
			return message.channel
				.send('No tienes permisos para hacer esta accion')
				.then(e => e.delete({ timeout: 5000 }));
		}

		let canal = message.mentions.channels.first()
		if(!canal) return message.channel.send("Debes mencionar un canal")
		let embed = new MessageEmbed()
		.addField("> Nuevo canal para las sugerencias", canal.name)
		.addField("> Id del canal", canal.id)
		.addField("> Moderador", message.author.tag)
		.setColor("77ff00")
		message.channel.send(embed)
		sugerencia_db.establecer(message.guild.id, canal.id)
   } catch (err) {
message.channel.send(err) 

    } 
   }
  };