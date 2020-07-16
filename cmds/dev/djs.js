const { MessageEmbed } = require('discord.js');
const fetch = require('node-fetch');
module.exports = {
	config: {
		nombre: 'discord.js',
		alias: ['djs'] ,
		descripcion: 'Mira la librería de djs',
		category: 'dev'
	},

	run: async (client, message, args) => {
		let src = '';
		let cont = '';
		if (
			[
				'stable',
				'master',
				'commando',
				'rpc',
				'akairo',
				'akairo-master',
				'collection'
			].includes(args[1])
		) {
			src = args[0];
			cont = args.slice(1).join(' ');
		} else {
			src = 'stable';
			cont = args.join(' ');
		}
		fetch(`https://djsdocs.sorta.moe/v2/embed?src=${src}&q=${cont}`)
			.then(r => r.json())
			.then(res => {
				if (!res)
					return message.channel.send(
						new MessageEmbed()
							.setTitle('Error')
							.setDescription('No pude encontrar datos')
							.setColor("ff0000")
					);
				if (res.error)
					return message.channel.send(
						new MessageEmbed()
							.setTitle('Error ' + res.status)
							.setDescription(res.error + ': ' + res.message)
							.setColor("ff0000")
					);
				message.channel.send(new MessageEmbed(res));
			})
			.catch(err => message.channel.send('Error: ' + err));
	}
};
