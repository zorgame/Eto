const { MessageAttachment } = require('discord.js');
module.exports = {
	config: {
		nombre: 'logo-pornhub',
		alias: ['l-pornhub', 'logo-p'],
		descripcion: 'Crea tu propio Logo con el título de pornhub',
		category: 'img'
	},

	run: async (client, message, args) => {
		let uno = args[0];
		let dos = args[1];
		if (!uno) return message.channel.send('Debes agregar 2 palabras');
		let attachment = new MessageAttachment(
			`https://api.alexflipnote.dev/pornhub?text=${uno}&text2=${dos}`,
			'paja.png'
		);
		message.channel.send('**⦾ Tu logo:**', attachment);
	}
};
