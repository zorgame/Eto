const Discord = require('discord.js');
module.exports = {
	config: {
		nombre: 'say',
		alias: ['decir'],
		descripcion: 'Reoite lo que tu digas',
		category: 'util'
	},
	run: async (client, message, args) => {
		let permisos = message.channel.permissionsFor(message.member);
	message.delete() 
		if (!args[0]) return message.channel.send('Agrega un texto para decir 😳');
		message.channel.send(args.join(' '), { disableMentions: 'all' })
	}
};
