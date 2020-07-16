module.exports = {
	config: {
		nombre: 'setwelcome',
		alias: ['setwel'],
		descripcion: 'establece el canal de bienvenidas',
		category: 'con'
	},

	run: async (client, message, args) => {
		
		let permiso = message.member.hasPermission('MANAGE_MESSAGES');

		if (!permiso) {
			return message.channel
				.send('No tienes **permisos** para ejecutar el comando')
				.then(e => e.delete({ timeout: 5000 }));
		}

		const db = require('megadb');
		const { MessageEmbed } = require('discord.js');
		const wel = new db.crearDB('wel');
		let canal = message.mentions.channels.first();
		if (!canal) return message.channel.send('Debes mencionar un canal');

		wel.establecer(`${message.guild.id}.canal`, canal.id);
		let embed = new MessageEmbed()
			.setTitle('Nuevo canal de bienvenidas')
			.setDescription(
				'Nuevo canal de bienvenidas establecido , Abajo más información'
			)
			.addField('> Canal de bienvenidas', '⦾ ' + canal.name)
			.addField('> ID', '⦾ ' + canal.id)
			.addField('> Autor', '⦾ ' + message.author.tag)
			.addField(
				'> Adicional',
				'⦾ Si aun no tienes un mensaje predeterminado para tus invitaciones?, pues escribe:\n> `ey!configwel` Ahí podrás editar tu mensaje de bienvenida\n> `ey!infoall` Te mostrará que tipo de atajos podrás usar'
			)
			.setColor('64ffc4');
		message.channel.send(embed);
	}
};
