const { MessageEmbed } = require('discord.js');

module.exports = {
	config: {
		nombre: 'avatar',
		alias: '',
		descripcion: 'Mira el avatar de algun miembro',
		category: 'util'
	},
	run: async (client, message, args) => {
		let user =
			message.mentions.users.first() ||
			client.users.cache.find(c =>
				new RegExp(args[0], 'gmi').test(c.username)
			) ||
			message.author
			
		let embed = new MessageEmbed()
.setColor(message.member.displayHexColor)
.setImage(user.avatarURL({ format: "jpg", size: 2048, dynamic: true })) 
.setDescription("**Para descargar la imagen [Clickea aqui]("+ user.avatarURL()+")**")
message.channel.send(embed)


	}
};
