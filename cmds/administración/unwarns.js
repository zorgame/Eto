const db = require('megadb');
const warn = new db.crearDB('warn');
const { MessageEmbed } = require('discord.js');
module.exports = {
	config: {
		nombre: 'unwarn',
		alias: '',
		descripcion: 'Deswarnea a un usuario por algún error o compasión',
		category: 'admin'
	},

	run: async (client, message, args) => {
		let normal = message.mentions.users.first();
		let permisos = message.member.hasPermission('KICK_MEMBERS');

		if (!permisos) {
			return message.channel
				.send('<a:a12:727735540551516240> | No tienes permisos de unwarnear miembros')
				.then(e => e.delete({ timeout: 2500 }));
		}
		if (!normal)
			return message.channel.send('<a:a12:727735540551516240> | Menciona a quien quieres unwarnear');
		if (normal.id == message.author.id)
			return message.channel.send('<a:a5:708890598110658652> | No puedes unwarnearte');
		if (normal.id == client.user.id)
			return message.channel.send('No puedes unwarnearme');
		const member = message.guild.members.resolve(normal);
		if (
			member.roles.highest.comparePositionTo(message.member.roles.highest) >= 0
		)
			return message.channel.send(
				'<a:a12:727735540551516240> | Esta persona tiene igual o mayor role que tu, no puedes unwarnearlo'
			);

		if (!warn.tiene(`${message.guild.id}.${normal.id}`)) {
			message.channel
				.send('<a:a12:727735540551516240> | El usuario no tiene warns/advertencias')
				.then(e => e.delete({ timeout: 5000 }));
		}
		if (warn.tiene(`${message.guild.id}.${normal.id}`)) {
			let n = await warn.obtener(`${message.guild.id}.${normal.id}`);
			let total = n.length;

			if (!args[1])
				return message.channel.send(
"<a:a12:727735540551516240> | Escribe el número de warn que quieres remover");
			if (isNaN(args[1]))
				return message.channel.send(
					'<a:a12:727735540551516240> | Asegúrate de que escribiste un numero válido, si no estas seguro escribe : **warnlist <mencion> <numero de warn>**'
				);
			if (args[1] <= 0 || args[1] > total)
				return message.channel.send('Ese warn no existe');
			let resta = args[1] - 1;

			if (total == 1) {
				warn.eliminar(`${message.guild.id}.${normal.id}`);
			} else {
				warn.extract(`${message.guild.id}.${normal.id}`, n[resta]);
			}

			message.channel.send(`Acabas de eliminar el warn número ${args[1]} del usuario ${normal}`);
		}
	}
};
