const Discord = require('discord.js');

module.exports = {
	config: {
		nombre: 'clear',
		alias: '',
		descripcion: 'Borra un determinado número de mensajes | Máximo 100',
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

		if (!args[0]) {
			return message.channel.send(
				'Introduce una cantidad de mensajes a eliminar, debe ser menor a **100**'
			);
		}

		let number = args[0];
		if (isNaN(number)) {
			return message.channel.send(
				'Necesitas ingresar numeros, no letras o simbolos'
			);
		}

		number = parseInt(number);
		if (number > 100 || number <= 0) {
			return message.channel.send(
				'Trata de decir un numero que este en esta jerarquia **1-100**'
			);
		}

		message.channel
			.bulkDelete(number)
			.then(e => {
				let embed = new Discord.MessageEmbed()
					.addField(
						`Se eliminaron `,
						` **${e.map(e => `${e}`).slice(1).length}** Mensajes`
					)
					.setColor('64ffc4')
					.setTitle('<a:a2:708873679269920797> Eliminando mensajes');

				return message.channel.send(embed);
			})
			.then(e => e.delete({ timeout: 5000 }))
			.catch(error => {
				message.channel.send(`Ocurrio un **error:** ${error.message}`);
			});
	}
};
