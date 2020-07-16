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
				.send(
					'<a:a5:708890598110658652> | No tienes permisos de banear usuarios'
				)
				.then(e => e.delete({ timeout: 2500 }));
		}

		if (!message.guild.member(client.user).hasPermission('BAN_MEMBERS')) {
			message.channel
				.send(
					'<a:a5:708890598110658652> | No tengo permisos de banear usuarios'
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
				'<a:a12:727735540551516240> | No puedes banearte a ti mismo'
			);

		if (usuario.id == client.user.id)
			return message.channel.send(
				'<a:a12:727735540551516240> | No puedo banearme'
			);

		if (
			member.roles.highest.comparePositionTo(message.member.roles.highest) >= 0
		) 
			return message.channel.send('<a:a12:727735540551516240> | No puedes banear a este usuario tiene mayor o igual rango que tu');
		

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
