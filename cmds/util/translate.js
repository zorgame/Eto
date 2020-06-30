const translate = require('@vitalets/google-translate-api');
const Discord = require('discord.js');

module.exports = {
	config: {
		nombre: 'translate',
		alias: ['traducir'],
		descripcion: 'Traduce tus textos al idioma que quieras',
		category: 'util'
	},
	run: async (client, message, args) => {
		
	
		let lang = args[0]
		if(lang.length < 2 || lang.length > 2 ) return message.channel.send("**____Lo estas haciendo mal dejame hacerte un ejemplo____**\n> ey!e translate <en(English)> <Texto que quieres traducir a ingles o al idioma que quieras>")  
		let msg = args.slice(1).join(' ');

		if (!lang)
			return message.channel.send(
				`Necesitas colocar a que idioma vas a traducir el texto`
			);
		if (!msg)
			return message.channel.send(`Necesitas colocar el mensaje a traducir`);

		translate(msg, { to: lang })
			.then(res => {
				message.channel.send(
					` >>> **Texto a traducir** :\n ` +
						'```' +
						` ${msg} ` +
						'```' +
						` \n **Texto traducido** :\n  ` +
						'```' +
						` ${res.text}` +
						'```'
				);
			})
			.catch(err => {
				console.error(err);
			});
	}
};
