const { mons } = require('../../config.json');
const { MessageEmbed} = require('discord.js');
const db = require('megadb');
const pet = new db.crearDB('pets')
const prefix = new db.crearDB("prefixes")

module.exports = {
	config: {
		nombre: 'info',
		alias: ['i'],
		descripcion: 'Mira tu mascota inicial',
		category: 'economia'
	},

	run: async (client, message, args) => {
		const p = await prefix.obtener(message.guild.id)
   if(!pet.tiene(message.author.id)) {
		 message.channel.send(`No tienes una mascota, escripe ${p ? p : "ey!"}start y miraras las posibilidades que puedes obtener`)
	 } else if(pet.tiene(message.author.id)){
		 let {daño,
		 vida,
		 nombre,
		 velocidad,
		 defensa,
		 agilidad,
		 especial,
		 level,
		 color,
		 image,
		 xp} = await pet.obtener(message.author.id)
		 let levelup = 5 * level ** 2 + 50 + level + 100
		 let embed = new MessageEmbed()
		 .setTitle(nombre)
		 .setDescription(`Vida: ${vida + levelup - 50}\nDaño: ${daño + levelup- 50}\nVelocidad: ${velocidad+ levelup- 50}\nDefensa: ${defensa+ levelup- 50}\nAgilidad: ${agilidad+ levelup- 50}\nAtk. Especial: ${especial+ levelup- 50}`)
	   .addField("Rank", `XP: ${xp}/${levelup}\nNivel: ${level}/1000`)
		 .setImage(image)
		 .setColor(color)
		 message.channel.send(embed)
		}
	}
}