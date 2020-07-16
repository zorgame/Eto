const { MessageAttachment } = require('discord.js');
module.exports = {
	config: {
		nombre: 'captcha',
		alias: '',
		descripcion: 'Genera un catcha para comprobar si eres un robot',
		category: 'img'
	},

	run: async (client, message, args) => {
		let texto = args.join('%20');
		if (!texto) return message.channel.send('¿ Y el texto ?');
		if (texto.length >= 50) return message.channel.send("No puedes escribir mas de 50 caracteres")
		let attachment = new MessageAttachment(
			`https://api.alexflipnote.dev/captcha?text=${texto}`,
			`Paja.png`
		);
		message.channel.send('**⦾ Tu Logo:**', attachment);
	}
};
