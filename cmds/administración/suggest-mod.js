const db = require("megadb")
const sdb = new db.crearDB("sugerencia")
const logS = new db.crearDB("logsS")
const { MessageEmbed } = require("discord.js")

module.exports = {
  config: {
    nombre: "sugerencia-mod",
    alias: ["sug-mod"],
    descripcion: "Acepta o niega una sugerencia",
    category : "admin" 
  },

  run: async (client, message, args) => {
try{ 
	if (!message.member.hasPermission('ADMINISTRATOR'))
				return message.channel.send(`No tienes permisos para ejecutar esta accion`)		
				if(!sdb.tiene(message.guild.id)) return message.channel.send("No hay un canal de sugerencias")
        if(!logS.tiene(message.guild.id)) return message.channel.send("No hay un canal de para los logs de sugerencias")
				if(!args[0])  return message.channel.send("Tienes las siguiente opciones:\n- aceptar\n- denegar\n- Probablemente\n```Ejemplo: ey!sugerencia-mod <id del mensaje> <aceptar> <razon>```")
				let razon = args.slice(2).join(" ") || "Sin razon"
				let id = args[1]
				let canalS = await sdb.obtener(message.guild.id)
				let canal2 = message.guild.channels.cache.get(canalS)
				let canalF = canal2.messages.fetch(args[0])
	if(args[1] === "aceptar" || args[1] === "accept"){
		canalF.then(e => {
			e.edit(e.embeds[0].addField("Aceptar", razon))
		})
	}	else if(args[1] === "denegar" || args[1] === "deny"){

	}	else if(args[1] === "proximamente" || args[1] === "probablemente"){

	}


} catch (err) {
message.channel.send(err) 
  } 
 }
};