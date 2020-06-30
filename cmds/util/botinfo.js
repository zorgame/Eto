module.exports = {
	config: {
		nombre: 'botinfo',
		alias: ['stats', 'infobot'],
		descripcion: 'Mira las stats del bot',
		category: 'util'
	},
	run: async (client, message, args) => {
		const { MessageEmbed } = require('discord.js');
		const moment = require('moment');
		require('moment-duration-format');
		const actividad = moment
			.duration(client.uptime)
			.format(' D [dias], H [hrs], m [mins], s [secs]');
		let embed = new MessageEmbed()
			.setColor('64ffc4')

			.setTitle('**\n**Información - Stats')
			.setDescription(
				'> Abajo veras mis stats, las cuales a mis dueños les funciona y informa sobre necesidades que podria nescesitar'
			)
			.addField('> Uptime', '<a:a6:708899956831813642> ' + actividad)
			.addField(
				'> Usuarios',
				'<a:a6:708899956831813642> ' + client.users.cache.size.toLocaleString()
			)
			.addField(
				'> Canales',
				'<a:a6:708899956831813642> ' +
					client.channels.cache.size.toLocaleString()
			)
			.addField(
				'> Servidores',
				'<a:a6:708899956831813642> ' + client.guilds.cache.size.toLocaleString()
			)
			.setThumbnail(client.user.avatarURL)
			.setAuthor(client.user.username, client.user.avatarURL);

		message.channel.send(embed);
	}
};
