const db = require("megadb")
const sdb = new db.crearDB("sugerencia")
const logS = new db.crearDB("logsS")
const { MessageEmbed } = require("discord.js")

module.exports = {
  config: {
    nombre: "sugerencia",
    alias: ["suggest"],
    descripcion: "Agrega una sugerencia al server",
    category : "util" 
  },

  run: async (client, message, args) => {
try{ 

	if(!logS.tiene(message.guild.id)) {

	if(!sdb.tiene(message.guild.id)) return message.channel.send("No existe un canal establecido para las sugerencias en el servidor")
	if(sdb.tiene(message.guild.id)){
		let canal0 = await sdb.obtener(message.guild.id)
		let canal = client.channels.cache.get(canal0)
		let mensaje = args.join(" ")
		if(!mensaje) return message.channel.send("Y la sugerencia?")
		let embed = new MessageEmbed()
			.addField("Sugerencia", mensaje)
			.setFooter(message.author.tag)
			.setColor("77ff00")
		 canal.send(embed).then(async e => {
				let emoji1 = client.emojis.cache.get('726343280752722033')
				let emoji2 = client.emojis.cache.get('726343218412912722')
			await	e.react(emoji1)
			await	e.react(emoji2)
			await	message.channel.send("Tu sugerencia fue enviada")
			}).catch(err => message.channel.send("Hubo un error y no se pudo enviar la sugerencia, intenta otra vez "))
	 }
	}
	if(logS.tiene(message.guild.id)){
		let cal = await logS.obtener(message.guild.id)
		let paja = client.channels.cache.get(cal)
		if(!sdb.tiene(message.guild.id)) return message.channel.send("No existe un canal establecido para las sugerencias en el servidor")
	if(sdb.tiene(message.guild.id)){
		let canal0 = await sdb.obtener(message.guild.id)
		let canal = client.channels.cache.get(canal0)
		let mensaje = args.join(" ")
		if(!mensaje) return message.channel.send("Y la sugerencia?")
		let embed = new MessageEmbed()
			.addField("Sugerencia", mensaje)
			.setFooter(message.author.tag)
			.setColor("77ff00")
		 canal.send(embed).then(async e => {
				let emoji1 = client.emojis.cache.get('726343280752722033')
				let emoji2 = client.emojis.cache.get('726343218412912722')
			await	e.react(emoji1)
			await	e.react(emoji2)
			await	message.channel.send("Tu sugerencia fue enviada")
			paja.send(`Test: ${e.id}\nAutor: ${message.author.tag}`)
			}).catch(err => message.channel.send("Hubo un error y no se pudo enviar la sugerencia, intenta otra vez "))
	 }

	}

} catch (err) {
message.channel.send(err) 
  } 
 }
};