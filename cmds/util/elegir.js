const { MessageEmbed } = require("discord.js")
const db = require("megadb")
const prefixEnLaDB = new db.crearDB('prefixes')

module.exports = {
  config: {
    nombre: "elegir",
    alias: ["choose"],
    descripcion: "Escojo entre 2 o mas valores",
    category : "util" 
  },

  run: async (client, message, args) => {
try{
 let prefix = await prefixEnLaDB.obtener(message.guild.id) || "ey"
 let textoDividido = args.join(" ").split(" | ")
 let textoRandom = textoDividido[Math.floor(Math.random() * textoDividido.length)]

if(!textoDividido[1]){
	let noHayArgumento1 = new MessageEmbed()
	.setTitle("Falta de argumentos")
	.setDescription(prefix + " elegir <opcion1> | <opcion2>")
	.setFooter("Son obligatorio los | para separar las opciones")
	.setColor("ff0000")
	return message.channel.send(noHayArgumento1)
}

if(textoDividido[1]){

   let numeroDeOpciones = []
   let i = 1
	textoDividido.forEach(x => {
	   numeroDeOpciones.push(["[" + i + "] - " + textoDividido[i - 1]] )
	   i++
	})

	let siHayArgumento1 = new MessageEmbed()
	.setTitle(":incoming_envelope: | Hora de elegir")
	.setDescription(numeroDeOpciones)
  .addField(":mag_right: | Elijo:", textoRandom)
	.setColor("1fff00")
	return message.channel.send(siHayArgumento1)
}

} catch (err) {
  let error = new MessageEmbed()
    .setTitle("Error")
    .setColor("ff0000") 
    .setDEscription(err)
  return message.channel.send(error)
   } 
  }
 };