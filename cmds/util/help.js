module.exports = {
	config: {
		nombre: 'help',
		alias: ['ayuda'],
		descripcion: 'Conoce de mi',
		category: 'util'
	},

	run: async (client, message, args) => {
		const db = require('megadb');
		const prefix_db = new db.crearDB('prefixes');
		const prefix = (await prefix_db.obtener(message.guild.id)) || 'ey!';

		const { MessageEmbed } = require('discord.js');

		if (args[0]) {
			const embed = new MessageEmbed();
			let command = client.commands.get(
				client.alias.get(args[0].toLowerCase()) || args[0].toLowerCase()
			);
			if (!command)
				return message.channel.send(
					embed
						.setColor('GREEN')
						.setDescription(
							'Coloca `' +
								prefix +
								'comandos` para ver los comandos que tienes disponibles'
						)
						.setTitle('Comando Invalido')
				);
			command = command.config;

			let alias = command.alias;
			let nombre = command.nombre;
			let descripción = command.descripcion

			embed
				.setColor('64ffc4')
				.addField('Nombre', nombre)
				.addField('Alias', alias || 'Sin alias')
				.addField('Descripción', descripción || 'Sin descripción');

			message.channel.send(embed);
		} else {
		  
		const embed1 = new MessageEmbed() 
				.setTitle('____Ayuda - Sobre mi____')
				.setColor('64ffc4')
				.setDescription(
					`Hola!, yo soy **${
						client.user.username
					}** Mi papel en este momento es servir a mis usuarios que me usan, abajo tendrás más información de mi`
				)
				.addField(
					`⦿ Inicio`,
					`Mi prefix es **${prefix}** El cual lo usaras para todos mis comandos`
				)
				.addField(
					`⦿ Mis comandos`,
					`Si quieres ver mis comandos escribe: \n\`${prefix}comandos\`: Mandare un mensaje para que reacciones y pruebes mis comandos`
				)
				.setImage(
					'https://i.ibb.co/zbqgTP0/d99a9b05fca2212456d87157ecf205ca.gif'
				)
				.setThumbnail(
					'https://vignette.wikia.nocookie.net/antagonists/images/e/e6/Eto-Yoshimura.jpg/revision/latest?cb=20190622165004'
				)
				.addField(
					'⦿ Adicional',
					`Si tienes alguna duda o problema con algún comando escribe \`${prefix}help <comando>\``
				);
			message.channel.send(embed1);
		}
	}
};
