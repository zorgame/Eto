module.exports = {
	config: {
		nombre: 'ascii',
		alias: '',
		descripcion: 'Crea un texto en forma ascii',
		category: 'util'
	},

	run: async (client, message, args) => {
		const figlet = require('figlet');
		if (!args[0]) return message.channel.send('Debes agregar un texto');
		if (args.join(" "). length > 15)
			return message.channel.send(
				'No puedes agregar un texto con más de 15 caracteres/valores'
			);
		figlet(args.join(' '), (err, data) =>
			message.channel.send('```' + data + '```')
		);
	}
};
