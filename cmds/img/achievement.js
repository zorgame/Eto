const { MessageAttachment } = require('discord.js');

module.exports = {
	config: {
		nombre: 'achievement',
		alias: ['logro-minecraft', 'logro-m'],
		descripcion: 'Crea tu propio logro de minecraft',
		category: 'img'
	},

	run: async (client, message, args) => {
		let texto = args.join('%20');
		if (!texto) return message.channel.send('¿ Y el texto ?');
		if (texto.length > 20)
			return message.channel.send('Escribe algo más corto');
		let attachment = new MessageAttachment(
			`https://api.alexflipnote.dev/achievement?text=${texto}`,
			`Paja.png`
		);
		message.channel.send('**⦾ Tu logo:...**', attachment);
	}
};
