const Discord = require('discord.js');
module.exports = {
	config: {
		nombre: 'unlock',
		alias: '',
		descripcion: 'Desbloquea el canal que bloqueaste',
		category: 'admin'
	},
	run: async (client, message, args) => {
		try {
			let channel = message.mentions.channels.first() || message.channel;

			if (!message.member.hasPermission('MANAGE_CHANNELS'))
				return message.channel.send(
					`<a:a5:708890598110658652> No tienes los permisos necesarios de gestionar canales`
				);

			channel.overwritePermissions(
				[
					{
						id: message.guild.id,
						allow: ['SEND_MESSAGES']
					}
				],
				'Nescesita el cambio de permisos'
			);

			let embed = new Discord.MessageEmbed()
				.setTitle('Unlock Channel ')
				.setDescription('Canal desbloqueado, Abajo tendrás más información')
				.addField('> ⦾ Moderador', message.author.tag)
				.addField('> ⦾ Canal', channel.name)
				.addField('> ⦾ ID', channel.id)
				.setColor('64ffc4');

			message.channel.send(embed);
		} catch (err) {
			let embed = new Discord.MessageEmbed()
				.addField('Error', err)
				.addField('Posible solución', 'Darme permisos para gestionar canales')
				.setColor('64ffc4');
			message.channel.send(embed);
		}
	}
};
