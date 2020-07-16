module.exports = {
	config: {
		nombre: 'kick',
		alias: '',
		descripcion: 'Kickea a algún usuario',
		category: 'admin'
	},

	run: async (client, message, args) => {
		let permisos = message.member.hasPermission('KICK_MEMBERS');

		if (!permisos) {
			return message.channel
				.send(
					'<a:a5:708890598110658652> | No tienes permisos para kickear usuarios'
				)
				.then(e => e.delete({ timeout: 2500 }));
		}

		if (!message.guild.member(client.user).hasPermission('KICK_MEMBERS')) {
			message.channel
				.send(
					'<a:a12:727735540551516240> | No tengo permisos de kickear miembros'
				)
				.then(e => e.delete({ timeout: 2500 }));
		}

		let usuario = message.guild.member(
			message.mentions.users.first() || message.guild.members.cache.get(args[0])
		);
		const member = message.guild.members.resolve(usuario);

		if (!usuario)
			return message.channel
				.send('<a:a5:708890598110658652> | Debes mencionar a alguien')
				.then(async e => e.delete({ timeout: 2500 }));
		if (usuario.id == message.author.id)
			return message.channel.send(
				'<a:a12:727735540551516240> | No puedes kickearte'
			);

		if (usuario.id == client.user.id)
			return message.channel.send(
				'<a:a12:727735540551516240> | No puedo kickearme'
			);

		if (
			member.roles.highest.comparePositionTo(message.member.roles.highest) >= 0
		)
			return message.channel.send(
				'<a:a5:708890598110658652> | Esta persona tiene igual o mayor rango que tu, no puedes kickearla'
			);

		let razon = args.slice(1).join(' ') || 'Sin razon';

		const { MessageEmbed } = require('discord.js');

		let embed = new MessageEmbed()
			.setTitle('KICK')
			.setDescription(
				'Se acaba de kickear a una persona, para más información aquí abajo'
			)
			.addField('> ⦾ Moderador', message.author.username)
			.addField('> ⦾ kickeado', usuario.displayName)
			.addField('> ⦾ Razón', razon)
			.setColor('64ffc4')
			.setThumbnail(message.guild.iconURL());

		usuario.send(embed);
		usuario.kick();
		message.channel
			.send(embed)
			.then(async e => await e.delete({ timeout: 10000 }));
	}
};
