const { MessageEmbed } = require('discord.js');

module.exports = {
	config: {
		nombre: 'infoall',
		alias: '',
		descripcion:
			'Mira los atajos que puedes usar en los logs de bienvenida y despedida',
		category: 'con'
	},

	run: async (client, message, args) => {
		const embed = new MessageEmbed()
			.setTitle('> Atajos Utiles')
			.setDescription(
				'Abajo tendrás una lista de atajos que puedes usar en los mensajes de bienvenidas y despedidas'
			)
			.addField(
				'> {user}',
				'Te da la mención del usuario, no es recomendable porque si se llega a ir el usuario queda la mención como invalid-user'
			)
			.addField(
				'>  {user:name:}',
				'Te da el nombre del usuario que se fue o entro'
			)
			.addField('> {user:tag}', 'Te da el tag del miembro que se fue o entro')
			.addField('> {server}', 'Te da el nombre del servidor')
			.addField(
				'> {members}',
				'Te dice el numero total de miembros del servidor'
			)
			.addField(
				'> ⦾ Ejemplo',
				'```ey!configwel Bienvenido {user:tag}, Espero la pases bien en nuestro Server llamado {server} y antes de que se me olvide, gracias a ti somos {members} miembros```'
			)
			.setColor('64ffc4');
		message.channel.send(embed);
	}
};
