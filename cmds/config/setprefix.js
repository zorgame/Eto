module.exports = {
	config: {
		nombre: 'setprefix',
		alias: ['sp', 'prefix'],
		descripcion: 'Cambia el prefix del bot en tu servidor',
		category: 'con'
	},
	run: async (client, message, args) => {
		const { MessageEmbed, MessageCollector } = require('discord.js');
		const db = require('megadb');
		const prefix_db = new db.crearDB('prefixes');
		//Definimos primero los módulos que vamos a usar

		if (!message.member.hasPermission('ADMINISTRATOR'))
			return message.reply('No tienes permisos <a:a5:708890598110658652>');
		if (!args[0]) return message.channel.send('Debes escribir algún prefix');
		let newprefix = await args[0];
		// Acá definimos y creamos una condiciónal donde confirmamos si el usuario algún argumento

		message.channel.send(
			'Quieres establecer tu nuevo prefix a ' +
				newprefix +
				'?\nPara confirmar o cancelar elige alguna de las siguientes opciones **<Y/N>**'
		);
		// Este es el mensaje que mandara cuando se ejecute el comando y nos dará la información que tendríamos que seguir

		const collector = new MessageCollector(
			message.channel,
			m => m.author.id === message.author.id,
			{ max : 1 }
		);
		// Definimos el colector

		collector.on('collect', async message => {
			//creamos el evento
			if (message.content == 'Y' || message.content == 'y') {
				prefix_db.establecer(message.guild.id, newprefix);
				// Establecemos el prefix (así es como tengo definido prefix ya es decisión tuya)
				message.channel.send('El prefix se actualizo a **' + newprefix + '**');
				//esto es lo que mandara si el usuario escribió Y
			} else if (message.content == 'N' || message.content == 'n') {
				let embed2 = new MessageEmbed()
					.setColor('64ffc4')
					.setTitle('SetPrefix Cancelado')
					.setDescription('El progreso se cancelo');
				message.channel.send(embed2);
				//Este es el mensaje que mandara si el usuario escribió N
			} else {
				message.channel.send('Ocurrió algún error, vuelve a intentar');
			}
		});
	}
};
