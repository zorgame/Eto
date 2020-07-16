const { MessageEmbed } = require('discord.js');
const embed = new MessageEmbed()

module.exports = {
	config: {
		nombre: 'avatar',
		alias: ['av'],
		descripcion: 'Mira el avatar de algun miembro',
		category: 'img'
	},
	run: async (client, message, args) => {

		let user = message.mentions.users.first() || client.users.cache.find(c => new RegExp(args[0], 'gmi').test(c.username))
		let member =  message.mentions.members.first() || message.guild.member(user)
		try {
		if(!args[0]) {
			embed
			.setTitle(`Avatar de ${message.author.username}`)
			.setDescription(`**<:equis:726343280752722033> No ves la imagen? [Descargala Aqui](${message.author.avatarURL()})**`)
			.setImage(message.author.avatarURL({format: 'png', dynamic: true, size: 2048}))
			.setColor(message.member.displayHexColor)
			message.channel.send(embed)
		}else if(args){
			embed
			.setTitle(`Avatar de ${user.username}`)
			.setDescription(`**<:equis:726343280752722033>  No ves la imagen? [Descargala Aqui](${user.avatarURL()})**`)
			.setImage(user.avatarURL({format: 'png', dynamic: true, size: 1024}))
			.setColor(member.displayHexColor)
			message.channel.send(embed)
		} 
		} catch (e) {
		embed
			.setColor("RED")
			.setDescription(`<:equis:726343280752722033> El usuario **${args[0]}** no se encontro`)
			message.channel.send(embed)
	}
	}
	}