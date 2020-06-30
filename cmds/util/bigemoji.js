const Discord = require('discord.js');

module.exports = {
	config: {
		nombre: 'emoji',
		alias: ['jumbo', 'bigemoji'],
		descripcion: 'Agranda un emoji al tamaño de una imagen',
		category: 'util'
	},

	run: async (client, message, args) => {
		let emoji = message.guild.emojis.cache.find(
			e => args.join(' ').toLowerCase() === e.name.toLowerCase()
		);
		if (!emoji)
			return message.channel.send('Debes colocar el nombre del emoji');

		let embed = new Discord.MessageEmbed()
			.setTitle('Emoji Grande')
			.setDescription('Abajo veras información básica del emoji')
			.addField('Emoji', `> ${emoji}`)
			.addField('Nombre', '> ' + emoji.name)
			.addField('ID', '> ' + emoji.id)
			.setColor('64ffc4')
			.addField(
				'Descarga',
				`> Si quieres descargar el emoji [Click Aqui](${emoji.url})`
			)
			.setImage(emoji.url);

		message.channel.send(embed);
	}
};
