const db = require('megadb');
const wel = new db.crearDB('wel');
const { MessageEmbed } = require('discord.js');

module.exports = {
	config: {
		nombre: 'setrolewelcome',
		alias: ['set-role-welcome', 'setrolewel'],
		descripcion: 'Le das un role a los miembros que entren',
		category: 'con'
	},

	run: async (client, message, args) => {
		let permisos = message.member.hasPermission('MANAGE_ROLES');

		if (!permisos) {
			return message.channel
				.send('No tienes **permisos** para ejecutar el comando')
				.then(e => e.delete({ timeout: 2500 }));
		}

		if (!message.guild.member(client.user).hasPermission('MANAGE_ROLES')) {
			message.channel
				.send('No tengo permisos de gestionar roles')
				.then(e => e.delete({ timeout: 2500 }));
		}

		let role =
			message.guild.roles.cache.get(args[0]) || message.mentions.roles.first();

		if (!role)
			return message.channel.send(
				'Debes mencionar un role o agregar la id de un role'
			);

		wel.establecer(`${message.guild.id}.wrole`, role.id);
		const embed = new MessageEmbed()
			.setTitle('Role establecido')
			.setDescription(
				'Nuevo role establecido para los miembros que entran, abajo más información'
			)
			.addField('> ⦾ Moderador', message.author)
			.addField('> ⦾ Role', role)
			.addField('> ⦾ ID', role.id)
			.setColor('64ffc4')
			.setThumbnail(message.guild.iconURL());
		message.channel.send(embed);
	}
};
