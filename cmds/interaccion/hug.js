const {hug} = require("../../config.json")
let {MessageEmbed} = require("discord.js")
module.exports = {
  config: {
    nombre: "hug",
    alias: ["abrazo"],
    descripcion: "Dale un abrazo a la persona que mas quieras",
    category : "int" 
  },

  run: async (client, message, args) => {

   try {
		let mencion = message.mentions.users.first()
  	let random = hug[Math.floor(Math.random() * 10)]
		let solo = ["No te abraces tu solo,mejor lo hago yo", "No abraces al aire, ten dignidad","Mejor menciona otra persona"]
	  let trio = [`${message.author.username} Eres muy tiern@ pero no nescesito un abrazo`, `${message.author.username} nescesitas alguien mejor que yo`]
    let randomS = solo[Math.floor(Math.random() * 3)]
		let randomT = trio[Math.floor(Math.random() * 2)]
    
		if(!mencion) {
			let embed = new MessageEmbed()
			.setDescription(randomS)
			.setImage(random)
			.setColor("64ffc4")
			message.channel.send(embed)
		} else if(mencion.id === message.author.id) {
			let embed = new MessageEmbed()
			.setDescription(randomS)
			.setImage(random)
			.setColor("64ffc4")
			message.channel.send(embed)
		}  else if(mencion.id === client.user.id) {
			let embed = new MessageEmbed()
			.setDescription(randomT)
			.setImage(random)
			.setColor("64ffc4")
			message.channel.send(embed)
		 } else if(mencion) {
			let duo = [`${message.author.username} Abrazo con mucho amor a ${mencion.username}`,`${mencion.username} Se sonrojo por el abrazo que le dio ${message.author.username}`,`${message.author.username} Quiso abrazar a ${mencion.username}`]
		  let randomD = duo[Math.floor(Math.random() * 3)]
			let embed = new MessageEmbed()
			.setDescription(randomD)
			.setImage(random)
			.setColor("64ffc4")
			message.channel.send(embed) 
		}
    
	 } catch (err){
		 message.channel.send(`Error: ${err}`)
	 }
	 
  }
};
