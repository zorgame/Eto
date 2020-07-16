module.exports = {
	config: {
		nombre: 'ping',
		alias: [''],
		descripcion: 'Mira la latencia del bot',
		uso: 'c!ping',
		category: 'util'
	},
	run: async (client, message, args) => {
		const { MessageEmbed } = require('discord.js');
		const c = require('../../colores.json');

		let ping = Math.floor(message.client.ws.ping);
		let embed = new MessageEmbed();

		message.channel.send('<a:a2:708873679269920797> Cargando... ').then(e => {
			setTimeout(() => {
				e.edit('', embed.setTitle(`Ping - ${client.user.username}`).setDescription(
						`<a:discord:729085035629641780> Discord: ${e.createdTimestamp -
							message.createdTimestamp} ms\n<a:men:729085605668978781> Bot: ${ping} ms`).setColor('64ffc4')) 
			}, 2000);
		});
	}
};
