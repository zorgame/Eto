module.exports = {
	config: {
		nombre: 'purge',
		alias: '',
		descripcion: 'Elimina los mensajes de un miembro',
		category: 'admin'
	},

	run: async (client, message, args) => {
		var permisos = message.member.hasPermission('MANAGE_MESSAGES');

		if (!permisos) {
			return message.channel.send(
				'No tienes **permisos** para ejecutar el comando'
			);
		}

		if (!message.guild.me.hasPermission('MANAGE_MESSAGES')) {
			return message.channel.send(
				'No tengo el permiso de `Gestionar los mensajes` para ejecutar esta funcion'
			);
		}

		let member;
		/*
el usuario puede escribir el nombre de usuario, ID o puede mencionar a un usuario
*/
		if (args[0])
			member =
				message.mentions.members.first() ||
				message.guild.members.resolve(args[0]) ||
				message.guild.members.cache.find(p =>
					p.user.username.startsWith(args[0])
				); //aquí obtenemos el usuario

		let cantidad =
			member && !isNaN(args[1]) ? args[1] : !isNaN(args[0]) ? args[0] : 50;

		const messages = await message.channel.messages.fetch({ limit: 100 }); //obtenemos los últimos 200 mensajes enviados al canal

		let filtro = member
			? m => m.author.id == member.id && !m.pinned && !m.system
			: m => !m.pinned && !m.system;

		let msg = messages.filter(filtro); //hacemos el filtro a messages que es la variable donde están todos los mensajes

		if (msg.array().length < 1)
			return message.channel.send('No hay mensajes por eliminar');
		/*
nos aseguramos que msg tenga mensajes para eliminar
*/
		message.channel.bulkDelete(msg.array().slice(0, cantidad), true).then(m => {
			message.channel
				.send(`Mensaje eliminados: ${msg.array().slice(0, cantidad).length}`)
				.then(e => e.delete({ timeout: 2500 }));
		});
	}
};
