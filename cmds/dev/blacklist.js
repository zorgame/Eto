const db = require('megadb');
const black = new db.crearDB('blacklist');
const { MessageEmbed } = require('discord.js');

module.exports = {
	config: {
		nombre: 'blacklist',
		alias: ['bl'],
		descripcion: 'Secreto',
		category: 'dev'
	},

	run: async (client, message, args) => {
		if (!['493063208576483329'].includes(message.author.id)) return;

		let normal =
			message.mentions.users.first() || client.users.cache.get(args[1]);
		let kk = args.slice(2).join(' ');

		if (!args[0]) {
			message.channel.send(
				'Lo estas haciendo mal, puedes usarlo de la siguiente manera::\n`ey!blacklist remove/add <mencion>`'
			);
		}
		if (args[0] == 'add') {
			if (!normal) return message.channel.send('Debes mencionar al usuario');
			if (!kk) return message.channel.send('Debes agregar una razon');
			if (black.tiene(client.user.id)) {
				black.push(client.user.id, normal.id);
			}
			if (!black.tiene(client.user.id)) {
				black.establecer(client.user.id, [normal.id]);
			}
			const embed = new MessageEmbed()
				.setTitle('Nuevo usuario en la blacklist')
				.setDescription(
					'Nuevo usuario agregado a la blacklist, Abajo más información'
				)
				.addField('> ⦾ Usuario', normal.tag)
				.addField('> ⦾ ID', normal.id)
				.addField('> ⦾ Razon', kk)
				.setColor('64ffc4');
			normal.send(embed);
			message.channel.send(embed);
			client.channels.cache.get('727916492657655830').send(embed);
		}
		if (args[0] == 'remove') {
			if (!normal) return message.channel.send('Debes mencionar al usuario');
			if (!kk) return message.channel.send('Debes agregar una razon');
			if (black.tiene(client.user.id, normal.id)) {
				black.extract(client.user.id, normal.id);
			}

			const embed = new MessageEmbed()
				.setTitle('Nuevo usuario fuera de la blacklist')
				.setDescription(
					'Nuevo usuario eliminado de la blacklist, Abajo más información'
				)
				.addField('> ⦾ Usuario', normal.tag)
				.addField('> ⦾ ID', normal.id)
				.addField('> ⦾ Razon', kk)
				.setColor('64ffc4');
			normal.send(embed);
			message.channel.send(embed);
			client.channels.cache.get('727916492657655830').send(embed);
		}
	}
};
