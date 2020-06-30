const { MessageEmbed } = require('discord.js');
const db = require('megadb');
const wel = new db.crearDB('wel')

module.exports = {
	config: {
		nombre: 'configwel',
		alias: '',
		descripcion: 'Edita tu mensaje de bienvenida',
		category: 'con'
	},

	run: async (client, message, args) => {
		let permisos = message.member.hasPermission('MANAGE_MESSAGES');

		if (!permisos) {
			return message.channel
				.send('No tienes **permisos** para ejecutar el comando')
				.then(e => e.delete({ timeout: 2500 }));
		}

		if (!args[0])
			return message.channel.send(
				'Debes agregar algún mensaje, puedes escribir `ey!infoall` para más información'
			);
		const embed = new MessageEmbed()
			.setTitle('Mensaje de bienvenida')
			.setDescription(
				'Acabas de configurar tu mensaje de bienvenida, abajo verás más información'
			)
			.addField('> Autor', message.author.username)
			.addField('> Mensaje', args.join(' '))
			.setColor('64ffc4');
		wel.establecer(`${message.guild.id}.mensaje`, args.join(' '));
		message.channel.send(embed);
	}
};
