module.exports = {
	config: {
		nombre: 'geometry',
		alias: '',
		descripcion: 'Crea un logo con la fuente de geometry dash',
		category: 'util'
	},

	run: async (client, message, args) => {
		const Discord = require('discord.js');

		if (!args[0])
			return message.channel.send('Debes agregar algún texto para el logo');

		let kk = args.join(' ');
		if (kk.length > 40)
			return message.channel.send('No puedes escribir mas de 40 caracteres');

		let texto = args.join('%20');

		let attachment = new Discord.MessageAttachment(
			`https://gdcolon.com/tools/gdlogo/img/${texto}`,
			'logo.png'
		);

		message.channel.send('**⦾ Tu logo:**', attachment);
	}
};
