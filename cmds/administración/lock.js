const db = require('megadb');
const Discord = require('discord.js');

module.exports = {
	config: {
		nombre: 'lock-channel',
		alias: ['lock', 'lockchannel'],
		descripcion: 'Este comando bloquea el canal que quieras',
		category: 'admin'
	},
	run: async (client, message, args) => {
		try {
			let channel = message.mentions.channels.first() || message.channel;

			if (!message.member.hasPermission('MANAGE_CHANNELS'))
				return message.channel.send(
					`<a:a5:708890598110658652> No tienes los permisos suficientes`
				)
					if (!message.guild.member(client.user).hasPermission('MANAGE_CHANNELS')) {
						let embed = new Discord.MessageEmbed()
				.addField('Error', err)
				.addField('Posible solución', 'Darme permisos para gestionar canales')
				.setColor('64ffc4');
			message.channel.send(embed);
		}

			if (!message.guild.member(client.user).hasPermission('MANAGE_CHANNELS')) {
				message.channel
					.send('Asegúrate de que tenga permisos de manejar canales')
					.then(e => e.delete({ timeout: 10000 }));
			} else {
				channel.overwritePermissions(
					[
						{
							id: message.guild.id,
							deny: ['SEND_MESSAGES']
						}
					],
					'Nada'
				);

				let embed = new Discord.MessageEmbed()
					.setTitle('Lock Channel')
					.addField('> ⦾ Moderador', message.author.tag)
					.addField('> ⦾ Canal bloqueado', channel.name)
					.addField('> ⦾ ID', channel.id)
					.setColor('64ffc4');

				message.channel.send(embed);
			}
		}  catch (err) {
			let embed = new Discord.MessageEmbed()
				.addField('Error', err)
				.addField('Posible solución', 'Darme permisos para gestionar canales')
				.setColor('64ffc4');
			message.channel.send(embed);
		}
	}
};
