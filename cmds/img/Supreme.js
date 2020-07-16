const { MessageAttachment } = require('discord.js');

module.exports = {
	config: {
		nombre: 'supreme',
		alias: '',
		descripcion: 'Crea un logo con la marca de Supreme',
		category: 'img'
	},

	run: async (client, message, args) => {
		let texto = args.join('%20');
		if (!texto) return message.channel.send('Te falto escribir el texto');
		if (args.join(' ').length > 20) return message.channel.send('No puede sobre pasar los 20 caracteres');
		
		let attachment = new MessageAttachment(
			`https://api.alexflipnote.dev/supreme?text=${texto}`,
			'paja.png'
		);

		message.channel.send('Tu logo', attachment);
	}
};
