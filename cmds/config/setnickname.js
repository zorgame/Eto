module.exports = {
	config: {
		nombre: 'setnickname',
		alias: ['nickname', 'set-nickname', 'setNickname'],
		descripcion: 'cambiale el nombre a la persona que quieras',
		category: 'con'
	},
	run: async (client, message, args) => {
	
		if (!message.member.hasPermission('MANAGE_NICKNAMES')) {
			return message.channel.send(
				'[Error] No tienes permisos || **Necesitas permisos de `Gestionar apodos`**'
			);
		}
	
		if (!message.guild.member(client.user).hasPermission('MANAGE_NICKNAMES')) {
			message.channel
				.send('No tengo permisos de gestionar apodos')
				.then(e => e.delete({ timeout: 2500 }));
		}

		let persona = message.mentions.members.first(); //Definimos "persona" como al que le hizo ping
		if (!persona) {
			return message.channel.send(
				'[Error] No hay una persona || **Debes mencionar a una persona**'
			); //lo que dice si no menciono a nadie
		} else if (
			persona.roles.highest.comparePositionTo(message.member.roles.highest) > 0
		) {
			return message.channel.send(
				'[Error] No tienes permisos || **Esa persona tiene tu mismo o superior rol**'
			); //lo que dice si esa persona tiene tu mismo o  superior rol *Depende de la jerarquia de discord*
		}
		let apodo = args.slice(1).join(' '); //Defiinimos "apodo" como el nuevo apodo del "persona"
		if (!apodo)
			return message.channel.send(
				'[error] No hay apodo || **Debes escribir el apodo a cambiar**'
			); //lo que dice si no hay apodo definido
		persona.setNickname(apodo); //El bot hace el cambio del apodo usando "persona" y "apodo"
		message.channel.send(`Listo, el nuevo apodo de ${persona} es **${apodo}**`); //Mensaje diciendo el nuevo apodo de la persona
	}
};
