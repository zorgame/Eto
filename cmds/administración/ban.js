module.exports = {
	config: {
		nombre: 'ban',
		alias: '',
		descripcion: 'Banea a algún usuario',
		category: 'admin'
	},

	run: async (client, message, args) => {
		let permisos = message.member.hasPermission('BAN_MEMBERS');

		if (!permisos) {
			return message.channel
				.send('No tienes **permisos** para ejecutar el comando')
				.then(e => e.delete({ timeout: 2500 }));
		}

		if (!message.guild.member(client.user).hasPermission('BAN_MEMBERS')) {
			message.channel
				.send('No tengo permisos de banear a usuarios')
				.then(e => e.delete({ timeout: 2500 }));
		}

		message.delete();
		let usuario = message.guild.member(
			message.mentions.users.first() || message.guild.members.cache.get(args[0])
		);
		const member = message.guild.members.resolve(usuario);

		if (usuario.id == message.author.id)
			return message.channel.send('No puedes darte ban a ti mismo');

		if (usuario.id == client.user.id)
			return message.channel.send('No puedes banearme, perdon');

		if (
			member.roles.highest.comparePositionTo(message.member.roles.highest) >= 0
		)
			return message.channel.send(
				'Esta persona tiene igual o mayor role que tu, no puedes banearla'
			);

		if (!usuario)
			return message.channel
				.send('Debes mencionar a quien quieres banear')
				.then(async e => e.delete({ timeout: 2500 }));

		let razon = args.slice(1).join(' ') || 'Sin razon';

		const { MessageEmbed } = require('discord.js');

		let embed = new MessageEmbed()
			.setTitle('Ban')
			.setDescription(
				'Se acaba de banear a una persona, para más información aquí abajo'
			)
			.addField('> ⦾ Moderador', message.author.username)
			.addField('> ⦾ Baneado', usuario.displayName)
			.addField('> ⦾ Razón', razon)
			.setColor('64ffc4')
			.setThumbnail(message.guild.iconURL());

		usuario.send(embed);
		usuario.ban();
		message.channel
			.send(embed)
			.then(async e => await e.delete({ timeout: 10000 }));
	}
};
