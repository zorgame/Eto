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
			let descripción = command.descripcion;

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
				.setDescription(`Hola!, soy **${client.user.username}** , Soy un bot de entretenimiento. Prescisamente abajo veras mas informacion`)
				.addField("Inicio", `> • Mi prefix global es **ey!**\n> • Mi prefix en el servidor es **${prefix}**\n> • Recuerda que con el prefix del servidor sera con el usaras en todos mis comandos`)
				.addField("Comandos", `Para ver mis comandos tienes las siguientes opciones\n\`\`\`ini\n[\n${prefix}commands\n${prefix}commands --all\n${prefix}commands --dm\n]\`\`\``)
				.addField("Error?", `> Si tienes algun error prescisamente anajo de este mensaje estan los links de soporte o puedes escribir **${prefix}help <comando>**`)
				.setImage(
					'https://i.ibb.co/zbqgTP0/d99a9b05fca2212456d87157ecf205ca.gif'
				)
				.setThumbnail(
					'https://vignette.wikia.nocookie.net/antagonists/images/e/e6/Eto-Yoshimura.jpg/revision/latest?cb=20190622165004'
				)
				.addField(
					'Invitaciones',
					`**[Invitación](https://discordapp.com/oauth2/authorize?client_id=724500548547641354&scope=bot&permissions=1276505175) | [Soporte](https://discord.gg/etbsV4x)**`
				);
			message.channel.send(embed1);
		}
	}
};
