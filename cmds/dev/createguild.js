module.exports = {
	config: {
		nombre: 'guildreate',
		alias: ['log-gcreate', 'loguild'],
		descripcion: 'Comando secreto',
		category: 'dev'
	},

	run: async (client, message, args) => {
		if (!['493063208576483329'].includes(message.author.id)) return;
		const db = require('megadb');
		const { MessageEmbed } = require('discord.js');
		const guild = new db.crearDB('guild');
		let canal = message.mentions.channels.first();
		if (!canal) return message.channel.send('Debes mencionar un canal');

		guild.establecer(client.user.id, canal.id);
		let embed = new MessageEmbed()
			.setTitle('Nuevo logs')
			.setDescription('Nuevo logs establecidos, Abajo más información')
			.addField('> Canal de logs', canal)
			.addField('> ID', canal.id)
			.addField('> Nombre del server', message.guild.name)
			.setColor('64ffc4');
		message.channel.send(embed);
	}
};
